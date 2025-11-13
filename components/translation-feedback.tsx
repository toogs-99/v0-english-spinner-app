"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

interface TranslationFeedbackProps {
  isCorrect: boolean
  expectedTranslations: string[]
}

export function TranslationFeedback({ isCorrect, expectedTranslations }: TranslationFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`p-6 rounded-lg mb-8 flex gap-4 ${
        isCorrect
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      }`}
    >
      <div className="flex-shrink-0">
        {isCorrect ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
      </div>
      <div className="flex-grow">
        <p className="font-bold text-lg mb-2">{isCorrect ? "✨ Correct!" : "💡 Not quite right"}</p>
        {isCorrect ? (
          <p>Great job! Your translation is correct.</p>
        ) : (
          <div>
            <p className="mb-2">Expected translation:</p>
            <ul className="list-disc list-inside space-y-1">
              {expectedTranslations.map((translation, i) => (
                <li key={i}>{translation}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  )
}
