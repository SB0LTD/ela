import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

export function HomePage() {
  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="relative min-h-screen flex items-center px-8 pt-24 pb-16 overflow-hidden">
        {/* Ambient gradient wash */}
        <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 70% 30%, #d7f0f2 0%, #faf8f4 55%)" }} />
        {/* Floating orbs */}
        <motion.div animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -z-10 rounded-full blur-3xl" style={{ top: "10%", left: "5%", width: 340, height: 340, background: "rgba(130,207,215,0.35)" }} />
        <motion.div animate={{ y: [0, 24, 0], scale: [1.05, 1, 1.05] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -z-10 rounded-full blur-3xl" style={{ bottom: "12%", right: "8%", width: 300, height: 300, background: "rgba(217,189,127,0.25)" }} />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center w-full">
          {/* Text */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: "#c9a35f" }}>
              Holistic Wellness
            </motion.p>
            <h1 className="font-serif leading-[1.05] mb-8" style={{ color: "#22505a", fontSize: "clamp(2.75rem, 6vw, 4.75rem)" }}>
              I didn't choose
              <br />
              <span style={{ fontStyle: "italic", color: "#c9a35f" }}>holistic healing.</span>
              <br />
              Life led me there.
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-md" style={{ color: "#4a5f66" }}>
              A whole-person approach to wellbeing — body, mind, nervous system, and the deeper patterns that shape our health.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a href="#story" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ background: "linear-gradient(135deg, #22505a, #2e97a5)", color: "#fff", padding: "16px 38px", borderRadius: "999px", fontSize: "15px", letterSpacing: "0.02em", textDecoration: "none", boxShadow: "0 10px 30px rgba(34,80,90,0.25)" }}>
                My Journey
              </motion.a>
              <motion.a href="#offerings" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ background: "transparent", color: "#22505a", padding: "16px 38px", borderRadius: "999px", fontSize: "15px", letterSpacing: "0.02em", textDecoration: "none", border: "1px solid #82cfd7" }}>
                Work With Me
              </motion.a>
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] -z-10" style={{ background: "linear-gradient(135deg, rgba(130,207,215,0.3), rgba(217,189,127,0.3))", filter: "blur(8px)" }} />
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="overflow-hidden rounded-[2rem] shadow-2xl" style={{ boxShadow: "0 30px 60px rgba(34,80,90,0.3)" }}>
              <img src="/ela.jpeg" alt="Ela" className="w-full h-full object-cover" />
            </motion.div>
            {/* Gold ring accent */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full border -z-10" style={{ borderColor: "rgba(201,163,95,0.4)", borderWidth: 1 }} />
          </motion.div>
        </div>
      </section>

      {/* ═══ Story ═══ */}
      <section id="story" className="px-8 py-32" style={{ background: "#faf8f4" }}>
        <div className="max-w-3xl mx-auto">
          <motion.p {...rise} className="text-center text-sm tracking-[0.3em] uppercase mb-6" style={{ color: "#c9a35f" }}>My Story</motion.p>
          <motion.h2 {...rise} className="font-serif text-center mb-16" style={{ color: "#22505a", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            A journey through illness, into remission
          </motion.h2>

          <div className="space-y-8 text-lg leading-relaxed" style={{ color: "#4a5f66" }}>
            {[
              "About a decade ago, while I was in the middle of recording my music, multiple sclerosis became a major part of my life. What followed changed everything.",
              "Instead of looking at my body through symptoms alone, I began exploring the connections between nutrition, stress, trauma, the nervous system, movement, environment, and the body's ability to restore balance.",
              "My path included nutrition, supplementation, breathwork, meditation, cold exposure, acupuncture, and nervous-system regulation. Eventually, I reached remission — a milestone later reflected in my MRI results.",
              "That experience became the foundation of ElaHealing. Today I live in full remission from multiple sclerosis, without using MS disease-modifying medication.",
            ].map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: i * 0.1 }}>
                {p}
              </motion.p>
            ))}
          </div>

          {/* Pull quote */}
          <motion.blockquote {...rise} className="mt-20 text-center font-serif italic" style={{ color: "#2e97a5", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", lineHeight: 1.4 }}>
            "Holistic wellbeing means looking beyond an isolated symptom, and seeing the person behind it."
          </motion.blockquote>
        </div>
      </section>

      {/* ═══ Approach ═══ */}
      <section id="approach" className="px-8 py-32 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #22505a 0%, #22626e 100%)" }}>
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full blur-3xl" style={{ top: "-10%", right: "-5%", width: 400, height: 400, background: "rgba(130,207,215,0.4)" }} />

        <div className="max-w-5xl mx-auto relative">
          <motion.p {...rise} className="text-center text-sm tracking-[0.3em] uppercase mb-6" style={{ color: "#e8d5a8" }}>The Approach</motion.p>
          <motion.h2 {...rise} className="font-serif text-center text-white mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Every person is different
          </motion.h2>
          <motion.p {...rise} className="text-center max-w-xl mx-auto mb-20 leading-relaxed" style={{ color: "rgba(215,240,242,0.75)" }}>
            There is no single diet, supplement, or routine that is right for everyone. Every body carries its own history, sensitivities, and needs.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "The Whole Person", body: "We look at body, mind, nervous system, lifestyle, nutrition, and emotional wellbeing — together, never in isolation." },
              { title: "The Nervous System", body: "Understanding how trauma, prolonged stress, and life experiences shape the way we feel, physically and emotionally." },
              { title: "Daily Patterns", body: "Creating healthier rhythms, reconnecting with yourself, and finding the combination of practices that support you." },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: i * 0.12 }}
                whileHover={{ y: -6 }} className="rounded-2xl p-8"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(130,207,215,0.2)", backdropFilter: "blur(6px)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(232,213,168,0.15)", border: "1px solid rgba(232,213,168,0.3)" }}>
                  <span style={{ color: "#e8d5a8" }}>{["✦", "○", "◇"][i]}</span>
                </div>
                <h3 className="font-serif text-2xl mb-3 text-white">{c.title}</h3>
                <p className="leading-relaxed text-sm" style={{ color: "rgba(215,240,242,0.7)" }}>{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Offerings ═══ */}
      <section id="offerings" className="px-8 py-32" style={{ background: "#faf8f4" }}>
        <div className="max-w-5xl mx-auto">
          <motion.p {...rise} className="text-center text-sm tracking-[0.3em] uppercase mb-6" style={{ color: "#c9a35f" }}>Work With Me</motion.p>
          <motion.h2 {...rise} className="font-serif text-center mb-20" style={{ color: "#22505a", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Practices that support you
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { t: "Holistic Consultation", d: "A deep, personal exploration of your health story — nutrition, lifestyle, nervous system, and emotional wellbeing." },
              { t: "Nervous-System Regulation", d: "Breathwork, meditation, cold exposure, and practices that help the body find and hold balance." },
              { t: "Nutrition & Lifestyle", d: "Individualized guidance built around your body, sensitivities, and daily rhythm — never one-size-fits-all." },
              { t: "Integrative Wellbeing", d: "Bringing together the practices I discovered on my own path into a framework shaped around you." },
            ].map((o, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ y: -4 }} className="rounded-2xl p-8 flex gap-5"
                style={{ background: "#fff", border: "1px solid rgba(130,207,215,0.25)", boxShadow: "0 8px 24px rgba(34,80,90,0.05)" }}>
                <div className="shrink-0 font-serif text-3xl" style={{ color: "#d9bd7f" }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="font-serif text-2xl mb-2" style={{ color: "#22505a" }}>{o.t}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a5f66" }}>{o.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Music ═══ */}
      <section id="music" className="px-8 py-32 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #d7f0f2, #f0fafb)" }}>
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.p {...rise} className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: "#c9a35f" }}>And Then There Is Music</motion.p>
          <motion.h2 {...rise} className="font-serif mb-10" style={{ color: "#22505a", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            My journey began with a voice
          </motion.h2>
          <motion.div {...rise} className="space-y-6 text-lg leading-relaxed" style={{ color: "#4a5f66" }}>
            <p>Long before ElaHealing existed, I was a singer-songwriter and music creator. My MS emerged in the middle of one of the most important creative periods of my life.</p>
            <p>Music was there before the illness. It remained through the hardest years. And it is still part of my life today.</p>
            <p>Over time, my healing journey and my creative journey became deeply intertwined — both taught me to listen more closely to my body, my intuition, and my own voice.</p>
          </motion.div>
          {/* Animated sound waves */}
          <motion.div {...rise} className="flex items-end justify-center gap-1.5 mt-14 h-16">
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.span key={i}
                animate={{ height: [`${10 + (i % 5) * 8}%`, `${40 + (i % 7) * 8}%`, `${10 + (i % 5) * 8}%`] }}
                transition={{ duration: 1.2 + (i % 4) * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                className="w-1 rounded-full" style={{ background: "linear-gradient(to top, #2e97a5, #c9a35f)" }} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ Contact ═══ */}
      <section id="contact" className="px-8 py-32" style={{ background: "#faf8f4" }}>
        <div className="max-w-xl mx-auto text-center">
          <motion.p {...rise} className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: "#c9a35f" }}>Begin Your Journey</motion.p>
          <motion.h2 {...rise} className="font-serif mb-4" style={{ color: "#22505a", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Let's connect
          </motion.h2>
          <motion.p {...rise} className="mb-12 leading-relaxed" style={{ color: "#4a5f66" }}>
            Share a little about yourself and what you're seeking. I'll personally reach out.
          </motion.p>
          <motion.div {...rise}>
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  );
}
