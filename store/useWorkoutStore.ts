import { create } from "zustand";

type WorkoutState = {
  reps: number;
  addRep: () => void;
  reset: () => void;
};

export const useWorkoutStore = create<WorkoutState>((set) => ({
  reps: 0,
  addRep: () => set((state) => ({ reps: state.reps + 1 })),
  reset: () => set({ reps: 0 }),
}));
