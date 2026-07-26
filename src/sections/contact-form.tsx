"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, Mail, Phone, User, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const inputClass = "w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-400/40 transition-colors";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        setError("Contact form is not configured yet.");
        return;
      }
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, access_key: accessKey }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSubmitted(true);
      reset();
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-10 sm:p-14 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={32} className="text-emerald-400" />
        </motion.div>
        <h3 className="text-xl font-medium text-white mb-2">Message Sent!</h3>
        <p className="text-white/50 text-sm max-w-sm mx-auto">Thank you for reaching out. I&apos;ll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="relative">
          <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            {...register("name")}
            placeholder="Your Name *"
            className={cn(inputClass, "pl-9")}
          />
          {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name.message}</p>}
        </div>
        <div className="relative">
          <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            {...register("email")}
            placeholder="Your Email *"
            className={cn(inputClass, "pl-9")}
          />
          {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="relative">
          <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            {...register("phone")}
            placeholder="Phone (optional)"
            className={cn(inputClass, "pl-9")}
          />
        </div>
        <div className="relative">
          <MessageSquare size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            {...register("subject")}
            placeholder="Subject *"
            className={cn(inputClass, "pl-9")}
          />
          {errors.subject && <p className="text-xs text-red-400 mt-1.5">{errors.subject.message}</p>}
        </div>
      </div>

      <div>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Your Message *"
          className={cn(inputClass, "resize-none")}
        />
        {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message.message}</p>}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-300/90 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-300 disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
