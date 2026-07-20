"use client";

import { motion, type Variants } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaCat, FaHeart, FaUsers, FaHome } from "react-icons/fa";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function AboutContactPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold mb-4"
          >
            About <span className="text-yellow-300">&</span> Contact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-emerald-100 max-w-xl mx-auto"
          >
            Learn about our mission and get in touch with the team.
          </motion.p>
        </div>
      </section>

      {/* About section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">About Peyaraful</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We connect rescued cats with loving forever homes through a simple, transparent adoption process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaCat />, title: "Rescue & Rehab", desc: "We rescue stray and abandoned cats, provide medical care, and nurse them back to health." },
              { icon: <FaHeart />, title: "Adoption First", desc: "Every cat on our platform is looking for a permanent, loving family to call home." },
              { icon: <FaUsers />, title: "Community Driven", desc: "Stories, tips, and shared experiences from our growing community of cat lovers." },
              { icon: <FaHome />, title: "Forever Homes", desc: "We follow up with adopters to ensure every cat stays safe, happy, and healthy." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mission statement */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
            className="mt-12 bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              To reduce the stray cat population by making adoption accessible, affordable, and joyful.
              Every cat deserves a warm bed, good food, and a family that loves them — and we are here to
              make that happen, one adoption at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Get in Touch</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Have questions about adoption, volunteering, or partnerships? We would love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>

              <div className="space-y-4">
                <a
                  href="mailto:arakash022@gmail.com"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-lg group-hover:bg-emerald-200 transition-colors">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">arakash022@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://github.com/PeyaraFul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-lg group-hover:bg-gray-300 transition-colors">
                    <FaGithub />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">GitHub</p>
                    <p className="font-medium text-gray-900">github.com/PeyaraFul</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/md-akash-mia-bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg group-hover:bg-blue-200 transition-colors">
                    <FaLinkedin />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">LinkedIn</p>
                    <p className="font-medium text-gray-900">md-akash-mia-bd</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={1}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                  const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                  const subject = encodeURIComponent(`Contact from ${name}`);
                  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
                  window.open(`mailto:arakash022@gmail.com?subject=${subject}&body=${body}`);
                  form.reset();
                }}
                className="bg-gray-50 rounded-2xl p-6 space-y-4"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Send a Message</h3>

                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-emerald-50 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to find your new best friend?</h2>
          <p className="text-gray-500 mb-6">Browse our available cats and start your adoption journey today.</p>
          <Link
            href="/cats"
            className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-colors"
          >
            Browse Cats
          </Link>
        </div>
      </section>
    </>
  );
}
