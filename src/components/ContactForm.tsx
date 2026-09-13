import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";

export function ContactForm() {
  const { t } = useTranslation();
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: string, v: string) => setData((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name.trim() || !data.email.trim()) return;
    setSubmitting(true);
    try {
      const db = getFirestore(app);
      await addDoc(collection(db, "inquiries"), { ...data, createdAt: new Date().toISOString(), status: "new" });
    } catch (err) {
      console.error(err);
      const pending = JSON.parse(localStorage.getItem("pending_inquiries") || "[]");
      pending.push({ ...data, createdAt: new Date().toISOString() });
      localStorage.setItem("pending_inquiries", JSON.stringify(pending));
    }
    setDone(true);
    setSubmitting(false);
  };

  const field: React.CSSProperties = {
    width: "100%", padding: "17px 20px", borderRadius: "14px", fontSize: "15px",
    border: "1px solid rgba(130,207,215,0.4)", background: "#fff", outline: "none",
    fontFamily: "inherit", color: "#22505a",
  };

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(130,207,215,0.2)" }}>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#2e97a5" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </motion.div>
          <h3 className="font-serif text-2xl mb-2" style={{ color: "#22505a" }}>{t("contact.thanksTitle")}</h3>
          <p style={{ color: "#4a5f66" }}>{t("contact.thanksBody")}</p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} className="space-y-5 text-left" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <input style={field} placeholder={t("contact.name")} value={data.name} onChange={(e) => set("name", e.target.value)}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#2e97a5"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(46,151,165,0.08)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(130,207,215,0.4)"; e.currentTarget.style.boxShadow = "none"; }} />
          <input style={field} type="email" placeholder={t("contact.email")} value={data.email} onChange={(e) => set("email", e.target.value)}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#2e97a5"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(46,151,165,0.08)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(130,207,215,0.4)"; e.currentTarget.style.boxShadow = "none"; }} />
          <textarea style={{ ...field, minHeight: 120, resize: "vertical" }} placeholder={t("contact.message")} value={data.message} onChange={(e) => set("message", e.target.value)}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#2e97a5"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(46,151,165,0.08)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(130,207,215,0.4)"; e.currentTarget.style.boxShadow = "none"; }} />
          <motion.button type="submit" disabled={submitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ width: "100%", padding: "18px", borderRadius: "999px", border: "none", cursor: "pointer", fontSize: "15px", letterSpacing: "0.03em", color: "#fff",
              background: "linear-gradient(135deg, #22505a, #2e97a5)", boxShadow: "0 10px 30px rgba(34,80,90,0.25)", opacity: submitting ? 0.7 : 1, marginTop: "8px" }}>
            {submitting ? t("contact.sending") : t("contact.send")}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
