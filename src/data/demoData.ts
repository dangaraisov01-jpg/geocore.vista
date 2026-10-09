export interface Borehole {
  bhid: string;
  projectId: string;
  projectName: string;
  site: string;
  company: string;
  x: number;
  y: number;
  z: number;
  lat: number;
  lon: number;
  plannedDepth: number;
  actualDepth: number;
  azimuth: number;
  dip: number;
  startDate: string;
  endDate: string;
  status: 'В бурении' | 'Завершена' | 'На проверке';
  lithoCount: number;
  sampleCount: number;
  notes: string;
}

export interface ProjectFolder {
  id: string;
  code: string;
  name: string;
  region: string;
  company: string;
  boreholesCount: number;
  totalMeters: number;
  lithoIntervalsCount: number;
  samplesCount: number;
  updatedAt: string;
}

export const DEMO_PROJECTS: ProjectFolder[] = [
  {
    id: 'prj-saryarka',
    code: 'PRJ-SRK-01',
    name: 'Сарыарка-Север (Вымышленный участок)',
    region: 'Центральный Казахстан · уч. Северный',
    company: 'ТОО «ГеоСпектр-Демо» (вымышл.)',
    boreholesCount: 4,
    totalMeters: 1210.0,
    lithoIntervalsCount: 38,
    samplesCount: 164,
    updatedAt: '2026-10-07'
  },
  {
    id: 'prj-balkhash',
    code: 'PRJ-BLK-04',
    name: 'Прибалхашье-Восток (Демо-площадь)',
    region: 'Юго-Восточный сектор · уч. Медный',
    company: 'ТОО «КазРудаПроект-Демо» (вымышл.)',
    boreholesCount: 3,
    totalMeters: 945.0,
    lithoIntervalsCount: 29,
    samplesCount: 118,
    updatedAt: '2026-10-06'
  },
  {
    id: 'prj-mugodzhary',
    code: 'PRJ-MGD-02',
    name: 'Мугоджарский контур (Учебный проект)',
    region: 'Западный сектор · уч. Южный хребет',
    company: 'ТОО «ГеоСпектр-Демо» (вымышл.)',
    boreholesCount: 2,
    totalMeters: 520.0,
    lithoIntervalsCount: 16,
    samplesCount: 62,
    updatedAt: '2026-10-04'
  }
];

export const DEMO_BOREHOLES: Borehole[] = [
  {
    bhid: 'BH-SRK-101',
    projectId: 'prj-saryarka',
    projectName: 'Сарыарка-Север (Вымышленный участок)',
    site: 'Профиль I-I · Сев. фланг',
    company: 'ТОО «ГеоСпектр-Демо»',
    x: 452180,
    y: 5312410,
    z: 642.5,
    lat: 48.42,
    lon: 71.85,
    plannedDepth: 320.0,
    actualDepth: 320.0,
    azimuth: 135.0,
    dip: -75.0,
    startDate: '2026-09-12',
    endDate: '2026-09-28',
    status: 'Завершена',
    lithoCount: 11,
    sampleCount: 48,
    notes: 'Устье закреплено репером. Вскрыта зона кварц-серицитовых метасоматитов.'
  },
  {
    bhid: 'BH-SRK-102',
    projectId: 'prj-saryarka',
    projectName: 'Сарыарка-Север (Вымышленный участок)',
    site: 'Профиль I-I · Центр',
    company: 'ТОО «ГеоСпектр-Демо»',
    x: 452290,
    y: 5312320,
    z: 638.0,
    lat: 48.38,
    lon: 72.15,
    plannedDepth: 350.0,
    actualDepth: 340.0,
    azimuth: 135.0,
    dip: -70.0,
    startDate: '2026-09-18',
    endDate: '2026-10-03',
    status: 'Завершена',
    lithoCount: 12,
    sampleCount: 54,
    notes: 'Пересечена минерализованная зона в гранодиоритах (142–188 м).'
  },
  {
    bhid: 'BH-SRK-103',
    projectId: 'prj-saryarka',
    projectName: 'Сарыарка-Север (Вымышленный участок)',
    site: 'Профиль I-I · ЮВ фланг',
    company: 'ТОО «ГеоСпектр-Демо»',
    x: 452410,
    y: 5312230,
    z: 634.2,
    lat: 48.35,
    lon: 72.42,
    plannedDepth: 300.0,
    actualDepth: 300.0,
    azimuth: 135.0,
    dip: -72.0,
    startDate: '2026-09-25',
    endDate: '2026-10-06',
    status: 'На проверке',
    lithoCount: 9,
    sampleCount: 42,
    notes: 'Ожидается проверка границ тектонического нарушения на гл. 114.0 м.'
  },
  {
    bhid: 'BH-SRK-104',
    projectId: 'prj-saryarka',
    projectName: 'Сарыарка-Север (Вымышленный участок)',
    site: 'Профиль II-II · Восток',
    company: 'ТОО «ГеоСпектр-Демо»',
    x: 452620,
    y: 5312510,
    z: 649.0,
    lat: 48.51,
    lon: 72.60,
    plannedDepth: 280.0,
    actualDepth: 250.0,
    azimuth: 140.0,
    dip: -65.0,
    startDate: '2026-10-01',
    endDate: '2026-10-07',
    status: 'В бурении',
    lithoCount: 6,
    sampleCount: 20,
    notes: 'Поисковая скважина на восточном замыкании структуры.'
  },
  {
    bhid: 'BH-BLK-201',
    projectId: 'prj-balkhash',
    projectName: 'Прибалхашье-Восток (Демо-площадь)',
    site: 'Участок Медный · СЗ',
    company: 'ТОО «КазРудаПроект-Демо»',
    x: 518320,
    y: 5190440,
    z: 492.0,
    lat: 46.85,
    lon: 75.40,
    plannedDepth: 340.0,
    actualDepth: 340.0,
    azimuth: 90.0,
    dip: -75.0,
    startDate: '2026-08-20',
    endDate: '2026-09-10',
    status: 'Завершена',
    lithoCount: 11,
    sampleCount: 46,
    notes: 'Штокверковое прожилкование с халькопиритом и пиритом.'
  },
  {
    bhid: 'BH-BLK-202',
    projectId: 'prj-balkhash',
    projectName: 'Прибалхашье-Восток (Демо-площадь)',
    site: 'Участок Медный · Центр',
    company: 'ТОО «КазРудаПроект-Демо»',
    x: 518490,
    y: 5190410,
    z: 489.5,
    lat: 46.80,
    lon: 75.72,
    plannedDepth: 320.0,
    actualDepth: 325.0,
    azimuth: 90.0,
    dip: -70.0,
    startDate: '2026-09-02',
    endDate: '2026-09-21',
    status: 'Завершена',
    lithoCount: 10,
    sampleCount: 44,
    notes: 'Подсечены андезитовые порфириты и диоритовые порфиры.'
  },
  {
    bhid: 'BH-BLK-203',
    projectId: 'prj-balkhash',
    projectName: 'Прибалхашье-Восток (Демо-площадь)',
    site: 'Участок Медный · Юг',
    company: 'ТОО «КазРудаПроект-Демо»',
    x: 518640,
    y: 5190360,
    z: 486.0,
    lat: 46.72,
    lon: 75.95,
    plannedDepth: 280.0,
    actualDepth: 280.0,
    azimuth: 92.0,
    dip: -68.0,
    startDate: '2026-09-19',
    endDate: '2026-10-05',
    status: 'На проверке',
    lithoCount: 8,
    sampleCount: 28,
    notes: 'Проведена детальная документация RQD и параметров ISRM.'
  },
  {
    bhid: 'BH-MGD-301',
    projectId: 'prj-mugodzhary',
    projectName: 'Мугоджарский контур (Учебный проект)',
    site: 'Западный профиль',
    company: 'ТОО «ГеоСпектр-Демо»',
    x: 312450,
    y: 5410820,
    z: 385.0,
    lat: 48.95,
    lon: 58.65,
    plannedDepth: 260.0,
    actualDepth: 260.0,
    azimuth: 60.0,
    dip: -75.0,
    startDate: '2026-09-05',
    endDate: '2026-09-19',
    status: 'Завершена',
    lithoCount: 8,
    sampleCount: 32,
    notes: 'Диабазы и кремнистые туффиты с сульфидной вкрапленностью.'
  },
  {
    bhid: 'BH-MGD-302',
    projectId: 'prj-mugodzhary',
    projectName: 'Мугоджарский контур (Учебный проект)',
    site: 'Восточный профиль',
    company: 'ТОО «ГеоСпектр-Демо»',
    x: 312610,
    y: 5410750,
    z: 382.0,
    lat: 48.88,
    lon: 59.05,
    plannedDepth: 260.0,
    actualDepth: 260.0,
    azimuth: 60.0,
    dip: -75.0,
    startDate: '2026-09-20',
    endDate: '2026-10-04',
    status: 'Завершена',
    lithoCount: 8,
    sampleCount: 30,
    notes: 'Завершена, подготовлены акты заложения и контрольного замера.'
  }
];

export const DAILY_UPDATES_DEMO = [
  { date: '2026-10-07', bhid: 'BH-SRK-104', project: 'Сарыарка-Север', action: 'Добавлены рейсы бурения #34–#41 (210.0–250.0 м)', authorRole: 'GEOLOGIST', deltaMeters: '+40.0 м' },
  { date: '2026-10-06', bhid: 'BH-SRK-103', project: 'Сарыарка-Север', action: 'Заполнен журнал минерализации и ведомость проб (42 шт.)', authorRole: 'GEOLOGIST', deltaMeters: '300.0 м (итог)' },
  { date: '2026-10-05', bhid: 'BH-BLK-203', project: 'Прибалхашье-Восток', action: 'Сформирован акт контрольного замера глубины (280.0 м)', authorRole: 'GEOLOGIST', deltaMeters: '280.0 м (итог)' },
  { date: '2026-10-04', bhid: 'BH-MGD-302', project: 'Мугоджарский контур', action: 'Завершена документация литологии и вторичных изменений', authorRole: 'GEOLOGIST', deltaMeters: '+35.0 м' },
  { date: '2026-10-03', bhid: 'BH-SRK-102', project: 'Сарыарка-Север', action: 'Проведена проверка интервалов и подготовка XLSX/CSV', authorRole: 'ADMIN', deltaMeters: '340.0 м (итог)' }
];

export interface LithoInterval {
  id: string;
  from: number;
  to: number;
  code: string;
  rockName: string;
  colorHex: string;
  pattern: 'overburden' | 'andesite' | 'granodiorite' | 'metasomatite' | 'breccia' | 'diorite';
  structure: string;
  grainSize: string;
  description: string;
  validationNotice?: string;
}

export const DEMO_LITHO_INTERVALS: Record<string, LithoInterval[]> = {
  'BH-SRK-101': [
    { id: 'L1', from: 0.0, to: 18.0, code: 'Q_el', rockName: 'Суглинки и щебнистый элювий', colorHex: '#D6CFC2', pattern: 'overburden', structure: 'Рыхлая, обломочная', grainSize: 'Разнозернистая', description: 'Буровато-серые суглинки с обломками эффузивов до 15–20%.' },
    { id: 'L2', from: 18.0, to: 76.0, code: 'P1_an', rockName: 'Андезитовый порфирит', colorHex: '#64748B', pattern: 'andesite', structure: 'Порфировая, массивная', grainSize: 'Тонкозернистая', description: 'Темно-зеленовато-серый порфирит с вкрапленниками плагиоклаза 1–3 мм.' },
    { id: 'L3', from: 76.0, to: 128.0, code: 'C3_gd', rockName: 'Гранодиорит биотит-роговообманковый', colorHex: '#C27D60', pattern: 'granodiorite', structure: 'Гипидиоморфнозернистая', grainSize: 'Среднезернистая', description: 'Светло-серый гранодиорит с равномерным распределением темноцветных минералов.' },
    { id: 'L4', from: 128.0, to: 174.0, code: 'C3_gdp', rockName: 'Гранодиорит-порфир катаклазированный', colorHex: '#0F766E', pattern: 'metasomatite', structure: 'Порфировидная, катакластическая', grainSize: 'Мелко-среднезернистая', description: 'Первичный интрузивный субстрат зоны интенсивных изменений (изменения и сульфиды — в отдельных вкладках журнала).' },
    { id: 'L5', from: 174.0, to: 212.0, code: 'T_br', rockName: 'Брекчия интрузивных пород', colorHex: '#B45309', pattern: 'breccia', structure: 'Брекчиевая, обломочная', grainSize: 'Обломки 5–30 мм', description: 'Остроугольные обломки гранодиоритов и порфиритов в мелкообломочном матриксе.' },
    { id: 'L6', from: 212.0, to: 320.0, code: 'C3_gd', rockName: 'Гранодиорит биотитовый', colorHex: '#C27D60', pattern: 'granodiorite', structure: 'Массивная', grainSize: 'Среднезернистая', description: 'Плотный массивный гранодиорит подрудного блока.' }
  ],
  'BH-SRK-102': [
    { id: 'L2-1', from: 0.0, to: 14.0, code: 'Q_el', rockName: 'Суглинки и щебнистый элювий', colorHex: '#D6CFC2', pattern: 'overburden', structure: 'Рыхлая', grainSize: 'Разнозернистая', description: 'Покровные четвертичные отложения с дресвой.' },
    { id: 'L2-2', from: 14.0, to: 68.0, code: 'P1_an', rockName: 'Андезитовый порфирит', colorHex: '#64748B', pattern: 'andesite', structure: 'Порфировая', grainSize: 'Тонкозернистая', description: 'Зеленовато-серый андезитовый порфирит.' },
    { id: 'L2-3', from: 68.0, to: 138.0, code: 'C3_gd', rockName: 'Гранодиорит биотитовый', colorHex: '#C27D60', pattern: 'granodiorite', structure: 'Массивная', grainSize: 'Среднезернистая', description: 'Розовато-серый гранодиорит.' },
    { id: 'L2-4', from: 138.0, to: 192.0, code: 'C3_gdp', rockName: 'Гранодиорит-порфир катаклазированный', colorHex: '#0F766E', pattern: 'metasomatite', structure: 'Порфировидная', grainSize: 'Мелкозернистая', description: 'Вмещающий интрузивный горизонт в интервале метасоматоза.' },
    { id: 'L2-5', from: 192.0, to: 226.0, code: 'T_br', rockName: 'Брекчия интрузивных пород', colorHex: '#B45309', pattern: 'breccia', structure: 'Брекчиевая', grainSize: 'Обломки 3–25 мм', description: 'Зона брекчирования на контакте гранодиоритов.' },
    { id: 'L2-6', from: 226.0, to: 340.0, code: 'C3_gd', rockName: 'Гранодиорит биотитовый', colorHex: '#C27D60', pattern: 'granodiorite', structure: 'Массивная', grainSize: 'Среднезернистая', description: 'Массивный гранодиорит подстилающего блока.' }
  ],
  'BH-SRK-103': [
    { id: 'L3-1', from: 0.0, to: 22.0, code: 'Q_el', rockName: 'Суглинки и щебнистый элювий', colorHex: '#D6CFC2', pattern: 'overburden', structure: 'Рыхлая', grainSize: 'Разнозернистая', description: 'Рыхлый чехол элювиально-делювиальных отложений.' },
    { id: 'L3-2', from: 22.0, to: 84.0, code: 'P1_an', rockName: 'Андезитовый порфирит', colorHex: '#64748B', pattern: 'andesite', structure: 'Порфировая', grainSize: 'Тонкозернистая', description: 'Порфирит зеленовато-серый.' },
    { id: 'L3-3', from: 84.0, to: 146.0, code: 'C3_gd', rockName: 'Гранодиорит роговообманковый', colorHex: '#C27D60', pattern: 'granodiorite', structure: 'Массивная', grainSize: 'Среднезернистая', description: 'Умеренно трещиноватый гранодиорит.' },
    { id: 'L3-4', from: 144.0, to: 189.0, code: 'C3_gdp', rockName: 'Гранодиорит-порфир катаклазированный', colorHex: '#0F766E', pattern: 'metasomatite', structure: 'Катакластическая', grainSize: 'Мелкозернистая', description: 'Первичная порода интервала с конфликтом границ.', validationNotice: 'Перекрытие границ с предыдущим интервалом (144.0 м < 146.0 м).' },
    { id: 'L3-5', from: 189.0, to: 300.0, code: 'C3_gd', rockName: 'Гранодиорит биотитовый', colorHex: '#C27D60', pattern: 'granodiorite', structure: 'Массивная', grainSize: 'Среднезернистая', description: 'Массивный гранодиорит до забоя скважины.' }
  ]
};

export const DEMO_INCLINOMETRY = [
  { depth: 0.0, azimuth: 135.0, dip: -75.0, method: 'Гироскопический (устье)', flag: 'Корректно' },
  { depth: 50.0, azimuth: 135.8, dip: -74.4, method: 'Точечный замер', flag: 'Корректно' },
  { depth: 100.0, azimuth: 136.5, dip: -73.6, method: 'Точечный замер', flag: 'Корректно' },
  { depth: 150.0, azimuth: 137.9, dip: -72.5, method: 'Точечный замер', flag: 'Корректно' },
  { depth: 200.0, azimuth: 139.2, dip: -71.2, method: 'Точечный замер', flag: 'Корректно' },
  { depth: 250.0, azimuth: 140.4, dip: -70.1, method: 'Точечный замер', flag: 'Корректно' },
  { depth: 300.0, azimuth: 141.5, dip: -69.2, method: 'Точечный замер', flag: 'Корректно' },
  { depth: 320.0, azimuth: 142.0, dip: -68.8, method: 'Контрольный у забоя', flag: 'Корректно' }
];

export const DEMO_ALTERATIONS = [
  { from: 18.0, to: 76.0, type: 'Пропилитизация (Хлорит + Эпидот)', intensity: 'Слабая (15%)', mode: 'Повсеместная по матриксу', notes: 'Замещение темноцветных минералов хлоритом.' },
  { from: 76.0, to: 128.0, type: 'Калишпатизация + Биотитизация', intensity: 'Умеренная (30%)', mode: 'Околопрожилковые оторочки', notes: 'Розовые оторочки КПШ мощностью 2–8 мм вдоль кварцевых прожилков.' },
  { from: 128.0, to: 174.0, type: 'Кварц-серицит-пиритовая (Филлизитизация)', intensity: 'Интенсивная (75%)', mode: 'Сплошное замещение', notes: 'Полное замещение первичных полевых шпатов серицит-кварцевым агрегатом.' },
  { from: 174.0, to: 212.0, type: 'Окварцевание + Карбонатизация', intensity: 'Высокая (60%)', mode: 'Цемент брекчий и зальбанды', notes: 'Кварц-анкеритовый цемент в зоне тектонического дробления.' }
];

export const DEMO_TECTONICS = [
  { from: 41.2, to: 44.5, structureType: 'Зона повышенной трещиноватости', angleToCore: '35°–40°', gouge: 'Пленки гидроокислов железа и хлорита', fractureFreq: '18 трещ./п.м' },
  { from: 112.0, to: 115.4, structureType: 'Зона дробления с глинкой трения', angleToCore: '25°', gouge: 'Серая тектоническая глинка 4 см, зеркала скольжения', fractureFreq: '35 трещ./п.м' },
  { from: 174.0, to: 212.0, structureType: 'Катаклазит и тектоническая брекчия', angleToCore: '40°–55°', gouge: 'Залечена кварц-сульфидным цементом, повторные подвижки', fractureFreq: '24 трещ./п.м' }
];

export const DEMO_VEINS = [
  { from: 82.0, to: 128.0, composition: 'Кварц-калишпатовые (тип А)', thicknessMm: '3–12 мм', angleDeg: '45°', densityPerM: '4–6 шт./м', sulfideAssoc: 'Пирит, редкий халькопирит' },
  { from: 128.0, to: 174.0, composition: 'Кварц-сульфидные полосчатые (тип B)', thicknessMm: '5–25 мм', angleDeg: '30°–50°', densityPerM: '10–16 шт./м', sulfideAssoc: 'Халькопирит, пирит, молибденит по зальбандам' },
  { from: 174.0, to: 212.0, composition: 'Кварц-карбонат-полиметаллические (тип D)', thicknessMm: '10–40 мм', angleDeg: '20°–35°', densityPerM: '6–9 шт./м', sulfideAssoc: 'Пирит, халькопирит, блеклая руда' }
];

export const DEMO_MINERALIZATION = [
  { from: 76.0, to: 128.0, minerals: 'Пирит (2.0%), Халькопирит (0.4%)', texture: 'Тонковкрапленная, гнездовая', totalSulfidesPct: 2.4, notes: 'Рассеянная вкрапленность в экзоконтакте метасоматитов.' },
  { from: 128.0, to: 156.0, minerals: 'Халькопирит (2.8%), Пирит (4.5%), Молибденит (0.15%)', texture: 'Прожилково-вкрапленная, штокверковая', totalSulfidesPct: 7.45, notes: 'Основной рудный интервал: густая сеть кварц-сульфидных прожилков.' },
  { from: 156.0, to: 174.0, minerals: 'Халькопирит (1.9%), Пирит (3.5%)', texture: 'Вкрапленная и прожилковая', totalSulfidesPct: 5.4, notes: 'Выдержанная сульфидная минерализация в серицитизированных породах.' },
  { from: 174.0, to: 212.0, minerals: 'Пирит (5.0%), Халькопирит (1.4%), Блеклая руда (0.2%)', texture: 'Гнездово-брекчиевая в цементе', totalSulfidesPct: 6.6, notes: 'Сульфиды концентрируются в матриксе тектонической брекчии.' }
];

export interface SampleRow {
  sampleId: string;
  from: number | null;
  to: number | null;
  length: number | null;
  sampleType: 'Рядовая керновая (1/2 керна)' | 'CRM' | 'Blank' | 'Полевой дубликат' | 'Дубликат дробления' | 'Дубликат пульпы';
  qaqcRef: string;
  weightKg: number;
  lithoCode: string;
  comment: string;
}

export const DEMO_SAMPLES: SampleRow[] = [
  { sampleId: 'S-10101', from: 128.0, to: 130.0, length: 2.0, sampleType: 'Рядовая керновая (1/2 керна)', qaqcRef: '—', weightKg: 4.85, lithoCode: 'MZ_qs', comment: 'Кварц-серицитовый метасоматит, Py+Cpy 6%' },
  { sampleId: 'S-10102', from: 130.0, to: 132.0, length: 2.0, sampleType: 'Рядовая керновая (1/2 керна)', qaqcRef: '—', weightKg: 4.92, lithoCode: 'MZ_qs', comment: 'Густое кварцевое прожилкование' },
  { sampleId: 'S-10103', from: null, to: null, length: null, sampleType: 'CRM', qaqcRef: 'STD-CU-04B (Стандарт)', weightKg: 0.12, lithoCode: 'QA/QC', comment: 'Контрольный стандартный образец (вставка #1)' },
  { sampleId: 'S-10104', from: 132.0, to: 134.0, length: 2.0, sampleType: 'Рядовая керновая (1/2 керна)', qaqcRef: '—', weightKg: 4.78, lithoCode: 'MZ_qs', comment: 'Халькопирит в прожилках до 3%' },
  { sampleId: 'S-10105', from: 134.0, to: 136.0, length: 2.0, sampleType: 'Рядовая керновая (1/2 керна)', qaqcRef: '—', weightKg: 4.90, lithoCode: 'MZ_qs', comment: 'Полосчатый метасоматит, Мо по трещинам' },
  { sampleId: 'S-10106', from: 134.0, to: 136.0, length: 2.0, sampleType: 'Полевой дубликат', qaqcRef: 'DUP of S-10105 (1/4 керна)', weightKg: 2.44, lithoCode: 'MZ_qs', comment: 'Полевой дубликат второй четверти керна' },
  { sampleId: 'S-10107', from: 136.0, to: 138.0, length: 2.0, sampleType: 'Рядовая керновая (1/2 керна)', qaqcRef: '—', weightKg: 4.81, lithoCode: 'MZ_qs', comment: 'Интенсивное окварцевание' },
  { sampleId: 'S-10108', from: null, to: null, length: null, sampleType: 'Blank', qaqcRef: 'BLK-QTZ-01 (Пустая порода)', weightKg: 1.50, lithoCode: 'QA/QC', comment: 'Холостая проба (безрудный кварцит) после богатого интервала' },
  { sampleId: 'S-10109', from: 138.0, to: 140.0, length: 2.0, sampleType: 'Рядовая керновая (1/2 керна)', qaqcRef: '—', weightKg: 4.88, lithoCode: 'MZ_qs', comment: 'Вкрапленно-прожилковая руда' },
  { sampleId: 'S-10110', from: 138.0, to: 140.0, length: 2.0, sampleType: 'Дубликат дробления', qaqcRef: 'CRD of S-10109', weightKg: 1.20, lithoCode: 'MZ_qs', comment: 'Инструкция на отбор дубликата после крупного дробления' },
  { sampleId: 'S-10111', from: 140.0, to: 142.0, length: 2.0, sampleType: 'Рядовая керновая (1/2 керна)', qaqcRef: '—', weightKg: 4.75, lithoCode: 'MZ_qs', comment: 'Серицитизированный гранодиорит с сульфидами' },
  { sampleId: 'S-10112', from: 140.0, to: 142.0, length: 2.0, sampleType: 'Дубликат пульпы', qaqcRef: 'PLD of S-10111', weightKg: 0.25, lithoCode: 'MZ_qs', comment: 'Повторная навеска истирания (дубликат пульпы)' }
];

export interface DrillRun {
  runNumber: number;
  from: number;
  to: number;
  length: number;
  coreSize: 'HQ (63.5 мм)' | 'NQ (47.6 мм)';
  tcrPct: number;
  scrPct: number;
  rqdPct: number;
  isrmCode: 'R2' | 'R3' | 'R4' | 'R5';
  coreCondition: string;
  weathering: 'W1 (Свежая)' | 'W2 (Слабо выветр.)' | 'W3 (Умеренно выветр.)';
}

export const DEMO_DRILL_RUNS: DrillRun[] = [
  { runNumber: 42, from: 125.0, to: 128.0, length: 3.0, coreSize: 'HQ (63.5 мм)', tcrPct: 98.0, scrPct: 91.0, rqdPct: 84.0, isrmCode: 'R4', coreCondition: 'Цельные столбики керна 15–35 см, ровные контакты', weathering: 'W1 (Свежая)' },
  { runNumber: 43, from: 128.0, to: 131.0, length: 3.0, coreSize: 'HQ (63.5 мм)', tcrPct: 96.0, scrPct: 86.0, rqdPct: 76.0, isrmCode: 'R4', coreCondition: 'Столбики 10–25 см, трещины по кварцевым прожилкам', weathering: 'W1 (Свежая)' },
  { runNumber: 44, from: 131.0, to: 134.0, length: 3.0, coreSize: 'HQ (63.5 мм)', tcrPct: 95.0, scrPct: 82.0, rqdPct: 68.0, isrmCode: 'R3', coreCondition: 'Умеренно трещиноватый керн с серицитом по трещинам', weathering: 'W2 (Слабо выветр.)' },
  { runNumber: 45, from: 134.0, to: 137.0, length: 3.0, coreSize: 'HQ (63.5 мм)', tcrPct: 91.0, scrPct: 64.0, rqdPct: 44.0, isrmCode: 'R3', coreCondition: 'Частая трещиноватость, обломки 5–12 см', weathering: 'W2 (Слабо выветр.)' },
  { runNumber: 46, from: 137.0, to: 140.0, length: 3.0, coreSize: 'HQ (63.5 мм)', tcrPct: 88.0, scrPct: 48.0, rqdPct: 24.0, isrmCode: 'R2', coreCondition: 'Раздробленный керн и щебень в зоне локального сдвига', weathering: 'W3 (Умеренно выветр.)' },
  { runNumber: 47, from: 140.0, to: 143.0, length: 3.0, coreSize: 'NQ (47.6 мм)', tcrPct: 97.0, scrPct: 88.0, rqdPct: 79.0, isrmCode: 'R4', coreCondition: 'Переход на NQ, крепкий окварцованный керн', weathering: 'W1 (Свежая)' },
  { runNumber: 48, from: 143.0, to: 146.0, length: 3.0, coreSize: 'NQ (47.6 мм)', tcrPct: 99.0, scrPct: 94.0, rqdPct: 91.0, isrmCode: 'R5', coreCondition: 'Монолитный окварцованный массив, столбики до 45 см', weathering: 'W1 (Свежая)' }
];
