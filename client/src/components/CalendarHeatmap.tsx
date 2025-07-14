import React from "react";
import clsx from "clsx";
import { IHabitLog } from "../api/habitApi";

interface CalendarHeatmapProps {
  logs: IHabitLog[];
  daysToShow?: number;
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({
  logs,
  daysToShow = 30,
}) => {
  // Create a map of logs by date for quick lookup
  const logsByDate = new Map<string, boolean>();
  logs.forEach((log) => {
    logsByDate.set(log.date, log.completed);
  });

  // Generate the last N days
  const generateDays = () => {
    const days = [];
    const today = new Date();

    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split("T")[0];
      const isCompleted = logsByDate.get(dateString) || false;
      const isToday = i === 0;

      days.push({
        date: dateString,
        completed: isCompleted,
        isToday,
      });
    }

    return days;
  };

  const days = generateDays();

  // Group days into weeks for display
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getDayColor = (day: { completed: boolean; isToday: boolean }) => {
    if (day.isToday) {
      return day.completed
        ? "bg-green-500 border-2 border-blue-500"
        : "bg-gray-200 border-2 border-blue-500";
    }
    return day.completed ? "bg-green-400" : "bg-gray-200";
  };

  const getDayTooltip = (day: {
    date: string;
    completed: boolean;
    isToday: boolean;
  }) => {
    const date = new Date(day.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const status = day.completed ? "Completed" : "Not completed";
    const todayIndicator = day.isToday ? " (Today)" : "";

    return `${formattedDate}: ${status}${todayIndicator}`;
  };

  return (
    <div className="w-full">
      <div className="mb-2 text-sm text-gray-600">Last {daysToShow} days</div>

      <div className="grid grid-cols-7 gap-1">
        {/* Day labels */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs text-gray-500 text-center py-1">
            {day}
          </div>
        ))}

        {/* Calendar squares */}
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => {
              // Determine text color for best contrast
              let textColor = "";
              if (day.isToday && day.completed) {
                textColor = "text-white";
              } else if (day.completed) {
                textColor = "text-white";
              } else if (day.isToday && !day.completed) {
                textColor = "text-blue-700 dark:text-blue-200 dark:bg-gray-800";
              } else {
                textColor = "text-gray-700 dark:text-gray-100 dark:bg-gray-800";
              }
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={clsx(
                    "w-6 h-6 rounded-sm transition-colors duration-200 cursor-pointer hover:opacity-80 flex items-center justify-center text-[11px] font-semibold ",
                    getDayColor(day),
                    textColor
                  )}
                  title={getDayTooltip(day)}
                >
                  {new Date(day.date).getDate()}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
          <span>Not completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 border border-blue-500 rounded-sm"></div>
          <span>Today (completed)</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeatmap;
