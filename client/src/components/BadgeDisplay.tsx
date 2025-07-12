import React from "react";
import { Badge } from "../utils/badge";

interface BadgeDisplayProps {
  badges: Badge[];
  showAll?: boolean;
  maxDisplay?: number;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  badges,
  showAll = false,
  maxDisplay = 6,
}) => {
  const earnedBadges = badges.filter((badge) => badge.earned);
  const displayBadges = showAll ? badges : earnedBadges.slice(0, maxDisplay);

  if (displayBadges.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">
          {showAll ? "No badges available yet" : "No badges earned yet"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {displayBadges.map((badge) => (
        <div
          key={badge.id}
          className={`relative group cursor-pointer transition-all duration-200 ${
            badge.earned ? "opacity-100 scale-100" : "opacity-40 scale-95"
          }`}
          title={`${badge.name}: ${badge.description}`}
        >
          {/* Badge Card */}
          <div
            className={`
            p-3 rounded-lg border-2 text-center transition-all duration-200
            ${
              badge.earned
                ? `${badge.color} border-current shadow-md hover:shadow-lg`
                : "bg-gray-100 text-gray-400 border-gray-200"
            }
          `}
          >
            <div className="text-2xl mb-1">{badge.icon}</div>
            <div className="text-xs font-medium truncate">{badge.name}</div>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            <div className="font-semibold">{badge.name}</div>
            <div className="text-gray-300">{badge.description}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BadgeDisplay;
