import React, { useState, useMemo } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Folder,
  FolderOpen,
  FileSpreadsheet,
  Sliders,
  Compass,
  Layers,
  Map,
  FlaskConical,
  Database,
  FileCheck2
} from 'lucide-react';
import {
  DEMO_PROJECTS,
  DEMO_BOREHOLES,
  DEMO_LITHO_INTERVALS,
  DEMO_ALTERATIONS,
  DEMO_DRILL_RUNS,
  DEMO_MINERALIZATION,
  DEMO_TECTONICS,
  DEMO_VEINS,
  DEMO_INCLINOMETRY
} from '../data/demoData';

export const TopNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#flexibility-overview', label: '01 · Гибкость и возможности' },
    { href: '#projects', label: '02 · Проекты' },
    { href: '#capabilities-tree', label: '03 · Журналы' },
    { href: '#geology-gis', label: '04 · Карта и разрез' },
    { href: '#core-sampling', label: '05 · Опробование' },
    { href: '#validation-docs', label: '06 · Экспорт в ПО' },
    { href: '#auto-docs', label: '07 · Акты и документы' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#231B15]/92 backdrop-blur-md border-b border-[#D97706]/30 shadow-md">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <a
          href="#"
          className="font-display text-base sm:text-lg font-semibold tracking-tight text-[#FDF8F0] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#F59E0B] flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-xs bg-linear-to-br from-[#F59E0B] to-[#B45309] inline-block" />
          <span>Geocore.vista</span>
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:flex items-center gap-6 text-xs xl:text-sm font-medium text-[#E6DAC8]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#FBBF24] hover:underline underline-offset-4 decoration-[#F59E0B] transition-colors whitespace-nowrap py-1 focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#flexibility-overview"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#1C140E] bg-linear-to-r from-[#FBBF24] to-[#D97706] hover:from-[#F59E0B] hover:to-[#B45309] rounded transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
          >
            Все возможности
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Открыть разделы сайта"
            className="lg:hidden px-3 py-1.5 text-xs font-medium text-[#FDF8F0] border border-[#D97706]/40 rounded bg-[#2E241C] hover:bg-[#3B2E24] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
          >
            {mobileMenuOpen ? 'Закрыть' : 'Разделы'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav aria-label="Мобильная навигация" className="lg:hidden border-t border-[#D97706]/30 bg-[#231B15] px-4 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-medium text-[#FDF8F0] hover:bg-[#352920] rounded transition-colors truncate"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

type TreeBranchId =
  | 'lithology'
  | 'alteration'
  | 'drilling'
  | 'mineralization'
  | 'tectonics'
  | 'veins'
  | 'inclinometry';

export const HeroSection: React.FC = () => {
  // Step 1 (Projects as Folders) state — closed by default until clicked
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedBhid, setSelectedBhid] = useState<string>('BH-SRK-101');

  // Step 2 (Lithology & Observations registration) state
  const [activeBranch, setActiveBranch] = useState<TreeBranchId>('lithology');

  const activeFolder = useMemo(
    () => (selectedFolderId ? DEMO_PROJECTS.find((p) => p.id === selectedFolderId) || null : null),
    [selectedFolderId]
  );

  const folderBoreholes = useMemo(
    () => (selectedFolderId ? DEMO_BOREHOLES.filter((b) => b.projectId === selectedFolderId) : []),
    [selectedFolderId]
  );

  const inspectedHole = useMemo(
    () =>
      folderBoreholes.find((b) => b.bhid === selectedBhid) ||
      folderBoreholes[0] ||
      DEMO_BOREHOLES.find((b) => b.bhid === selectedBhid) ||
      DEMO_BOREHOLES[0],
    [folderBoreholes, selectedBhid]
  );

  const handleSelectFolder = (folderId: string) => {
    if (selectedFolderId === folderId) {
      setSelectedFolderId(null);
    } else {
      setSelectedFolderId(folderId);
      const firstHole = DEMO_BOREHOLES.find((b) => b.projectId === folderId);
      if (firstHole) setSelectedBhid(firstHole.bhid);
    }
  };

  const lithoList = DEMO_LITHO_INTERVALS['BH-SRK-101'];

  const treeBranches: Array<{
    id: TreeBranchId;
    num: string;
    title: string;
    shortDesc: string;
    fullExplanation: string;
  }> = [
    {
      id: 'lithology',
      num: '1',
      title: 'Литология',
      shortDesc: 'Отдельная регистрация каждого интервала породы',
      fullExplanation:
        'Приложение регистрирует каждый литологический интервал отдельно («От–До», код породы, литологическое название, структура, зернистость и текстовое описание). Все литологические данные поддерживают как табличный импорт, так и прямое ручное заполнение геологом.'
    },
    {
      id: 'alteration',
      num: '2',
      title: 'Вторичные изменения',
      shortDesc: 'Метасоматические изменения по интервалам',
      fullExplanation:
        'Каждый интервал вторичных (метасоматических) изменений фиксируется отдельно от первичной породы: указываются границы «От–До», тип процесса, интенсивность, форма проявления и примечания (доступно ручное заполнение в журнале).'
    },
    {
      id: 'drilling',
      num: '3',
      title: 'Drilling Parameters',
      shortDesc: 'Рейсы бурения, выход керна TCR/SCR и индекс RQD',
      fullExplanation:
        'Порейсовый учёт бурения и геомеханики керна: каждый рейс регистрируется отдельно с интервалом глубин, типоразмером, выходом керна (TCR, SCR), индексом качества керна (RQD), полевой оценкой прочности ISRM и выветриванием (доступно ручное заполнение и импорт по шаблону).'
    },
    {
      id: 'mineralization',
      num: '4',
      title: 'Минерализация',
      shortDesc: 'Рудные минералы, текстуры и процент сульфидов',
      fullExplanation:
        'Отдельная регистрация рудных интервалов: фиксируются границы «От–До», минеральный состав, текстура оруденения, визуальная оценка общего содержания сульфидов (%) и комментарии геолога (доступно ручное заполнение).'
    },
    {
      id: 'tectonics',
      num: '5',
      title: 'Тектоника',
      shortDesc: 'Зоны дробления, трещиноватость и углы к оси керна',
      fullExplanation:
        'Поинтервальный учёт тектонических нарушений: структурный тип (зоны дробления, брекчии, катаклазиты), угол к оси керна, частота трещин на погонный метр и характер заполнения (доступно ручное заполнение).'
    },
    {
      id: 'veins',
      num: '6',
      title: 'Прожилки',
      shortDesc: 'Состав генераций, мощность, углы и плотность на метр',
      fullExplanation:
        'Регистрация прожилковых зон с указанием интервала глубин, минерального типа прожилков, мощности (мм), угла к оси керна, количества прожилков на метр и связанной сульфидной ассоциации (доступно ручное заполнение).'
    },
    {
      id: 'inclinometry',
      num: '7',
      title: 'Инклинометрия',
      shortDesc: 'Замеры азимута и угла наклона ствола по глубине',
      fullExplanation:
        'Последовательная таблица замеров траектории скважины по глубине: отметка замера (м), азимут (°), угол наклона (°) и метод измерения (доступно ручное заполнение замеров).'
    }
  ];

  const currentBranchMeta = treeBranches.find((b) => b.id === activeBranch)!;

  return (
    <>
      {/* =====================================================================
          HERO: ПРС (ПОЧВЕННО-РАСТИТЕЛЬНЫЙ СЛОЙ НА САМОМ ВЕРХУ) И ВЕРХНИЙ РАЗРЕЗ ПОРОД
      ===================================================================== */}
      <section
        id="hero"
        className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6"
      >
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 bg-linear-to-b from-[#FAF5EB]/95 to-[#F3E9D6]/95 backdrop-blur-sm border-2 border-[#C89D66] rounded-xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(20,12,6,0.45)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE2C8] border border-[#D4B07B] text-[#78350F] font-mono text-xs font-semibold">
            <span>ГЕОЛОГОРАЗВЕДОЧНАЯ ПЛАТФОРМА</span>
          </div>

          <div className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#23180E]">
            Geocore.vista
          </div>

          <p
            className="text-base sm:text-xl text-[#4A3728] leading-relaxed font-normal max-w-2xl mx-auto"
            style={{ textWrap: 'balance' }}
          >
            Единая рабочая среда для геологоразведки: организация проектов и скважин, поинтервальное ведение буровых журналов, учёт параметров керна и опробования, построение разрезов и подготовка документации.
          </p>

          <div className="pt-2">
            <a
              href="#flexibility-overview"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#FFFDF9] bg-linear-to-r from-[#B45309] to-[#9A3412] hover:from-[#9A3412] hover:to-[#7C2D12] rounded-lg transition-all shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
            >
              <span>Перейти к возможностям</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ПУНКТ 01: ГИБКОСТЬ ПОД ЛЮБОЙ УЧАСТОК И НАВИГАТОР ВСЕХ ВОЗМОЖНОСТЕЙ
      ===================================================================== */}
      <section id="flexibility-overview" className="relative py-12 sm:py-16">
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 space-y-6">
          {/* Главный блок о гибкости и сути приложения */}
          <div className="bg-linear-to-r from-[#FAF5EB]/97 to-[#F3E7D0]/96 backdrop-blur-xs border-2 border-[#C89D66] border-l-8 border-l-[#B45309] rounded-xl p-5 sm:p-7 shadow-lg space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#B45309]">
                01 · Суть приложения · Максимальная гибкость и удобство
              </p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE0C4] border border-[#CFA872] text-[11px] font-mono font-semibold text-[#6B3410]">
                <Sliders className="w-3.5 h-3.5 text-[#B45309]" />
                Настройка под любой объект ГРР
              </span>
            </div>

            <div className="max-w-4xl space-y-2.5">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#23180E] leading-tight">
                Самый удобный инструмент для геолога, который подстраивается под любой участок и любые требования
              </h2>
              <p className="text-sm sm:text-base text-[#463425] leading-relaxed">
                Главная суть <strong>Geocore.vista</strong> — полная <strong>гибкость</strong>. Приложение не ограничивает геолога жёсткими рамками: оно легко адаптируется под геологическое строение любого участка, стадию поисковых или разведочных работ, внутренние регламенты недропользователя и требования стандартов отчётности (ГКЗ, KAZRC, JORC). Выберите любую возможность ниже, чтобы сразу перейти к нужному разделу:
              </p>
            </div>

            {/* 4 столпа гибкости */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <div className="bg-[#FFFDF9]/95 border border-[#D8BC94] rounded-lg p-3.5">
                <div className="font-mono text-[11px] font-bold uppercase text-[#B45309] mb-1">
                  Гибкость под участок
                </div>
                <p className="text-xs text-[#4A3728] leading-relaxed">
                  Настраиваемые справочники пород, кодов литологии, стратиграфии, рудных минералов, штриховок ГОСТ и координатных зон (UTM / WGS84 / местные СК).
                </p>
              </div>
              <div className="bg-[#FFFDF9]/95 border border-[#D8BC94] rounded-lg p-3.5">
                <div className="font-mono text-[11px] font-bold uppercase text-[#9A3412] mb-1">
                  Гибкость под требования
                </div>
                <p className="text-xs text-[#4A3728] leading-relaxed">
                  Адаптация схем контроля качества QA/QC (CRM, Blank, дубликаты), обязательных полей журналов и шаблонов актов под стандарты конкретной компании.
                </p>
              </div>
              <div className="bg-[#FFFDF9]/95 border border-[#D8BC94] rounded-lg p-3.5">
                <div className="font-mono text-[11px] font-bold uppercase text-[#0F766E] mb-1">
                  Удобство работы геолога
                </div>
                <p className="text-xs text-[#4A3728] leading-relaxed">
                  Свободный выбор между быстрым ручным заполнением в маршруте/кернохранилище и пакетным импортом из таблиц с автоматической проверкой глубин.
                </p>
              </div>
              <div className="bg-[#FFFDF9]/95 border border-[#D8BC94] rounded-lg p-3.5">
                <div className="font-mono text-[11px] font-bold uppercase text-[#1D4ED8] mb-1">
                  Интеграция без барьеров
                </div>
                <p className="text-xs text-[#4A3728] leading-relaxed">
                  Выгрузка данных в готовые шаблоны под любую используемую на предприятии ГГИС или CAD-систему, а также в сводный многолистовый Excel и печатные PDF-акты.
                </p>
              </div>
            </div>
          </div>

          {/* Навигатор по всем возможностям (карточки-переходы по пунктам 02–07) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Пункт 02 */}
            <a
              href="#projects"
              className="group flex flex-col justify-between bg-[#FAF4E8]/96 hover:bg-[#FFFDF9] border border-[#C9A26B] hover:border-[#B45309] rounded-xl p-5 shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[#B45309]"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EADBC3] text-[#78350F] font-mono text-xs font-bold">
                    <Compass className="w-3.5 h-3.5 text-[#B45309]" />
                    Пункт 02
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#B45309] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    К разделу <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#261A10] group-hover:text-[#9A3412] transition-colors">
                  Организация проектов, участков и паспортов скважин
                </h3>
                <p className="text-xs sm:text-sm text-[#4A3828] leading-relaxed">
                  Структурирование любых участков и лицензионных площадей в виде папок проектов: карточки устьев, плановый и фактический метраж, сводная статистика по интервалам и пробам.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-[#E2D2B8] flex items-center justify-between text-xs font-mono font-semibold text-[#9A3412]">
                <span>Открыть «02 · Проекты и скважины»</span>
                <span>→</span>
              </div>
            </a>

            {/* Пункт 03 */}
            <a
              href="#capabilities-tree"
              className="group flex flex-col justify-between bg-[#FBF3EC]/96 hover:bg-[#FFFDFB] border border-[#C89578] hover:border-[#9A3412] rounded-xl p-5 shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[#9A3412]"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F2DEC9] text-[#7C2D12] font-mono text-xs font-bold">
                    <Layers className="w-3.5 h-3.5 text-[#9A3412]" />
                    Пункт 03
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#9A3412] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    К разделу <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#271710] group-hover:text-[#9A3412] transition-colors">
                  Поинтервальная документация (7 модулей бурового журнала)
                </h3>
                <p className="text-xs sm:text-sm text-[#4A3428] leading-relaxed">
                  Литология, вторичные изменения, Drilling Parameters (рейсы, TCR/SCR/RQD), минерализация, тектоника, прожилки и инклинометрия — с ручным заполнением и импортом.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-[#DFC7B5] flex items-center justify-between text-xs font-mono font-semibold text-[#9A3412]">
                <span>Открыть «03 · Журналы скважины»</span>
                <span>→</span>
              </div>
            </a>

            {/* Пункт 04 */}
            <a
              href="#geology-gis"
              className="group flex flex-col justify-between bg-[#FAF4E8]/96 hover:bg-[#FFFDF9] border border-[#C6A276] hover:border-[#B45309] rounded-xl p-5 shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[#B45309]"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EADAC0] text-[#78350F] font-mono text-xs font-bold">
                    <Map className="w-3.5 h-3.5 text-[#B45309]" />
                    Пункт 04
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#B45309] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    К разделу <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#241A12] group-hover:text-[#9A3412] transition-colors">
                  Карта скважин, проектирование устьев и геологический разрез
                </h3>
                <p className="text-xs sm:text-sm text-[#473628] leading-relaxed">
                  Офлайн-карта по зонам UTM / WGS84, замер расстояний и азимутов, наметка проектных скважин, построение разреза по профилю и стратиграфической колонки ГОСТ.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-[#DEC8A4] flex items-center justify-between text-xs font-mono font-semibold text-[#B45309]">
                <span>Открыть «04 · Карта и разрез»</span>
                <span>→</span>
              </div>
            </a>

            {/* Пункт 05 */}
            <a
              href="#core-sampling"
              className="group flex flex-col justify-between bg-[#F4F5F0]/96 hover:bg-[#FAFBF8] border border-[#94A39B] hover:border-[#0F766E] rounded-xl p-5 shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[#0F766E]"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#DCE5E0] text-[#0F766E] font-mono text-xs font-bold">
                    <FlaskConical className="w-3.5 h-3.5 text-[#0F766E]" />
                    Пункт 05
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#0F766E] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    К разделу <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#16201D] group-hover:text-[#0F766E] transition-colors">
                  Учёт керна, геомеханика и опробование по стандартам QA/QC
                </h3>
                <p className="text-xs sm:text-sm text-[#2F3E39] leading-relaxed">
                  Ведение ведомости рядовых керновых проб и контрольных вставок (CRM, Blank, дубликаты), сквозное прослеживание партий, расчёт TCR/SCR/RQD и прочности ISRM.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-[#C4D0C9] flex items-center justify-between text-xs font-mono font-semibold text-[#0F766E]">
                <span>Открыть «05 · Керн и опробование»</span>
                <span>→</span>
              </div>
            </a>

            {/* Пункт 06 */}
            <a
              href="#validation-docs"
              className="group flex flex-col justify-between bg-[#FAF4F0]/96 hover:bg-[#FCF9F6] border border-[#C49E92] hover:border-[#9A3412] rounded-xl p-5 shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[#9A3412]"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EFE0DA] text-[#9A3412] font-mono text-xs font-bold">
                    <Database className="w-3.5 h-3.5 text-[#9A3412]" />
                    Пункт 06
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#9A3412] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    К разделу <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#241815] group-hover:text-[#9A3412] transition-colors">
                  Готовые шаблоны под профильное ПО и выгрузка в Excel
                </h3>
                <p className="text-xs sm:text-sm text-[#483530] leading-relaxed">
                  Прямая подготовка шаблонов для Leapfrog Geo, Micromine, GEOVIA Surpac, Datamine Studio RM, QGIS / ArcGIS Pro, AutoCAD Civil 3D и выгрузка в многолистовый Excel (.xlsx).
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-[#DEC6BE] flex items-center justify-between text-xs font-mono font-semibold text-[#9A3412]">
                <span>Открыть «06 · Экспорт в ПО и Excel»</span>
                <span>→</span>
              </div>
            </a>

            {/* Пункт 07 */}
            <a
              href="#auto-docs"
              className="group flex flex-col justify-between bg-[#FAF6EB]/96 hover:bg-[#FFFDF9] border border-[#C6A276] hover:border-[#D97706] rounded-xl p-5 shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[#D97706]"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EFE1C6] text-[#9A3412] font-mono text-xs font-bold">
                    <FileCheck2 className="w-3.5 h-3.5 text-[#D97706]" />
                    Пункт 07
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#B45309] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    К разделу <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#1C1612] group-hover:text-[#B45309] transition-colors">
                  Автоматическое формирование актов и лабораторных документов
                </h3>
                <p className="text-xs sm:text-sm text-[#4A3B2F] leading-relaxed">
                  Мгновенная генерация готовых печатных форм: акты заложения, контрольного замера, закрытия, рекультивации, искривления, наряд-заказы QA/QC и акты приёма-передачи проб.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-[#E2D4BE] flex items-center justify-between text-xs font-mono font-semibold text-[#B45309]">
                <span>Открыть «07 · Акты и документы»</span>
                <span>→</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ШАГ 2: ПРОЕКТЫ В ВИДЕ ПАПОК (Золотисто-охристая гамма песчаника)
      ===================================================================== */}
      <section id="projects" className="relative py-12 sm:py-16">
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="max-w-3xl space-y-1.5 bg-linear-to-r from-[#FAF4E8]/96 to-[#F4E9D4]/95 backdrop-blur-xs border border-[#C9A26B] border-l-4 border-l-[#B45309] rounded-lg p-4 sm:p-5 shadow-md">
            <p className="text-xs font-mono uppercase tracking-wider font-semibold text-[#B45309]">
              02 · Проекты и скважины
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#261A10]">
              Проекты со всеми скважинами и геологическими данными
            </h2>
            <p className="text-sm text-[#4A3828] leading-relaxed">
              В Geocore.vista каждый проект организован как отдельная папка. Внутри папки проекта хранятся входящие в него скважины и вся необходимая информация по ним: проектные данные скважины, суммарный метраж, литологические интервалы, ведомости опробования, замеры и документы.
            </p>
          </div>

          {/* Folder Cards (Visual Folder Tabs like in the application) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO_PROJECTS.map((prj) => {
              const isOpen = prj.id === selectedFolderId;
              return (
                <button
                  key={prj.id}
                  type="button"
                  onClick={() => handleSelectFolder(prj.id)}
                  className="text-left group focus-visible:outline-2 focus-visible:outline-[#B45309]"
                >
                  {/* Folder Tab Top */}
                  <div className="flex items-center">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-t border-t border-x text-xs font-mono transition-colors ${
                        isOpen
                          ? 'bg-[#FFFDF9] border-[#B45309] text-[#9A3412] font-semibold'
                          : 'bg-[#EADBC3] border-[#C9A675] text-[#5C4328] group-hover:bg-[#FAF3E6]'
                      }`}
                    >
                      {isOpen ? (
                        <FolderOpen className="w-3.5 h-3.5 text-[#B45309]" />
                      ) : (
                        <Folder className="w-3.5 h-3.5 text-[#85582A]" />
                      )}
                      <span>{prj.code}</span>
                    </div>
                  </div>

                  {/* Folder Body */}
                  <div
                    className={`p-4 rounded-b rounded-tr border transition-all ${
                      isOpen
                        ? 'bg-[#FFFDF9] border-[#B45309] shadow-md ring-1 ring-[#B45309]/25'
                        : 'bg-[#FAF5EB]/95 border-[#C9A675] group-hover:bg-[#FFFDF9] group-hover:border-[#B45309]/70 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-display text-sm font-semibold text-[#261A10] truncate">
                        {prj.name}
                      </h3>
                      <span className="font-mono text-[11px] text-[#7C5832] shrink-0">
                        {isOpen ? 'Свернуть папку' : 'Открыть папку'}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C4430] mb-3 truncate">{prj.region}</p>

                    {/* 4 Confirmed Folder Counters */}
                    <div className="grid grid-cols-4 gap-2 pt-2.5 border-t border-[#E2D2B8] font-mono">
                      <div>
                        <div className="text-[10px] text-[#7C5832]">СКВАЖИНЫ</div>
                        <div className="text-sm font-semibold text-[#261A10] tabular-nums">{prj.boreholesCount}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#7C5832]">МЕТРАЖ</div>
                        <div className="text-sm font-semibold text-[#261A10] tabular-nums">{prj.totalMeters} м</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#7C5832]">ИНТЕРВАЛЫ</div>
                        <div className="text-sm font-semibold text-[#261A10] tabular-nums">{prj.lithoIntervalsCount}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#7C5832]">ПРОБЫ</div>
                        <div className="text-sm font-semibold text-[#B45309] tabular-nums">{prj.samplesCount}</div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Opened Folder Contents: Borehole List + Selected Borehole Passport (shown ONLY when a folder is clicked) */}
          {activeFolder && (
            <div className="bg-[#FAF5EB]/96 border border-[#C9A675] rounded-lg overflow-hidden shadow-md">
              <div className="px-4 py-2.5 bg-[#EADBC3] border-b border-[#C9A675] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#261A10] font-semibold">
                  <FolderOpen className="w-4 h-4 text-[#B45309]" />
                  <span>Содержимое папки проекта «{activeFolder.name}» ({folderBoreholes.length} скв.)</span>
                </div>
                <span className="text-[#5C4430]">
                  Выберите скважину внутри папки для просмотра её паспорта и данных
                </span>
              </div>

              <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Boreholes inside the opened project folder */}
                <div className="lg:col-span-7 overflow-x-auto border border-[#D5BC96] rounded bg-[#FFFDF9]">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#F3E8D4] text-[#5C4430] font-mono text-[11px] border-b border-[#D5BC96]">
                        <th className="py-2 px-3">СКВАЖИНА (BHID)</th>
                        <th className="py-2 px-3">УЧАСТОК / ПРОФИЛЬ</th>
                        <th className="py-2 px-3 text-right">ГЛУБИНА ФАКТ</th>
                        <th className="py-2 px-3 text-right">ИНТ. / ПРОБЫ</th>
                        <th className="py-2 px-3">СТАТУС</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE0CE]">
                      {folderBoreholes.map((hole) => {
                        const isSelected = hole.bhid === inspectedHole.bhid;
                        return (
                          <tr
                            key={hole.bhid}
                            onClick={() => setSelectedBhid(hole.bhid)}
                            className={`cursor-pointer ${
                              isSelected ? 'bg-[#FEF3C7]/70' : 'hover:bg-[#FAF3E6]'
                            }`}
                          >
                            <td className="py-2 px-3 font-mono font-semibold text-[#261A10] whitespace-nowrap">
                              <span className="inline-flex items-center gap-1.5">
                                <FileSpreadsheet className="w-3.5 h-3.5 text-[#B45309]" />
                                {hole.bhid}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-[#5C4430]">{hole.site}</td>
                            <td className="py-2 px-3 text-right font-mono tabular-nums text-[#261A10]">{hole.actualDepth.toFixed(1)} м</td>
                            <td className="py-2 px-3 text-right font-mono tabular-nums text-[#B45309] font-semibold">
                              {hole.lithoCount} / {hole.sampleCount}
                            </td>
                            <td className="py-2 px-3 font-mono text-[11px] text-[#5C4430]">{hole.status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Selected Borehole Information Card */}
                <div className="lg:col-span-5 bg-[#F4E9D4] border border-[#D5BC96] rounded p-3.5 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-[#DEC8A4] pb-1.5 font-mono">
                    <span className="font-semibold text-[#261A10]">Карточка скважины: {inspectedHole.bhid}</span>
                    <span className="text-[#B45309] font-semibold">{inspectedHole.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px] bg-[#FFFDF9] p-2.5 rounded border border-[#E2D2B8]">
                    <div>Папка: <strong className="font-sans text-[#261A10]">{activeFolder.code}</strong></div>
                    <div>Участок: <strong className="font-sans text-[#261A10]">{inspectedHole.site}</strong></div>
                    <div>X/Y (без CRS): <strong>{inspectedHole.x} / {inspectedHole.y}</strong></div>
                    <div>Отметка Z: <strong>{inspectedHole.z.toFixed(1)} м</strong></div>
                    <div>План / Факт: <strong className="text-[#B45309]">{inspectedHole.plannedDepth} / {inspectedHole.actualDepth} м</strong></div>
                    <div>Азимут / Наклон: <strong>{inspectedHole.azimuth}° / {inspectedHole.dip}°</strong></div>
                    <div>Лит. интервалов: <strong>{inspectedHole.lithoCount}</strong></div>
                    <div>Керновых проб: <strong className="text-[#B45309]">{inspectedHole.sampleCount}</strong></div>
                  </div>
                  <div className="text-[#4A3828]">{inspectedHole.notes}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          ШАГ 2: ПОИНТЕРВАЛЬНАЯ РЕГИСТРАЦИЯ (Терракотово-медная гамма)
      ===================================================================== */}
      <section id="capabilities-tree" className="relative py-12 sm:py-16">
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="max-w-3xl space-y-1 bg-linear-to-r from-[#FBF3EC]/96 to-[#F5E6D8]/95 backdrop-blur-xs border border-[#C89578] border-l-4 border-l-[#9A3412] rounded-lg p-4 sm:p-5 shadow-md">
            <p className="text-xs font-mono uppercase tracking-wider font-semibold text-[#9A3412]">
              03 · Журналы скважины внутри проекта
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#271710]">
              Поинтервальная регистрация геологических данных
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT 4 COLS: SEQUENTIAL LIST OF MODULES */}
            <div className="lg:col-span-4 bg-[#FAF3EB]/96 border border-[#C89578] rounded-lg p-4 shadow-md">
              <div className="font-mono text-xs font-semibold text-[#271710] pb-3 mb-3 border-b border-[#DFC7B5]">
                Скважина {inspectedHole.bhid} (0.0–{inspectedHole.actualDepth.toFixed(1)} м)
              </div>

              <div className="relative pl-4 border-l-2 border-[#9A3412]/45 space-y-2">
                {treeBranches.map((branch) => {
                  const isActive = branch.id === activeBranch;
                  return (
                    <div key={branch.id} className="relative">
                      <span
                        aria-hidden="true"
                        className={`absolute -left-4 top-5 w-3 h-0.5 ${
                          isActive ? 'bg-[#9A3412]' : 'bg-[#D5B8A3]'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setActiveBranch(branch.id)}
                        className={`w-full text-left p-3 rounded border transition-all ${
                          isActive
                            ? 'bg-[#FFFDFB] border-[#9A3412] shadow-xs ring-1 ring-[#9A3412]/20'
                            : 'bg-[#F5E9DC]/80 border-[#DFC7B5] hover:bg-[#FFFDFB] hover:border-[#B45309]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display text-xs sm:text-sm font-semibold text-[#271710]">
                            {branch.num}) {branch.title}
                          </span>
                          <span
                            className={`font-mono text-[11px] ${
                              isActive ? 'text-[#9A3412] font-semibold' : 'text-[#785540]'
                            }`}
                          >
                            {isActive ? 'Активно' : 'Открыть →'}
                          </span>
                        </div>
                        <div className="text-xs text-[#573D2D] mt-0.5">{branch.shortDesc}</div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT 8 COLS: EXPLANATION + FULL VISUAL TABLE */}
            <div className="lg:col-span-8 bg-[#FFFDFB]/96 border border-[#C89578] rounded-lg overflow-hidden shadow-md">
              <div className="p-4 sm:p-5 bg-[#F4E6D8] border-b border-[#D5B8A3] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#271710]">
                    {currentBranchMeta.num}) {currentBranchMeta.title}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-[#9A3412]">
                    Доступно ручное заполнение и редактирование в таблице
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4A3325] leading-relaxed">
                  {currentBranchMeta.fullExplanation}
                </p>
              </div>

              <div className="p-4 sm:p-5">
                {activeBranch === 'lithology' && (
                  <div className="overflow-x-auto border border-[#D8D5CD] rounded">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#EFECE4] text-[#475569] font-mono text-[11px] border-b border-[#D8D5CD]">
                          <th className="py-2.5 px-3">ОТ (М)</th>
                          <th className="py-2.5 px-3">ДО (М)</th>
                          <th className="py-2.5 px-3">ДЛИНА</th>
                          <th className="py-2.5 px-3">КОД</th>
                          <th className="py-2.5 px-3">ПОРОДА</th>
                          <th className="py-2.5 px-3">СТРУКТУРА / ЗЕРНИСТОСТЬ</th>
                          <th className="py-2.5 px-3">ОПИСАНИЕ ИНТЕРВАЛА</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2DFD5]">
                        {lithoList.map((row) => (
                          <tr key={row.id} className="hover:bg-[#FAF9F5]">
                            <td className="py-2.5 px-3 font-mono tabular-nums font-medium">{row.from.toFixed(1)}</td>
                            <td className="py-2.5 px-3 font-mono tabular-nums font-medium">{row.to.toFixed(1)}</td>
                            <td className="py-2.5 px-3 font-mono tabular-nums text-[#64748B]">
                              {(row.to - row.from).toFixed(1)} м
                            </td>
                            <td className="py-2.5 px-3 font-mono font-semibold text-[#0F766E]">{row.code}</td>
                            <td className="py-2.5 px-3 font-semibold text-[#14171A]">{row.rockName}</td>
                            <td className="py-2.5 px-3 text-[#475569]">
                              {row.structure} · {row.grainSize}
                            </td>
                            <td className="py-2.5 px-3 text-[#334155] min-w-[200px]">{row.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeBranch === 'alteration' && (
                  <div className="overflow-x-auto border border-[#D8D5CD] rounded">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#EFECE4] text-[#475569] font-mono text-[11px] border-b border-[#D8D5CD]">
                          <th className="py-2.5 px-3">ОТ–ДО (М)</th>
                          <th className="py-2.5 px-3">ТИП ВТОРИЧНОГО ИЗМЕНЕНИЯ</th>
                          <th className="py-2.5 px-3">ИНТЕНСИВНОСТЬ</th>
                          <th className="py-2.5 px-3">ФОРМА ПРОЯВЛЕНИЯ</th>
                          <th className="py-2.5 px-3">ПРИМЕЧАНИЕ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2DFD5]">
                        {DEMO_ALTERATIONS.map((alt, idx) => (
                          <tr key={idx} className="hover:bg-[#FAF9F5]">
                            <td className="py-2.5 px-3 font-mono tabular-nums font-medium whitespace-nowrap">
                              {alt.from.toFixed(1)}–{alt.to.toFixed(1)}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-[#14171A]">{alt.type}</td>
                            <td className="py-2.5 px-3 font-mono text-[#0F766E]">{alt.intensity}</td>
                            <td className="py-2.5 px-3 text-[#334155]">{alt.mode}</td>
                            <td className="py-2.5 px-3 text-[#475569]">{alt.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeBranch === 'drilling' && (
                  <div className="overflow-x-auto border border-[#D8D5CD] rounded">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#EFECE4] text-[#475569] font-mono text-[11px] border-b border-[#D8D5CD]">
                          <th className="py-2.5 px-3">РЕЙС #</th>
                          <th className="py-2.5 px-3">ОТ–ДО (М)</th>
                          <th className="py-2.5 px-3">РАЗМЕР</th>
                          <th className="py-2.5 px-3 text-right">TCR (%)</th>
                          <th className="py-2.5 px-3 text-right">SCR (%)</th>
                          <th className="py-2.5 px-3 text-right">RQD (%)</th>
                          <th className="py-2.5 px-3">ISRM (ПОЛЕВАЯ)</th>
                          <th className="py-2.5 px-3">СОСТОЯНИЕ КЕРНА</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2DFD5]">
                        {DEMO_DRILL_RUNS.map((r) => (
                          <tr key={r.runNumber} className="hover:bg-[#FAF9F5]">
                            <td className="py-2.5 px-3 font-mono font-semibold">#{r.runNumber}</td>
                            <td className="py-2.5 px-3 font-mono tabular-nums whitespace-nowrap">
                              {r.from.toFixed(1)}–{r.to.toFixed(1)}
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[11px]">{r.coreSize}</td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums">{r.tcrPct.toFixed(1)}%</td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums">{r.scrPct.toFixed(1)}%</td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-[#0F766E]">
                              {r.rqdPct.toFixed(1)}%
                            </td>
                            <td className="py-2.5 px-3 font-mono">{r.isrmCode}</td>
                            <td className="py-2.5 px-3 text-[#334155]">{r.coreCondition}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeBranch === 'mineralization' && (
                  <div className="overflow-x-auto border border-[#D8D5CD] rounded">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#EFECE4] text-[#475569] font-mono text-[11px] border-b border-[#D8D5CD]">
                          <th className="py-2.5 px-3">ОТ–ДО (М)</th>
                          <th className="py-2.5 px-3">РУДНЫЕ МИНЕРАЛЫ</th>
                          <th className="py-2.5 px-3">ТЕКСТУРА ОРУДЕНЕНИЯ</th>
                          <th className="py-2.5 px-3 text-right">СУЛЬФИДЫ (%)</th>
                          <th className="py-2.5 px-3">ПРИМЕЧАНИЕ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2DFD5]">
                        {DEMO_MINERALIZATION.map((m, i) => (
                          <tr key={i} className="hover:bg-[#FAF9F5]">
                            <td className="py-2.5 px-3 font-mono tabular-nums font-medium">
                              {m.from.toFixed(1)}–{m.to.toFixed(1)}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-[#14171A]">{m.minerals}</td>
                            <td className="py-2.5 px-3 text-[#334155]">{m.texture}</td>
                            <td className="py-2.5 px-3 text-right font-mono font-semibold text-[#0F766E]">
                              {m.totalSulfidesPct.toFixed(2)}%
                            </td>
                            <td className="py-2.5 px-3 text-[#475569]">{m.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeBranch === 'tectonics' && (
                  <div className="overflow-x-auto border border-[#D8D5CD] rounded">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#EFECE4] text-[#475569] font-mono text-[11px] border-b border-[#D8D5CD]">
                          <th className="py-2.5 px-3">ОТ–ДО (М)</th>
                          <th className="py-2.5 px-3">СТРУКТУРНЫЙ ТИП</th>
                          <th className="py-2.5 px-3">УГОЛ К ОСИ КЕРНА</th>
                          <th className="py-2.5 px-3">ЧАСТОТА ТРЕЩИН</th>
                          <th className="py-2.5 px-3">ХАРАКТЕР ЗАПОЛНЕНИЯ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2DFD5]">
                        {DEMO_TECTONICS.map((t, i) => (
                          <tr key={i} className="hover:bg-[#FAF9F5]">
                            <td className="py-2.5 px-3 font-mono tabular-nums font-medium">
                              {t.from.toFixed(1)}–{t.to.toFixed(1)}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-[#14171A]">{t.structureType}</td>
                            <td className="py-2.5 px-3 font-mono">{t.angleToCore}</td>
                            <td className="py-2.5 px-3 font-mono text-[#B45309]">{t.fractureFreq}</td>
                            <td className="py-2.5 px-3 text-[#334155]">{t.gouge}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeBranch === 'veins' && (
                  <div className="overflow-x-auto border border-[#D8D5CD] rounded">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#EFECE4] text-[#475569] font-mono text-[11px] border-b border-[#D8D5CD]">
                          <th className="py-2.5 px-3">ОТ–ДО (М)</th>
                          <th className="py-2.5 px-3">МИНЕРАЛЬНЫЙ СОСТАВ И ТИП</th>
                          <th className="py-2.5 px-3">МОЩНОСТЬ</th>
                          <th className="py-2.5 px-3">УГОЛ К ОСИ</th>
                          <th className="py-2.5 px-3">ПЛОТНОСТЬ / АССОЦИАЦИЯ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2DFD5]">
                        {DEMO_VEINS.map((v, i) => (
                          <tr key={i} className="hover:bg-[#FAF9F5]">
                            <td className="py-2.5 px-3 font-mono tabular-nums font-medium">
                              {v.from.toFixed(1)}–{v.to.toFixed(1)}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-[#14171A]">{v.composition}</td>
                            <td className="py-2.5 px-3 font-mono">{v.thicknessMm}</td>
                            <td className="py-2.5 px-3 font-mono">{v.angleDeg}</td>
                            <td className="py-2.5 px-3 text-[#334155]">
                              <strong className="font-mono text-[#0F766E]">{v.densityPerM}</strong> · {v.sulfideAssoc}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeBranch === 'inclinometry' && (
                  <div className="overflow-x-auto border border-[#D8D5CD] rounded">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#EFECE4] text-[#475569] font-mono text-[11px] border-b border-[#D8D5CD]">
                          <th className="py-2.5 px-3 text-right">ГЛУБИНА ЗАМЕРА (М)</th>
                          <th className="py-2.5 px-3 text-right">АЗИМУТ (°)</th>
                          <th className="py-2.5 px-3 text-right">УГОЛ НАКЛОНА (°)</th>
                          <th className="py-2.5 px-3">МЕТОД ИЗМЕРЕНИЯ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2DFD5]">
                        {DEMO_INCLINOMETRY.map((inc, i) => (
                          <tr key={i} className="hover:bg-[#FAF9F5]">
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold">
                              {inc.depth.toFixed(1)}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums">{inc.azimuth.toFixed(1)}°</td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#0F766E] font-semibold">
                              {inc.dip.toFixed(1)}°
                            </td>
                            <td className="py-2.5 px-3 text-[#475569]">{inc.method}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
