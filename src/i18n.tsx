import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Lang = "ru" | "kk" | "en";

export const LANG_LABELS: { code: Lang; label: string; name: string }[] = [
  { code: "ru", label: "RU", name: "Русский" },
  { code: "kk", label: "KZ", name: "Қазақша" },
  { code: "en", label: "EN", name: "English" },
];

export const translations = {
  ru: {
    skipLink: "Перейти к содержимому",
    header: {
      homeAria: "Geocore.vista — начало страницы",
      navAria: "Основная навигация",
      langAria: "Выбор языка",
      menuOpen: "Открыть меню",
      menuClose: "Закрыть меню",
      nav: [
        ["Возможности", "#capabilities"],
        ["Результат", "#output"],
        ["Для команды", "#team"],
        ["Вопросы", "#faq"],
      ] as [string, string][],
    },
    hero: {
      eyebrow: "Рабочая среда геолога",
      titleLine1: "От устья",
      titleLine2: "до готового",
      titleAccent: "акта.",
      description:
        "Проекты, геологическая документация и контроль данных — в одной системе. На участке, в офисе и между командами.",
      cta: "Посмотреть возможности",
      bottomSubLine1: "Создано вокруг",
      bottomSubLine2: "реальной работы геолога",
      coreAlt:
        "Образцы бурового керна с кварцевыми прожилками и зонами окисления",
      coreRule: "КЕРН — НАЧАЛО ИСТОРИИ ДАННЫХ",
      floatingLine1: "Каждый интервал.",
      floatingStrong: "В общем контексте.",
      strip: [
        "ГЕОЛОГИЧЕСКАЯ ДОКУМЕНТАЦИЯ",
        "GIS И РАЗРЕЗЫ",
        "КЕРН И QA/QC",
        "АКТЫ И ЭКСПОРТ",
      ],
    },
    workflow: {
      eyebrow: "Рабочий процесс",
      titleLine1: "Одна скважина.",
      titleLine2: "Весь рабочий цикл.",
      description:
        "Единая цепочка данных: от полевого описания керна до сводных ведомостей и производственных актов.",
      steps: [
        ["01", "Организуйте", "Проект, участки, паспорта скважин."],
        ["02", "Документируйте", "Рейсы, интервалы и наблюдения."],
        ["03", "Проверьте", "Связность данных и контрольные пробы."],
        ["04", "Передайте", "Таблицы, акты и доступ команде."],
      ] as [string, string, string][],
    },
    showcase: {
      eyebrow: "Возможности / интерфейс",
      titleLine1: "Все модули геолога",
      titleAccent: "в одном окне.",
      subtitleLine1: "Интерфейс основных модулей",
      subtitleLine2: "на данных демонстрационного проекта.",
      tablistAria: "Области приложения",
      viewResultsLink: "Посмотреть готовые результаты",
      screenBar: "GEOCORE.VISTA / РЕАЛЬНЫЙ ИНТЕРФЕЙС",
      demoBadge: "ДЕМО-ДАННЫЕ",
      expandButton: "Рассмотреть",
      openFullAria: "Открыть в полном размере",
      originalImage: "Исходное изображение",
      closeViewerAria: "Закрыть просмотр",
      captionMono: "НАСТОЯЩИЕ ИНСТРУМЕНТЫ / ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ",
      captionText:
        "Снято в локальной сборке приложения. Встроенный демо-проект, без раскрытия пользовательских данных.",
      tabs: [
        {
          name: "Проекты",
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
          name: "Ежедневные сводки",
          title: "Сводка буровых работ и аналитика смен.",
          text: "Авторасчёт глубин «От / До», метража за смену и накопленного бурения с привязкой к проекту, скважине, буровому станку и смене. Динамика проходки по дням, ведомость смен и выгрузка в PDF A4 / Excel.",
          points: [
            "Авторасчёт проходки, накопленного метража и выхода керна",
            "Прогресс по скважинам и суточная динамика бурения (план / факт)",
            "Импорт из рейсов скважины или Excel, экспорт в PDF A4 и CSV",
          ],
          image: "daily-reports-ui.svg",
          caption: "Реальная сводка буровых работ · BUR-26-001",
        },
        {
          name: "Документы",
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
      ],
    },
    realResults: {
      eyebrow: "Примеры выгрузки",
      titleLine1: "Готовые разрезы",
      titleLine2: "и бланки актов.",
      subtitleLine1: "Исходные файлы из генератора приложения.",
      subtitleLine2: "Доступны для просмотра и скачивания.",
      selectorAria: "Выбор результата",
      labelAct: "ПРОИЗВОДСТВЕННЫЙ АКТ / A4",
      labelSection: "ГЕОЛОГИЧЕСКИЙ РАЗРЕЗ / SVG",
      privacyNote:
        "Публичный встроенный демо-проект. Производственные данные клиентов не используются.",
      items: [
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
      ],
    },
    coverage: {
      eyebrow: "Модули системы",
      titleLine1: "Полный контур",
      titleLine2: "полевых работ.",
      subtitleLine1: "Специализированные журналы и таблицы",
      subtitleLine2: "с общей привязкой к скважине и глубине.",
      capabilities: [
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
          "Ежедневные сводки и акты",
          "Сводка буровых работ по сменам, авторасчёт глубин и проходки, производственные акты A4, лабораторные формы и статусы синхронизации.",
        ],
      ] as [string, string, string][],
    },
    output: {
      eyebrow: "Экспорт и отчётность",
      titleLine1: "Выгрузка в отчёты",
      titleLine2: "и профильное ПО.",
      description:
        "Соберите данные один раз. Подготовьте их для отчётности, лаборатории и дальнейшей интерпретации.",
      inputTitle: "Импорт таблиц и полевых записей",
      inputText:
        "Таблицы и шаблоны для переноса исходных записей. Текстовый импорт с проверкой границ и интервалов.",
      deliv1Label: "01 / ДОКУМЕНТАЦИЯ",
      deliv1Title: "Акты и рабочие формы",
      deliv1Text:
        "Заложение, контрольный замер, закрытие, рекультивация и инклинометрия. Документы отбора и передачи проб.",
      deliv2Label: "02 / ДАННЫЕ",
      deliv2Title: "Таблицы для профильного ПО",
      deliv2Text:
        "Паспорта скважин, интервальные данные и опробование в CSV / Excel. Структура для дальнейшей обработки и моделирования.",
      softwareAria: "Профильное ПО",
    },
    team: {
      eyebrow: "Участок ↔ офис",
      titleLine1: "Автономная работа",
      titleAccent: "и синхронизация.",
      fieldBadge: "ПОЛЕВОЙ РЕЖИМ",
      fieldTitleLine1: "Локальное сохранение",
      fieldTitleLine2: "и очередь отправки.",
      sync1: "Изменения сохранены на устройстве",
      sync2: "Очередь ждёт подключения",
      sync3: "Отправка и подтверждение сервера",
      fieldFoot:
        "Неотправленные изменения и конфликты видны в центре синхронизации. Первичный вход и восстановление ключей требуют интернета.",
      note1Title: "Роли, компании и ответственность",
      note1Text:
        "ADMIN управляет доступом, GEOLOGIST работает с данными своей компании, VIEWER просматривает разрешённые проекты. Запросы удаления и восстановления проходят согласование.",
      note2Title: "Ваши данные — под защитой",
      note2Text:
        "Содержимое проектов и скважин защищено клиентским шифрованием AES-GCM перед отправкой на сервер. Доступ к ключу компании выдаётся после сверки отпечатка (fingerprint) ключа сотрудника администратором. На другом браузере ключ аккаунта восстанавливается по мастер-паролю.",
      highlights: ["AES-GCM", "Роли и компании", "Подтверждённые ключи"],
      securityNote:
        "Клиентское шифрование не заменяет защиту устройства. Аудит и тексты запросов удаления / восстановления пока не зашифрованы этим контуром.",
    },
    faq: {
      eyebrow: "Частые вопросы",
      title: "Вопросы и ответы",
      subtitleLine1: "Короткие ответы",
      subtitleLine2: "на практические вопросы.",
      questions: [
        [
          "Это рабочее приложение или только презентация?",
          "Этот сайт — обзор возможностей Geocore.vista. Здесь показаны настоящие экраны приложения, разрез и A4 акты, сформированные его инструментами на встроенном демо-проекте. Для подключения и получения доступа к рабочей системе свяжитесь с нами в WhatsApp по номеру +77064101339 или по почте geocorevista@gmail.com.",
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
          "Через выгрузку структурированных таблиц и настройку соответствующего шаблона импорта в принимающей программе. Паспорта, инклинометрия, литология и опробование передаются отдельными связанными наборами.",
        ],
        [
          "Что происходит при смене компьютера или браузера?",
          "Войдите в свой аккаунт и восстановите его ключ из облачной зашифрованной копии по личному мастер-паролю. ADMIN сверяет fingerprint ключа сотрудника и выдаёт доступ компании. Восстановление ключа не переносит неотправленные локальные черновики с другого устройства.",
        ],
      ] as [string, string][],
    },
    footer: {
      closingEyebrow: "Свяжитесь с нами",
      closingTitleLine1: "Связаться с командой",
      closingTitleLine2: "Geocore.vista",
      closingCaption: "WhatsApp и почта для связи и подключения",
      topAria: "Начало страницы",
      tagline: "Рабочая среда геологической документации",
      toOverview: "К обзору",
      disclaimer: "Все данные на этом сайте — демонстрационные.",
    },
  },
  kk: {
    skipLink: "Негізгі мазмұнға өту",
    header: {
      homeAria: "Geocore.vista — беттің басы",
      navAria: "Негізгі навигация",
      langAria: "Тілді таңдау",
      menuOpen: "Мәзірді ашу",
      menuClose: "Мәзірді жабу",
      nav: [
        ["Мүмкіндіктер", "#capabilities"],
        ["Нәтиже", "#output"],
        ["Команда үшін", "#team"],
        ["Сұрақтар", "#faq"],
      ] as [string, string][],
    },
    hero: {
      eyebrow: "Геологтың жұмыс ортасы",
      titleLine1: "Ұңғыма сағасынан",
      titleLine2: "дайын актіге",
      titleAccent: "дейін.",
      description:
        "Жобалар, геологиялық құжаттама және деректерді бақылау — бір жүйеде. Учаскеде, кеңседе және командалар арасында.",
      cta: "Мүмкіндіктерді көру",
      bottomSubLine1: "Геологтың нақты",
      bottomSubLine2: "жұмысы негізінде жасалған",
      coreAlt:
        "Кварц желілері мен тотығу аймақтары бар бұрғылау кернінің үлгілері",
      coreRule: "КЕРН — ДЕРЕКТЕР ТАРИХЫНЫҢ БАСТАУЫ",
      floatingLine1: "Әрбір интервал.",
      floatingStrong: "Ортақ контексте.",
      strip: [
        "ГЕОЛОГИЯЛЫҚ ҚҰЖАТТАМА",
        "GIS ЖӘНЕ ҚИМАЛАР",
        "КЕРН ЖӘНЕ QA/QC",
        "АКТІЛЕР МЕН ЭКСПОРТ",
      ],
    },
    workflow: {
      eyebrow: "Жұмыс процесі",
      titleLine1: "Бір ұңғыма.",
      titleLine2: "Толық жұмыс циклі.",
      description:
        "Бірыңғай деректер тізбегі: кернді далалық сипаттаудан бастап жиынтық ведомостар мен өндірістік актілерге дейін.",
      steps: [
        ["01", "Ұйымдастырыңыз", "Жоба, учаскелер, ұңғыма төлқұжаттары."],
        ["02", "Құжаттаңыз", "Рейстер, интервалдар және бақылаулар."],
        ["03", "Тексеріңіз", "Деректер байланысы және бақылау сынамалары."],
        ["04", "Тапсырыңыз", "Кестелер, актілер және командаға қолжетімділік."],
      ] as [string, string, string][],
    },
    showcase: {
      eyebrow: "Мүмкіндіктер / интерфейс",
      titleLine1: "Геологтың барлық модульдері",
      titleAccent: "бір терезеде.",
      subtitleLine1: "Негізгі модульдер интерфейсі",
      subtitleLine2: "демонстрациялық жоба деректерінде.",
      tablistAria: "Қосымша бөлімдері",
      viewResultsLink: "Дайын нәтижелерді көру",
      screenBar: "GEOCORE.VISTA / НАҚТЫ ИНТЕРФЕЙС",
      demoBadge: "ДЕМО-ДЕРЕКТЕР",
      expandButton: "Толық қарау",
      openFullAria: "Толық өлшемде ашу",
      originalImage: "Түпнұсқа кескін",
      closeViewerAria: "Көруді жабу",
      captionMono: "НАҚТЫ ҚҰРАЛДАР / ДЕМОНСТРАЦИЯЛЫҚ ДЕРЕКТЕР",
      captionText:
        "Қосымшаның жергілікті жинағында түсірілген. Кіріктірілген демо-жоба, пайдаланушы деректері жарияланбайды.",
      tabs: [
        {
          name: "Жобалар",
          title: "Жобалар мен ұңғымалар құрылымы.",
          text: "Ұңғымалар, параметрлер және жұмыс файлдары бірыңғай кеңістікте. Мұнда қосымшаның кіріктірілген демонстрациялық жобасының бумасы көрсетілген.",
          points: [
            "Жобалар мен учаскелер бумалары",
            "Ұңғымалардың төлқұжаттары, координаттары мен мәртебелері",
            "Іздеу және бірыңғай деректер құрылымы",
          ],
          image: "projects-ui.webp",
          caption: "Жобаның нақты бумасы · Бурабай-Жалғызағаш",
        },
        {
          name: "Карта және қима",
          title: "Профиль бойынша қималарды тұрғызу.",
          text: "Төрт демо-ұңғыма бойынша қосымша тұрғызған ПР-10 профилінің қимасы: бағандар, интервалдар, траекториялар және шартты белгілер.",
          points: [
            "Профильдер және ұңғымаларды таңдау",
            "Биіктік белгілері және литология интервалдары",
            "Петрографиялық шартты белгілер және SVG / PNG / PDF экспорты",
          ],
          image: "section-ui.webp",
          caption: "Қиманың нақты интерфейсі · ПР-10 / 4 ұңғыма",
        },
        {
          name: "Құжаттама",
          title: "Журналдарды интервал бойынша жүргізу.",
          text: "BUR-26-001 литологиялық журналының экраны. Тереңдік интервалдары, бастапқы таужыныс және бақылаулар ұңғыманың біртұтас контексінде сақталады.",
          points: [
            "Литология · өзгерістер · минералдану",
            "Желілер · тектоника · техника · инклинометрия",
            "Интервалдар, сипаттамалар және шекараларды тексеру",
          ],
          image: "journal-ui.webp",
          caption: "Нақты журнал · BUR-26-001",
        },
        {
          name: "Керн және QA/QC",
          title: "Рейстерді есепке алу және сапаны бақылау.",
          text: "Бұрғылау интервалдары бойынша қатардағы және бақылау сынамаларын жүргізу. CRM стандарттары, бос сынамалар мен телнұсқалар ұңғымаға байланыстырылған.",
          points: [
            "Drilling Parameters және геомеханика",
            "TCR / SCR / RQD және ISRM параметрлері",
            "Қатардағы сынамалар, CRM, Blank және телнұсқалар",
          ],
          image: "sampling-ui.webp",
          caption: "Сынама алудың нақты модулі · BUR-26-001",
        },
        {
          name: "Күнделікті мәліметтер",
          title: "Бұрғылау жұмыстарының мәліметі және ауысым аналитикасы.",
          text: "Жобаға, ұңғымаға, бұрғылау станогына және ауысымға байланыстыра отырып, «Бастап / Дейін» тереңдіктерін, ауысымдағы метражды және жинақталған бұрғылауды автоесептеу. Күндер бойынша өтім динамикасы және PDF A4 / Excel экспорты.",
          points: [
            "Өтімді, жинақталған метражды және керн шығымын автоесептеу",
            "Ұңғымалар бойынша прогресс және тәуліктік бұрғылау динамикасы (жоспар / факт)",
            "Ұңғыма рейстерінен немесе Excel-ден импорттау, PDF A4 және CSV экспорты",
          ],
          image: "daily-reports-ui.svg",
          caption: "Бұрғылау жұмыстарының нақты мәліметі · BUR-26-001",
        },
        {
          name: "Құжаттар",
          title: "Өндірістік актілерді қалыптастыру.",
          text: "Генератор ұңғыма төлқұжаты, рейстер мен өлшемдер негізінде актілерді қалыптастырады. Төменде A4 бастапқы нысандарын қарап, қосымша жасаған толық PDF файлын жүктеپ алуға болады.",
          points: [
            "Салу, өлшеу және жабу актілері",
            "Рекультивация және инклинометрия",
            "Демонстрациялық PDF-пакетте 6 бет",
          ],
          image: "acts-ui.webp",
          caption: "Актілердің нақты генераторы · BUR-26-001",
        },
      ],
    },
    realResults: {
      eyebrow: "Жүктеу үлгілері",
      titleLine1: "Дайын қималар",
      titleLine2: "мен акт бланкілері.",
      subtitleLine1: "Қосымша генераторынан алынған бастапқы файлдар.",
      subtitleLine2: "Көруге және жүктеп алуға қолжетімді.",
      selectorAria: "Нәтижені таңдау",
      labelAct: "ӨНДІРІСТІК АКТ / A4",
      labelSection: "ГЕОЛОГИЯЛЫҚ ҚИМА / SVG",
      privacyNote:
        "Ашық кіріктірілген демо-жоба. Клиенттердің өндірістік деректері пайдаланылмайды.",
      items: [
        {
          name: "Геологиялық қима",
          file: "section-export.webp",
          title: "Қосымша тұрғызатын қима.",
          text: "ПР-10 профилі: тереңдігі 350–550 м болатын төрт ұңғыма. Кіріктірілген демодағы нақты литологиялық интервалдар мен петрографиялық шартты белгілер, биіктік шкаласы және бастапқы экспорт шартты белгілері.",
          download: "geocore-section.svg",
          format: "SVG қимасын жүктеу",
          detail:
            "Қосымша renderer-інің бастапқы экспорты · 4 ұңғыма / 11 белгілеу",
          page: false,
        },
        {
          name: "Ұңғыманы салу",
          file: "act-spudding.webp",
          title: "Ұңғыманы салу туралы акт.",
          text: "Толық A4 нысаны: комиссия, саға координаттары, ұңғыма параметрлері мен мақсаты, керн шығымына қойылатын талаптар және қол қою жолдары. Бет қосымша қалыптастырған PDF файлынан алынған.",
          download: "geocore-demo-acts.pdf",
          format: "Актілер пакетін PDF жүктеу",
          detail: "BUR-26-001 · 1 / 6 бет · түпнұсқа PDF",
          page: true,
        },
        {
          name: "Бақылау өлшемі",
          file: "act-depth-check.webp",
          title: "Тереңдікті бақылау өлшемі актісі.",
          text: "Бұрғылау журналы мен бақылау өлшемі бойынша тереңдікті салыстыру, айырмашылықты және нақты қабылданған тереңдікті тіркеу. Экспорттау кезінде пайдаланушы алатын дәл сол нысан.",
          download: "geocore-demo-acts.pdf",
          format: "Актілер пакетін PDF жүктеу",
          detail: "BUR-26-001 · 2 / 6 бет · түпнұсқа PDF",
          page: true,
        },
        {
          name: "Жабу",
          file: "act-closure.webp",
          title: "Жабу және консервациялау.",
          text: "Өндірістік мәліметтер, нақты орналасуы мен тереңдігі, керн шығымы, ұңғыма конструкциясы және жабу кезіндегі іс-шаралар. Акт бастапқы пакеттің екі бетін алады.",
          download: "geocore-demo-acts.pdf",
          format: "Актілер пакетін PDF жүктеу",
          detail: "BUR-26-001 · 3–4 / 6 бет · бірінші бет көрсетілген",
          page: true,
        },
        {
          name: "Рекультивация",
          file: "act-reclamation.webp",
          title: "Алаңды рекультивациялау актісі.",
          text: "Бұрғылау алаңын қалпына келтіру бойынша толық нысан: учаске, комиссия құрамы, ауданы және орындалған жұмыстардың жай-күйі.",
          download: "geocore-demo-acts.pdf",
          format: "Актілер пакетін PDF жүктеу",
          detail: "BUR-26-001 · 5 / 6 бет · түпнұсқа PDF",
          page: true,
        },
        {
          name: "Инклинометрия",
          file: "act-inclinometry.webp",
          title: "Ұңғыма қисаюын өлшеу.",
          text: "Тереңдіктер, көлбеу бұрыштары мен азимуттар кестесі, аспап пен орындаушы туралы мәліметтер. Нәтиже A4 форматында қарауға және басып шығаруға дайын.",
          download: "geocore-demo-acts.pdf",
          format: "Актілер пакетін PDF жүктеу",
          detail: "BUR-26-001 · 6 / 6 бет · түпнұсқа PDF",
          page: true,
        },
      ],
    },
    coverage: {
      eyebrow: "Жүйе модульдері",
      titleLine1: "Далалық жұмыстардың",
      titleLine2: "толық контуры.",
      subtitleLine1: "Ұңғыма мен тереңдікке ортақ байланысы бар",
      subtitleLine2: "мамандандырылған журналдар мен кестелер.",
      capabilities: [
        [
          "01",
          "Геологиялық журналдар",
          "Литология, өзгерістер, минералдану, желілер, тектоника, техника және инклинометрия — тереңдікке ортақ байланыспен.",
        ],
        [
          "02",
          "Геомеханика және бұрғылау",
          "Рейстер, керн диаметрі, TCR / SCR / RQD, ISRM бойынша беріктік, мору және керннің жай-күйі.",
        ],
        [
          "03",
          "Сынама алу және QA/QC",
          "Сынама интервалдары мен нөмірлері, CRM стандарттары, бос сынамалар, далалық және зертханалық телнұсқалар.",
        ],
        [
          "04",
          "Карта және геологиялық қима",
          "Саға координаттары, профильдер, ұңғыма траекториялары және литологиялық интервалдарды салыстыру.",
        ],
        [
          "05",
          "Күнделікті мәліметтер мен актілер",
          "Ауысым бойынша бұрғылау мәліметтері, тереңдік пен өтімді автоесептеу, A4 өндірістік актілері, зертханалық нысандар және синхрондау мәртебелері.",
        ],
      ] as [string, string, string][],
    },
    output: {
      eyebrow: "Экспорт және есептілік",
      titleLine1: "Есептерге және бейінді",
      titleLine2: "БҚ-ға жүктеу.",
      description:
        "Деректерді бір рет жинаңыз. Оларды есептілікке, зертханаға және одан әрі интерпретациялауға дайындаңыз.",
      inputTitle: "Кестелер мен далалық жазбаларды импорттау",
      inputText:
        "Бастапқы жазбаларды көшіруге арналған кестелер мен үлгілер. Шекаралар мен интервалдарды тексеретін мәтіндік импорт.",
      deliv1Label: "01 / ҚҰЖАТТАМА",
      deliv1Title: "Актілер мен жұмыс нысандары",
      deliv1Text:
        "Ұңғыманы салу, бақылау өлшемі, жабу, рекультивация және инклинометрия. Сынамаларды алу және тапсыру құжаттары.",
      deliv2Label: "02 / ДЕРЕКТЕР",
      deliv2Title: "Бейінді БҚ-ға арналған кестелер",
      deliv2Text:
        "CSV / Excel форматындағы ұңғыма төлқұжаттары, интервалдық деректер және сынама алу. Одан әрі өңдеу мен модельдеуге арналған құрылым.",
      softwareAria: "Бейінді БҚ",
    },
    team: {
      eyebrow: "Учаске ↔ кеңсе",
      titleLine1: "Автономды жұмыс",
      titleAccent: "және синхрондау.",
      fieldBadge: "ДАЛАЛЫҚ РЕЖИМ",
      fieldTitleLine1: "Жергілікті сақтау",
      fieldTitleLine2: "және жіберу кезегі.",
      sync1: "Өзгерістер құрылғыда сақталды",
      sync2: "Кезек қосылымды күтуде",
      sync3: "Серверге жіберу және растау",
      fieldFoot:
        "Жіберілмеген өзгерістер мен қайшылықтар синхрондау орталығында көрінеді. Алғашқы кіру және кілттерді қалпына келтіру интернетті қажет етеді.",
      note1Title: "Рөлдер, компаниялар және жауапкершілік",
      note1Text:
        "ADMIN қолжетімділікті басқарады, GEOLOGIST өз компаниясының деректерімен жұмыс істейді, VIEWER рұқсат етілген жобаларды қарайды. Жою және қалпына келтіру сұраулары келісуден өтеді.",
      note2Title: "Деректеріңіз — қорғауда",
      note2Text:
        "Жобалар мен ұңғымалардың мазмұны серверге жіберілмес бұрын клиенттік AES-GCM шифрлауымен қорғалған. Компания кілтіне қолжетімділік әкімші қызметкер кілтінің таңбасын (fingerprint) салыстырғаннан кейін беріледі. Басқа браузерде аккаунт кілті мастер-құпиясөз арқылы қалпына келтіріледі.",
      highlights: ["AES-GCM", "Рөлдер мен компаниялар", "Расталған кілттер"],
      securityNote:
        "Клиенттік шифрлау құрылғыны қорғауды алмастырмайды. Аудит және жою / қалпына келтіру сұрауларының мәтіндері әзірше бұл контурмен шифрланбаған.",
    },
    faq: {
      eyebrow: "Жиі қойылатын сұрақтар",
      title: "Сұрақтар мен жауаптар",
      subtitleLine1: "Тәжірибелік сұрақтарға",
      subtitleLine2: "қысқаша жауаптар.",
      questions: [
        [
          "Бұл жұмыс істейтін қосымша ма, әлде тек таныстырылым ба?",
          "Бұл сайт — Geocore.vista мүмкіндіктеріне шолу. Мұнда кіріктірілген демо-жобада қосымша құралдарымен жасалған нақты экрандар, қима және A4 актілері көрсетілген. Жұмыс жүйесіне қосылу және қолжетімділік алу үшін бізге WhatsApp арқылы +77064101339 нөміріне немесе geocorevista@gmail.com поштасына жазыңыз.",
        ],
        [
          "Учаскеде интернетсіз жұмыс істеуге бола ма?",
          "Бастапқы баптаудан кейін қосымша өзгерістерді құрылғыда сақтайды және жіберу кезегін жүргізеді. Байланыс қалпына келгенде деректерді синхрондап, нәтижені тексеруге болады. Алғашқы онлайн кіру, рұқсат беру және жаңа браузерде кілттерді қалпына келтіру интернет қосылымын қажет етеді.",
        ],
        [
          "Геологтың жұмысы неден басталады?",
          "Жоба мен ұңғыма төлқұжатынан: координаттар, бұрғылау параметрлері және идентификатор. Содан кейін рейстер, геологиялық интервалдар, сынама алу және бақылау жазбалары қосылады. Карта, қималар және құжаттар осы ортақ контексті пайдаланады.",
        ],
        [
          "Деректерді басқа геологиялық БҚ-ға қалай көшіруге болады?",
          "Құрылымдалған кестелерді жүктеу және қабылдаушы бағдарламада тиісті импорт үлгісін баптау арқылы. Төлқұжаттар, инклинометрия, литология және сынама алу өзара байланысқан жеке жиынтықтармен беріледі.",
        ],
        [
          "Компьютерді немесе браузерді ауыстырғанда не болады?",
          "Аккаунтыңызға кіріп, жеке мастер-құпиясөз арқылы бұлттағы шифрланған көшірмеден оның кілтін қалпына келтіріңіз. ADMIN қызметкер кілтінің fingerprint-ін тексеріп, компания рұқсатын береді. Кілтті қалпына келтіру басқа құрылғыдағы жіберілмеген жергілікті жоба жазбаларын көшірмейді.",
        ],
      ] as [string, string][],
    },
    footer: {
      closingEyebrow: "Бізбен байланысыңыз",
      closingTitleLine1: "Geocore.vista командасымен",
      closingTitleLine2: "байланысу",
      closingCaption: "Байланыс және қосылу үшін WhatsApp пен пошта",
      topAria: "Беттің басы",
      tagline: "Геологиялық құжаттаманың жұмыс ортасы",
      toOverview: "Шолуға өту",
      disclaimer: "Осы сайттағы барлық деректер — демонстрациялық.",
    },
  },
  en: {
    skipLink: "Skip to content",
    header: {
      homeAria: "Geocore.vista — top of page",
      navAria: "Main navigation",
      langAria: "Language switcher",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      nav: [
        ["Capabilities", "#capabilities"],
        ["Deliverables", "#output"],
        ["For Teams", "#team"],
        ["FAQ", "#faq"],
      ] as [string, string][],
    },
    hero: {
      eyebrow: "Geologist's workspace",
      titleLine1: "From collar",
      titleLine2: "to signed",
      titleAccent: "record.",
      description:
        "Projects, geological logging, and data validation in one environment. At the drill site, in the office, and across teams.",
      cta: "Explore capabilities",
      bottomSubLine1: "Built around",
      bottomSubLine2: "real field geology workflows",
      coreAlt: "Drill core samples with quartz veining and oxidation zones",
      coreRule: "CORE — WHERE THE DATA STORY BEGINS",
      floatingLine1: "Every interval.",
      floatingStrong: "In shared context.",
      strip: [
        "GEOLOGICAL LOGGING",
        "GIS & CROSS-SECTIONS",
        "CORE & QA/QC",
        "CERTIFICATES & EXPORT",
      ],
    },
    workflow: {
      eyebrow: "Workflow",
      titleLine1: "One drillhole.",
      titleLine2: "The complete lifecycle.",
      description:
        "A continuous data chain: from field core description to consolidated tables and statutory drillhole certificates.",
      steps: [
        ["01", "Organize", "Project, prospects, drillhole collars."],
        ["02", "Log", "Runs, intervals, and geological observations."],
        ["03", "Validate", "Interval topology and QA/QC control samples."],
        ["04", "Deliver", "Export tables, certificates, and team access."],
      ] as [string, string, string][],
    },
    showcase: {
      eyebrow: "Capabilities / interface",
      titleLine1: "Every geological module",
      titleAccent: "in one window.",
      subtitleLine1: "Core application workspaces",
      subtitleLine2: "shown on built-in demonstration project data.",
      tablistAria: "Application modules",
      viewResultsLink: "View exported deliverables",
      screenBar: "GEOCORE.VISTA / LIVE APPLICATION UI",
      demoBadge: "DEMO DATA",
      expandButton: "Inspect",
      openFullAria: "Open full size",
      originalImage: "Original image",
      closeViewerAria: "Close viewer",
      captionMono: "REAL TOOLS / DEMONSTRATION DATASET",
      captionText:
        "Captured from a local build of the application using the built-in demo project—no client data exposed.",
      tabs: [
        {
          name: "Projects",
          title: "Project and drillhole hierarchy.",
          text: "Drillholes, collar parameters, and working files in a unified workspace. Shown here is the built-in demonstration project folder.",
          points: [
            "Project and license area folders",
            "Collar coordinates, parameters, and statuses",
            "Instant search and unified data structure",
          ],
          image: "projects-ui.webp",
          caption: "Actual project folder · Burabay-Zhalgyzagash",
        },
        {
          name: "Map & Section",
          title: "Profile cross-section generation.",
          text: "Cross-section along profile PR-10 generated across four demo drillholes: lithology columns, intervals, traces, and legend.",
          points: [
            "Section lines and drillhole selection",
            "Elevation scales and lithological intervals",
            "Petrographic hatches and SVG / PNG / PDF export",
          ],
          image: "section-ui.webp",
          caption: "Actual cross-section workspace · PR-10 / 4 drillholes",
        },
        {
          name: "Logging",
          title: "Interval-based geological logs.",
          text: "Lithology log screen for hole BUR-26-001. Depth intervals, primary rock types, and observations stay linked to the drillhole context.",
          points: [
            "Lithology · alteration · mineralization",
            "Veining · structure · drilling · downhole survey",
            "Intervals, descriptions, and boundary validation",
          ],
          image: "journal-ui.webp",
          caption: "Actual logging view · BUR-26-001",
        },
        {
          name: "Core & QA/QC",
          title: "Core run tracking and quality control.",
          text: "Routine and control sampling across drilling intervals. CRM standards, blanks, and duplicates are tied directly to the drillhole.",
          points: [
            "Drilling parameters and geomechanics",
            "TCR / SCR / RQD and ISRM rock strength",
            "Primary samples, CRMs, blanks, and duplicates",
          ],
          image: "sampling-ui.webp",
          caption: "Actual sampling & QA/QC module · BUR-26-001",
        },
        {
          name: "Daily Reports",
          title: "Daily drilling shift reports & progress analytics.",
          text: "Automatic calculation of From / To depths, shift advance, and cumulative footage linked to project, drillhole, rig, and shift. Daily drilling dynamics, shift logbook, and PDF A4 / Excel exports.",
          points: [
            "Auto-calculated shift advance, cumulative meters, and core recovery",
            "Borehole progress tracking and daily plan vs. actual dynamics",
            "Populate from drill runs or Excel, export to PDF A4 and CSV",
          ],
          image: "daily-reports-ui.svg",
          caption: "Actual drill shift report · BUR-26-001",
        },
        {
          name: "Documents",
          title: "Automated statutory drillhole acts.",
          text: "The generator compiles official certificates from collar data, runs, and depth checks. Inspect the A4 sheets below or download the complete PDF.",
          points: [
            "Spudding, depth check, and hole closure acts",
            "Site reclamation and downhole inclinometry",
            "6 pages in the demonstration PDF package",
          ],
          image: "acts-ui.webp",
          caption: "Actual document generator · BUR-26-001",
        },
      ],
    },
    realResults: {
      eyebrow: "Sample exports",
      titleLine1: "Ready cross-sections",
      titleLine2: "and statutory forms.",
      subtitleLine1: "Original files produced by the application generator.",
      subtitleLine2: "Available to inspect and download.",
      selectorAria: "Select deliverable",
      labelAct: "DRILLHOLE CERTIFICATE / A4",
      labelSection: "GEOLOGICAL CROSS-SECTION / SVG",
      privacyNote:
        "Public built-in demonstration project. No proprietary client data is used.",
      items: [
        {
          name: "Geological Section",
          file: "section-export.webp",
          title: "Cross-section built by the app.",
          text: "Profile PR-10: four drillholes ranging from 350 to 550 m depth. Real lithological intervals and petrographic hatches from the built-in demo, elevation scale, and native legend.",
          download: "geocore-section.svg",
          format: "Download SVG section",
          detail:
            "Native output from application renderer · 4 holes / 11 legend items",
          page: false,
        },
        {
          name: "Spudding",
          file: "act-spudding.webp",
          title: "Drillhole spudding certificate.",
          text: "Complete A4 statutory form: commission members, collar coordinates, target parameters, core recovery requirements, and signature blocks. Extracted directly from the app-generated PDF.",
          download: "geocore-demo-acts.pdf",
          format: "Download PDF acts package",
          detail: "BUR-26-001 · page 1 / 6 · original PDF",
          page: true,
        },
        {
          name: "Depth Check",
          file: "act-depth-check.webp",
          title: "Control depth measurement act.",
          text: "Comparison between driller's log depth and control measurement, discrepancy recording, and accepted depth sign-off. Exact form exported by the user.",
          download: "geocore-demo-acts.pdf",
          format: "Download PDF acts package",
          detail: "BUR-26-001 · page 2 / 6 · original PDF",
          page: true,
        },
        {
          name: "Closure",
          file: "act-closure.webp",
          title: "Hole closure and abandonment.",
          text: "Operational summary, final collar location and depth, core recovery, casing design, and abandonment procedures. Spans two pages of the package.",
          download: "geocore-demo-acts.pdf",
          format: "Download PDF acts package",
          detail: "BUR-26-001 · pages 3–4 / 6 · first page shown",
          page: true,
        },
        {
          name: "Reclamation",
          file: "act-reclamation.webp",
          title: "Drill site reclamation certificate.",
          text: "Full statutory form documenting drill pad restoration: prospect area, commission members, reclaimed area, and completion status.",
          download: "geocore-demo-acts.pdf",
          format: "Download PDF acts package",
          detail: "BUR-26-001 · page 5 / 6 · original PDF",
          page: true,
        },
        {
          name: "Inclinometry",
          file: "act-inclinometry.webp",
          title: "Downhole deviation survey.",
          text: "Table of measured depths, dip angles, and azimuths, instrument metadata, and surveyor sign-off. Ready for review and A4 printing.",
          download: "geocore-demo-acts.pdf",
          format: "Download PDF acts package",
          detail: "BUR-26-001 · page 6 / 6 · original PDF",
          page: true,
        },
      ],
    },
    coverage: {
      eyebrow: "System modules",
      titleLine1: "Complete field",
      titleLine2: "workflow coverage.",
      subtitleLine1: "Specialized logs and relational tables",
      subtitleLine2: "referenced to a single drillhole and depth.",
      capabilities: [
        [
          "01",
          "Geological logs",
          "Lithology, alteration, mineralization, veining, structure, drilling parameters, and survey—all tied to depth.",
        ],
        [
          "02",
          "Geomechanics & drilling",
          "Core runs, core diameter, TCR / SCR / RQD, ISRM rock strength, weathering, and core condition.",
        ],
        [
          "03",
          "Sampling & QA/QC",
          "Sample intervals and IDs, CRM standards, blanks, and field and laboratory duplicates.",
        ],
        [
          "04",
          "Map & cross-section",
          "Collar coordinates, section lines, drillhole traces, and lithological interval correlation.",
        ],
        [
          "05",
          "Daily reports & certificates",
          "Shift drilling reports, automated depth and advance calculations, statutory A4 certificates, lab submittal sheets, and visible sync states.",
        ],
      ] as [string, string, string][],
    },
    output: {
      eyebrow: "Export & reporting",
      titleLine1: "Export to reports",
      titleLine2: "and mining software.",
      description:
        "Capture field data once. Prepare structured outputs for statutory reporting, assay labs, and 3D geological modeling.",
      inputTitle: "Import spreadsheets and legacy logs",
      inputText:
        "Templates and table mapping for historical records. Text and CSV import with interval boundary validation.",
      deliv1Label: "01 / DOCUMENTATION",
      deliv1Title: "Certificates & working forms",
      deliv1Text:
        "Spudding, depth check, closure, reclamation, and inclinometry certificates. Sample dispatch and chain-of-custody forms.",
      deliv2Label: "02 / DATASETS",
      deliv2Title: "Tables for modeling & GIS software",
      deliv2Text:
        "Collar records, downhole surveys, intervals, and assays in CSV / Excel—structured for direct import and modeling.",
      softwareAria: "Compatible geological software",
    },
    team: {
      eyebrow: "Field ↔ office",
      titleLine1: "Offline operation",
      titleAccent: "and synchronization.",
      fieldBadge: "FIELD MODE",
      fieldTitleLine1: "Local persistence",
      fieldTitleLine2: "and outbound sync queue.",
      sync1: "Changes saved on device",
      sync2: "Queue waiting for connection",
      sync3: "Server upload and confirmation",
      fieldFoot:
        "Unsent edits and conflicts are visible in the sync center. Initial sign-in and key recovery require an internet connection.",
      note1Title: "Roles, companies, and accountability",
      note1Text:
        "ADMIN manages access, GEOLOGIST works with company drillholes, VIEWER inspects authorized projects. Deletion and restoration requests require approval.",
      note2Title: "Your data stays protected",
      note2Text:
        "Project and drillhole payloads are protected with client-side AES-GCM encryption before leaving the device. Company key access is granted after the administrator verifies the employee's key fingerprint. On a new browser, account keys are restored via master password.",
      highlights: ["AES-GCM", "Role & company scoping", "Verified keys"],
      securityNote:
        "Client-side encryption does not replace device security. Audit logs and deletion/recovery request notes are not yet encrypted by this layer.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions & answers",
      subtitleLine1: "Concise answers",
      subtitleLine2: "to practical questions.",
      questions: [
        [
          "Is this a working application or a concept presentation?",
          "This website is an overview of Geocore.vista. It showcases real application screens, cross-sections, and A4 certificates generated by its tools on the built-in demo project. To request access or onboard your team, contact us on WhatsApp at +77064101339 or via email at geocorevista@gmail.com.",
        ],
        [
          "Can geologists work at the drill site without internet?",
          "After initial setup, the application stores changes locally on the device and maintains an outbound queue. Once connectivity returns, data is synchronized and verified. First-time sign-in, access provisioning, and key recovery on a new browser require an internet connection.",
        ],
        [
          "Where does a geologist start in the system?",
          "With a project and a drillhole collar card: coordinates, drilling parameters, and hole ID. Runs, geological intervals, sampling, and QA/QC records are then logged against that hole. Maps, cross-sections, and statutory certificates draw from this shared context.",
        ],
        [
          "How is data transferred to third-party geological software?",
          "Through structured table exports (COLLAR, SURVEY, LITHOLOGY, ASSAY) matched to the import template of your target modeling or GIS package. Collar, survey, lithology, and sampling records are exported as linked relational sets.",
        ],
        [
          "What happens when switching computers or browsers?",
          "Sign in to your account and restore your encryption key from the encrypted cloud backup using your personal master password. An ADMIN verifies the employee's key fingerprint to grant company access. Key recovery does not transfer unsynced local drafts from another device.",
        ],
      ] as [string, string][],
    },
    footer: {
      closingEyebrow: "Get in touch",
      closingTitleLine1: "Connect with the",
      closingTitleLine2: "Geocore.vista team",
      closingCaption: "WhatsApp and email for inquiries and onboarding",
      topAria: "Top of page",
      tagline: "Geological logging & documentation workspace",
      toOverview: "Back to overview",
      disclaimer: "All data shown on this site is for demonstration purposes.",
    },
  },
};

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)["ru"];
};

const I18nContext = createContext<I18nContextValue>({
  lang: "ru",
  setLang: () => {},
  t: translations.ru,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("geocore_lang");
      if (saved === "ru" || saved === "kk" || saved === "en") return saved;
    } catch {
      // ignore storage errors
    }
    return "ru";
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("geocore_lang", next);
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
