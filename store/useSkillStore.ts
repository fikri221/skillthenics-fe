import { create } from "zustand";

type Skill = {
  id: string;
  name: string;
  level: number;
};

type SkillState = {
  skills: Skill[];
  levelUp: (id: string) => void;
};

export const useSkillStore = create<SkillState>((set) => ({
  skills: [
    { id: "pullup", name: "Pull Up", level: 1 },
    { id: "muscleup", name: "Muscle Up", level: 0 },
  ],
  levelUp: (id) =>
    set((state) => ({
      skills: state.skills.map((s) =>
        s.id === id ? { ...s, level: s.level + 1 } : s,
      ),
    })),
}));
