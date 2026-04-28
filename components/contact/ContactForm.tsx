"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Three fields, all rounded boxes per Figma 184:6947 / 184:6984. Default
// state is `--brand-light-gray` (no visible border); focus brightens the bg
// to white and brings in a 1px brand-black border. Border lives on the input
// in default-transparent form so toggling it on focus doesn't shift layout.

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const inputBase =
  "w-full rounded-sm border border-transparent bg-brand-light-gray px-3 py-2 text-p1 text-brand-black placeholder:text-brand-dark-gray placeholder:opacity-70 outline-none transition-colors focus:bg-brand-white focus:border-brand-black";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-8">
      <Field label="Name" error={errors.name?.message}>
        <input
          type="text"
          autoComplete="name"
          placeholder="Enter your name"
          className={inputBase}
          {...register("name", { required: "Name is required" })}
        />
      </Field>

      <Field label="Email Address" error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          placeholder="Your Email Address"
          className={inputBase}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
              message: "Enter a valid email",
            },
          })}
        />
      </Field>

      <Field
        label="Message"
        error={errors.message?.message}
        helper={
          "A few icebreakers: What's about your business that keeps you up at night? How would you define success for your project? What's getting in the way of it? If you don't fix this problem, how long can you manage the current situation of your business? I could go on and on, but you get the point."
        }
      >
        <textarea
          rows={5}
          placeholder="Tell me about your project or your collaboration idea"
          className={cn(inputBase, "h-[151px] resize-y")}
          {...register("message", { required: "Message is required" })}
        />
      </Field>

      {/* Submit row — full-width centered on mobile, right-aligned on desktop. */}
      <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-end">
        {status === "success" && (
          <span className="text-p3 text-semantic-text-secondary">
            Thanks — I&apos;ll be in touch.
          </span>
        )}
        {status === "error" && (
          <span className="text-p3 text-brand-accent-orange">
            Something went wrong. Try again.
          </span>
        )}
        <Button variant="dark" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send Your Request"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  helper,
  children,
}: {
  label: string;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex w-full flex-col gap-1.5">
      <span className="text-p2 text-brand-black">{label}</span>
      {children}
      {helper && (
        <span className="text-p3 text-brand-dark-gray opacity-70">{helper}</span>
      )}
      {error && <span className="text-p3 text-brand-accent-orange">{error}</span>}
    </label>
  );
}
