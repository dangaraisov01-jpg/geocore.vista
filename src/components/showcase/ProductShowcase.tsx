import { useState, useRef } from "react";
import {
  FolderClosed,
  Map,
  Layers3,
  Microscope,
  CalendarClock,
  FileCheck2,
  ArrowUpRight,
  Check,
  Maximize2,
  Download,
  X,
  ShieldCheck,
} from "lucide-react";
import { useI18n } from "../../i18n";

const tabIcons = [
  FolderClosed,
  Map,
  Layers3,
  Microscope,
  CalendarClock,
  FileCheck2,
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
  const { t } = useI18n();
  return (
    <>
      <button
        type="button"
        className={`actual-image-button ${page ? "actual-page" : ""}`}
        onClick={() => dialog.current?.showModal()}
        aria-label={`${t.showcase.openFullAria}: ${title}`}
      >
        <img src={src} alt={alt} loading="lazy" />
        <span className="image-expand">
          <Maximize2 size={15} /> {t.showcase.expandButton}
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
            {t.showcase.originalImage} <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label={t.showcase.closeViewerAria}
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
  const { t } = useI18n();
  const tabs = t.showcase.tabs;
  const item = tabs[active];
  return (
    <section className="product-section" id="capabilities">
      <div className="wrap">
        <div className="product-heading">
          <div>
            <span className="eyebrow">{t.showcase.eyebrow}</span>
            <h2>
              {t.showcase.titleLine1}
              <br />
              <span>{t.showcase.titleAccent}</span>
            </h2>
          </div>
          <p>
            {t.showcase.subtitleLine1}
            <br />
            {t.showcase.subtitleLine2}
          </p>
        </div>
        <div
          className="product-tabs"
          role="tablist"
          aria-label={t.showcase.tablistAria}
        >
          {tabs.map((tab, i) => {
            const Icon = tabIcons[i] || FolderClosed;
            return (
              <button
                key={tab.image}
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
                          : (i +
                              (e.key === "ArrowRight" ? 1 : tabs.length - 1)) %
                            tabs.length;
                    setActive(n);
                    document.getElementById(`tab-${n}`)?.focus();
                  }
                }}
                onClick={() => setActive(i)}
                className={active === i ? "active" : ""}
              >
                <Icon size={17} />
                {tab.name}
                <span className="mono">0{i + 1}</span>
              </button>
            );
          })}
        </div>
        <div
          className="product-panel"
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
        >
          <div className="product-copy">
            <span className="panel-number mono">
              0{active + 1} / 0{tabs.length}
            </span>
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
              {t.showcase.viewResultsLink} <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="product-visual">
            <div className="actual-screen">
              <div className="actual-screen-bar">
                <span className="mono">{t.showcase.screenBar}</span>
                <span className="actual-demo">{t.showcase.demoBadge}</span>
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
          <span className="mono">{t.showcase.captionMono}</span>
          <p>{t.showcase.captionText}</p>
        </div>
      </div>
    </section>
  );
}

export function RealResults() {
  const [selected, setSelected] = useState(0);
  const { t } = useI18n();
  const results = t.realResults.items;
  const result = results[selected];
  return (
    <section id="real-results" className="real-results wrap">
      <div className="real-results-heading">
        <div>
          <span className="eyebrow">{t.realResults.eyebrow}</span>
          <h2>
            {t.realResults.titleLine1}
            <br />
            {t.realResults.titleLine2}
          </h2>
        </div>
        <p>
          {t.realResults.subtitleLine1}
          <br />
          {t.realResults.subtitleLine2}
        </p>
      </div>
      <div
        className="result-selectors"
        aria-label={t.realResults.selectorAria}
      >
        {results.map((r, i) => (
          <button
            type="button"
            key={r.file}
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
              ? t.realResults.labelAct
              : t.realResults.labelSection}
          </span>
          <h3>{result.title}</h3>
          <p>{result.text}</p>
          <a
            className="button result-download"
            href={`/examples/${result.download}`}
            download={result.download}
            onClick={async (e) => {
              e.preventDefault();
              try {
                const res = await fetch(`/examples/${result.download}`);
                const blob = await res.blob();
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = result.download;
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                  document.body.removeChild(link);
                  URL.revokeObjectURL(blobUrl);
                }, 1000);
              } catch {
                window.location.href = `/examples/${result.download}`;
              }
            }}
          >
            <Download size={17} />
            {result.format}
          </a>
          <span className="result-provenance">{result.detail}</span>
          <div className="result-privacy">
            <ShieldCheck size={15} />
            <span>{t.realResults.privacyNote}</span>
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
