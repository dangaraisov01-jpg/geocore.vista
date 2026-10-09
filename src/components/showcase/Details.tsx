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
  Layers3,
} from "lucide-react";
import { APP_URL, Brand } from "./Intro";

const capabilities = [
  [
    "01",
    "Геологические журналы",
    "Литология, изменения, минерализация, прожилки, тектоника, техника и инклинометрия — с общей привязкой к глубине.",
  ],
  [
    "02",
    "Геомеханика и бурение",
    "Рейсы, диаметр керна, TCR / SCR / RQD, прочность по ISRM, выветрелость и состояние керна.",
  ],
  [
    "03",
    "Опробование и QA/QC",
    "Интервалы и номера проб, стандарты CRM, холостые пробы, полевые и лабораторные дубликаты.",
  ],
  [
    "04",
    "Карта и геологический разрез",
    "Координаты устьев, профили, траектории скважин и сопоставление литологических интервалов.",
  ],
  [
    "05",
    "Документация и контроль",
    "Акты по скважине, лабораторные формы, проверка интервалов, сводки и видимые статусы синхронизации.",
  ],
];
export function Output() {
  return (
    <>
      <section className="coverage wrap" aria-labelledby="coverage-title">
        <div className="coverage-intro">
          <span className="eyebrow">Не упустить главное</span>
          <h2 id="coverage-title">
            Всё, что остаётся
            <br />
            после полевого дня.
          </h2>
          <p>
            В каждой области — свой инструмент.
            <br />
            Между областями — связь данных.
          </p>
        </div>
        <div className="coverage-list">
          {capabilities.map(([n, title, text]) => (
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
            <span className="eyebrow">Результат, а не ещё один файл</span>
            <h2>
              Из наблюдений —<br />в документы
              <br />и модели.
            </h2>
            <p>
              Соберите данные один раз. Подготовьте их для отчётности,
              лаборатории и дальнейшей интерпретации.
            </p>
            <div className="output-input">
              <FolderInput size={20} />
              <div>
                <b>Импорт без смены привычного процесса</b>
                <p>
                  Таблицы и шаблоны для переноса исходных записей. Текстовый
                  импорт — как вспомогательный инструмент, с проверкой
                  результата.
                </p>
              </div>
            </div>
          </div>
          <div className="deliverables">
            <article className="deliverable">
              <span className="deliverable-icon">
                <FileText />
              </span>
              <div>
                <span className="tiny-label">01 / ДОКУМЕНТАЦИЯ</span>
                <h3>Акты и рабочие формы</h3>
                <p>
                  Заложение, контрольный замер, закрытие, рекультивация и
                  инклинометрия. Документы отбора и передачи проб.
                </p>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </article>
            <article className="deliverable">
              <span className="deliverable-icon">
                <FileSpreadsheet />
              </span>
              <div>
                <span className="tiny-label">02 / ДАННЫЕ</span>
                <h3>Таблицы для профильного ПО</h3>
                <p>
                  Паспорта скважин, интервальные данные и опробование в CSV /
                  Excel. Структура для дальнейшей обработки и моделирования.
                </p>
                <div className="format-tags">
                  <span>COLLAR</span>
                  <span>SURVEY</span>
                  <span>LITHOLOGY</span>
                  <span>ASSAY</span>
                </div>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </article>
            <p className="integration-note">
              Выгрузка таблиц для Micromine, Leapfrog, Datamine и GIS-сред.
              Совместимость зависит от шаблона импорта выбранной программы; это
              не прямые интеграции и не партнёрства.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
export function FieldAndTeam() {
  return (
    <section className="team-section wrap" id="team">
      <div className="team-heading">
        <span className="eyebrow">Участок ↔ офис</span>
        <h2>
          Работа продолжается.
          <br />
          <span>Даже вне сети.</span>
        </h2>
        <p>
          Полевые условия не должны диктовать структуру данных. А командная
          работа — лишать их контроля.
        </p>
      </div>
      <div className="team-layout">
        <div className="field-panel">
          <div className="field-panel-top">
            <span className="mono">ПОЛЕВОЙ РЕЖИМ</span>
            <WifiOff size={20} />
          </div>
          <div className="field-large">
            Сначала сохранение.
            <br />
            Затем синхронизация.
          </div>
          <div className="sync-timeline">
            <div>
              <span className="sync-circle">
                <Check size={13} />
              </span>
              <span>Изменения сохранены на устройстве</span>
              <b className="mono">LOCAL</b>
            </div>
            <div>
              <span className="sync-circle waiting">
                <ArrowRight size={13} />
              </span>
              <span>Очередь ждёт подключения</span>
              <b className="mono">PENDING</b>
            </div>
            <div>
              <span className="sync-circle outline">
                <Check size={13} />
              </span>
              <span>Отправка и подтверждение сервера</span>
              <b className="mono">SYNC</b>
            </div>
          </div>
          <p>
            Неотправленные изменения и конфликты видны в центре синхронизации.
            Первичный вход и восстановление ключей требуют интернета.
          </p>
        </div>
        <div className="team-notes">
          <article>
            <UsersRound size={24} />
            <div>
              <h3>Роли, компании и ответственность</h3>
              <p>
                ADMIN управляет доступом, GEOLOGIST работает с данными своей
                компании, VIEWER просматривает разрешённые проекты. Запросы
                удаления и восстановления проходят согласование.
              </p>
            </div>
          </article>
          <article>
            <KeyRound size={24} />
            <div>
              <h3>Ключи — под контролем аккаунта</h3>
              <p>
                Содержимое проектов и скважин шифруется перед отправкой. Доступ
                к ключу компании выдаётся после сверки отпечатка (fingerprint)
                ключа сотрудника администратором. На другом браузере ключ
                аккаунта восстанавливается по мастер-паролю.
              </p>
              <span className="security-note">
                Клиентское шифрование не заменяет защиту устройства. Аудит и
                тексты запросов удаления / восстановления пока не зашифрованы
                этим контуром.
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
const questions = [
  [
    "Это рабочее приложение или только презентация?",
    "Этот сайт — обзор возможностей Geocore.vista. Презентационные экраны используют вымышленные проекты и адаптированный интерфейс. Кнопка «В приложение» ведёт в отдельную рабочую систему. Для работы с данными нужен аккаунт, созданный администратором.",
  ],
  [
    "Можно ли работать на участке без интернета?",
    "После первоначальной настройки приложение сохраняет изменения на устройстве и ведёт очередь отправки. При восстановлении связи можно синхронизировать данные и проверить результат. Первый онлайн-вход, выдача доступа и восстановление ключей на новом браузере требуют подключения.",
  ],
  [
    "С чего начинается работа геолога?",
    "С проекта и паспорта скважины: координаты, параметры бурения и идентификатор. Затем добавляются рейсы, геологические интервалы, опробование и контрольные записи. Карта, разрезы и документы используют этот общий контекст.",
  ],
  [
    "Как перенести данные в другое геологическое ПО?",
    "Через выгрузку структурированных таблиц и настройку соответствующего шаблона импорта в принимающей программе. Паспорта, инклинометрия, литология и опробование передаются отдельными связанными наборами. На сайте не заявляются автоматические API-интеграции с внешними продуктами.",
  ],
  [
    "Что происходит при смене компьютера или браузера?",
    "Войдите в свой аккаунт и восстановите его ключ из облачной зашифрованной копии по личному мастер-паролю. ADMIN сверяет fingerprint ключа сотрудника и выдаёт доступ компании. Восстановление ключа не переносит неотправленные локальные черновики с другого устройства.",
  ],
];
export function FAQ() {
  return (
    <section className="faq-section wrap" id="faq">
      <div>
        <span className="eyebrow">Перед началом работы</span>
        <h2>По существу.</h2>
        <p>
          Короткие ответы
          <br />
          на практические вопросы.
        </p>
      </div>
      <div className="faq-list">
        {questions.map(([q, a], i) => (
          <details key={q}>
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
  return (
    <>
      <section className="closing">
        <div className="wrap closing-inner">
          <div>
            <span className="eyebrow">Посмотрите рабочую среду</span>
            <h2>
              Геология сложная.
              <br />
              Рабочий процесс — нет.
            </h2>
          </div>
          <div>
            <a
              className="button button-copper"
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Открыть Geocore.vista <ArrowUpRight size={19} />
            </a>
            <p>Рабочая система · вход по аккаунту</p>
          </div>
        </div>
      </section>
      <footer className="footer wrap">
        <a href="#" aria-label="Начало страницы">
          <Brand />
        </a>
        <span>Рабочая среда геологической документации</span>
        <a href="#capabilities">
          К обзору <ArrowUpRight size={14} />
        </a>
        <div className="footer-bottom">
          <span>© {2026} Geocore.vista</span>
          <span>Все данные на этом сайте — демонстрационные.</span>
          <span className="mono">FIELD / OFFICE / ONE WORKFLOW</span>
        </div>
      </footer>
    </>
  );
}
