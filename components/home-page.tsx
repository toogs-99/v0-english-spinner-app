"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { RotateCcw, BookOpen } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] flex flex-col overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-10 md:px-20 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl w-full"
        >
          {/* HERO TITLE */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1e293b] dark:text-[#f8fafc] leading-tight tracking-tight mb-6 text-balance"
            style={{
              fontSize: "clamp(48px, 5vw, 96px)",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "easeOut", delay: 0 }}
          >
            English Spinner
          </motion.h1>

          {/* SUBTITLE WITH UNDERLINE */}
          <motion.div
            className="space-y-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p
              className="text-[#64748b] dark:text-[#cbd5e1] font-medium"
              style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
            >
              Learn and Play in London!
            </p>
            <motion.div
              className="h-1 bg-[#dc2626] mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#475569] dark:text-[#94a3b8] leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ maxWidth: "600px", margin: "24px auto" }}
          >
            Test your English skills through interactive games inspired by London's culture and charm.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* PRIMARY BUTTON */}
            <Link href="/wheel">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#1e40af] to-[#3b82f6] hover:from-[#1e3a8a] hover:to-[#2563eb] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                whileHover={{ translateY: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  padding: "16px 32px",
                }}
                aria-label="Start spinning the wheel game"
              >
                <RotateCcw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
                Spin the Wheel
              </motion.button>
            </Link>

            {/* SECONDARY BUTTON */}
            <Link href="/translate">
              <motion.button
                className="px-8 py-4 border-2 border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white bg-white dark:bg-[#0f172a] dark:hover:bg-[#dc2626] font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 hover:shadow-lg cursor-pointer"
                whileHover={{ translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  padding: "16px 32px",
                }}
                aria-label="Start translation challenge game"
              >
                <BookOpen className="h-5 w-5" />
                Translate Challenge
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* LONDON SKYLINE CAROUSEL FOOTER */}
      <motion.div
        className="relative w-full flex-shrink-0 overflow-hidden z-0"
        style={{ height: "clamp(120px, 20vh, 400px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <div className="absolute inset-0 top-0 h-24 bg-gradient-to-b from-[#f8fafc] dark:from-[#0f172a] to-transparent pointer-events-none z-10" />

        <motion.div
          className="absolute inset-0 flex items-end justify-start"
          animate={{ x: [0, -50 + "%"] }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {[0, 1].map((index) => (
            <div key={index} className="flex-shrink-0 w-full h-full flex items-end justify-start relative">
              <Image
                src="/london-skyline.png"
                alt={
                  index === 0
                    ? "London skyline silhouette with iconic landmarks including Big Ben, Tower Bridge, and London Eye"
                    : ""
                }
                width={4800}
                height={1200}
                className="h-full w-full object-cover object-bottom opacity-85 dark:opacity-70 filter grayscale-20"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Gradient Overlay at the bottom for visual depth */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8fafc] dark:from-[#0f172a] to-transparent pointer-events-none z-5" />
    </main>
  )
}
