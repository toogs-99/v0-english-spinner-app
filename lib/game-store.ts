import { create } from "zustand"

interface GameState {
  score: number
  currentQuestion: number
  increment: () => void
  reset: () => void
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  currentQuestion: 0,
  increment: () => set((state) => ({ score: state.score + 1 })),
  reset: () => set({ score: 0, currentQuestion: 0 }),
}))
