import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const BARS = 32;

export function MusicWave() {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = el.currentTime || 0;
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const stop = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) stop();
    else play();
  }, [playing, play, stop]);

  return (
    <div className="flex flex-col items-center mt-14">
      <audio ref={audioRef} src="/music.mp3" preload="auto" onEnded={() => setPlaying(false)} />

      {/* Hover / tap the waves to listen */}
      <button
        type="button"
        onMouseEnter={play}
        onMouseLeave={stop}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="group flex items-end justify-center gap-1.5 h-20 px-6 cursor-pointer"
        style={{ background: "transparent", border: "none" }}
      >
        {Array.from({ length: BARS }).map((_, i) => {
          const base = 10 + (i % 5) * 8;
          const peak = 40 + (i % 7) * 8;
          return (
            <motion.span
              key={i}
              animate={
                playing
                  ? { height: [`${base}%`, `${100}%`, `${base + 20}%`, `${peak}%`, `${base}%`] }
                  : { height: [`${base}%`, `${peak}%`, `${base}%`] }
              }
              transition={{
                duration: playing ? 0.5 + (i % 5) * 0.12 : 1.2 + (i % 4) * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.04,
              }}
              className="w-1 rounded-full"
              style={{
                background: "linear-gradient(to top, #2e97a5, #c9a35f)",
                opacity: playing ? 1 : 0.75,
              }}
            />
          );
        })}
      </button>

      {/* Hint / now playing */}
      <motion.div
        className="flex items-center gap-2 mt-5 text-sm tracking-wide"
        animate={{ opacity: 1 }}
        style={{ color: "#4a5f66" }}
      >
        <motion.span
          animate={playing ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ duration: 1, repeat: playing ? Infinity : 0 }}
          style={{ color: "#2e97a5", display: "inline-flex" }}
        >
          {playing ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </motion.span>
        {playing ? t("music.playing") : t("music.hint")}
      </motion.div>
    </div>
  );
}
