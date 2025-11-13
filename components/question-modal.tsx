"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGameStore } from "@/lib/game-store"
import { quizQuestions } from "@/lib/game-data"

interface QuestionModalProps {
  category: string
  onPlayAgain: () => void
}

export function QuestionModal({ category, onPlayAgain }: QuestionModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const { increment } = useGameStore()

  const question = quizQuestions.find((q) => q.category === (category as any))

  if (!question) return null

  const handleAnswerClick = (option: string) => {
    if (answered) return
    setSelectedAnswer(option)
    setAnswered(true)
    const correct = option === question.answer
    setIsCorrect(correct)
    if (correct) increment()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <Card className="bg-white dark:bg-slate-800 max-w-2xl w-full p-8">
            {/* Category badge */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm">
                {category}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">{question.question}</h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={answered}
                  whileHover={!answered ? { scale: 1.02 } : undefined}
                  whileTap={!answered ? { scale: 0.98 } : undefined}
                  className={`p-4 rounded-lg font-semibold transition-all ${
                    selectedAnswer === option
                      ? isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : answered && option === question.answer
                        ? "bg-green-500 text-white"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {answered && option === question.answer && <CheckCircle className="h-5 w-5" />}
                    {answered && selectedAnswer === option && !isCorrect && <XCircle className="h-5 w-5" />}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-lg mb-8 ${
                    isCorrect
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  <p className="font-semibold mb-2">{isCorrect ? "✨ Correct!" : "💡 Try Again!"}</p>
                  <p>{question.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Play again button */}
            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Button
                  onClick={onPlayAgain}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                >
                  Spin Again
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
