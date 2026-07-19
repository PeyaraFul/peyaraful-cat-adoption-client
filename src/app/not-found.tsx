"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaSearch, FaCat } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-lg">
        {/* Animated cat icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <FaCat className="text-6xl text-emerald-600" />
            </div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl font-extrabold text-emerald-800">?</span>
            </motion.div>
          </div>
        </motion.div>

        {/* 404 number */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-8xl font-extrabold text-emerald-600 mb-2 leading-none"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-2xl font-bold text-gray-800 mb-3"
        >
          Page not found
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-gray-500 mb-8"
        >
          Looks like this cat wandered off the page. Let us help you find your
          way back.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-colors"
            >
              <FaHome /> Go Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/cats"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-xl transition-colors"
            >
              <FaSearch /> Browse Cats
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
