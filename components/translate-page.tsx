"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGameStore } from "@/lib/game-store"
import { translationPhrases } from "@/lib/game-data"
import { TranslationFeedback } from "./translation-feedback"

export function TranslatePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userTranslation, setUserTranslation] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const { score, increment } = useGameStore()

  const currentPhrase = translationPhrases[currentIndex]

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
  }

  const handleCheckTranslation = () => {
    const normalized = normalizeText(userTranslation)
    const expectedOptions = currentPhrase.expected.map(normalizeText)
    const correct = expectedOptions.some((expected) => expected === normalized)
    setIsCorrect(correct)
    setShowFeedback(true)
    if (correct) increment()
  }

  const handleNextPhrase = () => {
    if (currentIndex < translationPhrases.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserTranslation("")
      setShowFeedback(false)
      setIsCorrect(false)
    } else {
      setCurrentIndex(0)
      setUserTranslation("")
      setShowFeedback(false)
      setIsCorrect(false)
    }
  }

  const progress = ((currentIndex + 1) / translationPhrases.length) * 100

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8 max-w-4xl mx-auto"
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

      {/* Progress bar */}
      <motion.div
        className="max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between mb-2">
          <p className="text-sm font-semibold text-foreground/60">
            Phrase {currentIndex + 1} of {translationPhrases.length}
          </p>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Main card */}
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-white dark:bg-slate-800 max-w-2xl w-full p-8 md:p-12 shadow-2xl">
          {/* English sentence */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-foreground/60 mb-3">English Sentence:</p>
            <p className="text-xl md:text-2xl font-bold text-primary leading-relaxed text-balance">
              {currentPhrase.sentence}
            </p>
          </div>

          {/* Translation input */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-foreground/60 mb-3">Type the Portuguese translation:</p>
            <textarea
              value={userTranslation}
              onChange={(e) => setUserTranslation(e.target.value)}
              disabled={showFeedback}
              placeholder="Escreva a tradução em português..."
              className="w-full p-4 rounded-lg border-2 border-border bg-background text-foreground placeholder-foreground/40 font-medium focus:outline-none focus:border-primary disabled:opacity-50 min-h-24 resize-none"
            />
          </div>

          {/* Feedback */}
          {showFeedback && <TranslationFeedback isCorrect={isCorrect} expectedTranslations={currentPhrase.expected} />}

          {/* Action buttons */}
          <div className="flex gap-4">
            {!showFeedback ? (
              <Button
                onClick={handleCheckTranslation}
                disabled={!userTranslation.trim()}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                Check Translation
              </Button>
            ) : (
              <Button
                onClick={handleNextPhrase}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
              >
                {currentIndex === translationPhrases.length - 1 ? "Start Over" : "Next Phrase"}
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </main>
  )
}
