import mongoose, { Document, Schema } from 'mongoose';

export interface IHabitLog {
  date: string; // ISO date string
  completed: boolean;
}

export interface IHabit extends Document {
  title: string;
  frequency: 'daily' | 'weekly';
  createdAt: Date;
  logs: IHabitLog[];
  userId: mongoose.Types.ObjectId; // Add this line
}

const habitLogSchema = new Schema<IHabitLog>({
  date: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: 'Date must be in YYYY-MM-DD format',
    },
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const habitSchema = new Schema<IHabit>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  frequency: {
    type: String,
    required: true,
    enum: ['daily', 'weekly'],
    default: 'daily',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  logs: [habitLogSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Index for efficient queries
habitSchema.index({ createdAt: -1 });

export const Habit = mongoose.model<IHabit>('Habit', habitSchema);
