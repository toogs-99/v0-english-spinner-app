"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGameStore } from "@/lib/game-store"
import { QuestionModal } from "./question-modal"

const categories = ["Grammar", "Vocabulary", "Culture", "Idioms", "Listening", "Reading"] as const

const colorMap = {
  Grammar: "#3b82f6",
  Vocabulary: "#10b981",
  Culture: "#f59e0b",
  Idioms: "#f43f5e",
  Listening: "#a855f7",
  Reading: "#06b6d4",
}

export function WheelPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinAngle, setSpinAngle] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number] | null>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const { score, incrementScore } = useGameStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 150

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate((spinAngle * Math.PI) / 180)
    ctx.translate(-centerX, -centerY)

    categories.forEach((category, index) => {
      const angle = (index * 360) / categories.length
      const startAngle = (angle * Math.PI) / 180
      const endAngle = (((angle + 60) * Math.PI) / 180)

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.lineTo(centerX, centerY)
      ctx.fillStyle = colorMap[category]
      ctx.fill()
      ctx.strokeStyle = "white"
      ctx.lineWidth = 3
      ctx.stroke()

      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + (30 * Math.PI) / 180)
      ctx.textAlign = "right"
      ctx.fillStyle = "white"
      ctx.font = "bold 16px sans-serif"
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
      ctx.shadowBlur = 4
      ctx.fillText(category, radius - 30, 5)
      ctx.restore()
    })

    ctx.beginPath()
    ctx.arc(centerX, centerY, 50, 0, Math.PI * 2)
    ctx.fillStyle = "white"
    ctx.fill()
    ctx.strokeStyle = "#1e293b"
    ctx.lineWidth = 4
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2)
    ctx.fillStyle = "#1e293b"
    ctx.fill()

    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "white"
    ctx.fill()

    ctx.restore()
  }, [spinAngle])

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const spins = Math.floor(Math.random() * 8) + 8
    const randomIndex = Math.floor(Math.random() * categories.length)
    const newAngle = spins * 360 + randomIndex * 60

    let currentAngle = spinAngle
    const startTime = Date.now()
    const duration = 4000
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)

      setSpinAngle(spinAngle + (newAngle - spinAngle) * eased)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setSelectedCategory(categories[randomIndex])
        setShowQuestion(true)
        setIsSpinning(false)
        incrementScore(10)
      }
    }

    requestAnimationFrame(animate)
  }

  const handlePlayAgain = () => {
    setShowQuestion(false)
    setSelectedCategory(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8">
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

      <motion.div
        className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Card className="p-8 md:p-16 bg-white dark:bg-slate-800 shadow-2xl mb-12 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
          <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="drop-shadow-2xl w-full h-full"
            />

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

      {showQuestion && selectedCategory && <QuestionModal category={selectedCategory} onPlayAgain={handlePlayAgain} />}
    </main>
  )
}
