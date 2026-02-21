import Link from "next/link";
import { Hero } from "@/game/components/Hero/Hero";
import en from "@/game/data/i18n/en.json";

const landing = en.landing;

export default function Home() {
  return (
    <main>
      <Hero
        title={landing.title}
        tagline={landing.tagline}
        description={landing.description}
        ctaPrimary={landing.ctaPrimary}
        ctaSubline={landing.ctaSubline}
        ctaSecondary={landing.ctaSecondary}
      />

      <section className="container py-4" aria-labelledby="how-to-try-it">
        <h2 id="how-to-try-it" className="h4 mb-3">
          {landing.howToTryIt}
        </h2>
        <ol className="list-group list-group-numbered list-group-flush border-0 mb-4">
          <li className="list-group-item border-0 py-2 px-0 bg-transparent">
            {landing.howToTryItStep1}
          </li>
          <li className="list-group-item border-0 py-2 px-0 bg-transparent">
            {landing.howToTryItStep2}
          </li>
          <li className="list-group-item border-0 py-2 px-0 bg-transparent">
            {landing.howToTryItStep3}
          </li>
          <li className="list-group-item border-0 py-2 px-0 bg-transparent">
            {landing.howToTryItStep4}
          </li>
        </ol>
        <p className="text-muted mb-0">
          <strong>{landing.howItWorks}</strong> — {landing.howItWorksBody}
        </p>
      </section>

      <section
        id="educators"
        className="container py-2 pb-4"
        aria-labelledby="educators-heading"
      >
        <h2 id="educators-heading" className="h5 visually-hidden">
          For educators
        </h2>
        <p className="small text-muted">
          Educators and cohorts: use the game in class or for discussion. No
          account required — progress is saved in the browser.
        </p>
      </section>

      <footer className="container py-4 border-top">
        <div className="small text-muted mb-2">
          <strong>Disclaimer:</strong> {landing.disclaimer}
        </div>
        <h2 id="about-heading" className="h6 mt-3">
          {landing.about}
        </h2>
        <p className="small text-muted">{landing.aboutBody}</p>
        <p className="small text-muted mt-2">
          <Link href="/game" className="text-primary fw-semibold">
            Enter the sandbox
          </Link>
        </p>
      </footer>
    </main>
  );
}
