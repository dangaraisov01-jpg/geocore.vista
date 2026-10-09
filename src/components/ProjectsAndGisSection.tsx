import React from 'react';
import { ChevronDown, Ruler } from 'lucide-react';

export const ProjectsAndGisSection: React.FC = () => {
  // Данные 8 скважин для статичного разреза по референсу
  const sectionHoles = [
    {
      id: 'BUR-26-001',
      zText: 'Z:374.5м',
      angleText: '-75° / Аз 135°',
      topX: 192,
      topY: 112,
      dx: 22,
      dy: 205,
      bottomLabel: 'Забой 350 м',
      ticks: [
        { label: '0', frac: 0 },
        { label: '50', frac: 0.14 },
        { label: '100', frac: 0.28 },
        { label: '150', frac: 0.43 },
        { label: '200', frac: 0.57 },
        { label: '250', frac: 0.71 },
        { label: '300', frac: 0.86 },
        { label: '350', frac: 1 }
      ],
      layers: [
        { code: '', f0: 0, f1: 0.05, fill: '#B45309' },
        { code: 'SST', f0: 0.05, f1: 0.23, fill: '#FACC15' },
        { code: 'SSN', f0: 0.23, f1: 0.44, fill: '#94A3B8' },
        { code: 'LST', f0: 0.44, f1: 0.65, fill: '#93C5FD' },
        { code: 'BRX', f0: 0.65, f1: 0.83, fill: '#F87171' },
        { code: 'GRD', f0: 0.83, f1: 1, fill: '#F9A8D4' }
      ]
    },
    {
      id: 'BUR-26-003',
      zText: 'Z:382.0м',
      angleText: '-78° / Аз 135°',
      topX: 295,
      topY: 106,
      dx: 32,
      dy: 278,
      bottomLabel: 'Забой 485 м',
      ticks: [
        { label: '0', frac: 0 },
        { label: '100', frac: 0.21 },
        { label: '200', frac: 0.41 },
        { label: '300', frac: 0.62 },
        { label: '400', frac: 0.82 }
      ],
      layers: [
        { code: '', f0: 0, f1: 0.04, fill: '#B45309' },
        { code: 'SST', f0: 0.04, f1: 0.19, fill: '#FACC15' },
        { code: 'SSN', f0: 0.19, f1: 0.37, fill: '#94A3B8' },
        { code: 'AND', f0: 0.37, f1: 0.56, fill: '#C084FC' },
        { code: 'BRX', f0: 0.56, f1: 0.78, fill: '#F87171' },
        { code: 'GRP', f0: 0.78, f1: 1, fill: '#F9A8D4' }
      ]
    },
    {
      id: 'BUR-26-004',
      zText: 'Z:386.4м',
      angleText: '-65° / Аз 135°',
      topX: 398,
      topY: 102,
      dx: 54,
      dy: 298,
      bottomLabel: 'Забой 550 м',
      ticks: [
        { label: '0', frac: 0 },
        { label: '100', frac: 0.18 },
        { label: '200', frac: 0.36 },
        { label: '300', frac: 0.55 },
        { label: '400', frac: 0.73 },
        { label: '500', frac: 0.91 }
      ],
      layers: [
        { code: '', f0: 0, f1: 0.04, fill: '#B45309' },
        { code: 'SST', f0: 0.04, f1: 0.2, fill: '#FACC15' },
        { code: 'SSN', f0: 0.2, f1: 0.38, fill: '#86EFAC' },
        { code: 'LST', f0: 0.38, f1: 0.58, fill: '#93C5FD' },
        { code: 'MET', f0: 0.58, f1: 0.79, fill: '#FBBF24' },
        { code: 'GRD', f0: 0.79, f1: 1, fill: '#F9A8D4' }
      ]
    },
    {
      id: 'BUR-26-005',
      zText: 'Z:391.0м',
      angleText: '-80° / Аз 135°',
      topX: 512,
      topY: 98,
      dx: 28,
      dy: 356,
      bottomLabel: 'Забой 600 м',
      ticks: [
        { label: '0', frac: 0 },
        { label: '100', frac: 0.17 },
        { label: '200', frac: 0.33 },
        { label: '300', frac: 0.5 },
        { label: '400', frac: 0.67 },
        { label: '500', frac: 0.83 },
        { label: '600', frac: 1 }
      ],
      layers: [
        { code: '', f0: 0, f1: 0.03, fill: '#B45309' },
        { code: 'SST', f0: 0.03, f1: 0.17, fill: '#FACC15' },
        { code: 'SSNT', f0: 0.17, f1: 0.34, fill: '#94A3B8' },
        { code: 'DIO', f0: 0.34, f1: 0.55, fill: '#86EFAC' },
        { code: 'BRX', f0: 0.55, f1: 0.78, fill: '#F87171' },
        { code: 'GRP', f0: 0.78, f1: 1, fill: '#F9A8D4' }
      ]
    },
    {
      id: 'BUR-26-006',
      zText: 'Z:388.6м',
      angleText: '-90° / Аз 0°',
      topX: 610,
      topY: 100,
      dx: 0,
      dy: 318,
      bottomLabel: 'Забой 520 м',
      ticks: [
        { label: '0', frac: 0 },
        { label: '100', frac: 0.19 },
        { label: '200', frac: 0.38 },
        { label: '300', frac: 0.58 },
        { label: '400', frac: 0.77 },
        { label: '500', frac: 0.96 }
      ],
      layers: [
        { code: '', f0: 0, f1: 0.04, fill: '#B45309' },
        { code: 'SST', f0: 0.04, f1: 0.22, fill: '#FACC15' },
        { code: 'SSN', f0: 0.22, f1: 0.44, fill: '#86EFAC' },
        { code: 'LST', f0: 0.44, f1: 0.67, fill: '#93C5FD' },
        { code: 'QTZ', f0: 0.67, f1: 0.85, fill: '#F1F5F9' },
        { code: 'GRD', f0: 0.85, f1: 1, fill: '#F9A8D4' }
      ]
    },
    {
      id: 'BUR-26-008',
      zText: 'Z:377.0м',
      angleText: '-68° / Аз 315°',
      highlighted: true,
      topX: 712,
      topY: 109,
      dx: -38,
      dy: 215,
      bottomLabel: 'Забой 390 м',
      ticks: [
        { label: '0', frac: 0 },
        { label: '50', frac: 0.13 },
        { label: '100', frac: 0.26 },
        { label: '150', frac: 0.38 },
        { label: '200', frac: 0.51 },
        { label: '250', frac: 0.64 },
        { label: '300', frac: 0.77 },
        { label: '350', frac: 0.9 }
      ],
      layers: [
        { code: '', f0: 0, f1: 0.05, fill: '#B45309' },
        { code: 'SST', f0: 0.05, f1: 0.24, fill: '#FACC15' },
        { code: 'SSN', f0: 0.24, f1: 0.47, fill: '#94A3B8' },
        { code: 'LST', f0: 0.47, f1: 0.69, fill: '#93C5FD' },
        { code: 'BRX', f0: 0.69, f1: 0.84, fill: '#F87171' },
        { code: 'GRD', f0: 0.84, f1: 1, fill: '#F9A8D4' }
      ]
    },
    {
      id: 'BUR-26-009',
      zText: 'Z:371.4м',
      angleText: '-90° / Аз 0°',
      topX: 786,
      topY: 113,
      dx: 0,
      dy: 192,
      bottomLabel: 'Забой 320 м',
      ticks: [
        { label: '0', frac: 0 },
        { label: '50', frac: 0.16 },
        { label: '100', frac: 0.31 },
        { label: '150', frac: 0.47 },
        { label: '200', frac: 0.63 },
        { label: '250', frac: 0.78 },
        { label: '300', frac: 0.94 }
      ],
      layers: [
        { code: '', f0: 0, f1: 0.05, fill: '#B45309' },
        { code: 'SST', f0: 0.05, f1: 0.27, fill: '#FACC15' },
        { code: 'SSN', f0: 0.27, f1: 0.51, fill: '#86EFAC' },
        { code: 'BAS', f0: 0.51, f1: 0.75, fill: '#475569' },
        { code: 'GBR', f0: 0.75, f1: 1, fill: '#4ADE80' }
      ]
    },
    {
      id: 'BUR-26-010',
      zText: 'Z:368.0м',
      angleText: '-75° / Аз 315°',
      topX: 892,
      topY: 116,
      dx: -42,
      dy: 332,
      bottomLabel: 'Забой 580 м',
      ticks: [
        { label: '0', frac: 0 },
        { label: '100', frac: 0.17 },
        { label: '200', frac: 0.34 },
        { label: '300', frac: 0.52 },
        { label: '400', frac: 0.69 },
        { label: '500', frac: 0.86 }
      ],
      layers: [
        { code: '', f0: 0, f1: 0.04, fill: '#B45309' },
        { code: 'SST', f0: 0.04, f1: 0.2, fill: '#FACC15' },
        { code: 'SSN', f0: 0.2, f1: 0.41, fill: '#94A3B8' },
        { code: 'LST', f0: 0.41, f1: 0.62, fill: '#93C5FD' },
        { code: 'BRX', f0: 0.62, f1: 0.81, fill: '#F87171' },
        { code: 'GRP', f0: 0.81, f1: 1, fill: '#F9A8D4' }
      ]
    }
  ];

  // Карточки условных обозначений и петрографического крапа пород (ГОСТ / USGS)
  const legendItems = [
    { code: 'LOAM — Суглинок', colorLabel: 'Цвет: коричневый', bg: '#B45309', pattern: ' /// ' },
    { code: 'SST — Песчаник', colorLabel: 'Цвет: желтый', bg: '#FACC15', pattern: ' • • • ' },
    { code: 'SSN — Алевролит', colorLabel: 'Цвет: серый', bg: '#94A3B8', pattern: ' - · - ' },
    { code: 'LST — Известняк', colorLabel: 'Цвет: синий', bg: '#93C5FD', pattern: ' 🧱 ' },
    { code: 'BRX — Брекчия', colorLabel: 'Цвет: красный', bg: '#F87171', pattern: ' △ · △ ' },
    { code: 'GRD — Гранодиорит', colorLabel: 'Цвет: розовый', bg: '#F9A8D4', pattern: ' × + × ' },
    { code: 'CLAY — Глина', colorLabel: 'Цвет: коричневый', bg: '#9A3412', pattern: ' === ' },
    { code: 'AND — Андезит', colorLabel: 'Цвет: пурпурный', bg: '#C084FC', pattern: ' v v v ' },
    { code: 'GRP — Гранит-порфир', colorLabel: 'Цвет: розовый', bg: '#F472B6', pattern: ' + ▫ + ' },
    { code: 'SSN — Алевролит', colorLabel: 'Цвет: зеленый', bg: '#86EFAC', pattern: ' - · - ' },
    { code: 'MET — Метасоматит', colorLabel: 'Цвет: золотистый', bg: '#FBBF24', pattern: ' / / / ' },
    { code: 'SOL — Почвенно-растительный слой', colorLabel: 'Цвет: коричневый', bg: '#92400E', pattern: ' ⊥ ⊥ ' },
    { code: 'SSNT — Алевропесчаник', colorLabel: 'Цвет: серый', bg: '#94A3B8', pattern: ' · - · ' },
    { code: 'DIO — Диорит', colorLabel: 'Цвет: зеленый', bg: '#86EFAC', pattern: ' × × × ' },
    { code: 'QTZ — Кварц', colorLabel: 'Цвет: белый', bg: '#F8FAFC', pattern: ' / · / ' },
    { code: 'SLT — Супесь', colorLabel: 'Цвет: коричневый', bg: '#B45309', pattern: ' / · / ' },
    { code: 'BAS — Базальт', colorLabel: 'Цвет: темно-серый', bg: '#475569', pattern: ' Г Г Г ', darkText: true }
  ];

  return (
    <>
      <section id="geology-gis" className="relative py-12 sm:py-16">
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 space-y-10">
          {/* Заголовок раздела */}
        <div className="max-w-3xl space-y-1.5 bg-linear-to-r from-[#FAF4E8]/96 to-[#F2E6D2]/95 backdrop-blur-xs border border-[#C6A276] border-l-4 border-l-[#B45309] rounded-lg p-4 sm:p-5 shadow-md">
          <p className="text-xs font-mono uppercase tracking-wider font-semibold text-[#B45309]">
            04 · Геологические данные и GIS
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#241A12]">
            Карта скважин и геологический разрез
          </h2>
        </div>

        {/* =====================================================================
            БЛОК 1: СЛЕВА ОПИСАНИЕ КАРТЫ — СПРАВА УМЕНЬШЕННЫЙ СКРИНШОТ КАРТЫ
        ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Левая колонка (5 из 12): Текстовое описание карты */}
          <div className="lg:col-span-5 space-y-3 bg-[#FAF4E8]/96 backdrop-blur-xs border border-[#C6A276] rounded-lg p-5 shadow-md">
            <div className="inline-block px-2.5 py-0.5 bg-[#EADAC0] border border-[#D2B286] text-[#78350F] font-mono text-[11px] font-semibold rounded">
              1 · Карта Казахстана и план устьев
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#241A12]">
              Размещение скважин, замер расстояний и проектирование
            </h3>
            <p className="text-sm text-[#473628] leading-relaxed">
              На офлайн-карте Казахстана отображаются пробуренные скважины с фактической глубиной в нужной координатной зоне (например, <strong>UTM 42N</strong> и <strong>WGS84</strong>), а также слои месторождений и разломов.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#473628] leading-relaxed list-disc pl-4 marker:text-[#B45309]">
              <li>
                <strong>Измерение расстояний и азимута:</strong> встроенные инструменты <em>«Между скв.»</em> и <em>«Линейка А–Б»</em> показывают точное расстояние в метрах и азимут между выбранными устьями либо отключаются одной кнопкой.
              </li>
              <li>
                <strong>Проектирование будущих скважин:</strong> сетка координат и замер шага между точками позволяют использовать карту для наметки и проектирования устьев будущих буровых скважин.
              </li>
              <li>
                <strong>Быстрая выгрузка:</strong> схему расположения и табличные координаты устьев можно сразу экспортировать в форматах <strong>PDF</strong> или <strong>Excel</strong>.
              </li>
            </ul>
          </div>

          {/* Правая колонка (7 из 12): Уменьшенный скриншот карты */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF5EB] border border-[#C6A276] rounded-lg p-2.5 sm:p-3 shadow-md space-y-2">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div className="flex-1 min-w-[200px] space-y-0.5">
                  <div className="text-[10px] font-semibold text-[#475569]">Зона UTM</div>
                  <div className="h-7 px-2.5 bg-white border border-[#CBD5E1] rounded flex items-center justify-between text-[11px] text-[#1E293B]">
                    <span className="truncate">UTM 42N (Жезказган, Астана · 66°–72° ВД)</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[10px] font-semibold text-[#475569]">Слои и масштаб</div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-7 px-2 bg-white border border-[#CBD5E1] rounded inline-flex items-center text-[11px] font-semibold text-[#1E293B]">
                      К скважинам
                    </span>
                    <span className="px-1.5 text-[11px] font-medium text-[#475569]">Весь РК</span>
                    <span className="h-7 px-2 bg-white border border-[#CBD5E1] rounded inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E293B]">
                      <span className="text-[9px]">◆</span>
                      <span>Месторождения</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative rounded overflow-hidden border border-[#C8B99E] bg-[#EAE0CD]">
                <svg
                  viewBox="0 0 1120 560"
                  className="w-full h-auto block select-none"
                  role="img"
                  aria-label="Скриншот офлайн-карты скважин с линейкой А–Б"
                >
                  <defs>
                    <pattern id="minorGrid" width="22.4" height="22.4" patternUnits="userSpaceOnUse">
                      <path d="M 22.4 0 L 0 0 0 22.4" fill="none" stroke="#D8CCB6" strokeWidth="0.8" />
                    </pattern>
                    <pattern id="majorGrid" width="112" height="112" patternUnits="userSpaceOnUse">
                      <rect width="112" height="112" fill="url(#minorGrid)" />
                      <path d="M 112 0 L 0 0 0 112" fill="none" stroke="#C7B79B" strokeWidth="1.2" />
                    </pattern>
                  </defs>

                  <rect width="1120" height="560" fill="#EAE0CD" />
                  <rect width="1120" height="560" fill="url(#majorGrid)" />

                  <path d="M 0,425 C 185,405 320,250 385,0" fill="none" stroke="#B8A789" strokeWidth="1.2" />

                  <text x="12" y="248" fill="#525E6C" fontSize="13" fontFamily="monospace" fontWeight="600">
                    43.9535°N
                  </text>
                  <text x="45" y="553" fill="#525E6C" fontSize="12" fontFamily="monospace">
                    67.5375°E
                  </text>
                  <text x="380" y="553" fill="#525E6C" fontSize="12" fontFamily="monospace">
                    67.5380°E
                  </text>
                  <text x="715" y="553" fill="#525E6C" fontSize="12" fontFamily="monospace">
                    67.5385°E
                  </text>
                  <text x="1050" y="553" fill="#525E6C" fontSize="12" fontFamily="monospace">
                    67.5390°E
                  </text>

                  <line
                    x1="412"
                    y1="366"
                    x2="570"
                    y2="124"
                    stroke="#D97706"
                    strokeWidth="3.5"
                    strokeDasharray="8 6"
                  />

                  {/* Скважина Б */}
                  <g>
                    <text
                      x="570"
                      y="102"
                      textAnchor="middle"
                      fill="#9A3412"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      paintOrder="stroke"
                      fontSize="16"
                      fontFamily="monospace"
                      fontWeight="700"
                    >
                      BUR_004_04_26 (444.4м)
                    </text>
                    <circle cx="570" cy="124" r="10.5" fill="#D97706" stroke="#FFFFFF" strokeWidth="2.5" />
                    <text x="570" y="128" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="sans-serif" fontWeight="700">
                      Б
                    </text>
                  </g>

                  {/* Скважина А */}
                  <g>
                    <text
                      x="412"
                      y="346"
                      textAnchor="middle"
                      fill="#0F172A"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      paintOrder="stroke"
                      fontSize="16"
                      fontFamily="monospace"
                      fontWeight="700"
                    >
                      BUR_004_05_26 (576.4м)
                    </text>
                    <circle cx="412" cy="366" r="10.5" fill="#D97706" stroke="#FFFFFF" strokeWidth="2.5" />
                    <text x="412" y="370" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="sans-serif" fontWeight="700">
                      А
                    </text>
                  </g>

                  {/* Скважина BUR_613_12 */}
                  <g>
                    <text
                      x="575"
                      y="293"
                      textAnchor="middle"
                      fill="#0F172A"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      paintOrder="stroke"
                      fontSize="16"
                      fontFamily="monospace"
                      fontWeight="700"
                    >
                      BUR_613_12 (170м)
                    </text>
                    <circle cx="575" cy="312" r="6.5" fill="#0F766E" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="575" cy="312" r="2" fill="#FFFFFF" />
                  </g>

                  {/* Скважина BUR_006_04_26 */}
                  <g>
                    <text
                      x="974"
                      y="238"
                      textAnchor="middle"
                      fill="#0F172A"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      paintOrder="stroke"
                      fontSize="16"
                      fontFamily="monospace"
                      fontWeight="700"
                    >
                      BUR_006_04_26 (492.4м)
                    </text>
                    <circle cx="974" cy="256" r="6.5" fill="#0F766E" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="974" cy="256" r="2" fill="#FFFFFF" />
                  </g>

                  {/* Скважина BUR_006_05_26 */}
                  <g>
                    <text
                      x="816"
                      y="475"
                      textAnchor="middle"
                      fill="#0F172A"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      paintOrder="stroke"
                      fontSize="16"
                      fontFamily="monospace"
                      fontWeight="700"
                    >
                      BUR_006_05_26 (406.9м)
                    </text>
                    <circle cx="816" cy="494" r="6.5" fill="#0F766E" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="816" cy="494" r="2" fill="#FFFFFF" />
                  </g>

                  {/* Плашка 34 м */}
                  <g transform="translate(418, 232)">
                    <rect x="0" y="0" width="146" height="46" rx="6" fill="#18202C" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="73" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontFamily="monospace" fontWeight="700">
                      📏 34 м
                    </text>
                    <text x="73" y="36" textAnchor="middle" fill="#FBBF24" fontSize="12" fontFamily="monospace" fontWeight="600">
                      Азимут А→Б: 33.6°
                    </text>
                  </g>
                </svg>

                {/* Верхние кнопки поверх карты */}
                <div className="absolute top-2 left-2 flex flex-wrap items-center gap-1.5 pointer-events-none">
                  <div className="px-2 py-1 bg-white border border-[#CBD5E1] rounded shadow-2xs text-[10px] font-semibold text-[#1E293B]">
                    ⇄ Между скв. (выкл)
                  </div>
                  <div className="px-2 py-1 bg-[#B45309] border border-[#9A3412] rounded shadow-2xs text-[10px] font-semibold text-white inline-flex items-center gap-1">
                    <Ruler className="w-3 h-3" />
                    <span>Линейка А–Б (ВКЛ)</span>
                  </div>
                  <div className="px-2 py-1 bg-[#FFF1F2] border border-[#FECDD3] rounded shadow-2xs text-[10px] font-semibold text-[#BE123C]">
                    Сброс А–Б ×
                  </div>
                </div>

                {/* Кнопки + / - */}
                <div className="absolute top-2 right-2 flex items-center gap-1 pointer-events-none">
                  <div className="w-6 h-6 bg-white border border-[#CBD5E1] rounded shadow-2xs flex items-center justify-center text-xs font-bold text-[#1E293B]">
                    +
                  </div>
                  <div className="w-6 h-6 bg-white border border-[#CBD5E1] rounded shadow-2xs flex items-center justify-center text-xs font-bold text-[#1E293B]">
                    −
                  </div>
                </div>

                {/* Масштаб 10 м */}
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-[#18202C] rounded text-white font-mono text-[10px] pointer-events-none">
                  <div className="font-bold">10 м</div>
                  <div className="w-14 h-1 border-l border-r border-b border-[#2DD4BF]" />
                </div>

                {/* Строка координат */}
                <div className="hidden sm:flex absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#18202C] rounded text-white font-mono text-[9.5px] items-center gap-2 whitespace-nowrap pointer-events-none">
                  <span>1 : 5 000 · Детальный план устьев</span>
                  <span className="text-[#64748B]">|</span>
                  <span>WGS84: 43.9535°N, 67.5385°E</span>
                  <span className="text-[#64748B]">|</span>
                  <span>UTM 42N: X 382735 Y 4867748</span>
                </div>

                {/* Легенда полезных ископаемых */}
                <div className="hidden md:flex absolute bottom-9 right-10 px-2 py-0.5 bg-white/95 border border-[#CBD5E1] rounded text-[9.5px] font-medium items-center gap-2 pointer-events-none">
                  <span className="text-[#EA580C] font-semibold">■ Cu (Медь)</span>
                  <span className="text-[#CA8A04] font-semibold">◆ Au (Золото)</span>
                  <span className="text-[#0284C7] font-semibold">▲ Pb-Zn</span>
                  <span className="text-[#0F766E] font-semibold">■ Fe-Cr</span>
                  <span className="text-[#9333EA] font-semibold">● U</span>
                  <span className="text-[#DC2626] font-semibold">╍ Разлом</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            БЛОК 2: СЛЕВА ОПИСАНИЕ РАЗРЕЗА — СПРАВА УМЕНЬШЕННЫЙ СКРИНШОТ РАЗРЕЗА
        ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-4">
          {/* Левая колонка (5 из 12): Текстовое описание разреза */}
          <div className="lg:col-span-5 space-y-3 bg-[#F6F1E9]/96 backdrop-blur-xs border border-[#BC9E7B] rounded-lg p-5 shadow-md">
            <div className="inline-block px-2.5 py-0.5 bg-[#E6DAC6] border border-[#C8B092] text-[#5C3A1E] font-mono text-[11px] font-semibold rounded">
              2 · Геологический разрез и корреляция
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#211913]">
              Прослеживание литологических границ и сравнение скважин
            </h3>
            <p className="text-sm text-[#433529] leading-relaxed">
              Модуль геологического разреза выстраивает колонки скважин по абсолютным отметкам <strong>Z (м)</strong> с учётом фактических углов наклона, азимутов, расстояний между устьями и петрографического крапа пород (ГОСТ / USGS).
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#433529] leading-relaxed list-disc pl-4 marker:text-[#9A3412]">
              <li>
                <strong>Прослеживание границ на профиле:</strong> позволяет увязывать литологические горизонты (песчаники <code>SST</code>, алевролиты <code>SSN</code>, известняки <code>LST</code>, брекчии <code>BRX</code>, интрузии <code>GRD / GRP</code>) между серией скважин вдоль бурового профиля.
              </li>
              <li>
                <strong>Сравнение двух скважин:</strong> режим можно использовать для прямого сопоставления двух выбранных скважин по глубинам и мощностям интервалов.
              </li>
              <li>
                <strong>Экспорт в PDF и Excel:</strong> готовый чертёж разреза со шкалой высот и условными обозначениями быстро выгружается в <strong>PDF</strong> или <strong>Excel</strong>.
              </li>
            </ul>
          </div>

          {/* Правая колонка (7 из 12): Уменьшенный скриншот разреза + крап пород */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF6EF] border border-[#BC9E7B] rounded-lg overflow-hidden shadow-md">
              <div className="relative bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <svg
                  viewBox="0 0 1120 530"
                  className="w-full h-auto block select-none"
                  role="img"
                  aria-label="Скриншот геологического разреза скважин с корреляцией литологических границ"
                >
                  <rect x="65" y="25" width="990" height="475" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

                  {[
                    { z: '500 м', y: 25 },
                    { z: '400 м', y: 92 },
                    { z: '300 м', y: 159 },
                    { z: '200 м', y: 226 },
                    { z: '100 м', y: 293 },
                    { z: '0 м', y: 360 },
                    { z: '-100 м', y: 427 },
                    { z: '-200 м', y: 494 }
                  ].map((lvl) => (
                    <g key={lvl.z}>
                      <line
                        x1="65"
                        y1={lvl.y}
                        x2="1055"
                        y2={lvl.y}
                        stroke="#E2E8F0"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <text x="60" y={lvl.y + 4} textAnchor="end" fill="#64748B" fontSize="11" fontFamily="monospace">
                        {lvl.z}
                      </text>
                      <text x="1062" y={lvl.y + 4} textAnchor="start" fill="#64748B" fontSize="11" fontFamily="monospace">
                        {lvl.z}
                      </text>
                    </g>
                  ))}

                  <text
                    x="16"
                    y="265"
                    transform="rotate(-90 16,265)"
                    textAnchor="middle"
                    fill="#0F172A"
                    fontSize="12"
                    fontFamily="sans-serif"
                    fontWeight="700"
                  >
                    Абсолютная отметка (Z), м
                  </text>

                  {[
                    { x1: 192, x2: 295, dist: '403 м', y: 22 },
                    { x1: 295, x2: 398, dist: '208 м', y: 20 },
                    { x1: 398, x2: 512, dist: '216 м', y: 18 },
                    { x1: 512, x2: 610, dist: '212 м', y: 19 },
                    { x1: 610, x2: 712, dist: '424 м', y: 21 },
                    { x1: 712, x2: 786, dist: '212 м', y: 26 },
                    { x1: 786, x2: 892, dist: '212 м', y: 28 }
                  ].map((seg, i) => {
                    const mid = (seg.x1 + seg.x2) / 2;
                    return (
                      <g key={i}>
                        <line x1={seg.x1 + 4} y1={seg.y} x2={seg.x2 - 4} y2={seg.y} stroke="#0D9488" strokeWidth="1.2" />
                        <polygon points={`${seg.x1 + 3},${seg.y} ${seg.x1 + 8},${seg.y - 3} ${seg.x1 + 8},${seg.y + 3}`} fill="#0D9488" />
                        <polygon points={`${seg.x2 - 3},${seg.y} ${seg.x2 - 8},${seg.y - 3} ${seg.x2 - 8},${seg.y + 3}`} fill="#0D9488" />
                        <rect x={mid - 22} y={seg.y - 8} width="44" height="15" rx="3" fill="#FFFFFF" stroke="#99F6E4" />
                        <text x={mid} y={seg.y + 3} textAnchor="middle" fill="#0F766E" fontSize="10" fontFamily="monospace" fontWeight="700">
                          {seg.dist}
                        </text>
                      </g>
                    );
                  })}

                  <polyline
                    points="192,112 295,106 398,102 512,98 610,100 712,109 786,113 892,116"
                    fill="none"
                    stroke="#15803D"
                    strokeWidth="1.8"
                    strokeDasharray="6 4"
                  />

                  <g>
                    <polygon
                      points="194,122 296,117 400,114 513,109 610,113 710,120 786,123 890,129 884,182 786,165 703,161 610,170 517,158 409,162 301,159 197,159"
                      fill="#FEF08A"
                      fillOpacity="0.35"
                      stroke="#64748B"
                      strokeWidth="0.9"
                      strokeDasharray="4 3"
                    />
                    <polygon
                      points="197,159 301,159 409,162 517,158 610,170 703,161 786,165 884,182 875,252 786,211 694,210 610,240 521,219 419,215 307,209 202,202"
                      fill="#CBD5E1"
                      fillOpacity="0.28"
                      stroke="#64748B"
                      strokeWidth="0.9"
                      strokeDasharray="4 3"
                    />
                    <polygon
                      points="202,202 307,209 419,215 610,240 694,210 875,252 866,322 686,257 610,313 429,275 313,262 206,245"
                      fill="#BFDBFE"
                      fillOpacity="0.25"
                      stroke="#64748B"
                      strokeWidth="0.9"
                      strokeDasharray="4 3"
                    />
                    <polygon
                      points="206,245 313,262 210,282 320,323"
                      fill="#FECACA"
                      fillOpacity="0.32"
                      stroke="#64748B"
                      strokeWidth="0.9"
                      strokeDasharray="4 3"
                    />
                    <polygon
                      points="610,370 679,289 674,324 610,418"
                      fill="#FBCFE8"
                      fillOpacity="0.32"
                      stroke="#64748B"
                      strokeWidth="0.9"
                      strokeDasharray="4 3"
                    />
                  </g>

                  {sectionHoles.map((h) => {
                    const colWidth = 24;
                    const angleDeg = (Math.atan2(h.dx, h.dy) * -180) / Math.PI;
                    const lengthPx = Math.sqrt(h.dx * h.dx + h.dy * h.dy);

                    return (
                      <g key={h.id}>
                        <g transform={`translate(${h.topX - 42}, ${h.topY - 56})`}>
                          <rect
                            x="0"
                            y="0"
                            width="84"
                            height="44"
                            rx="4"
                            fill="#FFFFFF"
                            stroke={h.highlighted ? '#EA580C' : '#CBD5E1'}
                            strokeWidth={h.highlighted ? '1.8' : '1'}
                          />
                          <text
                            x="42"
                            y="14"
                            textAnchor="middle"
                            fill={h.highlighted ? '#C2410C' : '#0F172A'}
                            fontSize="10"
                            fontFamily="monospace"
                            fontWeight="700"
                          >
                            {h.id}
                          </text>
                          <text x="42" y="26" textAnchor="middle" fill="#475569" fontSize="8.5" fontFamily="monospace">
                            {h.zText}
                          </text>
                          <text x="42" y="38" textAnchor="middle" fill="#0F766E" fontSize="8" fontFamily="monospace" fontWeight="600">
                            {h.angleText}
                          </text>
                        </g>

                        <polygon
                          points={`${h.topX},${h.topY - 7} ${h.topX - 5},${h.topY} ${h.topX + 5},${h.topY}`}
                          fill={h.highlighted ? '#EA580C' : '#15803D'}
                        />

                        <g transform={`translate(${h.topX}, ${h.topY}) rotate(${angleDeg})`}>
                          {h.highlighted && (
                            <rect
                              x={-colWidth / 2 - 3}
                              y="-2"
                              width={colWidth + 6}
                              height={lengthPx + 4}
                              rx="2"
                              fill="none"
                              stroke="#EA580C"
                              strokeWidth="2.5"
                            />
                          )}

                          {h.layers.map((ly, lIdx) => {
                            const y0 = ly.f0 * lengthPx;
                            const hPx = (ly.f1 - ly.f0) * lengthPx;
                            return (
                              <g key={lIdx}>
                                <rect
                                  x={-colWidth / 2}
                                  y={y0}
                                  width={colWidth}
                                  height={hPx}
                                  fill={ly.fill}
                                  stroke="#1E293B"
                                  strokeWidth="1.1"
                                />
                                <line
                                  x1={-colWidth / 2 + 4}
                                  y1={y0 + hPx * 0.3}
                                  x2={colWidth / 2 - 4}
                                  y2={y0 + hPx * 0.3}
                                  stroke="#1E293B"
                                  strokeOpacity="0.35"
                                  strokeDasharray="2 3"
                                />
                                <line
                                  x1={-colWidth / 2 + 4}
                                  y1={y0 + hPx * 0.7}
                                  x2={colWidth / 2 - 4}
                                  y2={y0 + hPx * 0.7}
                                  stroke="#1E293B"
                                  strokeOpacity="0.35"
                                  strokeDasharray="2 3"
                                />
                                {ly.code && hPx > 18 && (
                                  <g transform={`translate(0, ${y0 + hPx / 2})`}>
                                    <rect x="-10" y="-6" width="20" height="11" rx="1.5" fill="#FFFFFF" fillOpacity="0.85" />
                                    <text
                                      x="0"
                                      y="2.5"
                                      textAnchor="middle"
                                      fill="#0F172A"
                                      fontSize="7.5"
                                      fontFamily="monospace"
                                      fontWeight="700"
                                    >
                                      {ly.code}
                                    </text>
                                  </g>
                                )}
                              </g>
                            );
                          })}

                          {h.ticks.map((tk, tIdx) => {
                            const ty = tk.frac * lengthPx;
                            return (
                              <g key={tIdx}>
                                <line x1={-colWidth / 2 - 4} y1={ty} x2={-colWidth / 2} y2={ty} stroke="#334155" strokeWidth="1" />
                                <text
                                  x={-colWidth / 2 - 6}
                                  y={ty + 2.5}
                                  textAnchor="end"
                                  fill="#334155"
                                  fontSize="7.5"
                                  fontFamily="monospace"
                                >
                                  {tk.label}
                                </text>
                              </g>
                            );
                          })}

                          <text
                            x="0"
                            y={lengthPx + 13}
                            textAnchor="middle"
                            fill="#0F172A"
                            fontSize="8.5"
                            fontFamily="monospace"
                            fontWeight="700"
                          >
                            {h.bottomLabel}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>

                {/* Компактная нижняя панель перехода к скв. и масштаба */}
                <div className="hidden sm:flex absolute bottom-2 left-2 bg-[#272D38] text-white rounded p-1.5 shadow-sm items-center gap-1.5 pointer-events-none">
                  <span className="text-[10px] font-semibold text-[#CBD5E1] px-1">Переход к скв.:</span>
                  {['BUR-26-001', 'BUR-26-003', 'BUR-26-004', 'BUR-26-005'].map((id) => (
                    <span
                      key={id}
                      className="px-2 py-0.5 bg-[#353C4B] border border-[#475569] rounded text-[10px] font-mono font-semibold"
                    >
                      🎯 {id}
                    </span>
                  ))}
                </div>

                <div className="hidden sm:flex absolute bottom-2 right-2 bg-[#272D38] text-white rounded p-1 shadow-sm items-center gap-1.5 pointer-events-none">
                  <span className="w-6 h-6 bg-[#F1F5F9] text-[#0F172A] rounded flex items-center justify-center font-bold text-xs">
                    −
                  </span>
                  <span className="px-1.5 font-mono text-[10px] font-bold">91%</span>
                  <span className="w-6 h-6 bg-[#F1F5F9] text-[#0F172A] rounded flex items-center justify-center font-bold text-xs">
                    +
                  </span>
                  <span className="px-2 h-6 bg-[#F1F5F9] text-[#0F172A] rounded flex items-center justify-center text-[10px] font-semibold">
                    Весь лист (100%)
                  </span>
                </div>
              </div>

              {/* Компактный блок условных обозначений под разрезом */}
              <div className="p-3 bg-[#F8FAFC] space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#334155]">
                  УСЛОВНЫЕ ОБОЗНАЧЕНИЯ И ПЕТРОГРАФИЧЕСКИЙ КРАП ПОРОД НА КОЛОНКАХ (ГОСТ / USGS):
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {legendItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border border-[#E2E8F0] rounded shadow-2xs"
                    >
                      <div
                        className="w-7 h-4 rounded-xs border border-[#1E293B] flex items-center justify-center font-mono text-[8px] font-bold select-none shrink-0"
                        style={{
                          backgroundColor: item.bg,
                          color: item.darkText ? '#E2E8F0' : '#1E293B'
                        }}
                      >
                        {item.pattern}
                      </div>
                      <div className="leading-none">
                        <div className="text-[10px] font-bold text-[#0F172A]">{item.code}</div>
                        <div className="text-[9px] text-[#64748B]">{item.colorLabel}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};
