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
        ctaSecondary={landing.ctaSecondary}
      />

      <section className="container py-4" aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="h4 mb-2">
          {landing.howItWorks}
        </h2>
        <p className="text-muted">{landing.howItWorksBody}</p>
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
          <Link href="/game" className="text-primary">
            Start the game
          </Link>
        </p>
      </footer>
    </main>
  );
}
