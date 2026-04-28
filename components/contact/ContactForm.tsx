"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

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

  const inputClasses =
    "w-full border-b border-brand-gray bg-transparent py-3 text-body-xs text-semantic-text-primary outline-none placeholder:text-semantic-text-secondary focus:border-brand-black";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <label className="flex flex-col gap-2">
        <span className="text-label text-semantic-text-secondary">Name</span>
        <input
          type="text"
          className={inputClasses}
          placeholder="Your name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-p3 text-brand-accent-orange">
            {errors.name.message}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-label text-semantic-text-secondary">Email Address</span>
        <input
          type="email"
          className={inputClasses}
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && (
          <span className="text-p3 text-brand-accent-orange">
            {errors.email.message}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-label text-semantic-text-secondary">Message</span>
        <textarea
          rows={5}
          className={`${inputClasses} resize-y`}
          placeholder="Tell me about your project or your collaboration idea"
          {...register("message", { required: "Message is required" })}
        />
        <span className="text-p3 text-semantic-text-secondary">
          A few icebreakers: What&apos;s about your business that keeps you up at
          night? How would you define success for your project? What&apos;s
          getting in the way of it?...
        </span>
        {errors.message && (
          <span className="text-p3 text-brand-accent-orange">
            {errors.message.message}
          </span>
        )}
      </label>

      <div className="flex items-center justify-end gap-4">
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
