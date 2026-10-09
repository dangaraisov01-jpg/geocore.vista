import { useState } from "react";
import {
  FolderClosed,
  Map,
  Layers3,
  Microscope,
  FileCheck2,
  ArrowUpRight,
  Check,
  ChevronRight,
  LayoutGrid,
  List,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  DEMO_BOREHOLES,
  DEMO_LITHO_INTERVALS,
  DEMO_SAMPLES,
  DEMO_DRILL_RUNS,
} from "../../data/demoData";

const tabs = [
  {
    name: "Проекты",
    icon: FolderClosed,
    title: "Порядок начинается с проекта.",
    text: "Соберите участки, скважины и рабочие файлы в одном пространстве. Паспорт задаёт контекст для всех последующих записей.",
    points: [
      "Папки проектов и участков",
      "Паспорта, координаты и статусы скважин",
      "Поиск и единая структура данных",
    ],
  },
  {
    name: "Карта и разрез",
    icon: Map,
    title: "Увидьте данные в пространстве.",
    text: "Сопоставляйте положение устьев и геологию скважин. Переходите от координат к профилю, не теряя связь с первичными данными.",
    points: [
      "Карта скважин и проектирование устьев",
      "Расстояния и профили",
      "Геологические разрезы и инклинометрия",
    ],
  },
  {
    name: "Документация",
    icon: Layers3,
    title: "Каждое наблюдение — на своём месте.",
    text: "Разделяйте описание первичной породы, изменений и минерализации. Сохраняйте общую глубинную привязку между журналами.",
    points: [
      "Литология · изменения · минерализация",
      "Прожилки · тектоника · техника · инклинометрия",
      "Интервалы, описания и проверка границ",
    ],
  },
  {
    name: "Керн и QA/QC",
    icon: Microscope,
    title: "От рейса до контрольной пробы.",
    text: "Свяжите выход и состояние керна с опробованием. Контрольные образцы и дубликаты остаются частью общей истории скважины.",
    points: [
      "Drilling Parameters и геомеханика",
      "TCR / SCR / RQD и параметры ISRM",
      "Рядовые пробы, CRM, Blank и дубликаты",
    ],
  },
  {
    name: "Документы",
    icon: FileCheck2,
    title: "Данные становятся результатом.",
    text: "Готовьте акты и лабораторные документы из собранных данных. Выгружайте таблицы для дальнейшей работы в профильном ПО.",
    points: [
      "Акты заложения, замера и закрытия",
      "Рекультивация и инклинометрия",
      "Документы опробования и таблицы экспорта",
    ],
  },
];

function SceneFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="scene-frame">
      <div className="scene-top">
        <span className="scene-dots">
          <i />
          <i />
          <i />
        </span>
        <span>{title}</span>
        <span className="demo-badge">DEMO</span>
      </div>
      {children}
      <div className="scene-foot">
        <span>
          <span className="status-dot" /> Вымышленные данные
        </span>
        <span>Презентационный экран</span>
      </div>
    </div>
  );
}
function ProjectsScene() {
  return (
    <SceneFrame title="Рабочее пространство / Сарыарка-Север">
      <div className="project-scene">
        <aside className="scene-sidebar">
          <span className="tiny-label">ПРОЕКТЫ</span>
          {["Сарыарка-Север", "Прибалхашье-Восток", "Мугоджарский контур"].map(
            (n, i) => (
              <div
                className={i === 0 ? "sidebar-row active" : "sidebar-row"}
                key={n}
              >
                <FolderClosed size={14} />
                {n}
              </div>
            ),
          )}
          <div className="sidebar-bottom">
            <ShieldCheck size={15} /> Доступ компании
          </div>
        </aside>
        <div className="scene-content">
          <div className="scene-title">
            <div>
              <span className="tiny-label">ЦЕНТРАЛЬНЫЙ КАЗАХСТАН</span>
              <h4>Сарыарка-Север</h4>
            </div>
            <span className="scene-icon">
              <LayoutGrid size={16} />
            </span>
          </div>
          <div className="scene-metrics">
            <div>
              <b>4</b>
              <span>скважины</span>
            </div>
            <div>
              <b>
                1 210<span> м</span>
              </b>
              <span>проходка</span>
            </div>
            <div>
              <b>164</b>
              <span>пробы</span>
            </div>
          </div>
          <div className="scene-search">
            <Search size={13} /> Скважины проекта{" "}
            <span>
              <List size={14} />
            </span>
          </div>
          <div className="mini-table">
            <div className="mini-row table-head">
              <span>СКВАЖИНА</span>
              <span>ГЛУБИНА</span>
              <span>СТАТУС</span>
            </div>
            {DEMO_BOREHOLES.slice(0, 4).map((h) => (
              <div className="mini-row" key={h.bhid}>
                <strong>{h.bhid}</strong>
                <span>{h.actualDepth.toFixed(1)} м</span>
                <span
                  className={
                    h.status === "Завершена" ? "pill" : "pill pill-neutral"
                  }
                >
                  {h.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
function GisScene() {
  return (
    <SceneFrame title="GIS / Геологический профиль I–I">
      <div className="gis-scene">
        <div className="map-graphic">
          <svg
            viewBox="0 0 650 255"
            role="img"
            aria-label="Схематическая карта четырёх скважин и профиля I–I на вымышленном участке"
          >
            <defs>
              <pattern
                id="mapGrid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="#d4ded7"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="650" height="255" fill="#edf0e7" />
            <rect width="650" height="255" fill="url(#mapGrid)" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path
                key={i}
                d={`M -60 ${45 + i * 29} Q 120 ${-60 + i * 21}, 240 ${65 + i * 22} T 500 ${115 + i * 21} T 760 ${55 + i * 30}`}
                fill="none"
                stroke="#c3ccb8"
                strokeWidth="1.5"
              />
            ))}
            <path
              d="M80 190 Q180 160 275 120 T540 92"
              fill="none"
              stroke="#b5c7c8"
              strokeWidth="14"
              opacity=".55"
            />
            <path
              d="M155 168 L475 77"
              stroke="#c9613c"
              strokeWidth="1.5"
              strokeDasharray="6 5"
            />
            {[
              [170, 163],
              [270, 135],
              [366, 108],
              [462, 81],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="11" fill="#142824" opacity=".10" />
                <circle cx={x} cy={y} r="4" fill="#142824" />
                <text
                  x={x - 25}
                  y={y - 20}
                  fill="#294139"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  SRK-{101 + i}
                </text>
              </g>
            ))}
            <text
              x="40"
              y="30"
              fontSize="10"
              fill="#65766b"
              fontFamily="monospace"
            >
              ПРОФИЛЬ I–I
            </text>
            <path
              d="M605 60 L605 25 L600 34 M605 25 L610 34"
              stroke="#142824"
              fill="none"
            />
            <text x="601" y="18" fontSize="10" fill="#142824">
              N
            </text>
            <path
              d="M40 223 H110 M40 219 V227 M110 219 V227"
              stroke="#142824"
            />
            <text x="40" y="241" fontSize="9" fill="#142824">
              200 м
            </text>
          </svg>
          <div className="map-caption">
            <Map size={13} /> Схема расположения
          </div>
        </div>
        <div className="section-graphic">
          <div className="section-graphic-heading">
            <span>РАЗРЕЗ ПО ПРОФИЛЮ</span>
            <span>Литология + траектории</span>
          </div>
          <svg
            viewBox="0 0 650 160"
            role="img"
            aria-label="Схематический разрез с литологическими границами и траекториями скважин"
          >
            <path
              d="M0 15 Q180 5 340 22 T650 8 V50 Q420 75 250 49 T0 65Z"
              fill="#d8d4c1"
            />
            <path
              d="M0 65 Q170 25 340 60 T650 50 V95 Q420 120 210 87 T0 100Z"
              fill="#8e9e93"
            />
            <path d="M0 100 Q190 75 345 106 T650 95 V160 H0Z" fill="#c6a188" />
            <path
              d="M260 51 L342 60 L457 160 H358Z"
              fill="#b77354"
              opacity=".8"
            />
            {[120, 240, 365, 490].map((x, i) => (
              <g key={x}>
                <path
                  d={`M${x} 17 Q${x + 15} 85 ${x + 65} 146`}
                  stroke="#142824"
                  fill="none"
                  strokeWidth="2"
                />
                <circle cx={x} cy="17" r="3" fill="#142824" />
                <text
                  x={x - 21}
                  y="11"
                  fontSize="9"
                  fill="#142824"
                  fontFamily="monospace"
                >
                  {101 + i}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </SceneFrame>
  );
}
function LogScene() {
  const rows = DEMO_LITHO_INTERVALS["BH-SRK-101"];
  return (
    <SceneFrame title="BH-SRK-101 / Геологическая документация">
      <div className="log-scene">
        <div className="scene-title">
          <div>
            <span className="tiny-label">ПАСПОРТ СКВАЖИНЫ</span>
            <h4>
              BH-SRK-101 <small>320.0 м</small>
            </h4>
          </div>
          <span className="pill">
            <Check size={11} /> Проверено
          </span>
        </div>
        <div className="module-strip">
          {[
            "Литология",
            "Изменения",
            "Минерализация",
            "Прожилки",
            "Тектоника",
            "Техника",
            "Инклинометрия",
          ].map((s, i) => (
            <span className={i === 0 ? "selected" : ""} key={s}>
              {s}
            </span>
          ))}
        </div>
        <div className="litho-layout">
          <div className="litho-track">
            <span className="tiny-label">ГЛУБИНА / М</span>
            {rows.map((r) => (
              <div
                className="litho-block"
                key={r.id}
                style={{
                  flexBasis: `${((r.to - r.from) / 320) * 100}%`,
                  background: r.colorHex,
                }}
              >
                <span>{r.from}</span>
              </div>
            ))}
            <span className="track-end">320</span>
          </div>
          <div className="litho-rows">
            <div className="litho-row table-head">
              <span>ОТ — ДО / М</span>
              <span>ПОРОДА / КОД</span>
            </div>
            {rows.map((r) => (
              <div className="litho-row" key={r.id}>
                <span className="mono">
                  {r.from.toFixed(1)} — {r.to.toFixed(1)}
                </span>
                <div>
                  <b>{r.rockName}</b>
                  <small>
                    {r.code} · {r.grainSize}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
function SamplingScene() {
  return (
    <SceneFrame title="BH-SRK-101 / Керн и опробование">
      <div className="sampling-scene">
        <div className="scene-title">
          <div>
            <span className="tiny-label">ИНТЕРВАЛ 125.0 — 146.0 М</span>
            <h4>Качество керна</h4>
          </div>
          <span className="tiny-label">HQ → NQ</span>
        </div>
        <div className="core-chart">
          <div className="chart-ticks mono">
            <span>100%</span>
            <span>50%</span>
            <span>0%</span>
          </div>
          <div className="chart-bars">
            {DEMO_DRILL_RUNS.map((r) => (
              <div className="run-bars" key={r.runNumber}>
                <div className="bar-set">
                  <i style={{ height: `${r.tcrPct}%` }} />
                  <i style={{ height: `${r.scrPct}%` }} />
                  <i style={{ height: `${r.rqdPct}%` }} />
                </div>
                <span>{r.runNumber}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-legend">
          <span>
            <i />
            TCR — общий выход
          </span>
          <span>
            <i />
            SCR — столбиковый
          </span>
          <span>
            <i />
            RQD — качество
          </span>
        </div>
        <div className="samples-heading">
          <b>Ведомость проб</b>
          <span>QA/QC включён в последовательность</span>
        </div>
        <div className="samples-table">
          {DEMO_SAMPLES.slice(0, 6).map((r) => (
            <div key={r.sampleId} className="sample-row">
              <span className="mono">{r.sampleId}</span>
              <span>
                {r.from === null
                  ? "—"
                  : `${r.from.toFixed(1)} — ${r.to!.toFixed(1)} м`}
              </span>
              <span
                className={
                  r.sampleType === "CRM" ? "pill pill-copper" : "sample-type"
                }
              >
                {r.sampleType === "Рядовая керновая (1/2 керна)"
                  ? "Рядовая"
                  : r.sampleType}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
}
function DocumentScene() {
  return (
    <SceneFrame title="Документация / Готовые формы">
      <div className="document-scene">
        <div className="doc-list">
          <span className="tiny-label">ДОКУМЕНТЫ СКВАЖИНЫ</span>
          {[
            "Акт заложения",
            "Контрольный замер",
            "Закрытие / консервация",
            "Рекультивация",
            "Инклинометрия",
          ].map((n, i) => (
            <div
              key={n}
              className={i === 0 ? "doc-list-row selected" : "doc-list-row"}
            >
              <FileCheck2 size={14} />
              <span>{n}</span>
              {i === 0 && <ChevronRight size={13} />}
            </div>
          ))}
          <div className="doc-export">
            <span className="tiny-label">ТАБЛИЧНЫЕ ДАННЫЕ</span>
            <b>CSV / XLSX</b>
            <span>Для дальнейшей обработки</span>
          </div>
        </div>
        <div className="paper-wrap">
          <article className="paper">
            <div className="paper-id">ГЕОЛОГИЧЕСКАЯ ДОКУМЕНТАЦИЯ / ДЕМО</div>
            <h5>АКТ</h5>
            <p className="paper-sub">о заложении скважины</p>
            <div className="paper-date">12 сентября 2026 г.</div>
            <div className="paper-field">
              <span>Проект</span>
              <b>Сарыарка-Север</b>
            </div>
            <div className="paper-field">
              <span>Скважина</span>
              <b>BH-SRK-101</b>
            </div>
            <div className="paper-coords">
              <div>
                <span>X</span>
                <b>452 180</b>
              </div>
              <div>
                <span>Y</span>
                <b>5 312 410</b>
              </div>
              <div>
                <span>Z</span>
                <b>642.5</b>
              </div>
            </div>
            <div className="paper-field">
              <span>Проектная глубина</span>
              <b>320.0 м</b>
            </div>
            <div className="paper-field">
              <span>Азимут / наклон</span>
              <b>135° / −75°</b>
            </div>
            <p className="paper-note">
              Документ формируется на основе паспорта скважины и реквизитов
              проекта.
            </p>
            <div className="paper-sign">
              <span>Полевой геолог</span>
              <i />
            </div>
            <div className="paper-sign">
              <span>Буровой мастер</span>
              <i />
            </div>
            <div className="paper-bottom">
              Пример формы · не официальный документ
            </div>
          </article>
        </div>
      </div>
    </SceneFrame>
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
            <span className="eyebrow">Возможности / обзор системы</span>
            <h2>
              Сложная работа.
              <br />
              <span>Понятная система.</span>
            </h2>
          </div>
          <p>
            Пять рабочих областей.
            <br />
            Один связанный набор данных.
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
            <a className="text-link" href="#output">
              Что получится на выходе <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="product-visual">
            {active === 0 ? (
              <ProjectsScene />
            ) : active === 1 ? (
              <GisScene />
            ) : active === 2 ? (
              <LogScene />
            ) : active === 3 ? (
              <SamplingScene />
            ) : (
              <DocumentScene />
            )}
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
          <span className="mono">ОДНО ПРИЛОЖЕНИЕ / ОБЩИЙ КОНТЕКСТ</span>
          <p>
            Экраны адаптированы для обзора. Все проекты и значения в
            демонстрации вымышлены.
          </p>
        </div>
      </div>
    </section>
  );
}
