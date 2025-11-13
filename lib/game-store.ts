import { create } from "zustand"

interface GameState {
  score: number
  currentQuestion: number
  incrementScore: (amount: number) => void
  increment: () => void
  reset: () => void
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  currentQuestion: 0,
  incrementScore: (amount: number) => set((state) => ({ score: state.score + amount })),
  increment: () => set((state) => ({ score: state.score + 1 })),
  reset: () => set({ score: 0, currentQuestion: 0 }),
}))
