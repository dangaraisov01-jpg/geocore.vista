import { useState, useRef } from "react";
import {
  FolderClosed,
  Map,
  Layers3,
  Microscope,
  FileCheck2,
  ArrowUpRight,
  Check,
  Maximize2,
  Download,
  X,
  ShieldCheck,
} from "lucide-react";

const tabs = [
  {
    name: "Проекты",
    icon: FolderClosed,
    title: "Структура проектов и скважин.",
    text: "Скважины, параметры и рабочие файлы в едином пространстве. Здесь показана папка встроенного демонстрационного проекта приложения.",
    points: [
      "Папки проектов и участков",
      "Паспорта, координаты и статусы скважин",
      "Поиск и единая структура данных",
    ],
    image: "projects-ui.webp",
    caption: "Реальная папка проекта · Бурабай-Жалгызагаш",
  },
  {
    name: "Карта и разрез",
    icon: Map,
    title: "Построение разрезов по профилю.",
    text: "Разрез профиля ПР-10, построенный приложением по четырём демо-скважинам: колонки, интервалы, траектории и условные обозначения.",
    points: [
      "Профили и выбор скважин",
      "Высотные отметки и интервалы литологии",
      "Петрографический крап и экспорт SVG / PNG / PDF",
    ],
    image: "section-ui.webp",
    caption: "Реальный интерфейс разреза · ПР-10 / 4 скважины",
  },
  {
    name: "Документация",
    icon: Layers3,
    title: "Поинтервальное ведение журналов.",
    text: "Экран литологического журнала BUR-26-001. Глубинные интервалы, первичная порода и наблюдения сохраняются в связанном контексте скважины.",
    points: [
      "Литология · изменения · минерализация",
      "Прожилки · тектоника · техника · инклинометрия",
      "Интервалы, описания и проверка границ",
    ],
    image: "journal-ui.webp",
    caption: "Реальный журнал · BUR-26-001",
  },
  {
    name: "Керн и QA/QC",
    icon: Microscope,
    title: "Учёт рейсов и контроль качества.",
    text: "Ведение рядовых и контрольных проб по интервалам бурения. Стандарты CRM, холостые пробы и дубликаты привязаны к скважине.",
    points: [
      "Drilling Parameters и геомеханика",
      "TCR / SCR / RQD и параметры ISRM",
      "Рядовые пробы, CRM, Blank и дубликаты",
    ],
    image: "sampling-ui.webp",
    caption: "Реальный модуль опробования · BUR-26-001",
  },
  {
    name: "Документы",
    icon: FileCheck2,
    title: "Формирование производственных актов.",
    text: "Генератор формирует акты на основе паспорта скважины, рейсов и замеров. Ниже можно рассмотреть исходные формы A4 и скачать полный PDF, сформированный приложением.",
    points: [
      "Акты заложения, замера и закрытия",
      "Рекультивация и инклинометрия",
      "6 страниц в демонстрационном PDF-пакете",
    ],
    image: "acts-ui.webp",
    caption: "Реальный генератор актов · BUR-26-001",
  },
];

export function ImageViewer({
  src,
  alt,
  title,
  page = false,
}: {
  src: string;
  alt: string;
  title: string;
  page?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        className={`actual-image-button ${page ? "actual-page" : ""}`}
        onClick={() => dialog.current?.showModal()}
        aria-label={`Открыть в полном размере: ${title}`}
      >
        <img src={src} alt={alt} loading="lazy" />
        <span className="image-expand">
          <Maximize2 size={15} /> Рассмотреть
        </span>
      </button>
      <dialog
        ref={dialog}
        className="actual-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="actual-dialog-top">
          <strong>{title}</strong>
          <a href={src} target="_blank" rel="noopener noreferrer">
            Исходное изображение <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Закрыть просмотр"
          >
            <X size={22} />
          </button>
        </div>
        <div className="actual-dialog-content">
          <img src={src} alt={alt} />
        </div>
      </dialog>
    </>
  );
}

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const item = tabs[active];
  return (
    <section className="product-section" id="capabilities">
      <div className="wrap">
        <div className="product-heading">
          <div>
            <span className="eyebrow">Возможности / интерфейс</span>
            <h2>
              Все модули геолога
              <br />
              <span>в одном окне.</span>
            </h2>
          </div>
          <p>
            Интерфейс основных модулей
            <br />
            на данных демонстрационного проекта.
          </p>
        </div>
        <div
          className="product-tabs"
          role="tablist"
          aria-label="Области приложения"
        >
          {tabs.map((t, i) => (
            <button
              key={t.name}
              role="tab"
              id={`tab-${i}`}
              aria-selected={active === i}
              aria-controls={`panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onKeyDown={(e) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  const n =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? tabs.length - 1
                        : (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) %
                          tabs.length;
                  setActive(n);
                  document.getElementById(`tab-${n}`)?.focus();
                }
              }}
              onClick={() => setActive(i)}
              className={active === i ? "active" : ""}
            >
              <t.icon size={17} />
              {t.name}
              <span className="mono">0{i + 1}</span>
            </button>
          ))}
        </div>
        <div
          className="product-panel"
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
        >
          <div className="product-copy">
            <span className="panel-number mono">0{active + 1} / 05</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <ul>
              {item.points.map((p) => (
                <li key={p}>
                  <Check size={15} />
                  {p}
                </li>
              ))}
            </ul>
            <a className="text-link" href="#real-results">
              Посмотреть готовые результаты <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="product-visual">
            <div className="actual-screen">
              <div className="actual-screen-bar">
                <span className="mono">GEOCORE.VISTA / РЕАЛЬНЫЙ ИНТЕРФЕЙС</span>
                <span className="actual-demo">ДЕМО-ДАННЫЕ</span>
              </div>
              <ImageViewer
                key={item.image}
                src={`/examples/${item.image}`}
                title={item.caption}
                alt={item.caption}
              />
              <div className="actual-screen-caption">
                <span>{item.caption}</span>
                <Maximize2 size={13} />
              </div>
            </div>
          </div>
        </div>
        {tabs.map((_, i) =>
          i !== active ? (
            <div
              key={i}
              role="tabpanel"
              id={`panel-${i}`}
              aria-labelledby={`tab-${i}`}
              hidden
            />
          ) : null,
        )}
        <div className="product-caption">
          <span className="mono">
            НАСТОЯЩИЕ ИНСТРУМЕНТЫ / ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ
          </span>
          <p>
            Снято в локальной сборке приложения. Встроенный демо-проект, без
            раскрытия пользовательских данных.
          </p>
        </div>
      </div>
    </section>
  );
}

const results = [
  {
    name: "Геологический разрез",
    file: "section-export.webp",
    title: "Разрез, который строит приложение.",
    text: "Профиль ПР-10: четыре скважины с глубинами 350–550 м. Реальные литологические интервалы и петрографический крап из встроенного демо, шкала высот и легенда исходного экспорта.",
    download: "geocore-section.svg",
    format: "Скачать разрез SVG",
    detail:
      "Исходный экспорт renderer приложения · 4 скважины / 11 обозначений",
    page: false,
  },
  {
    name: "Заложение",
    file: "act-spudding.webp",
    title: "Акт о заложении скважины.",
    text: "Полная форма A4: комиссия, координаты устья, параметры и назначение скважины, требования к выходу керна и строки подписей. Страница извлечена из PDF, сформированного приложением.",
    download: "geocore-demo-acts.pdf",
    format: "Скачать пакет актов PDF",
    detail: "BUR-26-001 · страница 1 / 6 · оригинальный PDF",
    page: true,
  },
  {
    name: "Контрольный замер",
    file: "act-depth-check.webp",
    title: "Акт контрольного замера глубины.",
    text: "Сопоставление глубины по буровому журналу и контрольному замеру, фиксация расхождения и фактически принятой глубины. Та же форма, которую пользователь получает при экспорте.",
    download: "geocore-demo-acts.pdf",
    format: "Скачать пакет актов PDF",
    detail: "BUR-26-001 · страница 2 / 6 · оригинальный PDF",
    page: true,
  },
  {
    name: "Закрытие",
    file: "act-closure.webp",
    title: "Закрытие и консервация.",
    text: "Производственные сведения, фактическое положение и глубина, выход керна, конструкция скважины и мероприятия при закрытии. Акт занимает две страницы исходного пакета.",
    download: "geocore-demo-acts.pdf",
    format: "Скачать пакет актов PDF",
    detail: "BUR-26-001 · страницы 3–4 / 6 · показана первая страница",
    page: true,
  },
  {
    name: "Рекультивация",
    file: "act-reclamation.webp",
    title: "Акт рекультивации площадки.",
    text: "Полная форма по восстановлению буровой площадки: участок, состав комиссии, площадь и состояние выполненных работ.",
    download: "geocore-demo-acts.pdf",
    format: "Скачать пакет актов PDF",
    detail: "BUR-26-001 · страница 5 / 6 · оригинальный PDF",
    page: true,
  },
  {
    name: "Инклинометрия",
    file: "act-inclinometry.webp",
    title: "Замеры искривления скважины.",
    text: "Таблица глубин, углов наклона и азимутов, сведения о приборе и исполнителе. Результат готов к просмотру и печати в формате A4.",
    download: "geocore-demo-acts.pdf",
    format: "Скачать пакет актов PDF",
    detail: "BUR-26-001 · страница 6 / 6 · оригинальный PDF",
    page: true,
  },
];
export function RealResults() {
  const [selected, setSelected] = useState(0);
  const result = results[selected];
  return (
    <section id="real-results" className="real-results wrap">
      <div className="real-results-heading">
        <div>
          <span className="eyebrow">Примеры выгрузки</span>
          <h2>
            Готовые разрезы
            <br />
            и бланки актов.
          </h2>
        </div>
        <p>
          Исходные файлы из генератора приложения.
          <br />
          Доступны для просмотра и скачивания.
        </p>
      </div>
      <div className="result-selectors" aria-label="Выбор результата">
        {results.map((r, i) => (
          <button
            type="button"
            key={r.name}
            className={i === selected ? "selected" : ""}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            {i === 0 ? <Map size={14} /> : <FileCheck2 size={14} />} {r.name}
          </button>
        ))}
      </div>
      <div
        className={`result-presentation ${result.page ? "result-document" : ""}`}
      >
        <div className="result-description">
          <span className="mono result-label">
            {result.page
              ? "ПРОИЗВОДСТВЕННЫЙ АКТ / A4"
              : "ГЕОЛОГИЧЕСКИЙ РАЗРЕЗ / SVG"}
          </span>
          <h3>{result.title}</h3>
          <p>{result.text}</p>
          <a
            className="button result-download"
            href={`/examples/${result.download}`}
            download
          >
            <Download size={17} />
            {result.format}
          </a>
          <span className="result-provenance">{result.detail}</span>
          <div className="result-privacy">
            <ShieldCheck size={15} />
            <span>
              Публичный встроенный демо-проект. Производственные данные клиентов
              не используются.
            </span>
          </div>
        </div>
        <div className="result-preview">
          <ImageViewer
            key={result.file}
            src={`/examples/${result.file}`}
            alt={result.title}
            title={result.title}
            page={result.page}
          />
        </div>
      </div>
    </section>
  );
}
