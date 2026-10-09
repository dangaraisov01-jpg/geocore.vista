import {
  ArrowUpRight,
  ArrowRight,
  WifiOff,
  UsersRound,
  KeyRound,
  FileSpreadsheet,
  FileText,
  FolderInput,
  Check,
} from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_WHATSAPP_URL,
  Brand,
} from "./Intro";
import { useI18n } from "../../i18n";

const softwareLogos = [
  { name: "Micromine", src: "/logos/micromine-icon.jpg" },
  { name: "Leapfrog Geo", src: "/logos/seequent-icon.svg" },
  { name: "Datamine", src: "/logos/datamine-icon.png" },
  { name: "Surpac", src: "/logos/3ds-logo.svg" },
  { name: "QGIS", src: "/logos/qgis.svg" },
  { name: "ArcGIS Pro", src: "/logos/arcgis-pro.png" },
  { name: "AutoCAD", src: "/logos/autocad-icon.svg" },
  { name: "Excel", src: "/logos/excel2.svg" },
];

export function Output() {
  const { t } = useI18n();
  return (
    <>
      <section className="coverage wrap" aria-labelledby="coverage-title">
        <div className="coverage-intro">
          <span className="eyebrow">{t.coverage.eyebrow}</span>
          <h2 id="coverage-title">
            {t.coverage.titleLine1}
            <br />
            {t.coverage.titleLine2}
          </h2>
          <p>
            {t.coverage.subtitleLine1}
            <br />
            {t.coverage.subtitleLine2}
          </p>
        </div>
        <div className="coverage-list">
          {t.coverage.capabilities.map(([n, title, text]) => (
            <article key={n}>
              <span className="mono">{n}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>
      <section className="output-section" id="output">
        <div className="wrap output-grid">
          <div className="output-copy">
            <span className="eyebrow">{t.output.eyebrow}</span>
            <h2>
              {t.output.titleLine1}
              <br />
              {t.output.titleLine2}
            </h2>
            <p>{t.output.description}</p>
            <div className="output-input">
              <FolderInput size={20} />
              <div>
                <b>{t.output.inputTitle}</b>
                <p>{t.output.inputText}</p>
              </div>
            </div>
          </div>
          <div className="deliverables">
            <article className="deliverable">
              <span className="deliverable-icon">
                <FileText />
              </span>
              <div>
                <span className="tiny-label">{t.output.deliv1Label}</span>
                <h3>{t.output.deliv1Title}</h3>
                <p>{t.output.deliv1Text}</p>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </article>
            <article className="deliverable">
              <span className="deliverable-icon">
                <FileSpreadsheet />
              </span>
              <div>
                <span className="tiny-label">{t.output.deliv2Label}</span>
                <h3>{t.output.deliv2Title}</h3>
                <p>{t.output.deliv2Text}</p>
                <div className="format-tags">
                  <span>COLLAR</span>
                  <span>SURVEY</span>
                  <span>LITHOLOGY</span>
                  <span>ASSAY</span>
                </div>
                <div
                  className="software-logos"
                  aria-label={t.output.softwareAria}
                >
                  {softwareLogos.map((sw) => (
                    <span className="software-chip" key={sw.name}>
                      <img src={sw.src} alt={sw.name} loading="lazy" />
                      <span>{sw.name}</span>
                    </span>
                  ))}
                </div>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
export function FieldAndTeam() {
  const { t } = useI18n();
  return (
    <section className="team-section wrap" id="team">
      <div className="team-heading">
        <span className="eyebrow">{t.team.eyebrow}</span>
        <h2>
          {t.team.titleLine1}
          <br />
          <span>{t.team.titleAccent}</span>
        </h2>
      </div>
      <div className="team-layout">
        <div className="field-panel">
          <div className="field-panel-top">
            <span className="mono">{t.team.fieldBadge}</span>
            <WifiOff size={20} />
          </div>
          <div className="field-large">
            {t.team.fieldTitleLine1}
            <br />
            {t.team.fieldTitleLine2}
          </div>
          <div className="sync-timeline">
            <div>
              <span className="sync-circle">
                <Check size={13} />
              </span>
              <span>{t.team.sync1}</span>
              <b className="mono">LOCAL</b>
            </div>
            <div>
              <span className="sync-circle waiting">
                <ArrowRight size={13} />
              </span>
              <span>{t.team.sync2}</span>
              <b className="mono">PENDING</b>
            </div>
            <div>
              <span className="sync-circle outline">
                <Check size={13} />
              </span>
              <span>{t.team.sync3}</span>
              <b className="mono">SYNC</b>
            </div>
          </div>
          <p>{t.team.fieldFoot}</p>
        </div>
        <div className="team-notes">
          <article>
            <UsersRound size={24} />
            <div>
              <h3>{t.team.note1Title}</h3>
              <p>{t.team.note1Text}</p>
            </div>
          </article>
          <article>
            <KeyRound size={24} />
            <div>
              <h3>{t.team.note2Title}</h3>
              <p>{t.team.note2Text}</p>
              <div className="security-highlights">
                {t.team.highlights.map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </div>
              <span className="security-note">{t.team.securityNote}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
export function FAQ() {
  const { t } = useI18n();
  return (
    <section className="faq-section wrap" id="faq">
      <div>
        <span className="eyebrow">{t.faq.eyebrow}</span>
        <h2>{t.faq.title}</h2>
        <p>
          {t.faq.subtitleLine1}
          <br />
          {t.faq.subtitleLine2}
        </p>
      </div>
      <div className="faq-list">
        {t.faq.questions.map(([q, a], i) => (
          <details key={i}>
            <summary>
              <span className="mono">0{i + 1}</span>
              <h3>{q}</h3>
              <span className="faq-plus" aria-hidden="true">
                +
              </span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function Footer() {
  const { t } = useI18n();
  return (
    <>
      <section className="closing">
        <div className="wrap closing-inner">
          <div>
            <span className="eyebrow">{t.footer.closingEyebrow}</span>
            <h2>
              {t.footer.closingTitleLine1}
              <br />
              {t.footer.closingTitleLine2}
            </h2>
          </div>
          <div className="closing-contacts">
            <div className="closing-links">
              <a
                className="button button-copper"
                href={CONTACT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT_PHONE} <ArrowUpRight size={18} />
              </a>
              <a
                className="button button-outline-light"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL} <ArrowUpRight size={18} />
              </a>
            </div>
            <p>{t.footer.closingCaption}</p>
          </div>
        </div>
      </section>
      <footer className="footer wrap">
        <a href="#" aria-label={t.footer.topAria}>
          <Brand />
        </a>
        <span>{t.footer.tagline}</span>
        <div className="footer-contacts">
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CONTACT_PHONE}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <a href="#capabilities">
          {t.footer.toOverview} <ArrowUpRight size={14} />
        </a>
        <div className="footer-bottom">
          <span>© {2026} Geocore.vista</span>
          <span>{t.footer.disclaimer}</span>
          <span className="mono">FIELD / OFFICE / ONE WORKFLOW</span>
        </div>
      </footer>
    </>
  );
}
