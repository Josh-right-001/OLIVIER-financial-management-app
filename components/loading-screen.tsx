"use client"

import { Logo } from "./logo"
import { motion } from "framer-motion"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="flex flex-col items-center gap-4"
      >
        <Logo variant="transparent" size="xl" />
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="h-3 w-3 rounded-full bg-primary"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
          />
          <motion.div
            className="h-3 w-3 rounded-full bg-secondary"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
          />
          <motion.div
            className="h-3 w-3 rounded-full bg-accent"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
          />
        </motion.div>
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </motion.div>
    </div>
  )
}
