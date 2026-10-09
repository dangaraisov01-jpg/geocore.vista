import React, { useState } from 'react';
import {
  Hammer,
  Plus,
  FileSpreadsheet,
  Printer,
  FolderTree,
  FileText,
  Info,
  CheckCircle2
} from 'lucide-react';
import { DEMO_DRILL_RUNS, DrillRun } from '../data/demoData';

export const GeomechanicsAndActsSection: React.FC = () => {
  // Section 7 state: Drilling Parameters & Geomechanics
  const [runs, setRuns] = useState<DrillRun[]>(DEMO_DRILL_RUNS);
  const [geoDemoNotice, setGeoDemoNotice] = useState<string>('');
  const [selectedIsrm, setSelectedIsrm] = useState<'R2' | 'R3' | 'R4' | 'R5'>('R4');

  // Section 8 state: File Explorer & 5 Borehole Acts Generator
  const [selectedExplorerCategory, setSelectedExplorerCategory] = useState<
    'acts' | 'geology' | 'sampling' | 'inclinometry' | 'geomech'
  >('acts');
  const [selectedActType, setSelectedActType] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [actFields, setActFields] = useState({
    bhid: 'BH-SRK-101',
    project: 'Сарыарка-Север (PRJ-SRK-01)',
    site: 'Профиль I-I · Сев. фланг',
    date: '2026-10-07',
    depthM: '320.0',
    commissionLead: 'Инженер-геолог (Демо-профиль)',
    contractorRep: 'Буровой мастер ст. #4 (Вымышл.)',
    remark: 'Контрольный промер выполнен стальным тросом с бирками через 10 м. Расхождение в пределах допуска.'
  });

  // Add a demo drill run locally
  const handleAddDemoRun = () => {
    const last = runs[runs.length - 1];
    const nextNum = last.runNumber + 1;
    const nextFrom = last.to;
    const nextTo = Number((nextFrom + 3.0).toFixed(1));
    const newRun: DrillRun = {
      runNumber: nextNum,
      from: nextFrom,
      to: nextTo,
      length: 3.0,
      coreSize: 'NQ (47.6 мм)',
      tcrPct: 96.0,
      scrPct: 89.0,
      rqdPct: 81.0,
      isrmCode: 'R4',
      coreCondition: 'Демонстрационный рейс: плотный керн с редкими трещинами 15–30 см',
      weathering: 'W1 (Свежая)'
    };
    setRuns((prev) => [...prev, newRun]);
    setGeoDemoNotice(`Локально добавлен демонстрационный рейс #${nextNum} (${nextFrom.toFixed(1)}–${nextTo.toFixed(1)} м).`);
  };

  const handleResetRuns = () => {
    setRuns(DEMO_DRILL_RUNS);
    setGeoDemoNotice('Список рейсов возвращён к исходному демонстрационному набору.');
  };

  const avgTcr = runs.reduce((acc, r) => acc + r.tcrPct, 0) / runs.length;
  const avgScr = runs.reduce((acc, r) => acc + r.scrPct, 0) / runs.length;
  const avgRqd = runs.reduce((acc, r) => acc + r.rqdPct, 0) / runs.length;

  const isrmCards = [
    {
      code: 'R2' as const,
      name: 'Слабая порода (Weak)',
      ucsRange: '5–25 МПа',
      fieldTest: 'Надрезается ножом с трудом; от удара геологическим молотком остаются неглубокие вмятины.'
    },
    {
      code: 'R3' as const,
      name: 'Средней прочности (Medium Strong)',
      ucsRange: '25–50 МПа',
      fieldTest: 'Не царапается ножом; образец керна раскалывается одним уверенным ударом молотка.'
    },
    {
      code: 'R4' as const,
      name: 'Прочная порода (Strong)',
      ucsRange: '50–100 МПа',
      fieldTest: 'Для раскола столбика керна требуется более одного удара геологического молотка.'
    },
    {
      code: 'R5' as const,
      name: 'Очень прочная (Very Strong)',
      ucsRange: '100–250 МПа',
      fieldTest: 'Образец керна раскалывается только после многочисленных сильных ударов молотка.'
    }
  ];

  const explorerFiles: Record<
    typeof selectedExplorerCategory,
    Array<{ name: string; format: string; updated: string; desc: string }>
  > = {
    acts: [
      { name: 'Акт_заложения_BH-SRK-101.pdf (Предпросмотр)', format: 'Формат A4 / PDF', updated: '2026-09-12', desc: 'Акт заложения устья скважины' },
      { name: 'Акт_контрольного_замера_320м_BH-SRK-101.pdf', format: 'Формат A4 / PDF', updated: '2026-09-28', desc: 'Контрольный замер глубины забоя' },
      { name: 'Акт_закрытия_консервации_BH-SRK-101.pdf', format: 'Формат A4 / PDF', updated: '2026-09-29', desc: 'Ликвидационное тампонирование и репер' }
    ],
    geology: [
      { name: 'Журнал_литологии_и_изменений_BH-SRK-101.xlsx', format: 'XLSX (Шаблон)', updated: '2026-09-28', desc: 'Поинтервальная документация пород и метасоматитов' },
      { name: 'Паспорт_и_колонка_BH-SRK-101.json', format: 'GeoLog JSON', updated: '2026-09-28', desc: 'Структура паспорта устья и 6 журналов' }
    ],
    sampling: [
      { name: 'Ведомость_опробования_QAQC_BH-SRK-101.xlsx', format: 'XLSX / CSV', updated: '2026-09-29', desc: 'Рядовые пробы и 5 видов контрольных вставок' },
      { name: 'Опись_партии_и_ChainOfCustody_BATCH-101A.pdf', format: 'Печатный макет A4', updated: '2026-09-29', desc: 'Предпросмотр сопроводительных бланков' }
    ],
    inclinometry: [
      { name: 'Замеры_инклинометрии_BH-SRK-101.csv', format: 'CSV / XLSX', updated: '2026-09-28', desc: 'Таблица глубин, азимутов и углов наклона' },
      { name: 'Акт_замера_искривления_BH-SRK-101.pdf', format: 'Формат A4 / PDF', updated: '2026-09-28', desc: 'Оформленный акт инклинометрии' }
    ],
    geomech: [
      { name: 'Рейсы_бурения_TCR_SCR_RQD_BH-SRK-101.xlsx', format: 'Excel-шаблон', updated: '2026-09-28', desc: 'Таблица буровых рейсов, прочности ISRM и выветривания' },
      { name: 'Паспорт_геомеханики_керна_BH-SRK-101.pdf', format: 'Печатный паспорт', updated: '2026-09-28', desc: 'Сводка RQD и расчётных показателей RMR89 / Q' }
    ]
  };

  const actTypesList = [
    { id: 1 as const, title: '1. Акт заложения скважины', code: 'ACT-COLLAR' },
    { id: 2 as const, title: '2. Акт контрольного замера глубины', code: 'ACT-DEPTH' },
    { id: 3 as const, title: '3. Акт закрытия или консервации', code: 'ACT-CLOSE' },
    { id: 4 as const, title: '4. Акт рекультивации площадки', code: 'ACT-RECLAM' },
    { id: 5 as const, title: '5. Акт замера искривления', code: 'ACT-SURVEY' }
  ];

  const getActPreviewTitle = (id: 1 | 2 | 3 | 4 | 5) => {
    switch (id) {
      case 1:
        return 'АКТ № 101/1 ЗАЛОЖЕНИЯ БУРОВОЙ СКВАЖИНЫ';
      case 2:
        return 'АКТ № 101/2 КОНТРОЛЬНОГО ЗАМЕРА ГЛУБИНЫ СКВАЖИНЫ';
      case 3:
        return 'АКТ № 101/3 ЗАКРЫТИЯ (КОНСЕРВАЦИИ) БУРОВОЙ СКВАЖИНЫ';
      case 4:
        return 'АКТ № 101/4 РЕКУЛЬТИВАЦИИ БУРОВОЙ ПЛОЩАДКИ';
      case 5:
        return 'АКТ № 101/5 КОНТРОЛЬНОГО ЗАМЕРА ИСКРИВЛЕНИЯ СТВОЛА';
    }
  };

  const getActBodyParagraph = (id: 1 | 2 | 3 | 4 | 5) => {
    switch (id) {
      case 1:
        return `Комиссия подтверждает фактическое заложение устья скважины ${actFields.bhid} на участке «${actFields.site}» в рамках проекта «${actFields.project}». Проектная глубина составляет ${actFields.depthM} м, заданный азимут 135.0°, угол наклона −75.0°. Площадка подготовлена к началу буровых работ.`;
      case 2:
        return `Проведён контрольный промер фактической глубины ствола скважины ${actFields.bhid} по окончании рейса на отметке ${actFields.depthM} м. По данным бурового снаряда и контрольного промера глубина забоя соответствует учётной документации.`;
      case 3:
        return `По завершении геологической документации и каротажных работ скважина ${actFields.bhid} (фактическая глубина ${actFields.depthM} м) переведена в состояние консервации / закрытия. Устье оборудовано металлической заглушкой и маркировочным репером.`;
      case 4:
        return `На буровой площадке скважины ${actFields.bhid} (участок «${actFields.site}») выполнена техническая уборка территории, засыпка технологических зумпфов и планировка плодородного слоя почвы.`;
      case 5:
        return `В стволе скважины ${actFields.bhid} до глубины ${actFields.depthM} м выполнен комплекс точечных замеров зенитного и азимутального углов с шагом 50 м. Данные внесены в журнал инклинометрии GeoLog Studio.`;
    }
  };

  return (
    <div className="divide-y divide-[#D8D5CD]">
      {/* =====================================================================
          SECTION 7: DRILLING PARAMETERS И ГЕОМЕХАНИКА КЕРНА
      ===================================================================== */}
      <section id="geomechanics" className="py-16 bg-[#F6F5F0]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#0F766E]">
                Раздел 06 · Буровые рейсы и геомеханические параметры
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#14171A] mt-1">
                Drilling Parameters, учёт рейсов TCR / SCR / RQD и геомеханика керна
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
              <span>Пример интерфейса</span>
              <span aria-hidden="true">·</span>
              <span>Демонстрационные данные — не live</span>
            </div>
          </div>

          <p className="text-sm text-[#334155] max-w-4xl leading-relaxed">
            Экран <strong>Drilling Parameters</strong> предназначен для порейсового учёта выхода керна (<strong>TCR</strong>), выхода сохранного керна (<strong>SCR</strong>), показателя качества породы (<strong>RQD</strong>), класса прочности <strong>ISRM</strong>, степени выветривания и состояния керна. Поддерживаются импорт по Excel-шаблону, ручное добавление рейса, выгрузка таблицы и формирование печатного паспорта.
          </p>

          {/* Main Geomechanics Workspace Mockup */}
          <div className="bg-white border border-[#D8D5CD] rounded-lg overflow-hidden">
            {/* Top Action Bar */}
            <div className="px-4 py-3 bg-[#EFECE4] border-b border-[#D8D5CD] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Hammer className="w-4 h-4 text-[#0F766E]" />
                <span className="text-xs font-mono font-semibold text-[#14171A]">
                  GeoLog Studio · Журнал буровых рейсов и геомеханики (BH-SRK-101)
                </span>
              </div>

              {/* Confirmed Actions (Local Demo Handlers) */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddDemoRun}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#0F766E] hover:bg-[#115E59] rounded transition-colors whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Добавить демо-рейс</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setGeoDemoNotice('Демо-режим: показан сценарий импорта рейсов по утверждённому Excel-шаблону (без загрузки файла на сервер).')
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#14171A] bg-white border border-[#D8D5CD] hover:bg-[#FAF9F5] rounded transition-colors whitespace-nowrap"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Импорт по Excel-шаблону</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setGeoDemoNotice('Демо-режим: формирование печатного паспорта геомеханики керна средствами приложения/браузера.')
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#14171A] bg-white border border-[#D8D5CD] hover:bg-[#FAF9F5] rounded transition-colors whitespace-nowrap"
                >
                  <Printer className="w-3.5 h-3.5 text-[#475569]" />
                  <span>Печатный паспорт</span>
                </button>
                {runs.length > DEMO_DRILL_RUNS.length && (
                  <button
                    type="button"
                    onClick={handleResetRuns}
                    className="px-2.5 py-1.5 text-xs font-mono text-[#B45309] hover:underline whitespace-nowrap"
                  >
                    Сбросить ({runs.length})
                  </button>
                )}
              </div>
            </div>

            {geoDemoNotice && (
              <div className="px-4 py-2 bg-[#F0FDFA] border-b border-[#0F766E]/30 text-xs font-mono text-[#0F766E] flex items-center justify-between">
                <span>● {geoDemoNotice}</span>
                <button type="button" onClick={() => setGeoDemoNotice('')} className="underline ml-4">
                  Скрыть
                </button>
              </div>
            )}

            <div className="p-4 sm:p-6 space-y-6">
              {/* KPI Plaques: TCR / SCR / RQD + Calculated RMR89 & Q-index */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-[#FAF9F5] border border-[#D8D5CD] rounded p-3.5">
                  <div className="text-[11px] font-mono text-[#64748B]">СРЕДНИЙ ВЫХОД КЕРНА (TCR)</div>
                  <div className="text-2xl font-mono font-semibold text-[#14171A] tabular-nums mt-1">
                    {avgTcr.toFixed(1)} <span className="text-xs font-normal text-[#64748B]">%</span>
                  </div>
                  <div className="text-[11px] text-[#475569] mt-1">По {runs.length} рейсам интервала</div>
                </div>

                <div className="bg-[#FAF9F5] border border-[#D8D5CD] rounded p-3.5">
                  <div className="text-[11px] font-mono text-[#64748B]">СОХРАННЫЙ КЕРН (SCR)</div>
                  <div className="text-2xl font-mono font-semibold text-[#14171A] tabular-nums mt-1">
                    {avgScr.toFixed(1)} <span className="text-xs font-normal text-[#64748B]">%</span>
                  </div>
                  <div className="text-[11px] text-[#475569] mt-1">Учёт полных цилиндров керна</div>
                </div>

                <div className="bg-[#FAF9F5] border border-[#D8D5CD] rounded p-3.5">
                  <div className="text-[11px] font-mono text-[#64748B]">СРЕДНИЙ ПОКАЗАТЕЛЬ RQD</div>
                  <div className="text-2xl font-mono font-semibold text-[#0F766E] tabular-nums mt-1">
                    {avgRqd.toFixed(1)} <span className="text-xs font-normal text-[#64748B]">%</span>
                  </div>
                  <div className="text-[11px] text-[#475569] mt-1">Столбики ≥ 10 см по оси</div>
                </div>

                <div className="bg-[#FAF9F5] border border-[#D8D5CD] rounded p-3.5">
                  <div className="text-[11px] font-mono text-[#64748B]">РАСЧЁТНЫЙ RMR89 (В ПРИЛОЖЕНИИ)</div>
                  <div className="text-2xl font-mono font-semibold text-[#14171A] tabular-nums mt-1">
                    64 <span className="text-xs font-normal text-[#64748B]">балла (Демо)</span>
                  </div>
                  <div className="text-[11px] text-[#B45309] mt-1">Расчётный внутренний индекс</div>
                </div>

                <div className="bg-[#FAF9F5] border border-[#D8D5CD] rounded p-3.5">
                  <div className="text-[11px] font-mono text-[#64748B]">РАСЧЁТНЫЙ Q-ИНДЕКС (В ПРИЛОЖЕНИИ)</div>
                  <div className="text-2xl font-mono font-semibold text-[#14171A] tabular-nums mt-1">
                    8.4 <span className="text-xs font-normal text-[#64748B]">ед. (Демо)</span>
                  </div>
                  <div className="text-[11px] text-[#B45309] mt-1">Не является экспертизой</div>
                </div>
              </div>

              {/* Mandatory Disclaimer on RMR89 and Q-Index */}
              <div className="bg-[#EFECE4] border-l-2 border-[#B45309] p-3 rounded-r text-xs text-[#334155] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                <div>
                  <strong>Важное примечание о RMR89 и Q-индексе:</strong> показатели RMR89 и Q-индекс в GeoLog Studio представляют собой <strong>расчётные показатели, реализованные внутри алгоритмов приложения</strong> на основе введённых параметров рейсов и трещиноватости. Они <strong>не являются сертифицированной геотехнической оценкой, экспертным заключением или гарантией соответствия отраслевым стандартам проектирования</strong>.
                </div>
              </div>

              {/* Runs Table + Color Depth Profile & RQD Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 8 Cols: Drill Runs Table */}
                <div className="lg:col-span-8 overflow-x-auto border border-[#D8D5CD] rounded">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#EFECE4] text-[#475569] font-mono text-[11px] border-b border-[#D8D5CD]">
                        <th className="py-2.5 px-2.5">РЕЙС #</th>
                        <th className="py-2.5 px-2.5">ИНТЕРВАЛ (М)</th>
                        <th className="py-2.5 px-2.5">ТИПОРАЗМЕР</th>
                        <th className="py-2.5 px-2.5 text-right">TCR (%)</th>
                        <th className="py-2.5 px-2.5 text-right">SCR (%)</th>
                        <th className="py-2.5 px-2.5 text-right">RQD (%)</th>
                        <th className="py-2.5 px-2.5">ISRM</th>
                        <th className="py-2.5 px-2.5">ВЫВЕТРИВАНИЕ</th>
                        <th className="py-2.5 px-2.5">СОСТОЯНИЕ КЕРНА</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2DFD5]">
                      {runs.map((run) => (
                        <tr key={run.runNumber} className="hover:bg-[#FAF9F5]">
                          <td className="py-2 px-2.5 font-mono font-semibold text-[#14171A]">
                            #{run.runNumber}
                          </td>
                          <td className="py-2 px-2.5 font-mono tabular-nums whitespace-nowrap text-[#14171A]">
                            {run.from.toFixed(1)}–{run.to.toFixed(1)}
                          </td>
                          <td className="py-2 px-2.5 font-mono text-[11px] text-[#475569] whitespace-nowrap">
                            {run.coreSize}
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono tabular-nums text-[#334155]">
                            {run.tcrPct.toFixed(1)}
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono tabular-nums text-[#334155]">
                            {run.scrPct.toFixed(1)}
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono tabular-nums font-semibold">
                            <span
                              className={
                                run.rqdPct >= 75
                                  ? 'text-[#0F766E]'
                                  : run.rqdPct >= 50
                                  ? 'text-[#14171A]'
                                  : 'text-[#B45309]'
                              }
                            >
                              {run.rqdPct.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-2 px-2.5 font-mono font-semibold text-[#14171A]">
                            {run.isrmCode}
                          </td>
                          <td className="py-2 px-2.5 text-[11px] text-[#475569] whitespace-nowrap">
                            {run.weathering}
                          </td>
                          <td className="py-2 px-2.5 text-[#334155] min-w-[180px]">
                            {run.coreCondition}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Right 4 Cols: Color Depth Profile & RQD Categories */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-[#FAF9F5] border border-[#D8D5CD] rounded p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#14171A]">
                      <span>Цветной профиль RQD по глубине</span>
                      <span className="font-mono text-[11px] text-[#64748B]">125–{runs[runs.length - 1].to} м</span>
                    </div>

                    <div className="space-y-1.5">
                      {runs.map((r) => {
                        const barColor =
                          r.rqdPct >= 75
                            ? 'bg-[#0F766E]'
                            : r.rqdPct >= 50
                            ? 'bg-[#0284C7]'
                            : 'bg-[#D97706]';
                        const catLabel =
                          r.rqdPct >= 90
                            ? 'Отличное (90–100%)'
                            : r.rqdPct >= 75
                            ? 'Хорошее (75–90%)'
                            : r.rqdPct >= 50
                            ? 'Удовл. (50–75%)'
                            : 'Низкое (25–50%)';

                        return (
                          <div key={r.runNumber} className="text-[11px] font-mono space-y-0.5">
                            <div className="flex justify-between text-[#334155]">
                              <span>
                                Рейс #{r.runNumber} ({r.from}–{r.to}м)
                              </span>
                              <span>
                                <strong>{r.rqdPct}%</strong> · {catLabel}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-[#E2DFD5] rounded-xs overflow-hidden">
                              <div className={`h-full ${barColor}`} style={{ width: `${r.rqdPct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* RQD Categories Reference */}
                    <div className="pt-2 border-t border-[#E2DFD5] grid grid-cols-2 gap-1.5 text-[10px] font-mono text-[#475569]">
                      <div>■ 90–100%: Очень хорошее</div>
                      <div>■ 75–90%: Хорошее</div>
                      <div>■ 50–75%: Удовлетворительное</div>
                      <div>▲ 25–50%: Низкое (зоны сдвига)</div>
                    </div>
                  </div>

                  {/* ISRM Strength Reference Cards */}
                  <div className="bg-[#FAF9F5] border border-[#D8D5CD] rounded p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#14171A]">Карточки прочности ISRM</span>
                      <div className="flex gap-1">
                        {(['R2', 'R3', 'R4', 'R5'] as const).map((code) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => setSelectedIsrm(code)}
                            className={`px-2 py-0.5 text-[11px] font-mono rounded ${
                              selectedIsrm === code
                                ? 'bg-[#14171A] text-white'
                                : 'bg-white border border-[#D8D5CD] text-[#475569]'
                            }`}
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>

                    {isrmCards
                      .filter((c) => c.code === selectedIsrm)
                      .map((card) => (
                        <div key={card.code} className="bg-white border border-[#E2DFD5] rounded p-3 text-xs space-y-1">
                          <div className="flex items-center justify-between font-mono">
                            <span className="font-semibold text-[#0F766E]">Класс {card.code}: {card.name}</span>
                            <span className="text-[#64748B]">UCS: {card.ucsRange}</span>
                          </div>
                          <p className="text-[#334155] text-[11px] leading-relaxed">{card.fieldTest}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: АКТЫ И ФАЙЛОВЫЙ ОБОЗРЕВАТЕЛЬ
      ===================================================================== */}
      <section id="documents-export" className="py-16 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#0F766E]">
                Раздел 07 · Документооборот скважины и файловая иерархия
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#14171A] mt-1">
                Файловый обозреватель проекта и генератор 5 типов буровых актов
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
              <span>Пример интерфейса</span>
              <span aria-hidden="true">·</span>
              <span>Без скачивания файлов на сайте</span>
            </div>
          </div>

          <p className="text-sm text-[#334155] max-w-4xl leading-relaxed">
            Файловый обозреватель GeoLog Studio выстроен по строгой иерархии <strong>Проект → Скважина → Категория документов</strong> (акты, геологическая документация, опробование, замеры инклинометрии, рейсы бурения и геомеханика). Встроенный генератор актов позволяет заполнить поля и подготовить предпросмотр листа <strong>A4</strong> для пяти видов производственных актов.
          </p>

          {/* Two-part Workspace: Top File Explorer Hierarchy + Bottom Act Generator & A4 Preview */}
          <div className="space-y-8">
            {/* Part A: File Explorer Hierarchy */}
            <div className="bg-[#FAF9F5] border border-[#D8D5CD] rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-[#EFECE4] border-b border-[#D8D5CD] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-[#0F766E]" />
                  <span className="text-xs font-mono font-semibold text-[#14171A]">
                    Иерархия: Проект «Сарыарка-Север» → Скважина BH-SRK-101 → 5 категорий документов
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#64748B]">Демонстрационное дерево файлов</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#D8D5CD]">
                {/* Left 4 Cols: 5 Confirmed Categories */}
                <div className="md:col-span-4 p-4 space-y-1.5 bg-white">
                  <div className="text-[11px] font-mono uppercase text-[#64748B] mb-2">
                    Категории документов скважины:
                  </div>
                  {[
                    { id: 'acts', label: '1. Акты (5 видов бланков)', count: 3 },
                    { id: 'geology', label: '2. Геологическая документация', count: 2 },
                    { id: 'sampling', label: '3. Опробование и QA/QC', count: 2 },
                    { id: 'inclinometry', label: '4. Замеры инклинометрии', count: 2 },
                    { id: 'geomech', label: '5. Рейсы бурения и геомеханика', count: 2 }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedExplorerCategory(cat.id as typeof selectedExplorerCategory)}
                      className={`w-full px-3 py-2 text-xs font-medium rounded flex items-center justify-between transition-colors ${
                        selectedExplorerCategory === cat.id
                          ? 'bg-[#0F766E] text-white'
                          : 'text-[#334155] hover:bg-[#FAF9F5]'
                      }`}
                    >
                      <span className="truncate">{cat.label}</span>
                      <span className="font-mono text-[11px] ml-2">{cat.count}</span>
                    </button>
                  ))}
                </div>

                {/* Right 8 Cols: Files inside selected category */}
                <div className="md:col-span-8 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#475569]">
                    <span>Документы и шаблоны выбранной категории (только предпросмотр структуры):</span>
                    <span className="font-mono text-[11px]">Excel-шаблоны · Печать · PDF средствами браузера</span>
                  </div>

                  <div className="divide-y divide-[#E2DFD5] border border-[#D8D5CD] rounded bg-white">
                    {explorerFiles[selectedExplorerCategory].map((f, i) => (
                      <div key={i} className="p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-start gap-2.5">
                          <FileText className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                          <div>
                            <div className="font-mono font-semibold text-[#14171A]">{f.name}</div>
                            <div className="text-[#475569] text-[11px]">{f.desc}</div>
                          </div>
                        </div>
                        <div className="text-right font-mono text-[11px] text-[#64748B]">
                          <div>{f.format}</div>
                          <div>Обновлено: {f.updated}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Part B: Interactive Generator of 5 Borehole Act Types + A4 Preview */}
            <div className="bg-[#FAF9F5] border border-[#D8D5CD] rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-[#EFECE4] border-b border-[#D8D5CD] flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-semibold text-[#14171A]">
                  GeoLog Studio · Генератор буровых актов (Редактор полей и предпросмотр листа A4)
                </span>
                <span className="text-[11px] font-mono text-[#B45309]">
                  Пример интерфейса · Скачивание файлов на сайте отключено
                </span>
              </div>

              {/* 5 Act Type Selector Buttons */}
              <div className="p-3 bg-white border-b border-[#D8D5CD] flex flex-wrap gap-1.5">
                {actTypesList.map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setSelectedActType(act.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors whitespace-nowrap ${
                      selectedActType === act.id
                        ? 'bg-[#14171A] border-[#14171A] text-white'
                        : 'bg-[#FAF9F5] border-[#D8D5CD] text-[#334155] hover:border-[#94A3B8]'
                    }`}
                  >
                    {act.title}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#D8D5CD]">
                {/* Left 5 Columns: Field Editor */}
                <div className="lg:col-span-5 p-4 sm:p-5 space-y-4">
                  <h3 className="font-display text-xs sm:text-sm font-semibold text-[#14171A]">
                    Редактор реквизитов акта (локальный демо-режим)
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-mono text-[11px] text-[#475569] mb-1">
                        Индекс скважины (BHID):
                      </label>
                      <input
                        type="text"
                        value={actFields.bhid}
                        onChange={(e) => setActFields({ ...actFields, bhid: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-[#D8D5CD] rounded font-mono text-[#14171A]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[11px] text-[#475569] mb-1">
                          Дата составления:
                        </label>
                        <input
                          type="text"
                          value={actFields.date}
                          onChange={(e) => setActFields({ ...actFields, date: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-[#D8D5CD] rounded font-mono text-[#14171A]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[11px] text-[#475569] mb-1">
                          Фактическая глубина (м):
                        </label>
                        <input
                          type="text"
                          value={actFields.depthM}
                          onChange={(e) => setActFields({ ...actFields, depthM: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-[#D8D5CD] rounded font-mono text-[#14171A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] text-[#475569] mb-1">
                        Представитель геологической службы (вымышл.):
                      </label>
                      <input
                        type="text"
                        value={actFields.commissionLead}
                        onChange={(e) => setActFields({ ...actFields, commissionLead: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-[#D8D5CD] rounded text-[#14171A]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] text-[#475569] mb-1">
                        Заключение комиссии / примечание к акту:
                      </label>
                      <textarea
                        rows={3}
                        value={actFields.remark}
                        onChange={(e) => setActFields({ ...actFields, remark: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-[#D8D5CD] rounded text-[#14171A]"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#EFECE4] rounded text-[11px] text-[#475569] space-y-1">
                    <div className="font-semibold text-[#14171A] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" />
                      <span>Печать и подготовка PDF в продукте</span>
                    </div>
                    <p>
                      В приложении GeoLog Studio заполненный акт выводится на печать или сохраняется в PDF штатными средствами приложения и браузера. На этом ознакомительном сайте изменения отображаются только на макете A4 справа.
                    </p>
                  </div>
                </div>

                {/* Right 7 Columns: A4 Sheet Visual Preview */}
                <div className="lg:col-span-7 p-4 sm:p-6 bg-[#E5E2D9] flex items-center justify-center">
                  <div className="w-full max-w-[620px] bg-white border border-[#C8C4B8] shadow-xs p-6 sm:p-8 text-[#14171A] space-y-4 font-sans">
                    <div className="flex items-center justify-between border-b border-[#D8D5CD] pb-2 text-[10px] font-mono text-[#64748B]">
                      <span>МАКЕТ ПЕЧАТНОГО ЛИСТА A4 · GEOLOG STUDIO</span>
                      <span>ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ — НЕ LIVE</span>
                    </div>

                    <div className="text-center space-y-1 py-2">
                      <div className="text-xs font-mono text-[#475569]">
                        ТОО «ГеоСпектр-Демо» (Вымышленная организация)
                      </div>
                      <h4 className="font-display text-sm sm:text-base font-bold text-[#14171A]">
                        {getActPreviewTitle(selectedActType)}
                      </h4>
                      <div className="text-xs font-mono text-[#334155]">
                        Дата: {actFields.date} · Участок: {actFields.site}
                      </div>
                    </div>

                    {/* Key table inside A4 */}
                    <div className="grid grid-cols-2 gap-2 border border-[#D8D5CD] p-3 bg-[#FAF9F5] text-xs font-mono">
                      <div>
                        <span className="text-[#64748B]">Скважина (BHID):</span>{' '}
                        <strong>{actFields.bhid}</strong>
                      </div>
                      <div>
                        <span className="text-[#64748B]">Отметка глубины:</span>{' '}
                        <strong>{actFields.depthM} м</strong>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#64748B]">Папка проекта:</span> {actFields.project}
                      </div>
                    </div>

                    <div className="text-xs text-[#14171A] leading-relaxed space-y-2">
                      <p>{getActBodyParagraph(selectedActType)}</p>
                      <p>
                        <strong>Дополнительные сведения:</strong> {actFields.remark}
                      </p>
                    </div>

                    {/* Signatures mockup */}
                    <div className="pt-4 border-t border-[#D8D5CD] grid grid-cols-2 gap-4 text-[11px] font-mono text-[#334155]">
                      <div>
                        <div className="text-[#64748B]">Геологическая служба:</div>
                        <div className="mt-1">{actFields.commissionLead}</div>
                        <div className="mt-2 text-[#94A3B8]">Подпись: ________________</div>
                      </div>
                      <div>
                        <div className="text-[#64748B]">Буровой подрядчик:</div>
                        <div className="mt-1">{actFields.contractorRep}</div>
                        <div className="mt-2 text-[#94A3B8]">Подпись: ________________</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
