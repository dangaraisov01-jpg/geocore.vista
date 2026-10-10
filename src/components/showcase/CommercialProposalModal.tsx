import { useState, useEffect, FormEvent } from "react";
import {
  FileText,
  X,
  CheckCircle2,
  Download,
  Send,
  Building2,
  User,
  Phone,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  TrendingUp,
  Layers,
  AlertTriangle,
  CalendarCheck,
} from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_WHATSAPP_URL,
} from "./Intro";
import { useI18n, Lang } from "../../i18n";
import { downloadCommercialProposalPdf } from "../../utils/generateProposalPdf";

interface ProposalLead {
  fullName: string;
  company: string;
  phone: string;
  plan: "pilot" | "annual" | "both";
}

const proposalCopy: Record<
  Lang,
  {
    modalBadge: string;
    modalTitle: string;
    modalSubtitle: string;
    formTitle: string;
    formSubtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    planLabel: string;
    planPilot: string;
    planAnnual: string;
    planBoth: string;
    submitBtn: string;
    submittedBtn: string;
    printBtn: string;
    downloadingBtn: string;
    downloadedBtn: string;
    whatsappBtn: string;
    emailBtn: string;
    validationError: string;
    successBanner: string;
    docType: string;
    docNumber: string;
    docToLabel: string;
    docToDefaultCompany: string;
    docToDefaultPerson: string;
    docFromLabel: string;
    docFromValue: string;
    page1Label: string;
    page2Label: string;
    offerEyebrow: string;
    offerTitle: string;
    offerSubtitle: string;
    sec1Title: string;
    sec1Intro: string;
    sec1Points: { bold: string; text: string }[];
    sec2Title: string;
    sec2Intro: string;
    sec2Points: { bold: string; text: string }[];
    sec3Title: string;
    sec3Metrics: { value: string; label: string; desc: string }[];
    sec4Title: string;
    tariff1Badge: string;
    tariff1Price: string;
    tariff1PriceNote: string;
    tariff1Title: string;
    tariff1Target: string;
    tariff1Points: { bold: string; text: string }[];
    tariff1Result: string;
    tariff2Badge: string;
    tariff2Price: string;
    tariff2PriceNote: string;
    tariff2Title: string;
    tariff2Target: string;
    tariff2Points: { bold: string; text: string }[];
    tariff2Result: string;
    sec5Title: string;
    sec5Headline: string;
    sec5Intro: string;
    sec5Bullets: string[];
    sec5Footer: string;
  }
> = {
  ru: {
    modalBadge: "КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ · B2B",
    modalTitle:
      "Получить коммерческое предложение с указанием ФИО, компании и номера телефона",
    modalSubtitle:
      "Заполните данные получателя, чтобы сформировать именное КП для руководства компании, скачать версию для печати (PDF, 2 стр.) и согласовать 15-минутную демонстрацию.",
    formTitle: "Данные получателя КП",
    formSubtitle:
      "Реквизиты автоматически подставляются в титульный блок коммерческого предложения",
    fullNameLabel: "ФИО контактного лица *",
    fullNamePlaceholder: "Например: Ахметов Серик Маратович",
    companyLabel: "Название компании *",
    companyPlaceholder: "Например: ТОО «КазГеоРазведка»",
    phoneLabel: "Номер телефона (WhatsApp) *",
    phonePlaceholder: "+7 (700) 000-00-00",
    planLabel: "Приоритетный вариант сотрудничества",
    planPilot: "Внедрение и обучение — $1 000 (единоразово)",
    planAnnual: "Поддержка и оптимизация — $500 / мес. (до 10 аккаунтов)",
    planBoth: "Полный пакет: $1 000 внедрение + $500 / мес. (до 10 аккаунтов)",
    submitBtn: "Сформировать именное КП",
    submittedBtn: "КП сформировано — отправить в WhatsApp",
    printBtn: "Скачать КП в PDF (2 стр.)",
    downloadingBtn: "Формируем PDF...",
    downloadedBtn: "PDF скачан (2 стр.) ✓",
    whatsappBtn: "Записаться на 15-мин демо в WhatsApp",
    emailBtn: "Запросить счет и договор на почту",
    validationError:
      "Пожалуйста, укажите ФИО, название компании и контактный номер телефона.",
    successBanner:
      "Именное коммерческое предложение сформировано. Вы можете сохранить его в PDF (2 страницы A4) или сразу подтвердить 15-минутную онлайн-демонстрацию в WhatsApp.",
    docType: "КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ",
    docNumber: "Исх. № КП-2026/GV · Объем: 2 страницы",
    docToLabel: "КОМУ (ПОЛУЧАТЕЛЬ):",
    docToDefaultCompany: "Руководителю / Главному геологу / Техническому директору",
    docToDefaultPerson: "Укажите ФИО, компанию и телефон в форме выше",
    docFromLabel: "ОТ КОГО (ПОСТАВЩИК РЕШЕНИЯ):",
    docFromValue:
      "Geocore.vista — система оцифровки полевой геологической документации",
    page1Label: "СТРАНИЦА 01 / 02 · ПРОБЛЕМАТИКА, РЕШЕНИЕ И ЭФФЕКТ В ЦИФРАХ",
    page2Label: "СТРАНИЦА 02 / 02 · ВАРИАНТЫ СОТРУДНИЧЕСТВА И ПЛАН ДЕМОНСТРАЦИИ",
    offerEyebrow: "ОФФЕР ДЛЯ ГЕОЛОГОРАЗВЕДОЧНЫХ КОМПАНИЙ",
    offerTitle:
      "Сократите трудозатраты на камеральную обработку на 65% и ускорьте сдачу геологической отчетности в 4 раза с базой данных Geocore.vista",
    offerSubtitle:
      "Переход от разрозненных таблиц Excel и бумажных пикетажек к единой защищенной системе полевой документации, учета керна и автоматического выпуска отчетных файлов.",
    sec1Title: "1. Проблематика: на чем геологоразведочные компании теряют время и деньги",
    sec1Intro:
      "При ведении документации в стандартных таблицах Excel и бумажных журналах предприятия сталкиваются с четырьмя системными узкими местами:",
    sec1Points: [
      {
        bold: "Медленный ручной ввод и двойной перенос данных в Excel:",
        text: "полевые геологи до 30–40% времени смены тратят на перепечатывание буровых рейсов, интервалов литологии и номеров проб из полевых записей в сводные таблицы.",
      },
      {
        bold: "Риск потери данных и человеческий фактор:",
        text: "опечатки при ручной записи координат устьев, пересечения или пропуски глубин «От / До», расхождения в расчете выхода керна (TCR/RQD) и потеря контекста при передаче смены.",
      },
      {
        bold: "Долгий выпуск стандартизированных отчетов и файлов керна:",
        text: "ручное форматирование паспортов скважин, буровых сводок, колонок и производственных актов A4 для сдачи заказчику занимает недели после завершения бурения.",
      },
      {
        bold: "Разрозненность данных между полевыми бригадами и офисом:",
        text: "руководство, главный геолог и камеральная группа получают актуальные данные с буровых участков с задержкой в несколько дней, а рабочие файлы хранятся в десятках несвязанных версий.",
      },
    ],
    sec2Title: "2. Решение: как Geocore.vista закрывает задачи участка и офиса",
    sec2Intro:
      "Geocore.vista — специализированная база данных и приложение для оцифровки полевой геологической документации, объединяющее работу на буровой и в офисе в единый цикл:",
    sec2Points: [
      {
        bold: "Быстрая и точная запись полевых данных:",
        text: "единый интерфейс для ведения паспортов и координат скважин, буровых рейсов, литологии, изменений, минерализации, геомеханики (TCR / SCR / RQD, ISRM), проб QA/QC (CRM, Blank, дубликаты) и сменных сводок с автоматической проверкой границ интервалов при вводе.",
      },
      {
        bold: "Автоматический экспорт отформатированных файлов керна и актов:",
        text: "выгрузка готовых таблиц описания керна и баз данных (COLLAR, SURVEY, LITHOLOGY, ASSAY) напрямую в Micromine, Leapfrog Geo, Datamine, Surpac, QGIS и AutoCAD, а также генерация геологических разрезов (SVG/PDF) и пакета из 5 производственных актов A4 в один клик.",
      },
      {
        bold: "Автономный полевой режим и облачная синхронизация базы данных:",
        text: "работа на участке без интернета с сохранением записей на устройстве и автоматической синхронизацией с центральной БД при появлении связи. Доступ разграничен по ролям (ADMIN, GEOLOGIST, VIEWER), данные защищены клиентским шифрованием AES-GCM.",
      },
    ],
    sec3Title: "3. Результаты внедрения в цифрах",
    sec3Metrics: [
      {
        value: "до 65%",
        label: "Экономия времени геолога",
        desc: "на камеральную обработку, сверку интервалов и перенос полевых записей в электронные ведомости.",
      },
      {
        value: "в 4 раза",
        label: "Быстрее сдача отчетности",
        desc: "формирование отформатированных файлов керна, суточных сводок, разрезов и актов A4 для заказчика.",
      },
      {
        value: "0 ошибок",
        label: "В геометрии интервалов",
        desc: "жесткий программный контроль перекрытий глубин «От / До», пропусков рейсов и дублей номеров проб.",
      },
      {
        value: "100%",
        label: "Синхронизация «Поле ↔ Офис»",
        desc: "единая актуальная база данных по всем участкам и буровым станкам вместо разрозненных файлов Excel.",
      },
    ],
    sec4Title: "4. Стоимость и условия сотрудничества (до 10 аккаунтов)",
    tariff1Badge: "ЭТАП 01 · СТАРТ И ЗАПУСК",
    tariff1Price: "$1 000",
    tariff1PriceNote: "единоразово · внедрение и обучение (до 10 аккаунтов)",
    tariff1Title: "Внедрение системы и обучение команды",
    tariff1Target:
      "Полный цикл развертывания базы данных Geocore.vista под стандарты вашего предприятия и практическая подготовка геологов к работе.",
    tariff1Points: [
      {
        bold: "Развертывание и перенос данных за 1–2 рабочих дня:",
        text: "настройка защищенного пространства вашей компании, структуры участков и загрузка текущих скважин из существующих таблиц Excel.",
      },
      {
        bold: "Подключение до 10 аккаунтов с ролевым доступом:",
        text: "настройка прав для полевых геологов, главного геолога, камеральной группы и руководства (ADMIN, GEOLOGIST, VIEWER).",
      },
      {
        bold: "Практическое обучение персонала:",
        text: "живой инструктаж команды по ведению координат, журналов литологии, рейсов керна, QA/QC, суточных сводок бурения и выпуску актов A4.",
      },
    ],
    tariff1Result:
      "Итог этапа ($1 000): развернутая база данных по реальным скважинам, обученная геологическая служба (до 10 человек) и настроенный экспорт.",
    tariff2Badge: "ЭТАП 02 · ЕЖЕМЕСЯЧНЫЙ ТАРИФ",
    tariff2Price: "$500 / мес.",
    tariff2PriceNote: "поддержка и оптимизация · до 10 аккаунтов",
    tariff2Title: "Поддержка, сопровождение и оптимизация (до 10 аккаунтов)",
    tariff2Target:
      "Бесперебойная эксплуатация базы данных на всех участках компании, техническое сопровождение полевых смен и адаптация шаблонов.",
    tariff2Points: [
      {
        bold: "Активная подписка до 10 аккаунтов:",
        text: "одновременная работа полевых отрядов (включая офлайн-режим на буровой) и офиса с автоматической облачной синхронизацией и шифрованием AES-GCM.",
      },
      {
        bold: "Оптимизация и адаптация шаблонов выгрузки:",
        text: "настройка выходных таблиц керна (COLLAR, SURVEY, LITHOLOGY, ASSAY), разрезов SVG/PDF и форм актов A4 под требования вашего заказчика.",
      },
      {
        bold: "Приоритетная техническая поддержка и обновления:",
        text: "оперативная помощь геологам, контроль целостности БД, резервное копирование и доступ ко всем новым модулям системы.",
      },
    ],
    tariff2Result:
      "Итог ($500 / мес. до 10 аккаунтов): стабильный цифровой контур геологической документации без потерь данных и простоев весь полевой сезон.",
    sec5Title: "5. Следующий шаг — 15-минутная демонстрация на ваших данных",
    sec5Headline:
      "Оцените работу Geocore.vista на реальных данных вашего участка за 15 минут",
    sec5Intro:
      "Вместо общих презентаций предлагаем провести короткую рабочую онлайн-встречу. За 15 минут на примере ваших типовых скважин мы покажем:",
    sec5Bullets: [
      "как полевой геолог фиксирует координаты, рейсы и описание керна без ручного дублирования в Excel;",
      "как система автоматически проверяет интервалы, считает метраж в суточной сводке и строит разрез по профилю;",
      "как за 10 секунд выгружаются отформатированные файлы керна для Micromine / Leapfrog и готовые к печати акты A4.",
    ],
    sec5Footer:
      "Для согласования времени демонстрации и расчета стоимости под размер вашей геологической службы заполните форму выше или свяжитесь с нами напрямую:",
  },
  kk: {
    modalBadge: "КОММЕРЦИЯЛЫҚ ҰСЫНЫС · B2B",
    modalTitle:
      "Аты-жөніңізді, компанияны және телефон нөмірін көрсете отырып коммерциялық ұсыныс алу",
    modalSubtitle:
      "Компания басшылығына арналған атаулы КҰ қалыптастыру, басып шығару нұсқасын (PDF, 2 бет) жүктеу және 15 минуттық демонстрацияны келісу үшін деректерді толтырыңыз.",
    formTitle: "КҰ алушының деректері",
    formSubtitle:
      "Деректемелер коммерциялық ұсыныстың титулдық блогына автоматты түрде қойылады",
    fullNameLabel: "Байланысушы тұлғаның аты-жөні *",
    fullNamePlaceholder: "Мысалы: Ахметов Серік Маратұлы",
    companyLabel: "Компания атауы *",
    companyPlaceholder: "Мысалы: «ҚазГеоБарлау» ЖШС",
    phoneLabel: "Телефон нөмірі (WhatsApp) *",
    phonePlaceholder: "+7 (700) 000-00-00",
    planLabel: "Ынтымақтастықтың басым нұсқасы",
    planPilot: "Енгізу және оқыту — $1 000 (біржолғы)",
    planAnnual: "Қолдау және оңтайландыру — $500 / ай (10 аккаунтқа дейін)",
    planBoth: "Толық пакет: $1 000 енгізу + $500 / ай (10 аккаунтқа дейін)",
    submitBtn: "Атаулы КҰ қалыптастыру",
    submittedBtn: "КҰ дайын — WhatsApp-қа жіберу",
    printBtn: "КҰ PDF жүктеу (2 бет)",
    downloadingBtn: "PDF дайындалуда...",
    downloadedBtn: "PDF жүктелді (2 бет) ✓",
    whatsappBtn: "WhatsApp-та 15 мин демоға жазылу",
    emailBtn: "Поштаға шот пен шарт сұрату",
    validationError:
      "Аты-жөніңізді, компания атауын және байланыс телефон нөмірін көрсетіңіз.",
    successBanner:
      "Атаулы коммерциялық ұсыныс қалыптастырылды. Оны PDF (2 бет A4) форматында сақтауға немесе WhatsApp арқылы 15 минуттық онлайн-демонстрацияны растауға болады.",
    docType: "КОММЕРЦИЯЛЫҚ ҰСЫНЫС",
    docNumber: "Шығ. № КҰ-2026/GV · Көлемі: 2 бет",
    docToLabel: "КІМГЕ (АЛУШЫ):",
    docToDefaultCompany: "Басшыға / Бас геологқа / Техникалық директорға",
    docToDefaultPerson: "Жоғарыдағы формада аты-жөніңізді, компанияны және телефонды көрсетіңіз",
    docFromLabel: "КІМНЕН (ШЕШІМ ЖЕТКІЗУШІ):",
    docFromValue:
      "Geocore.vista — далалық геологиялық құжаттаманы цифрландыру жүйесі",
    page1Label: "01 / 02 БЕТ · МӘСЕЛЕЛЕР, ШЕШІМ ЖӘНЕ ЦИФРЛАРДАҒЫ НӘТИЖЕ",
    page2Label: "02 / 02 БЕТ · ЫНТЫМАҚТАСТЫҚ НҰСҚАЛАРЫ ЖӘНЕ ДЕМО ЖОСПАРЫ",
    offerEyebrow: "ГЕОЛОГИЯЛЫҚ БАРЛАУ КОМПАНИЯЛАРЫНА АРНАЛҒАН ОФФЕР",
    offerTitle:
      "Geocore.vista деректер базасымен камералдық өңдеу уақытын 65%-ға қысқартып, геологиялық есептілікті тапсыруды 4 есе жылдамдатыңыз",
    offerSubtitle:
      "Шашыраңқы Excel кестелері мен қағаз журналдардан далалық құжаттаманың, кернді есепке алудың және есептік файлдарды автоматты түрде шығарудың бірыңғай жүйесіне көшу.",
    sec1Title: "1. Мәселелер: геологиялық барлау компаниялары уақыт пен қаражатты қайда жоғалтады",
    sec1Intro:
      "Құжаттаманы стандартты Excel кестелерінде және қағаз журналдарда жүргізу кезінде кәсіпорындар төрт негізгі мәселеге тап болады:",
    sec1Points: [
      {
        bold: "Баяу қолмен енгізу және деректерді Excel-ге қайта көшіру:",
        text: "далалық геологтар жұмыс уақытының 30–40%-ын бұрғылау рейстерін, литология интервалдарын және сынама нөмірлерін жиынтық кестелерге қайта теруге жұмсайды.",
      },
      {
        bold: "Деректерді жоғалту қаупі және адами фактор:",
        text: "ұңғыма сағасының координаттарын жазу кезіндегі қателер, «Бастап / Дейін» тереңдіктерінің қиылысуы немесе қалып қоюы, керн шығымын (TCR/RQD) есептеудегі сәйкессіздіктер.",
      },
      {
        bold: "Стандартталған есептер мен керн файлдарын ұзақ дайындау:",
        text: "тапсырыс берушіге өткізу үшін ұңғыма төлқұжаттарын, бұрғылау мәліметтерін, қималарды және A4 өндірістік актілерін қолмен рәсімдеу апталарға созылады.",
      },
      {
        bold: "Далалық бригадалар мен кеңсе арасындағы деректердің шашыраңқылығы:",
        text: "басшылық пен бас геолог учаскелерден өзекті деректерді бірнеше күн кешігіп алады, ал жұмыс файлдары ондаған байланыссыз нұсқада сақталады.",
      },
    ],
    sec2Title: "2. Шешім: Geocore.vista учаске мен кеңсе міндеттерін қалай шешеді",
    sec2Intro:
      "Geocore.vista — бұрғылау алаңы мен кеңседегі жұмысты бірыңғай циклге біріктіретін далалық геологиялық құжаттаманы цифрландыруға арналған деректер базасы мен қосымша:",
    sec2Points: [
      {
        bold: "Далалық деректерді ыңғайлы әрі қатесіз жазу:",
        text: "ұңғыма координаттарын, рейстерді, литологияны, өзгерістерді, минералдануды, геомеханиканы (TCR / SCR / RQD, ISRM), QA/QC сынамаларын және ауысым мәліметтерін интервал шекараларын автотексеру арқылы енгізу.",
      },
      {
        bold: "Пішімделген керн файлдары мен актілерді автоматты экспорттау:",
        text: "дайын керн кестелерін (COLLAR, SURVEY, LITHOLOGY, ASSAY) Micromine, Leapfrog Geo, Datamine, Surpac, QGIS және AutoCAD бағдарламаларына тікелей жүктеу, сондай-ақ геологиялық қималар (SVG/PDF) мен A4 актілерін бір батырмамен қалыптастыру.",
      },
      {
        bold: "Автономды далалық режим және деректер базасын бұлттық синхрондау:",
        text: "интернетсіз учаскеде құрылғыға сақтап, байланыс пайда болғанда орталық ДБ-мен автоматты синхрондау. Рөлдік қолжетімділік (ADMIN, GEOLOGIST, VIEWER) және клиенттік AES-GCM шифрлауы.",
      },
    ],
    sec3Title: "3. Енгізу нәтижелері цифрлармен",
    sec3Metrics: [
      {
        value: "65%-ға дейін",
        label: "Геолог уақытын үнемдеу",
        desc: "камералдық өңдеуге, интервалдарды салыстыруға және далалық жазбаларды электронды ведомостарға көшіруге.",
      },
      {
        value: "4 есе",
        label: "Есептілікті тезірек тапсыру",
        desc: "тапсырыс берушіге арналған керн файлдарын, тәуліктік мәліметтерді, қималарды және A4 актілерін дайындау.",
      },
      {
        value: "0 қате",
        label: "Интервалдар геометриясында",
        desc: "«Бастап / Дейін» тереңдіктерінің қиылысуын, рейстердің қалып қоюын және сынама дубльдерін бағдарламалық бақылау.",
      },
      {
        value: "100%",
        label: "«Дала ↔ Кеңсе» синхрондауы",
        desc: "шашыраңқы Excel файлдарының орнына барлық учаскелер мен станоктар бойынша бірыңғай өзекті деректер базасы.",
      },
    ],
    sec4Title: "4. Құны және ынтымақтастық шарттары (10 аккаунтқа дейін)",
    tariff1Badge: "01 КЕЗЕҢ · ІСКЕ ҚОСУ ЖӘНЕ ОҚЫТУ",
    tariff1Price: "$1 000",
    tariff1PriceNote: "біржолғы төлем · енгізу және оқыту (10 аккаунтқа дейін)",
    tariff1Title: "Жүйені енгізу және команданы оқыту",
    tariff1Target:
      "Geocore.vista деректер базасын кәсіпорын стандарттарына сай орналастыру және геологтарды жұмысқа практикалық дайындау.",
    tariff1Points: [
      {
        bold: "1–2 жұмыс күні ішінде орналастыру және деректерді көшіру:",
        text: "компанияның қорғалған кеңістігін баптау және қолданыстағы Excel кестелерінен ағымдағы ұңғымаларды жүктеу.",
      },
      {
        bold: "Рөлдік қолжетімділікпен 10 аккаунтқа дейін қосу:",
        text: "далалық геологтарға, бас геологқа, камералдық топқа және басшылыққа құқықтарды баптау (ADMIN, GEOLOGIST, VIEWER).",
      },
      {
        bold: "Қызметкерлерді практикалық оқыту:",
        text: "координаттарды, литология журналдарын, керн рейстерін, QA/QC, күнделікті бұрғылау мәліметтерін жүргізу және A4 актілерін шығару бойынша нұсқаулық.",
      },
    ],
    tariff1Result:
      "Кезең нәтижесі ($1 000): нақты ұңғымалар бойынша дайын деректер базасы, оқытылған геологиялық қызмет (10 адамға дейін) және бапталған экспорт.",
    tariff2Badge: "02 КЕЗЕҢ · АЙ САЙЫНҒЫ ТАРИФ",
    tariff2Price: "$500 / ай",
    tariff2PriceNote: "қолдау және оңтайландыру · 10 аккаунтқа дейін",
    tariff2Title: "Қолдау, сүйемелдеу және оңтайландыру (10 аккаунтқа дейін)",
    tariff2Target:
      "Компанияның барлық учаскелерінде деректер базасының үздіксіз жұмысы, далалық ауысымдарды техникалық сүйемелдеу және үлгілерді бейімдеу.",
    tariff2Points: [
      {
        bold: "10 аккаунтқа дейін белсенді жазылым:",
        text: "далалық отрядтардың (интернетсіз офлайн режимді қоса) және кеңсенің автоматты бұлттық синхрондаумен және AES-GCM шифрлауымен бірлескен жұмысы.",
      },
      {
        bold: "Экспорт үлгілерін оңтайландыру және бейімдеу:",
        text: "тапсырыс берушінің талаптарына сәйкес керн кестелерін (COLLAR, SURVEY, LITHOLOGY, ASSAY), SVG/PDF қималарын және A4 акт нысандарын баптау.",
      },
      {
        bold: "Басым техникалық қолдау және жаңартулар:",
        text: "геологтарға жедел көмек, ДБ бүтіндігін бақылау, резервтік көшіру және жүйенің барлық жаңа модульдеріне қолжетімділік.",
      },
    ],
    tariff2Result:
      "Нәтиже ($500 / ай, 10 аккаунтқа дейін): бүкіл далалық маусым бойы деректерді жоғалтпайтын стандартталған цифрлық геологиялық құжаттама контуры.",
    sec5Title: "5. Келесі қадам — сіздің деректеріңізде 15 минуттық демонстрация",
    sec5Headline:
      "15 минут ішінде өз учаскеңіздің нақты деректерінде Geocore.vista жұмысын бағалаңыз",
    sec5Intro:
      "Жалпы презентациялардың орнына қысқа жұмыс онлайн-кездесуін ұсынамыз. 15 минут ішінде сіздің ұңғымаларыңыздың мысалында көрсетеміз:",
    sec5Bullets: [
      "далалық геологтың координаттарды, рейстерді және керн сипаттамасын Excel-ге қайта көшірусіз қалай тіркейтінін;",
      "жүйенің интервалдарды автоматты түрде тексеріп, тәуліктік мәліметте метражды есептейтінін және профиль бойынша қима тұрғызатынын;",
      "10 секунд ішінде Micromine / Leapfrog үшін пішімделген керн файлдары мен басып шығаруға дайын A4 актілерінің қалай жүктелетінін.",
    ],
    sec5Footer:
      "Демонстрация уақытын келісу және геологиялық қызметіңіздің көлеміне қарай құнын есептеу үшін жоғарыдағы форманы толтырыңыз немесе бізбен тікелей байланысыңыз:",
  },
  en: {
    modalBadge: "COMMERCIAL PROPOSAL · B2B",
    modalTitle:
      "Get a Commercial Proposal with Your Name, Company, and Phone Number",
    modalSubtitle:
      "Enter recipient details below to generate a personalized executive proposal, download a print-ready PDF (2 pages), and schedule a 15-minute live demonstration.",
    formTitle: "Proposal Recipient Details",
    formSubtitle:
      "Your details are automatically populated into the official proposal header block",
    fullNameLabel: "Contact Person Full Name *",
    fullNamePlaceholder: "e.g., Serik Akhmetov, Chief Geologist",
    companyLabel: "Company Name *",
    companyPlaceholder: "e.g., KazGeoExploration LLP",
    phoneLabel: "Phone Number (WhatsApp) *",
    phonePlaceholder: "+7 (700) 000-00-00",
    planLabel: "Preferred Cooperation Model",
    planPilot: "Implementation & Training — $1,000 (one-time)",
    planAnnual: "Support & Optimization — $500 / mo (up to 10 accounts)",
    planBoth: "Full Package: $1,000 setup + $500 / mo (up to 10 accounts)",
    submitBtn: "Generate Personalized Proposal",
    submittedBtn: "Proposal Ready — Send via WhatsApp",
    printBtn: "Download Proposal PDF (2 pages)",
    downloadingBtn: "Generating PDF...",
    downloadedBtn: "PDF Downloaded (2 pages) ✓",
    whatsappBtn: "Book 15-Min Demo on WhatsApp",
    emailBtn: "Request Quote & Contract via Email",
    validationError:
      "Please enter your full name, company name, and contact phone number.",
    successBanner:
      "Your personalized commercial proposal is ready. You can print/save it as a 2-page A4 PDF or confirm your 15-minute online demo directly on WhatsApp.",
    docType: "COMMERCIAL PROPOSAL",
    docNumber: "Ref. No. CP-2026/GV · Length: 2 Pages",
    docToLabel: "PREPARED FOR (RECIPIENT):",
    docToDefaultCompany: "Managing Director / Chief Geologist / Technical Director",
    docToDefaultPerson: "Enter Full Name, Company, and Phone in the form above",
    docFromLabel: "PREPARED BY (VENDOR):",
    docFromValue:
      "Geocore.vista — Field Geological Documentation & Database System",
    page1Label: "PAGE 01 / 02 · INDUSTRY BOTTLENECKS, SOLUTION & MEASURABLE ROI",
    page2Label: "PAGE 02 / 02 · COOPERATION OPTIONS & 15-MINUTE DEMO PLAN",
    offerEyebrow: "EXECUTIVE PROPOSAL FOR MINERAL EXPLORATION COMPANIES",
    offerTitle:
      "Cut Office Data Processing Time by 65% and Accelerate Statutory Core Reporting 4x with the Geocore.vista Database",
    offerSubtitle:
      "Replace fragmented Excel spreadsheets and paper field books with a unified, encrypted environment for drillhole logging, core tracking, and automated deliverable generation.",
    sec1Title: "1. The Problem: Where Exploration Teams Lose Time and Margin",
    sec1Intro:
      "Relying on manual paper logs and disconnected Excel sheets creates four operational bottlenecks across exploration projects:",
    sec1Points: [
      {
        bold: "Slow manual entry and double transcription into Excel:",
        text: "field geologists spend 30–40% of their shift re-typing drill runs, lithology intervals, and sample IDs from field notes into master spreadsheets.",
      },
      {
        bold: "Data loss risks and human error:",
        text: "typos in collar coordinates, overlapping or missing From/To depth intervals, miscalculated core recovery (TCR/RQD), and lost context across shift handovers.",
      },
      {
        bold: "Delayed statutory reports and formatted core files:",
        text: "manually compiling drillhole logs, graphic columns, shift summaries, and A4 statutory certificates for client handover takes weeks after drilling ends.",
      },
      {
        bold: "Disconnect between field rigs and the central office:",
        text: "management and chief geologists receive actual drilling footage and logging progress days late, while project data is scattered across dozens of file versions.",
      },
    ],
    sec2Title: "2. The Solution: How Geocore.vista Connects Field and Office",
    sec2Intro:
      "Geocore.vista is a specialized geological database and field logging application engineered around the complete drillhole lifecycle:",
    sec2Points: [
      {
        bold: "Structured, error-free field data capture:",
        text: "unified workspace for collar coordinates, drill runs, lithology, alteration, mineralization, geomechanics (TCR / SCR / RQD, ISRM), QA/QC sampling (CRM, blanks, duplicates), and daily shift reports with real-time interval boundary validation.",
      },
      {
        bold: "Automated export of formatted core files and certificates:",
        text: "one-click export of relational tables (COLLAR, SURVEY, LITHOLOGY, ASSAY) ready for Micromine, Leapfrog Geo, Datamine, Surpac, QGIS, and AutoCAD, plus automated SVG/PDF cross-sections and 5 statutory A4 drillhole certificates.",
      },
      {
        bold: "Offline field persistence and cloud database synchronization:",
        text: "log data at remote drill sites without internet; records queue locally and sync automatically to the central cloud database once connectivity returns, secured by client-side AES-GCM encryption and role-based access (ADMIN, GEOLOGIST, VIEWER).",
      },
    ],
    sec3Title: "3. Quantified Business Impact",
    sec3Metrics: [
      {
        value: "Up to 65%",
        label: "Less Office Re-entry Time",
        desc: "saved by geologists on desktop compilation, interval validation, and spreadsheet transcription.",
      },
      {
        value: "4x Faster",
        label: "Client Deliverable Turnaround",
        desc: "automated generation of formatted core tables, daily shift summaries, cross-sections, and A4 acts.",
      },
      {
        value: "0 Errors",
        label: "In Interval Topology",
        desc: "built-in validation prevents From/To depth overlaps, run gaps, and duplicate sample numbers at entry.",
      },
      {
        value: "100%",
        label: "Field ↔ Office Data Integrity",
        desc: "a single synchronized source of truth across all prospects and drill rigs instead of scattered files.",
      },
    ],
    sec4Title: "4. Pricing & Cooperation Terms (Up to 10 Accounts)",
    tariff1Badge: "STAGE 01 · ONBOARDING & LAUNCH",
    tariff1Price: "$1,000",
    tariff1PriceNote: "one-time fee · deployment & training (up to 10 accounts)",
    tariff1Title: "System Deployment & Team Training",
    tariff1Target:
      "Complete setup of the Geocore.vista database tailored to your exploration workflow and hands-on training for your geological staff.",
    tariff1Points: [
      {
        bold: "Workspace deployment & data migration in 1–2 business days:",
        text: "provisioning of your company's encrypted database, project structure, and import of active drillholes from existing Excel sheets.",
      },
      {
        bold: "Setup of up to 10 role-based user accounts:",
        text: "access configuration for field geologists, chief geologist, office modelers, and management (ADMIN, GEOLOGIST, VIEWER).",
      },
      {
        bold: "Hands-on team training:",
        text: "live onboarding covering collar coordinates, lithology logs, core runs, QA/QC sampling, daily shift reports, and A4 statutory certificates.",
      },
    ],
    tariff1Result:
      "Stage Outcome ($1,000): production-ready database with your drillholes, trained geological team (up to 10 users), and configured exports.",
    tariff2Badge: "STAGE 02 · MONTHLY SUBSCRIPTION",
    tariff2Price: "$500 / mo",
    tariff2PriceNote: "support & optimization · up to 10 accounts",
    tariff2Title: "Monthly Support, Maintenance & Optimization (Up to 10 Accounts)",
    tariff2Target:
      "Continuous operation across all active drill sites, priority engineering support, and ongoing workflow optimization.",
    tariff2Points: [
      {
        bold: "Active license for up to 10 accounts:",
        text: "simultaneous field and office access (including offline rig mode) with automatic cloud synchronization and AES-GCM encryption.",
      },
      {
        bold: "Ongoing optimization & custom export templates:",
        text: "tailoring of core export schemas (COLLAR, SURVEY, LITHOLOGY, ASSAY), SVG/PDF cross-sections, and A4 certificates to client standards.",
      },
      {
        bold: "Priority technical support & updates:",
        text: "direct assistance for field shifts, database integrity monitoring, automated backups, and all new platform releases.",
      },
    ],
    tariff2Result:
      "Outcome ($500 / mo for up to 10 accounts): a reliable, audit-ready geological documentation pipeline across the entire drilling season.",
    sec5Title: "5. Next Step — 15-Minute Live Demo on Your Data",
    sec5Headline:
      "See Geocore.vista in Action on Your Own Drillhole Data in 15 Minutes",
    sec5Intro:
      "Skip generic slide decks. In a focused 15-minute online session using a sample of your collar and interval data, we will demonstrate:",
    sec5Bullets: [
      "how a field geologist logs coordinates, core runs, and lithology without manual Excel duplication;",
      "how the system validates depth topology, calculates daily shift progress, and builds a profile cross-section;",
      "how formatted core files for Micromine / Leapfrog and print-ready A4 certificates are exported in seconds.",
    ],
    sec5Footer:
      "To schedule your 15-minute demonstration and receive a tailored quote for your team size, complete the form above or reach us directly:",
  },
};

export function CommercialProposalModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lang } = useI18n();
  const c = proposalCopy[lang];

  const [lead, setLead] = useState<ProposalLead>(() => {
    try {
      const saved = localStorage.getItem("geocore_kp_lead");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return {
      fullName: "",
      company: "",
      phone: "",
      plan: "both",
    };
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const updateField = <K extends keyof ProposalLead>(
    key: K,
    value: ProposalLead[K],
  ) => {
    setError("");
    const next = { ...lead, [key]: value };
    setLead(next);
    try {
      localStorage.setItem("geocore_kp_lead", JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const planName =
    lead.plan === "pilot"
      ? c.planPilot
      : lead.plan === "annual"
        ? c.planAnnual
        : c.planBoth;

  const buildWhatsAppUrl = () => {
    const text =
      lang === "ru"
        ? `Здравствуйте! Запрашиваю коммерческое предложение Geocore.vista и 15-минутную онлайн-демонстрацию.\n• ФИО: ${lead.fullName.trim() || "Не указано"}\n• Компания: ${lead.company.trim() || "Не указана"}\n• Телефон: ${lead.phone.trim() || "Не указан"}\n• Тариф: ${planName}`
        : lang === "kk"
          ? `Сәлеметсіз бе! Geocore.vista коммерциялық ұсынысын және 15 минуттық онлайн-демонстрация сұратамын.\n• Аты-жөні: ${lead.fullName.trim() || "Көрсетілмеген"}\n• Компания: ${lead.company.trim() || "Көрсетілмеген"}\n• Телефон: ${lead.phone.trim() || "Көрсетілмеген"}\n• Тариф: ${planName}`
          : `Hello! I would like to request the Geocore.vista Commercial Proposal and book a 15-minute online demo.\n• Name: ${lead.fullName.trim() || "Not specified"}\n• Company: ${lead.company.trim() || "Not specified"}\n• Phone: ${lead.phone.trim() || "Not specified"}\n• Option: ${planName}`;
    return `https://wa.me/77064101339?text=${encodeURIComponent(text)}`;
  };

  const buildMailtoUrl = () => {
    const subject = `КП Geocore.vista — ${lead.company.trim() || "Запрос демонстрации"}`;
    const body = `Здравствуйте!\n\nПрошу направить коммерческое предложение Geocore.vista и согласовать 15-минутную онлайн-демонстрацию.\n\nФИО: ${lead.fullName.trim()}\nКомпания: ${lead.company.trim()}\nТелефон: ${lead.phone.trim()}\nИнтересующий вариант: ${planName}\n`;
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!lead.fullName.trim() || !lead.company.trim() || !lead.phone.trim()) {
      setError(c.validationError);
      return;
    }
    setError("");
    setSubmitted(true);
    const docEl = document.getElementById("kp-document-preview");
    docEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const todayStr = new Date().toLocaleDateString(
    lang === "en" ? "en-US" : "ru-RU",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  );

  const handleDownloadPdf = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadCommercialProposalPdf({
        lang,
        fullName: lead.fullName,
        company: lead.company,
        phone: lead.phone,
        plan: lead.plan,
        planName,
        todayStr,
        contactPhone: CONTACT_PHONE,
        contactEmail: CONTACT_EMAIL,
        copy: c,
      });
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3500);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="kp-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kp-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="kp-modal-window">
        {/* Sticky Top Bar */}
        <div className="kp-modal-topbar no-print">
          <div className="kp-modal-topbar-left">
            <span className="kp-topbar-badge mono">
              <FileText size={14} /> {c.modalBadge}
            </span>
            <strong id="kp-modal-title">{c.modalTitle}</strong>
          </div>
          <div className="kp-modal-topbar-actions">
            <button
              type="button"
              className="kp-action-btn kp-action-print"
              onClick={handleDownloadPdf}
              disabled={downloading}
            >
              <Download size={15} />
              <span>
                {downloading
                  ? c.downloadingBtn
                  : downloaded
                    ? c.downloadedBtn
                    : c.printBtn}
              </span>
            </button>
            <button
              type="button"
              className="kp-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="kp-modal-body">
          {/* Recipient Form Section */}
          <section className="kp-lead-panel no-print">
            <div className="kp-lead-header">
              <div>
                <span className="eyebrow">{c.formTitle}</span>
                <p>{c.modalSubtitle}</p>
              </div>
              <span className="mono kp-lead-hint">{c.formSubtitle}</span>
            </div>

            <form className="kp-lead-form" onSubmit={handleSubmit} noValidate>
              <div className="kp-field">
                <label htmlFor="kp-fullname">
                  <User size={14} /> {c.fullNameLabel}
                </label>
                <input
                  id="kp-fullname"
                  type="text"
                  required
                  value={lead.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder={c.fullNamePlaceholder}
                />
              </div>

              <div className="kp-field">
                <label htmlFor="kp-company">
                  <Building2 size={14} /> {c.companyLabel}
                </label>
                <input
                  id="kp-company"
                  type="text"
                  required
                  value={lead.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  placeholder={c.companyPlaceholder}
                />
              </div>

              <div className="kp-field">
                <label htmlFor="kp-phone">
                  <Phone size={14} /> {c.phoneLabel}
                </label>
                <input
                  id="kp-phone"
                  type="tel"
                  required
                  value={lead.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder={c.phonePlaceholder}
                />
              </div>

              <div className="kp-field">
                <label htmlFor="kp-plan">
                  <Layers size={14} /> {c.planLabel}
                </label>
                <select
                  id="kp-plan"
                  value={lead.plan}
                  onChange={(e) =>
                    updateField(
                      "plan",
                      e.target.value as "pilot" | "annual" | "both",
                    )
                  }
                >
                  <option value="pilot">{c.planPilot}</option>
                  <option value="annual">{c.planAnnual}</option>
                  <option value="both">{c.planBoth}</option>
                </select>
              </div>

              <div className="kp-form-actions">
                <button type="submit" className="button button-copper kp-submit">
                  <CheckCircle2 size={17} />
                  {c.submitBtn}
                </button>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button kp-whatsapp-btn"
                >
                  <Send size={16} />
                  {c.whatsappBtn}
                </a>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={downloading}
                  className="button kp-print-secondary"
                >
                  <Download size={16} />
                  {downloading
                    ? c.downloadingBtn
                    : downloaded
                      ? c.downloadedBtn
                      : c.printBtn}
                </button>
              </div>

              {error && <div className="kp-form-error">{error}</div>}
              {submitted && !error && (
                <div className="kp-form-success">
                  <CheckCircle2 size={18} />
                  <div>
                    <span>{c.successBanner}</span>
                  </div>
                </div>
              )}
            </form>
          </section>

          {/* 2-Page Commercial Proposal Document */}
          <div id="kp-document-preview" className="kp-document-stack">
            {/* PAGE 1 */}
            <article className="kp-sheet">
              <header className="kp-sheet-header">
                <div className="kp-sheet-brand">
                  <img
                    src="/logos/geocore-logo.svg"
                    alt=""
                    width="34"
                    height="34"
                  />
                  <div>
                    <span className="kp-brand-title">
                      geocore<span>.</span>
                      <b>vista</b>
                    </span>
                    <small className="mono">
                      FIELD GEOLOGICAL DATABASE & DOCUMENTATION
                    </small>
                  </div>
                </div>
                <div className="kp-sheet-meta mono">
                  <strong>{c.docType}</strong>
                  <span>
                    {c.docNumber} · {todayStr}
                  </span>
                </div>
              </header>

              {/* Dynamic Recipient Bar */}
              <div className="kp-recipient-bar">
                <div className="kp-recipient-col">
                  <span className="mono">{c.docToLabel}</span>
                  <strong>
                    {lead.company.trim() || c.docToDefaultCompany}
                  </strong>
                  <p>
                    {lead.fullName.trim()
                      ? `${lead.fullName.trim()}${lead.phone.trim() ? ` · Тел.: ${lead.phone.trim()}` : ""}`
                      : c.docToDefaultPerson}
                  </p>
                </div>
                <div className="kp-recipient-col">
                  <span className="mono">{c.docFromLabel}</span>
                  <strong>{c.docFromValue}</strong>
                  <p>
                    Тел. / WhatsApp: {CONTACT_PHONE} · {CONTACT_EMAIL} · Тариф:{" "}
                    <b>{planName}</b>
                  </p>
                </div>
              </div>

              {/* 1. Headline / Offer */}
              <section className="kp-offer-hero">
                <span className="mono kp-offer-eyebrow">{c.offerEyebrow}</span>
                <h1>{c.offerTitle}</h1>
                <p>{c.offerSubtitle}</p>
              </section>

              {/* 2. Problem Statement */}
              <section className="kp-doc-section">
                <div className="kp-sec-heading">
                  <AlertTriangle size={16} />
                  <h2>{c.sec1Title}</h2>
                </div>
                <p className="kp-sec-intro">{c.sec1Intro}</p>
                <ul className="kp-bullet-list kp-problem-list">
                  {c.sec1Points.map((pt, idx) => (
                    <li key={idx}>
                      <span className="mono kp-bullet-index">0{idx + 1}</span>
                      <div>
                        <strong>{pt.bold}</strong> {pt.text}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 3. Solution (Our Product) */}
              <section className="kp-doc-section">
                <div className="kp-sec-heading">
                  <ShieldCheck size={16} />
                  <h2>{c.sec2Title}</h2>
                </div>
                <p className="kp-sec-intro">{c.sec2Intro}</p>
                <ul className="kp-bullet-list kp-solution-list">
                  {c.sec2Points.map((pt, idx) => (
                    <li key={idx}>
                      <span className="kp-check-dot">✓</span>
                      <div>
                        <strong>{pt.bold}</strong> {pt.text}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 4. Quantified Results */}
              <section className="kp-doc-section">
                <div className="kp-sec-heading">
                  <TrendingUp size={16} />
                  <h2>{c.sec3Title}</h2>
                </div>
                <div className="kp-metrics-grid">
                  {c.sec3Metrics.map((m, idx) => (
                    <div className="kp-metric-card" key={idx}>
                      <b className="mono">{m.value}</b>
                      <strong>{m.label}</strong>
                      <p>{m.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <footer className="kp-sheet-footer mono">
                <span>{c.page1Label}</span>
                <span>GEOCORE.VISTA · {CONTACT_PHONE}</span>
              </footer>
            </article>

            {/* PAGE 2 */}
            <article className="kp-sheet kp-sheet-page2">
              <header className="kp-sheet-header kp-sheet-header-compact">
                <div className="kp-sheet-brand">
                  <img
                    src="/logos/geocore-logo.svg"
                    alt=""
                    width="32"
                    height="32"
                  />
                  <div>
                    <span className="kp-brand-title">
                      geocore<span>.</span>
                      <b>vista</b>
                    </span>
                    <small className="mono">
                      {lead.company.trim()
                        ? `ДЛЯ: ${lead.company.trim().toUpperCase()}`
                        : c.docType}
                    </small>
                  </div>
                </div>
                <div className="kp-sheet-meta mono">
                  <span>{c.page2Label}</span>
                </div>
              </header>

              {/* 5. Cooperation Options (2 Tariffs) */}
              <section className="kp-doc-section">
                <div className="kp-sec-heading">
                  <Layers size={16} />
                  <h2>{c.sec4Title}</h2>
                </div>

                <div className="kp-tariffs-grid">
                  {/* Tariff 1: 1-Month Pilot */}
                  <div
                    className={`kp-tariff-card ${lead.plan === "pilot" || lead.plan === "both" ? "kp-tariff-selected" : ""}`}
                  >
                    <div className="kp-tariff-top">
                      <span className="mono kp-tariff-badge">
                        {c.tariff1Badge}
                      </span>
                      <div className="kp-tariff-price-box">
                        <b className="mono kp-tariff-price">{c.tariff1Price}</b>
                        <span className="kp-tariff-price-note">
                          {c.tariff1PriceNote}
                        </span>
                      </div>
                      <h3>{c.tariff1Title}</h3>
                      <p className="kp-tariff-target">{c.tariff1Target}</p>
                    </div>
                    <ul className="kp-tariff-list">
                      {c.tariff1Points.map((pt, idx) => (
                        <li key={idx}>
                          <span>•</span>
                          <div>
                            <strong>{pt.bold}</strong> {pt.text}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="kp-tariff-outcome">
                      <strong>{c.tariff1Result}</strong>
                    </div>
                  </div>

                  {/* Tariff 2: Annual SaaS / On-Premise License */}
                  <div
                    className={`kp-tariff-card ${lead.plan === "annual" || lead.plan === "both" ? "kp-tariff-selected" : ""}`}
                  >
                    <div className="kp-tariff-top">
                      <span className="mono kp-tariff-badge kp-tariff-badge-copper">
                        {c.tariff2Badge}
                      </span>
                      <div className="kp-tariff-price-box kp-tariff-price-box-copper">
                        <b className="mono kp-tariff-price">{c.tariff2Price}</b>
                        <span className="kp-tariff-price-note">
                          {c.tariff2PriceNote}
                        </span>
                      </div>
                      <h3>{c.tariff2Title}</h3>
                      <p className="kp-tariff-target">{c.tariff2Target}</p>
                    </div>
                    <ul className="kp-tariff-list">
                      {c.tariff2Points.map((pt, idx) => (
                        <li key={idx}>
                          <span>•</span>
                          <div>
                            <strong>{pt.bold}</strong> {pt.text}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="kp-tariff-outcome">
                      <strong>{c.tariff2Result}</strong>
                    </div>
                  </div>
                </div>
              </section>

              {/* 6. Call to Action (15-Minute Online Demo on Client Data) */}
              <section className="kp-cta-box">
                <div className="kp-cta-header">
                  <span className="mono kp-cta-tag">
                    <Clock size={14} /> {c.sec5Title}
                  </span>
                  <h2>{c.sec5Headline}</h2>
                  <p>{c.sec5Intro}</p>
                </div>

                <ul className="kp-cta-bullets">
                  {c.sec5Bullets.map((b, idx) => (
                    <li key={idx}>
                      <CalendarCheck size={16} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="kp-cta-footer">
                  <p>{c.sec5Footer}</p>
                  <div className="kp-cta-contacts">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-copper"
                    >
                      {c.whatsappBtn} ({CONTACT_PHONE}){" "}
                      <ArrowUpRight size={16} />
                    </a>
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      disabled={downloading}
                      className="button button-outline-light"
                    >
                      <Download size={16} />
                      {downloading
                        ? c.downloadingBtn
                        : downloaded
                          ? c.downloadedBtn
                          : c.printBtn}
                    </button>
                    <a
                      href={CONTACT_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-outline-light"
                    >
                      WhatsApp Direct <ArrowUpRight size={16} />
                    </a>
                    <a
                      href={buildMailtoUrl()}
                      className="button button-outline-light"
                    >
                      {CONTACT_EMAIL} <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </section>

              <footer className="kp-sheet-footer mono">
                <span>{c.page2Label}</span>
                <span>
                  {lead.company.trim()
                    ? `${lead.company.trim()} · ${lead.fullName.trim()} · ${lead.phone.trim()}`
                    : `GEOCORE.VISTA · ${CONTACT_EMAIL}`}
                </span>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
