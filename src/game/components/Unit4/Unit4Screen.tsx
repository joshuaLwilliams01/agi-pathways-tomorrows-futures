"use client";

/**
 * Unit 4 – Defence in Depth.
 * What might success look like (3 strategies), Layer 1–3, Building Defences.
 */

import en from "@/game/data/i18n/en.json";

const t = en.unit4;

function ResourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="small">
      {children}
    </a>
  );
}

export function Unit4Screen() {
  return (
    <div className="unit4-screen">
      <h2 className="h4 mb-3">{en.units["4"].title}</h2>
      <p className="text-muted mb-4">{en.units["4"].intro}</p>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-success">
        <div className="card-body">
          <h3 id="section-success" className="h5 card-title mb-3">
            {t.sectionSuccess}
          </h3>
          <p className="mb-3">{t.successIntro}</p>
          <div className="mb-3">
            <h4 className="h6">{t.strategy1Title}</h4>
            <p className="small">{t.strategy1Body}</p>
          </div>
          <div className="mb-3">
            <h4 className="h6">{t.strategy2Title}</h4>
            <p className="small">{t.strategy2Body}</p>
          </div>
          <div className="mb-3">
            <h4 className="h6">{t.strategy3Title}</h4>
            <p className="small">{t.strategy3Body}</p>
          </div>
          <p className="small text-muted">{t.strategyNote}</p>
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="layer1">
        <div className="card-body">
          <h3 id="layer1" className="h5 card-title mb-2">
            {t.layer1Title}
          </h3>
          <p className="small mb-2">{t.layer1Body}</p>
          <p className="small mb-0">
            <ResourceLink href={t.resAitreatyUrl}>AI Treaty (aitreaty.org)</ResourceLink>
            {" · "}
            <ResourceLink href={t.resProjectUrl}>The Project (situational-awareness.ai)</ResourceLink>
          </p>
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="layer2">
        <div className="card-body">
          <h3 id="layer2" className="h5 card-title mb-2">
            {t.layer2Title}
          </h3>
          <p className="small mb-2">{t.layer2Body}</p>
          <p className="small mb-0">
            <ResourceLink href={t.layer2ResAlignmentUrl}>What is AI alignment? (BlueDot)</ResourceLink>
            {" · "}
            <ResourceLink href={t.layer2ResControlUrl}>AI Control (BlueDot)</ResourceLink>
            {" · "}
            <ResourceLink href={t.layer2ResRandUrl}>RAND research brief</ResourceLink>
          </p>
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="layer3">
        <div className="card-body">
          <h3 id="layer3" className="h5 card-title mb-2">
            {t.layer3Title}
          </h3>
          <p className="small mb-2">{t.layer3Body}</p>
          <p className="small mb-0">
            <ResourceLink href={t.layer3ResUrl}>d/acc 2 (Vitalik)</ResourceLink>
          </p>
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-building">
        <div className="card-body">
          <h3 id="section-building" className="h5 card-title mb-3">
            {t.sectionBuildingDefences}
          </h3>
          <p className="small mb-0">{t.buildingIntro}</p>
        </div>
      </section>
    </div>
  );
}
