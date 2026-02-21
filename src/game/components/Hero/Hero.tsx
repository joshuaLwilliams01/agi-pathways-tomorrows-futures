"use client";

import Link from "next/link";

interface HeroProps {
  title: string;
  tagline: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export function Hero({
  title,
  tagline,
  description,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) {
  return (
    <section className="hero py-5" aria-labelledby="hero-title">
      <div className="container py-4">
        <h1 id="hero-title" className="display-4 fw-bold mb-2">
          {title}
        </h1>
        <p className="lead text-muted mb-3">{tagline}</p>
        <p className="mb-4 max-w-600">{description}</p>
        <div className="d-flex flex-wrap gap-3">
          <Link
            href="/game"
            className="btn btn-primary btn-lg"
            id="cta-primary"
          >
            {ctaPrimary}
          </Link>
          <a
            href="#educators"
            className="btn btn-outline-secondary btn-lg"
            id="cta-secondary"
          >
            {ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
