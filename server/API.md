# Habit Tracker API Documentation

## Base URL

`http://localhost:3000/api/habits`

## Endpoints

### 1. Create a Habit

**POST** `/api/habits`

**Request Body:**

```json
{
  "title": "Exercise daily",
  "frequency": "daily"
}
```

**Response:**

```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "title": "Exercise daily",
  "frequency": "daily",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "logs": []
}
```

### 2. Get All Habits

**GET** `/api/habits`

**Response:**

```json
[
  {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "title": "Exercise daily",
    "frequency": "daily",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "logs": [
      {
        "date": "2024-01-15",
        "completed": true
      }
    ],
    "streakData": {
      "currentStreak": 1,
      "longestStreak": 1,
      "totalCompleted": 1
    }
  }
]
```

### 3. Get Single Habit

**GET** `/api/habits/:id`

**Response:**

```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "title": "Exercise daily",
  "frequency": "daily",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "logs": [
    {
      "date": "2024-01-15",
      "completed": true
    }
  ],
  "streakData": {
    "currentStreak": 1,
    "longestStreak": 1,
    "totalCompleted": 1
  }
}
```

### 4. Log a Habit

**PUT** `/api/habits/:id/log`

**Request Body:**

```json
{
  "date": "2024-01-15",
  "completed": true
}
```

**Note:** If no date is provided, today's date will be used.

**Response:**

```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "title": "Exercise daily",
  "frequency": "daily",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "logs": [
    {
      "date": "2024-01-15",
      "completed": true
    }
  ],
  "streakData": {
    "currentStreak": 1,
    "longestStreak": 1,
    "totalCompleted": 1
  }
}
```

### 5. Delete a Habit

**DELETE** `/api/habits/:id`

**Response:**

```json
{
  "message": "Habit deleted successfully"
}
```

## Data Models

### Habit Schema

```typescript
interface IHabit {
  _id: string;
  title: string;
  frequency: 'daily' | 'weekly';
  createdAt: Date;
  logs: IHabitLog[];
}

interface IHabitLog {
  date: string; // YYYY-MM-DD format
  completed: boolean;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalCompleted: number;
}
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "error": "Error message"
}
```

Common HTTP status codes:

- `400` - Bad Request (invalid input)
- `404` - Not Found (habit not found)
- `500` - Internal Server Error
