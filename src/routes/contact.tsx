import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send, CheckCircle2, Loader2, Clock, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHead } from "@/components/site/PageHead";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { createServerFn } from "@tanstack/react-start";

const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; subject: string; message: string }) => data)
  .handler(async ({ data }) => {
    const timestamp = new Date().toISOString();
    const messageId = Math.random().toString(36).substring(2, 11);

    
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const messagesFilePath = path.join(process.cwd(), "messages.json");
      let messages: any[] = [];
      try {
        const fileContent = await fs.readFile(messagesFilePath, "utf8");
        messages = JSON.parse(fileContent);
      } catch (_) {
        
      }
      messages.push({ id: messageId, timestamp, ...data });
      await fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), "utf8");
      console.log(`[Server] Saved message ${messageId} to messages.json`);
    } catch (err) {
      console.error("[Server] Local save error:", err);
    }

    
    const accessKey = process.env.WEB3FORMS_KEY;

    if (!accessKey) {
      console.warn(
        `[Server] WEB3FORMS_KEY not set. Message ${messageId} saved locally but no email sent. Get your free key at https://web3forms.com`
      );
      return {
        success: true,
        message: "Your message has been saved! ✅ (Email delivery activates once the site is fully deployed.)",
      };
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Portfolio] ${data.subject}`,
          from_name: data.name,
          replyto: data.email,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      const responseText = await response.text();
      console.log(`[Server] Web3Forms response (${response.status}):`, responseText.substring(0, 300));

      let result: any;
      try {
        result = JSON.parse(responseText);
      } catch {
        console.error("[Server] Web3Forms returned non-JSON:", responseText.substring(0, 500));
        return {
          success: false,
          message: "Email service returned an unexpected response. Your message was saved locally.",
        };
      }

      if (result.success) {
        console.log(`[Server] Email sent for message ${messageId} via Web3Forms`);
        return {
          success: true,
          message: "Message sent successfully! ✉️ I've received your email and will respond within 24 hours.",
        };
      } else {
        console.error("[Server] Web3Forms error:", result);
        return {
          success: false,
          message: result.message || "Something went wrong sending your message. Please try again.",
        };
      }
    } catch (err) {
      console.error("[Server] Email sending error:", err);
      return {
        success: false,
        message: "Network error while sending your message. Please try again later.",
      };
    }
  });

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Gowsic M S" },
      { name: "description", content: "Reach Gowsic M S at msgowsicneuro@gmail.com or +91 9345190151 — open to internships and collaborations." },
      { property: "og:title", content: "Contact — Gowsic M S" },
      { property: "og:description", content: "Let's build something together." },
    ],
  }),
  component: Contact,
});


function FloatingInput({
  label, name, type = "text", placeholder, value, onChange, required = true,
}: {
  label: string; name: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className={`pointer-events-none absolute left-4 transition-all duration-200 ease-out font-mono-accent ${
          isActive
            ? "top-2 text-[10px] uppercase tracking-widest text-emerald-400"
            : "top-1/2 -translate-y-1/2 text-sm text-white/40"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={isActive ? placeholder : ""}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl bg-black/20 px-4 pb-3 pt-7 text-sm text-white outline-none transition-all border"
        style={{
          borderColor: focused ? "rgba(74,222,128,0.45)" : "rgba(255,255,255,0.06)",
          boxShadow: focused ? "0 0 20px rgba(74,222,128,0.08)" : "none",
        }}
      />
    </div>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [msgFocused, setMsgFocused] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const msgActive = msgFocused || form.message.length > 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      
      const response = await fetch("https://formspree.io/f/mbdnrwnk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _replyto: form.email,
          _subject: `[Portfolio] ${form.subject}`,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setServerMessage("Message sent successfully! ✉️ I've received your email and will respond within 24 hours.");
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setServerMessage(result.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setServerMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <section className="min-h-screen px-6 pt-28 pb-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <PageHead label="contact">
            Let's build something{" "}
            <em className="font-serif-accent aurora-text">together</em>
          </PageHead>
          <p className="mt-4 max-w-md text-sm text-white/60">
            Open to internships, collaborations, freelance work, and interesting projects. Drop a message — I respond fast.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Left — contact info */}
          <ScrollReveal variant="swipeRight" delay={0.05}>
            <div className="flex flex-col gap-4">
              {[
                { Icon: Mail, label: "Email", value: "msgowsicneuro@gmail.com", href: "mailto:msgowsicneuro@gmail.com", color: "text-emerald-400" },
                { Icon: Phone, label: "Phone", value: "+91 9345190151", href: "tel:+919345190151", color: "text-blue-400" },
                { Icon: MapPin, label: "Location", value: "Coimbatore, Tamil Nadu, India", color: "text-purple-400" },
              ].map(({ Icon, label, value, href, color }, i) => {
                const Body = (
                  <div className="flex items-center gap-4">
                    <motion.span
                      className={`liquid-glass flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}
                      whileHover={{ rotate: 10, scale: 1.12, transition: { duration: 0.18 } }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.span>
                    <div>
                      <p className="font-mono-accent text-[10px] uppercase tracking-widest text-white/40">{label}</p>
                      <p className="text-sm text-white/85">{value}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <motion.a
                    key={label}
                    href={href}
                    className="liquid-glass-strong rounded-3xl p-5 block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.2 } }}
                  >
                    {Body}
                  </motion.a>
                ) : (
                  <motion.div
                    key={label}
                    className="liquid-glass-strong rounded-3xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                  >
                    {Body}
                  </motion.div>
                );
              })}

              {/* Social links */}
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    Icon: Github,
                    label: "GitHub",
                    desc: "Explore my repositories",
                    href: "https://github.com/gowsicms45",
                    color: "hover:text-white hover:border-white/20",
                    iconColor: "text-white/80",
                  },
                  {
                    Icon: Linkedin,
                    label: "LinkedIn",
                    desc: "Expand our network",
                    href: "https://www.linkedin.com/in/gowsic-m-s-ngp-727a192ba",
                    color: "hover:text-blue-400 hover:border-blue-400/20",
                    iconColor: "text-blue-400",
                  },
                ].map(({ Icon, label, desc, href, color, iconColor }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={label}
                    className={`liquid-glass-strong flex flex-col items-center justify-center text-center gap-1.5 rounded-2xl p-5 border border-white/5 text-white/70 transition-all ${color}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.52 + i * 0.1, type: "spring", stiffness: 300, damping: 18 }}
                    whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                    <span className="font-mono-accent text-[11px] font-semibold uppercase tracking-wider text-white">{label}</span>
                    <span className="text-[10px] text-white/45 leading-tight">{desc}</span>
                  </motion.a>
                ))}
              </div>

              {/* Availability card */}
              <motion.div
                className="liquid-glass-strong rounded-3xl p-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400 pulse-dot" />
                  <p className="text-sm font-medium text-white">Currently Available</p>
                </div>
                <p className="mt-2 font-mono-accent text-[10px] uppercase tracking-widest text-white/50">
                  Open to internships · Remote friendly
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-white/45">
                  <Clock className="h-3 w-3 text-emerald-400" />
                  Usually responds within 24 hours
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-white/45">
                  <Zap className="h-3 w-3 text-blue-400" />
                  Timezone: IST (UTC+5:30)
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right — form */}
          <ScrollReveal variant="tiltIn" delay={0.1}>
            <div className="liquid-glass-strong rounded-3xl p-8 bg-gradient-to-br from-emerald-500/8 to-teal-500/4">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    className="relative flex flex-col items-center justify-center py-10 text-center overflow-hidden min-h-[420px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Radial glow backdrop */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.2 }}
                      style={{
                        background: "radial-gradient(circle at 50% 40%, rgba(52,211,153,0.12) 0%, rgba(20,184,166,0.06) 35%, transparent 70%)",
                      }}
                    />

                    {/* Orbiting particles */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={`orbit-${i}`}
                        className="absolute rounded-full"
                        style={{
                          width: i % 3 === 0 ? 6 : 4,
                          height: i % 3 === 0 ? 6 : 4,
                          background: i % 2 === 0
                            ? "rgba(52,211,153,0.8)"
                            : "rgba(96,165,250,0.6)",
                          top: "40%",
                          left: "50%",
                          filter: "blur(0.5px)",
                        }}
                        initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1.2, 0.8, 0],
                          x: Math.cos((i / 12) * Math.PI * 2) * (60 + (i % 3) * 25),
                          y: Math.sin((i / 12) * Math.PI * 2) * (60 + (i % 3) * 25),
                          opacity: [0, 1, 0.8, 0],
                        }}
                        transition={{ type: "tween", duration: 1.2, delay: 0.1 + i * 0.06, ease: "easeOut" }}
                      />
                    ))}

                    {/* Expanding pulse rings */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={`ring-${i}`}
                        className="absolute rounded-full border pointer-events-none"
                        style={{
                          top: "40%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          borderColor: i === 0 ? "rgba(52,211,153,0.3)" : i === 1 ? "rgba(52,211,153,0.15)" : "rgba(96,165,250,0.1)",
                        }}
                        initial={{ width: 0, height: 0, opacity: 1 }}
                        animate={{ width: 140 + i * 50, height: 140 + i * 50, opacity: 0 }}
                        transition={{ duration: 1.5, delay: 0.2 + i * 0.25, ease: "easeOut" }}
                      />
                    ))}

                    {/* Checkmark icon with bounce */}
                    <motion.div
                      className="relative z-10"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.7, type: "spring", stiffness: 260, damping: 18 }}
                    >
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ background: "rgba(52,211,153,0.2)", filter: "blur(16px)" }}
                          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.8, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <CheckCircle2 className="relative h-20 w-20 text-emerald-400 drop-shadow-[0_0_24px_rgba(52,211,153,0.5)]" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="relative z-10 mt-6 text-2xl font-semibold text-white"
                      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                    >
                      Message Delivered
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ rotate: [0, 14, -8, 0] }}
                        transition={{ type: "tween", delay: 0.8, duration: 0.6, ease: "easeInOut" }}
                      >
                        ✦
                      </motion.span>
                    </motion.h3>

                    {/* Subtitle */}
                    <motion.p
                      className="relative z-10 mt-2 text-sm text-white/55 max-w-[280px] leading-relaxed"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.45 }}
                    >
                      {serverMessage || "Your message is on its way. I'll get back to you soon!"}
                    </motion.p>

                    {/* What-happens-next timeline */}
                    <motion.div
                      className="relative z-10 mt-8 flex flex-col gap-3 w-full max-w-[260px]"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.7 } },
                      }}
                    >
                      {[
                        { icon: "✉️", text: "Email delivered to inbox" },
                        { icon: "👀", text: "I'll review your message" },
                        { icon: "⚡", text: "Reply within 24 hours" },
                      ].map(({ icon, text }, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-3 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] px-4 py-2.5"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <span className="text-base shrink-0">{icon}</span>
                          <span className="text-xs text-white/65 text-left">{text}</span>
                          <motion.div
                            className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400/70 shrink-0"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                          />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Send another button */}
                    <motion.button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="relative z-10 liquid-glass mt-8 rounded-full px-7 py-2.5 text-xs font-medium text-white/80 hover:text-white transition-all cursor-pointer border border-white/[0.08] hover:border-emerald-400/30"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.4 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 16px rgba(52,211,153,0.15)" }}
                      whileTap={{ scale: 0.96 }}
                    >
                      Send Another Message →
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h2 className="mb-6 text-lg font-medium text-white">Send a Message</h2>

                    <FloatingInput
                      label="Name" name="name" placeholder="Your full name"
                      value={form.name} onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <FloatingInput
                      label="Email" name="email" type="email" placeholder="your@email.com"
                      value={form.email} onChange={(v) => setForm({ ...form, email: v })}
                    />
                    <FloatingInput
                      label="Subject" name="subject" placeholder="What's this about?"
                      value={form.subject} onChange={(v) => setForm({ ...form, subject: v })}
                    />

                    {/* Textarea with floating label */}
                    <div className="relative">
                      <label
                        className={`pointer-events-none absolute left-4 transition-all duration-200 ease-out font-mono-accent ${
                          msgActive
                            ? "top-2 text-[10px] uppercase tracking-widest text-emerald-400"
                            : "top-4 text-sm text-white/40"
                        }`}
                      >
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder={msgActive ? "Tell me about your project..." : ""}
                        value={form.message}
                        onFocus={() => setMsgFocused(true)}
                        onBlur={() => setMsgFocused(false)}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full resize-none rounded-2xl bg-black/20 px-4 pb-3 pt-7 text-sm text-white outline-none transition-all border"
                        style={{
                          borderColor: msgFocused ? "rgba(74,222,128,0.45)" : "rgba(255,255,255,0.06)",
                          boxShadow: msgFocused ? "0 0 20px rgba(74,222,128,0.08)" : "none",
                        }}
                      />
                    </div>

                    {status === "error" && (
                      <motion.p
                        className="text-xs text-red-400"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        Failed to submit. Please try again.
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      className="liquid-glass-strong mt-2 flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-medium text-white disabled:opacity-50 cursor-pointer"
                      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(74,222,128,0.2)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {status === "loading" ? (
                        <>Sending... <Loader2 className="h-4 w-4 animate-spin text-emerald-400" /></>
                      ) : (
                        <>
                          Send Message
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Send className="h-4 w-4 text-emerald-400" />
                          </motion.span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
