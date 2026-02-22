import Link from "next/link";
import en from "@/game/data/i18n/en.json";

const landing = en.landing;
const units = en.units;

const ZONES = [
  { unit: 1, title: units["1"].title, intro: units["1"].intro },
  { unit: 2, title: units["2"].title, intro: units["2"].intro },
  { unit: 3, title: units["3"].title, intro: units["3"].intro },
  { unit: 4, title: units["4"].title, intro: units["4"].intro },
  { unit: 5, title: units["5"].title, intro: units["5"].intro },
] as const;

export default function Home() {
  return (
    <main className="min-vh-100">
      {/* Hero: two-line title like Ethics-Tech-Policy Sandbox */}
      <section
        className="hero py-5 border-bottom border-2"
        style={{ background: "linear-gradient(145deg, #e0f2fe 0%, #ecfdf5 40%, #fef3c7 100%)" }}
        aria-labelledby="hero-title"
      >
        <div className="container py-4 text-center">
          <h1 id="hero-title" className="display-4 fw-bold mb-2 text-uppercase tracking-tight">
            <span className="d-block">{landing.titleLine1}</span>
            <span className="d-block text-primary">{landing.titleLine2}</span>
          </h1>
          <p className="lead text-muted mb-2 mt-4 mx-auto" style={{ maxWidth: "42rem" }}>
            {landing.description}
          </p>
          <div className="mt-4">
            <Link href="/game" className="btn btn-primary btn-lg">
              {landing.ctaPrimary}
            </Link>
          </div>
        </div>
      </section>

      {/* About / Disclaimer: collapsible (tap to expand) */}
      <section className="container py-3" aria-labelledby="about-heading">
        <details className="border rounded-3 p-3 bg-light">
          <summary id="about-heading" className="fw-semibold cursor-pointer user-select-none">
            {landing.about}
          </summary>
          <p className="small text-muted mt-2 mb-1">{landing.aboutBody}</p>
          <p className="small text-muted mb-0">
            <strong>{landing.disclaimerExpand}</strong>
          </p>
          <p className="small text-muted mb-0 mt-1">{landing.disclaimer}</p>
        </details>
      </section>

      {/* How to play */}
      <section className="container py-4" aria-labelledby="how-to-play-heading">
        <h2 id="how-to-play-heading" className="h4 mb-3 text-center">
          {landing.howToPlay}
        </h2>
        <ol className="list-group list-group-numbered list-group-flush border-0 mb-0">
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
      </section>

      {/* Choose your zone – level cards like Ethics-Tech-Policy */}
      <section className="container py-4 pb-5" aria-labelledby="choose-zone-heading">
        <h2 id="choose-zone-heading" className="h4 mb-4 text-center">
          {landing.chooseYourZone}
        </h2>
        <div className="row g-3">
          {ZONES.map((zone) => (
            <div key={zone.unit} className="col-12 col-md-6 col-lg-4">
              <div className="card border-2 rounded-3 h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge bg-primary rounded-pill">Zone {zone.unit}</span>
                  </div>
                  <h3 className="h5 card-title">{zone.title}</h3>
                  <p className="card-text small text-muted flex-grow-1">{zone.intro}</p>
                  <Link
                    href={`/game?unit=${zone.unit}`}
                    className="btn btn-outline-primary btn-sm mt-2 align-self-start"
                  >
                    {landing.startJourney} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="container py-3 border-top text-center small text-muted">
        <p className="mb-0">{landing.disclaimer}</p>
        <p className="mt-2 mb-0">
          <Link href="/game" className="text-primary fw-semibold">
            {landing.ctaPrimary}
          </Link>
        </p>
      </footer>
    </main>
  );
}
