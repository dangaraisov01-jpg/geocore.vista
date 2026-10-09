import { useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X, MoveUpRight } from "lucide-react";
import realCoreHeroUrl from "../../assets/images/real_field_core_staggered_ends_1791560367428.jpg";

export const CONTACT_PHONE = "+77760721339";
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
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#" aria-label="Geocore.vista — начало страницы">
          <Brand />
        </a>
        <nav
          className={open ? "nav nav-open" : "nav"}
          aria-label="Основная навигация"
        >
          {[
            ["Возможности", "#capabilities"],
            ["Результат", "#output"],
            ["Для команды", "#team"],
            ["Вопросы", "#faq"],
          ].map(([name, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {name}
            </a>
          ))}
        </nav>
        <div className="header-cta">
          <a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <button
          className="menu-toggle"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
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
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> Рабочая среда геолога
          </div>
          <h1>
            От устья
            <br />
            до готового
            <br />
            <span>акта.</span>
          </h1>
          <p className="hero-description">
            Проекты, геологическая документация и контроль данных — в одной
            системе. На участке, в офисе и между командами.
          </p>
          <div className="hero-actions">
            <a className="button button-copper" href="#capabilities">
              Посмотреть возможности <ArrowDown size={18} />
            </a>
            <div className="hero-contacts">
              <a className="text-link light" href={`tel:${CONTACT_PHONE}`}>
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
              Создано вокруг
              <br />
              реальной работы геолога
            </span>
          </div>
        </div>
        <div className="hero-art">
          <img
            src={realCoreHeroUrl}
            alt="Образцы бурового керна с кварцевыми прожилками и зонами окисления"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            width="1200"
            height="900"
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
            <span className="mono">КЕРН — НАЧАЛО ИСТОРИИ ДАННЫХ</span>
          </div>
          <div className="floating-note">
            <MoveUpRight size={20} />
            <span>
              Каждый интервал.
              <br />
              <strong>В общем контексте.</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="hero-strip wrap">
        <span>ГЕОЛОГИЧЕСКАЯ ДОКУМЕНТАЦИЯ</span>
        <span>GIS И РАЗРЕЗЫ</span>
        <span>КЕРН И QA/QC</span>
        <span>АКТЫ И ЭКСПОРТ</span>
      </div>
    </section>
  );
}
export function Workflow() {
  const steps = [
    ["01", "Организуйте", "Проект, участки, паспорта скважин."],
    ["02", "Документируйте", "Рейсы, интервалы и наблюдения."],
    ["03", "Проверьте", "Связность данных и контрольные пробы."],
    ["04", "Передайте", "Таблицы, акты и доступ команде."],
  ];
  return (
    <section className="workflow wrap" aria-labelledby="workflow-heading">
      <div className="section-intro">
        <span className="eyebrow">Рабочий процесс</span>
        <h2 id="workflow-heading">
          Одна скважина.
          <br />
          Весь рабочий цикл.
        </h2>
        <p>
          Единая цепочка данных: от полевого описания керна до сводных
          ведомостей и производственных актов.
        </p>
      </div>
      <div className="workflow-steps">
        {steps.map(([n, title, text]) => (
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
