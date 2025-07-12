import axios from "axios";

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface IHabitLog {
  date: string;
  completed: boolean;
}

export interface IStreakData {
  currentStreak: number;
  longestStreak: number;
  totalCompleted: number;
}

export interface IHabit {
  _id: string;
  title: string;
  frequency: "daily" | "weekly";
  createdAt: string;
  logs: IHabitLog[];
  streakData: IStreakData;
}

// Get all habits
export const getAllHabits = async (): Promise<IHabit[]> => {
  try {
    const response = await api.get("/api/habits");
    return response.data;
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw new Error("Failed to fetch habits");
  }
};

// Get a single habit by ID
export const getHabitById = async (id: string): Promise<IHabit> => {
  try {
    const response = await api.get(`/api/habits/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching habit:", error);
    throw new Error("Failed to fetch habit");
  }
};

// Log a habit for a specific date (or today by default)
export const logHabit = async (
  id: string,
  completed: boolean = true,
  date?: string
): Promise<IHabit> => {
  try {
    const payload: { completed: boolean; date?: string } = { completed };
    if (date) {
      payload.date = date;
    }

    const response = await api.put(`/api/habits/${id}/log`, payload);
    return response.data;
  } catch (error) {
    console.error("Error logging habit:", error);
    throw new Error("Failed to log habit");
  }
};

// Create a new habit
export const createHabit = async (
  title: string,
  frequency: "daily" | "weekly" = "daily"
): Promise<IHabit> => {
  try {
    const response = await api.post("/api/habits", { title, frequency });
    return response.data;
  } catch (error) {
    console.error("Error creating habit:", error);
    throw new Error("Failed to create habit");
  }
};

// Delete a habit
export const deleteHabit = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/habits/${id}`);
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw new Error("Failed to delete habit");
  }
};
