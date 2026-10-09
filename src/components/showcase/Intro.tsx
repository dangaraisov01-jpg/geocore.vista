import { useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X, MoveUpRight } from "lucide-react";

export const APP_URL = "https://geolog-studio-steel.vercel.app/";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
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
        <a
          className="header-cta"
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          В приложение <ArrowUpRight size={16} />
        </a>
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
            <a
              className="text-link light"
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Открыть приложение <ArrowUpRight size={17} />
            </a>
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
            src="/images/core-hero.webp"
            alt="Образцы бурового керна с кварцевыми прожилками — предметная иллюстрация"
            fetchPriority="high"
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
        <span className="eyebrow">Без разрозненных файлов</span>
        <h2 id="workflow-heading">
          Одна скважина.
          <br />
          Весь рабочий цикл.
        </h2>
        <p>
          Не просто электронный журнал. Связанные данные от первого наблюдения
          до итоговой документации.
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
