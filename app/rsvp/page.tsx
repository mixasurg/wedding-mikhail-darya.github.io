import type { Metadata } from "next";
import RsvpForm from "@/components/RsvpForm";

export const metadata: Metadata = {
  title: "Подтвердить участие",
};

export default function RsvpPage() {
  return (
    <>
      <section className="page-hero rsvp-hero">
        <div>
          <p className="terminal-kicker">route / guest.response</p>
          <h1>
            Будете
            <em>с нами?</em>
          </h1>
        </div>
        <p className="page-hero-note">
          Пожалуйста, заполните анкету, как только определитесь. Один гость —
          одна анкета.
        </p>
      </section>

      <section className="content-section rsvp-module">
        <div className="section-label">
          <span>01</span>
          response.form
        </div>
        <RsvpForm />
      </section>
    </>
  );
}
