import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Menu,
  X,
  MoveUpRight,
  FileText,
} from "lucide-react";
import { LANG_LABELS, useI18n } from "../../i18n";

export const CONTACT_PHONE = "+77064101339";
export const CONTACT_WHATSAPP_URL = "https://wa.me/message/J3WXITDCLBDZF1";
export const CONTACT_EMAIL = "geocorevista@gmail.com";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        <img src="/logos/geocore-logo.svg" alt="" width="38" height="38" />
      </span>
      <span>
        geocore<span className="brand-dot">.</span>
        <b>vista</b>
      </span>
    </span>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t, setProposalOpen } = useI18n();
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#" aria-label={t.header.homeAria}>
          <Brand />
        </a>
        <nav
          className={open ? "nav nav-open" : "nav"}
          aria-label={t.header.navAria}
        >
          {t.header.nav.map(([name, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {name}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="header-cta">
            <button
              type="button"
              className="header-kp-btn"
              onClick={() => setProposalOpen(true)}
            >
              <FileText size={14} />
              {t.header.proposalBtn}
            </button>
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTACT_PHONE}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          <div
            className="lang-switcher"
            role="group"
            aria-label={t.header.langAria}
          >
            {LANG_LABELS.map((item) => (
              <button
                key={item.code}
                type="button"
                className={lang === item.code ? "active" : ""}
                aria-pressed={lang === item.code}
                title={item.name}
                onClick={() => setLang(item.code)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <button
          className="menu-toggle"
          aria-label={open ? t.header.menuClose : t.header.menuOpen}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Hero() {
  const { t, setProposalOpen } = useI18n();
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> {t.hero.eyebrow}
          </div>
          <h1>
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2}
            <br />
            <span>{t.hero.titleAccent}</span>
          </h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-actions">
            <button
              type="button"
              className="button button-copper"
              onClick={() => setProposalOpen(true)}
            >
              <FileText size={18} />
              {t.hero.proposalCta}
            </button>
            <a className="button button-outline-light" href="#capabilities">
              {t.hero.cta} <ArrowDown size={18} />
            </a>
            <div className="hero-contacts">
              <a
                className="text-link light"
                href={CONTACT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT_PHONE}
              </a>
              <a className="text-link light" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <span className="mono">FIELD → DATA → INSIGHT</span>
            <span>
              {t.hero.bottomSubLine1}
              <br />
              {t.hero.bottomSubLine2}
            </span>
          </div>
        </div>
        <div className="hero-art">
          <img
            src="/images/core-hero-real.jpg"
            alt={t.hero.coreAlt}
            fetchPriority="high"
            width="1200"
            height="896"
          />
          <div className="hero-art-top mono">
            <span>GEOCORE / MATERIAL STUDY</span>
            <span>01—03</span>
          </div>
          <div className="art-cross" aria-hidden="true">
            +
          </div>
          <div className="hero-art-bottom">
            <div className="sample-rule">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="mono">{t.hero.coreRule}</span>
          </div>
          <div className="floating-note">
            <MoveUpRight size={20} />
            <span>
              {t.hero.floatingLine1}
              <br />
              <strong>{t.hero.floatingStrong}</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="hero-strip wrap">
        {t.hero.strip.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </section>
  );
}
export function Workflow() {
  const { t } = useI18n();
  return (
    <section className="workflow wrap" aria-labelledby="workflow-heading">
      <div className="section-intro">
        <span className="eyebrow">{t.workflow.eyebrow}</span>
        <h2 id="workflow-heading">
          {t.workflow.titleLine1}
          <br />
          {t.workflow.titleLine2}
        </h2>
        <p>{t.workflow.description}</p>
      </div>
      <div className="workflow-steps">
        {t.workflow.steps.map(([n, title, text]) => (
          <div className="workflow-step" key={n}>
            <span className="mono step-number">{n}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <ArrowUpRight size={20} aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
