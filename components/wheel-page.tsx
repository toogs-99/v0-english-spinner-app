"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGameStore } from "@/lib/game-store"
import { QuestionModal } from "./question-modal"

const categories = ["Grammar", "Vocabulary", "Culture", "Idioms", "Listening", "Reading"] as const

const colorMap = {
  Grammar: { bg: "from-blue-500 to-blue-700", rgb: "#3b82f6" },
  Vocabulary: { bg: "from-emerald-500 to-emerald-700", rgb: "#10b981" },
  Culture: { bg: "from-amber-500 to-amber-700", rgb: "#f59e0b" },
  Idioms: { bg: "from-rose-500 to-rose-700", rgb: "#f43f5e" },
  Listening: { bg: "from-violet-500 to-violet-700", rgb: "#a855f7" },
  Reading: { bg: "from-cyan-500 to-cyan-700", rgb: "#06b6d4" },
}

export function WheelPage() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinAngle, setSpinAngle] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number] | null>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const { score, incrementScore } = useGameStore()

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const spins = Math.floor(Math.random() * 8) + 8
    const randomIndex = Math.floor(Math.random() * categories.length)
    const newAngle = spins * 360 + randomIndex * 60

    setSpinAngle(newAngle)

    setTimeout(() => {
      setSelectedCategory(categories[randomIndex])
      setShowQuestion(true)
      setIsSpinning(false)
      incrementScore(10) // Increment score by 10 when wheel stops
    }, 4000)
  }

  const handlePlayAgain = () => {
    setShowQuestion(false)
    setSelectedCategory(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8">
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
        className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Card className="p-8 md:p-16 bg-white dark:bg-slate-800 shadow-2xl mb-12 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
          <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto flex items-center justify-center">
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              animate={{ rotate: spinAngle }}
              transition={{ duration: 4, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
              className="drop-shadow-2xl"
            >
              {/* Wheel segments */}
              {categories.map((category, index) => {
                const angle = (index * 360) / categories.length
                const rad = (angle * Math.PI) / 180
                const nextRad = (((index + 1) * 360) / categories.length * Math.PI) / 180
                
                const x1 = 200 + 180 * Math.cos(rad)
                const y1 = 200 + 180 * Math.sin(rad)
                const x2 = 200 + 180 * Math.cos(nextRad)
                const y2 = 200 + 180 * Math.sin(nextRad)
                
                const largeArc = 0 // Fixed largeArc calculation - should be 0 for angles < 180
                const pathData = `M 200 200 L ${x1} ${y1} A 180 180 0 ${largeArc} 1 ${x2} ${y2} Z`

                return (
                  <g key={category}>
                    <path
                      d={pathData}
                      fill={colorMap[category].rgb}
                      stroke="white"
                      strokeWidth="3"
                      opacity="0.95"
                    />
                    <text
                      x={200 + 110 * Math.cos((angle + 30) * (Math.PI / 180))}
                      y={200 + 110 * Math.sin((angle + 30) * (Math.PI / 180))}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="18"
                      fontWeight="bold"
                      className="pointer-events-none drop-shadow-lg"
                    >
                      {category}
                    </text>
                  </g>
                )
              })}

              {/* Center circle */}
              <circle cx="200" cy="200" r="50" fill="white" stroke="#1e293b" strokeWidth="4" />
              <circle cx="200" cy="200" r="40" fill="#1e293b" className="dark:fill-white" />
              <circle cx="200" cy="200" r="20" fill="white" className="dark:fill-slate-800" />
            </motion.svg>

            {/* Pointer */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
              <motion.div
                animate={isSpinning ? { y: [0, -8, 0] } : {}}
                transition={{ duration: 0.3, repeat: isSpinning ? Infinity : 0 }}
                className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-slate-800 dark:border-t-white drop-shadow-2xl"
              />
            </div>
          </div>
        </Card>

        <motion.div
          whileHover={!isSpinning ? { scale: 1.08 } : {}}
          whileTap={!isSpinning ? { scale: 0.92 } : {}}
          className="flex flex-col items-center gap-4"
        >
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg px-16 py-8 rounded-full shadow-2xl border-2 border-red-500 disabled:opacity-70 transition-all"
          >
            <Sparkles className="mr-3 h-6 w-6" />
            {isSpinning ? "SPINNING..." : "SPIN THE WHEEL"}
          </Button>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Try your luck! Click to spin
          </p>
        </motion.div>
      </motion.div>

      {/* Question modal */}
      {showQuestion && selectedCategory && <QuestionModal category={selectedCategory} onPlayAgain={handlePlayAgain} />}
    </main>
  )
}
