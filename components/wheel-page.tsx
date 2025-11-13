"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGameStore } from "@/lib/game-store"
import { QuestionModal } from "./question-modal"

const categories = ["Grammar", "Vocabulary", "Culture", "Idioms", "Listening", "Reading"] as const

const categoryColors = {
  Grammar: "from-blue-400 to-blue-600",
  Vocabulary: "from-green-400 to-green-600",
  Culture: "from-purple-400 to-purple-600",
  Idioms: "from-yellow-400 to-yellow-600",
  Listening: "from-pink-400 to-pink-600",
  Reading: "from-indigo-400 to-indigo-600",
}

export function WheelPage() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinAngle, setSpinAngle] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number] | null>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const { score } = useGameStore()

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const spins = Math.floor(Math.random() * 5) + 5
    const randomIndex = Math.floor(Math.random() * categories.length)
    const newAngle = spins * 360 + randomIndex * 60

    setSpinAngle(newAngle)

    setTimeout(() => {
      setSelectedCategory(categories[randomIndex])
      setShowQuestion(true)
      setIsSpinning(false)
    }, 3000)
  }

  const handlePlayAgain = () => {
    setShowQuestion(false)
    setSelectedCategory(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back Home
          </Button>
        </Link>
        <div className="text-right">
          <p className="text-sm text-foreground/60">Score</p>
          <p className="text-3xl font-bold text-primary">{score}</p>
        </div>
      </motion.div>

      {/* Wheel container */}
      <motion.div
        className="flex flex-col items-center justify-center mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-12 bg-white dark:bg-slate-800 shadow-2xl mb-8">
          <div className="relative w-64 h-64 mx-auto">
            {/* Wheel */}
            <motion.div
              animate={{ rotate: spinAngle }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="w-full h-full relative"
            >
              {categories.map((category, index) => {
                const angle = (index * 360) / categories.length
                return (
                  <div
                    key={category}
                    className={`absolute w-32 h-32 bg-gradient-to-br ${categoryColors[category]} rounded-full flex items-center justify-center font-bold text-white text-center text-sm shadow-lg transform`}
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${angle}deg) translateY(-100px) rotate(-${angle}deg)`,
                    }}
                  >
                    {category}
                  </div>
                )
              })}
            </motion.div>

            {/* Center circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-accent rounded-full" />
              </div>
            </div>

            {/* Pointer */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-accent" />
          </div>
        </Card>

        {/* Spin button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-12"
          >
            {isSpinning ? "Spinning..." : "SPIN NOW!"}
          </Button>
        </motion.div>
      </motion.div>

      {/* Question modal */}
      {showQuestion && selectedCategory && <QuestionModal category={selectedCategory} onPlayAgain={handlePlayAgain} />}
    </main>
  )
}
