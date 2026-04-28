import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="bg-brand-lightest pt-24 pb-32">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="text-h1">Let&apos;s work together</h1>
          <HorizontalRule />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="aspect-square w-full bg-brand-light-gray rounded-sm" aria-hidden />
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
