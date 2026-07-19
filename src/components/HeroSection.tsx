"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1600&q=80",
    title: "Find Your Perfect",
    highlight: "Cat Companion",
    subtitle: "Open your heart and home to a cat in need. Browse adoptable cats, read their stories, and give them a loving forever home.",
  },
  {
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1600&q=80",
    title: "Every Cat Deserves",
    highlight: "A Loving Home",
    subtitle: "Hundreds of adorable cats are waiting for you. Start your adoption journey today and change a life forever.",
  },
  {
    image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=1600&q=80",
    title: "Adopt, Love,",
    highlight: "Repeat",
    subtitle: "Join our community of cat lovers. Discover heartwarming stories and find your new best friend.",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const router = useRouter();

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const q = (form.elements.namedItem("heroSearch") as HTMLInputElement).value.trim();
    router.push(`/cats${q ? `?search=${encodeURIComponent(q)}` : ""}`);
  };

  const slide = SLIDES[current];

  return (
    <section className="relative h-[65vh] min-h-[480px] max-h-[720px] overflow-hidden">
      {/* Background images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {slide.title}
                <span className="block text-yellow-400">{slide.highlight}</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-lg">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Search form */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center bg-white/15 backdrop-blur-md rounded-xl overflow-hidden max-w-lg border border-white/20"
          >
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                name="heroSearch"
                type="text"
                placeholder="Search cats by name or breed..."
                className="w-full pl-11 pr-4 py-4 bg-transparent text-white placeholder-gray-300 focus:outline-none text-base"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold transition-colors text-base whitespace-nowrap"
            >
              Search
            </button>
          </motion.form>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex gap-4 mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/cats")}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-colors"
            >
              Browse Cats
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/stories")}
              className="px-8 py-3 border-2 border-white/60 text-white hover:bg-white/10 font-semibold rounded-xl transition-colors"
            >
              Success Stories
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Slide arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-yellow-400 scale-110" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white/70"
      >
        <FaChevronDown size={20} />
      </motion.div>
    </section>
  );
}
