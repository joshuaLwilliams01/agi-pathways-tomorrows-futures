"use client";

import Link from "next/link";

interface HeroProps {
  title: string;
  tagline: string;
  description: string;
  ctaPrimary: string;
  ctaSubline?: string;
  ctaSecondary: string;
}

export function Hero({
  title,
  tagline,
  description,
  ctaPrimary,
  ctaSubline,
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
        <div className="d-flex flex-wrap gap-3 align-items-center">
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
          {ctaSubline && (
            <span className="text-muted small ms-2 ms-md-0 mt-2 mt-md-0 w-100 w-md-auto">
              {ctaSubline}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
