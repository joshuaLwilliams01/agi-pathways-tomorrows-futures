"use client";

/**
 * Unit 2 – Drivers of AI Progress.
 * Sections: Technical trends, Definitions, Intelligence Explosion, Will AI progress accelerate?
 */

import en from "@/game/data/i18n/en.json";

const t = en.unit2;

function ResourceLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="small">
      {children}
    </a>
  );
}

export function Unit2Screen() {
  return (
    <div className="unit2-screen">
      <h2 className="h4 mb-3">{en.units["2"].title}</h2>
      <p className="text-muted mb-4">{en.units["2"].intro}</p>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-technical">
        <div className="card-body">
          <h3 id="section-technical" className="h5 card-title mb-3">
            {t.sectionTechnicalTrends}
          </h3>
          <p className="mb-4">{t.technicalIntro}</p>
          <h4 className="h6 mb-2">{t.definitions}</h4>
          <ul className="list-unstyled small mb-3">
            <li className="mb-2">{t.defFLOP}</li>
            <li className="mb-2">{t.defComputeEfficiency}</li>
            <li className="mb-2">{t.defHardwarePricePerf}</li>
            <li className="mb-2">{t.defAlgorithmicEfficiency}</li>
            <li className="mb-3">{t.defFormula}</li>
          </ul>
          <h4 className="h6 mb-2">{t.resources}</h4>
          <ul className="list-unstyled small">
            <li className="mb-1">
              <ResourceLink href={t.resCsetTriadUrl}>{t.resCsetTriad}</ResourceLink>
            </li>
            <li>
              <ResourceLink href={t.resScalingStateOfPlayUrl}>{t.resScalingStateOfPlay}</ResourceLink>
            </li>
          </ul>
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-explosion">
        <div className="card-body">
          <h3 id="section-explosion" className="h5 card-title mb-3">
            {t.sectionIntelligenceExplosion}
          </h3>
          <blockquote className="border-start border-3 ps-3 mb-3 text-muted small">
            {t.goodQuote}
          </blockquote>
          <h4 className="h6 mb-2">{t.resources}</h4>
          <ul className="list-unstyled small">
            <li className="mb-1">
              <ResourceLink href={t.resUnchartedUrl}>{t.resUncharted}</ResourceLink>
            </li>
            <li className="mb-1">
              <ResourceLink href={t.resWaitButWhyUrl}>{t.resWaitButWhy}</ResourceLink>
            </li>
            <li>
              <ResourceLink href={t.resLongTimelinesUrl}>{t.resLongTimelines}</ResourceLink>
            </li>
          </ul>
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-accelerate">
        <div className="card-body">
          <h3 id="section-accelerate" className="h5 card-title mb-3">
            {t.sectionAccelerate}
          </h3>
          <p className="mb-3">{t.accelerateIntro}</p>
          <h4 className="h6 mb-2">{t.resources}</h4>
          <ul className="list-unstyled small">
            <li className="mb-1">
              <ResourceLink href={t.resUnresolvedDebatesUrl}>{t.resUnresolvedDebates}</ResourceLink>
            </li>
            <li className="mb-1">
              <ResourceLink href={t.resAgiTimelinesUrl}>{t.resAgiTimelines}</ResourceLink>
            </li>
            <li className="mb-1">
              <ResourceLink href={t.resAsteriskUrl}>{t.resAsterisk}</ResourceLink>
            </li>
            <li>
              <ResourceLink href={t.resAi2027Url}>{t.resAi2027}</ResourceLink>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
