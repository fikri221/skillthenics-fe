import { create } from "zustand";

export interface Exercise {
  name: string;
  target: number;
  sets: number;
  isTime?: boolean;
}

const INITIAL_EXERCISES: Exercise[] = [
  { name: "Pull Ups", target: 8, sets: 4 },
  { name: "Ring Rows", target: 12, sets: 3 },
  { name: "Dead Hang", target: 30, sets: 3, isTime: true },
  { name: "Scapular Pulls", target: 10, sets: 3 },
];

export type WorkoutState = {
  exercises: Exercise[];
  currentExercise: number;
  currentSet: number;
  reps: number;
  completedSets: number[][]; // e.g. [[8, 8, 8, 8], [12, 12, 12], [], []]

  timerRunning: boolean;
  seconds: number;
  restMode: boolean;
  restSeconds: number;

  addRep: () => void;
  removeRep: () => void;

  setCurrentExercise: (index: number) => void;
  completeSet: () => void;

  toggleTimer: () => void;
  tickTimer: () => void;

  skipRest: () => void;
  tickRestTimer: () => void;
};

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  exercises: INITIAL_EXERCISES,
  currentExercise: 0,
  currentSet: 1,
  reps: 0,
  completedSets: INITIAL_EXERCISES.map(() => []),

  timerRunning: false,
  seconds: 0,
  restMode: false,
  restSeconds: 60,

  addRep: () => set((state) => ({ reps: state.reps + 1 })),
  removeRep: () =>
    set((state) => ({ reps: state.reps > 0 ? state.reps - 1 : 0 })),

  setCurrentExercise: (index: number) =>
    set({
      currentExercise: index,
      currentSet: 1,
      reps: 0,
      seconds: 0,
    }),

  completeSet: () =>
    set((state) => {
      const exercise = state.exercises[state.currentExercise];
      const newSetsList = [...state.completedSets];

      // Salin array set bagian dalam agar tidak terjadi mutasi state langsung
      const innerSets = [...newSetsList[state.currentExercise]];
      // Array menggunakan index dari 0, currentSet dari 1
      innerSets[state.currentSet - 1] = state.reps;
      newSetsList[state.currentExercise] = innerSets;

      let nextSet = state.currentSet;
      let nextExercise = state.currentExercise;
      let newRestMode = state.restMode;
      let newRestSeconds = state.restSeconds;

      if (state.currentSet < exercise.sets) {
        nextSet += 1;
        newRestMode = true;
        newRestSeconds = 60;
      } else {
        if (state.currentExercise < state.exercises.length - 1) {
          nextExercise += 1;
          nextSet = 1;
          newRestMode = true;
          newRestSeconds = 90;
        }
      }

      return {
        completedSets: newSetsList,
        reps: 0,
        seconds: 0,
        currentSet: nextSet,
        currentExercise: nextExercise,
        restMode: newRestMode,
        restSeconds: newRestSeconds,
      };
    }),

  toggleTimer: () => set((state) => ({ timerRunning: !state.timerRunning })),
  tickTimer: () =>
    set((state) => {
      if (state.timerRunning) {
        return { seconds: state.seconds + 1 };
      }
      return state; // No state change
    }),

  skipRest: () => set({ restMode: false, restSeconds: 0 }),
  tickRestTimer: () =>
    set((state) => {
      if (state.restMode && state.restSeconds > 0) {
        return { restSeconds: state.restSeconds - 1 };
      }
      // Jika tidak rest atau habis target, tidak mengubah apapun
      return state;
    }),
}));
