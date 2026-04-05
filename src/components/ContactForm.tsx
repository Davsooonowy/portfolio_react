import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const schema = z.object({
  name: z.string().min(2, "At least 2 characters").max(80, "Too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  subject: z
    .string()
    .min(4, "At least 4 characters")
    .max(120, "Too long"),
  message: z
    .string()
    .min(20, "At least 20 characters")
    .max(2000, "Max 2000 characters")
    .refine(
      (val) => val.trim().split(/\s+/).filter(Boolean).length >= 5,
      "Please write at least 5 words"
    ),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputClass =
  "w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent transition-colors duration-150";

export const ContactForm = ({ open, onOpenChange }: ContactFormProps) => {
  const [status, setStatus] = useState<Status>("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const messageValue = watch("message") ?? "";
  const messageLen = messageValue.length;

  const onSubmit = async (data: FormData) => {
    if (!turnstileToken) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setTurnstileKey((k) => k + 1);
        setTurnstileToken(null);
      }
    } catch {
      setStatus("error");
      setTurnstileKey((k) => k + 1);
      setTurnstileToken(null);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setStatus("idle");
      reset();
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0">
        <div className="p-8">
          <DialogHeader className="mb-7">
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Send a message
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1.5">
              I'll get back to you as soon as possible.
            </p>
          </DialogHeader>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <CheckCircle2 size={44} className="text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-lg font-semibold text-foreground">Message sent!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Thanks for reaching out — I'll be in touch soon.
                </p>
              </div>
              <button
                onClick={() => handleOpenChange(false)}
                className="mt-2 h-10 px-7 rounded-full bg-accent text-accent-foreground text-sm font-medium transition-transform active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-muted-foreground tracking-[0.12em] uppercase">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-muted-foreground tracking-[0.12em] uppercase">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-muted-foreground tracking-[0.12em] uppercase">
                  Subject
                </label>
                <input
                  {...register("subject")}
                  placeholder="What's this about?"
                  className={inputClass}
                />
                {errors.subject && (
                  <p className="text-[11px] text-destructive">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-muted-foreground tracking-[0.12em] uppercase">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="What's on your mind?"
                  className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent resize-none transition-colors duration-150"
                />
                <div className="flex justify-between items-center">
                  {errors.message ? (
                    <p className="text-[11px] text-destructive">{errors.message.message}</p>
                  ) : (
                    <span />
                  )}
                  <span className={`text-[11px] tabular-nums ${messageLen > 1800 ? "text-destructive" : "text-muted-foreground"}`}>
                    {messageLen}/2000
                  </span>
                </div>
              </div>

              <Turnstile
                key={turnstileKey}
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                onSuccess={setTurnstileToken}
                onExpire={() => setTurnstileToken(null)}
                options={{ theme: "auto", size: "normal" }}
              />

              {status === "error" && (
                <div className="flex items-center gap-2 text-destructive text-xs">
                  <AlertCircle size={13} />
                  Something went wrong — please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !turnstileToken || !isValid}
                className="w-full h-11 rounded-full bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <span className="w-4 h-4 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
                ) : (
                  <>
                    <Send size={13} />
                    Send message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
