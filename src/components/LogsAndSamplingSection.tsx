import React, { useState } from 'react';
import { DEMO_SAMPLES, DEMO_DRILL_RUNS } from '../data/demoData';

export const LogsAndSamplingSection: React.FC = () => {
  const [qaqcFilter, setQaqcFilter] = useState<string>('all');
  const [selectedSampleId, setSelectedSampleId] = useState<string>('S-10103');

  const runs = DEMO_DRILL_RUNS;
  const [selectedRunNumber, setSelectedRunNumber] = useState<number>(42);
  const [geoDemoNotice, setGeoDemoNotice] = useState<string>('');
  const [selectedIsrm, setSelectedIsrm] = useState<'R2' | 'R3' | 'R4' | 'R5'>('R4');

  const filteredSamples = DEMO_SAMPLES.filter((s) => {
    if (qaqcFilter === 'all') return true;
    if (qaqcFilter === 'core') return s.sampleType === 'Рядовая керновая (1/2 керна)';
    return s.sampleType === qaqcFilter;
  });

  const activeSampleDetail =
    DEMO_SAMPLES.find((s) => s.sampleId === selectedSampleId) || DEMO_SAMPLES[0];

  const qaqcTypes = [
    { code: 'CRM', label: 'CRM' },
    { code: 'Blank', label: 'Blank' },
    { code: 'Полевой дубликат', label: 'Полевой дубликат' },
    { code: 'Дубликат дробления', label: 'Дубликат дробления' },
    { code: 'Дубликат пульпы', label: 'Дубликат пульпы' }
  ];

  const avgTcr = runs.reduce((acc, r) => acc + r.tcrPct, 0) / runs.length;
  const avgScr = runs.reduce((acc, r) => acc + r.scrPct, 0) / runs.length;
  const avgRqd = runs.reduce((acc, r) => acc + r.rqdPct, 0) / runs.length;
  const activeRunDetail = runs.find((r) => r.runNumber === selectedRunNumber) || runs[0];

  const isrmInfo: Record<'R2' | 'R3' | 'R4' | 'R5', string> = {
    R2: 'R2 (5–25 МПа): слабая порода, неглубокие вмятины от молотка (полевая оценка)',
    R3: 'R3 (25–50 МПа): средней прочности, раскалывается одним ударом молотка (полевая оценка)',
    R4: 'R4 (50–100 МПа): прочная порода, требуется более одного удара молотка (полевая оценка)',
    R5: 'R5 (100–250 МПа): очень прочная, раскалывается серией ударов (полевая оценка)'
  };

  return (
    <>
      <section id="core-sampling" className="relative py-12 sm:py-16">
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="max-w-3xl space-y-1.5 bg-linear-to-r from-[#F4F5F0]/96 to-[#EAECE4]/95 backdrop-blur-xs border border-[#94A39B] border-l-4 border-l-[#0F766E] rounded-lg p-4 sm:p-5 shadow-md">
          <p className="text-xs font-mono uppercase tracking-wider font-semibold text-[#0F766E]">
            05 · Керн и опробование
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#16201D]">
            Учёт керна и опробование по стандартам QA/QC с удобным прослеживанием
          </h2>
          <p className="text-sm text-[#2F3E39] leading-relaxed">
            Весь цикл опробования керна ведётся строго по стандартам контроля качества <strong>QA/QC</strong>: в единой ведомости наряду с рядовыми керновыми пробами фиксируются контрольные вставки (стандарты <code>CRM</code>, холостые пробы <code>Blank</code>, полевые дубликаты, дубликаты дробления и пульпы). Каждая проба привязана к интервалу глубин, породе и сопроводительным бланкам партии, поэтому всю цепочку отбора и контроля удобно прослеживать без потерь и пропусков.
          </p>
        </div>

        {/* Part A: Sampling & QA/QC Functional Module */}
        <div className="bg-[#FAFBF8]/96 border border-[#94A39B] rounded-lg overflow-hidden shadow-md">
          <div className="p-3 bg-[#E5EAE5] border-b border-[#B8C4BD] flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() => setQaqcFilter('all')}
                className={`px-2.5 py-1 text-xs font-mono rounded ${
                  qaqcFilter === 'all' ? 'bg-[#182622] text-white' : 'bg-white border border-[#B8C4BD] text-[#182622]'
                }`}
              >
                Все ({DEMO_SAMPLES.length})
              </button>
              <button
                type="button"
                onClick={() => setQaqcFilter('core')}
                className={`px-2.5 py-1 text-xs font-mono rounded ${
                  qaqcFilter === 'core' ? 'bg-[#182622] text-white' : 'bg-white border border-[#B8C4BD] text-[#182622]'
                }`}
              >
                Рядовые (7)
              </button>
              {qaqcTypes.map((t) => (
                <button
                  key={t.code}
                  type="button"
                  onClick={() => setQaqcFilter(qaqcFilter === t.code ? 'all' : t.code)}
                  className={`px-2.5 py-1 text-xs font-mono rounded ${
                    qaqcFilter === t.code ? 'bg-[#0F766E] text-white' : 'bg-white border border-[#B8C4BD] text-[#182622]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-[#2F3E39]">
              Покрытие 128.0–142.0 м: <strong className="text-[#0F766E]">14.0 м (100%)</strong>
            </span>
          </div>

          <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-7 space-y-2.5">
              <div className="overflow-x-auto border border-[#D8D5CD] rounded">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF9F5] text-[#475569] font-mono text-[11px] border-b border-[#D8D5CD]">
                      <th className="py-2 px-3">SAMPLE_ID</th>
                      <th className="py-2 px-3 text-right">ОТ–ДО (М)</th>
                      <th className="py-2 px-3">ТИП ПРОБЫ / QA/QC</th>
                      <th className="py-2 px-3">ССЫЛКА QA/QC</th>
                      <th className="py-2 px-3 text-right">ВЕС (КГ)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2DFD5]">
                    {filteredSamples.map((smp) => {
                      const isQaqc = smp.sampleType !== 'Рядовая керновая (1/2 керна)';
                      const isSelected = smp.sampleId === activeSampleDetail.sampleId;
                      return (
                        <tr
                          key={smp.sampleId}
                          onClick={() => setSelectedSampleId(smp.sampleId)}
                          className={`cursor-pointer ${isSelected ? 'bg-[#F0FDFA]' : 'hover:bg-[#FAF9F5]'}`}
                        >
                          <td className="py-1.5 px-3 font-mono font-semibold">{smp.sampleId}</td>
                          <td className="py-1.5 px-3 text-right font-mono tabular-nums">
                            {smp.from !== null && smp.to !== null ? `${smp.from.toFixed(1)}–${smp.to.toFixed(1)}` : '—'}
                          </td>
                          <td className={`py-1.5 px-3 font-medium ${isQaqc ? 'text-[#0F766E]' : ''}`}>
                            {smp.sampleType}
                          </td>
                          <td className="py-1.5 px-3 font-mono text-[11px] text-[#475569]">{smp.qaqcRef}</td>
                          <td className="py-1.5 px-3 text-right font-mono tabular-nums">{smp.weightKg.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-2.5 bg-[#FAF9F5] border border-[#D8D5CD] rounded text-xs flex justify-between">
                <span><strong>{activeSampleDetail.sampleId}:</strong> {activeSampleDetail.comment}</span>
                <span className="font-mono text-[#0F766E]">{activeSampleDetail.lithoCode}</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              {/* Candidate Ore Zones */}
              <div className="p-3 bg-[#FAF9F5] border border-[#D8D5CD] rounded space-y-2 text-xs">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="font-semibold text-[#14171A]">Предполагаемые рудные зоны (демо)</span>
                  <span className="text-[#B45309]">Требует проверки геологом</span>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2 bg-white border border-[#D8D5CD] rounded">
                    <div className="font-semibold text-[#0F766E]">128.0–174.0 м (46 м)</div>
                    <div className="font-sans text-[#475569] mt-0.5">Филлизитизация · сульфиды 5.4–7.45%</div>
                  </div>
                  <div className="p-2 bg-white border border-[#D8D5CD] rounded">
                    <div className="font-semibold text-[#B45309]">174.0–212.0 м (38 м)</div>
                    <div className="font-sans text-[#475569] mt-0.5">Брекчия · сульфиды 6.6%</div>
                  </div>
                </div>
              </div>

              {/* QA/QC Control Structure & Traceability */}
              <div className="p-3 bg-[#FAF9F5] border border-[#D8D5CD] rounded space-y-2 text-xs">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="font-semibold text-[#14171A]">Структура контроля QA/QC в ведомости</span>
                  <span className="text-[#0F766E] font-semibold">5 контрольных проб (41.7% к рядовым)</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
                  <div className="p-2 bg-white border border-[#D8D5CD] rounded">
                    <div className="text-[10px] text-[#64748B]">СТАНДАРТЫ CRM</div>
                    <div className="font-semibold text-[#0F766E] mt-0.5">OREAS-502d</div>
                  </div>
                  <div className="p-2 bg-white border border-[#D8D5CD] rounded">
                    <div className="text-[10px] text-[#64748B]">ХОЛОСТЫЕ (BLANK)</div>
                    <div className="font-semibold text-[#14171A] mt-0.5">Кварц стерильный</div>
                  </div>
                  <div className="p-2 bg-white border border-[#D8D5CD] rounded">
                    <div className="text-[10px] text-[#64748B]">ДУБЛИКАТЫ</div>
                    <div className="font-semibold text-[#14171A] mt-0.5">Полев. / Дробл. / Пульпа</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part B: Drilling Parameters & Core Quality (TCR, SCR, RQD, ISRM) */}
        <div className="bg-white border border-[#D8D5CD] rounded overflow-hidden">
          <div className="p-3 bg-[#EFECE4] border-b border-[#D8D5CD] flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span>TCR: <strong>{avgTcr.toFixed(1)}%</strong></span>
              <span>·</span>
              <span>SCR: <strong>{avgScr.toFixed(1)}%</strong></span>
              <span>·</span>
              <span>Индекс качества керна (RQD): <strong className="text-[#0F766E]">{avgRqd.toFixed(1)}%</strong></span>
              <span>·</span>
              <span className="text-[#64748B]">Расчётные в прилож.: RMR89 (64) / Q (8.4)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setGeoDemoNotice('Ручное заполнение и импорт рейсов по Excel-шаблону')}
                className="px-2.5 py-1 text-xs font-mono bg-white border border-[#D8D5CD] rounded"
              >
                Импорт Excel / Ручной ввод
              </button>
              <button
                type="button"
                onClick={() => setGeoDemoNotice('Печатный паспорт геомеханики керна')}
                className="px-2.5 py-1 text-xs font-mono bg-white border border-[#D8D5CD] rounded"
              >
                Паспорт
              </button>
            </div>
          </div>

          {geoDemoNotice && (
            <div className="px-3 py-1.5 bg-[#F0FDFA] border-b border-[#0F766E]/30 text-xs font-mono text-[#0F766E] flex justify-between">
              <span>● {geoDemoNotice}</span>
              <button type="button" onClick={() => setGeoDemoNotice('')} className="underline">Скрыть</button>
            </div>
          )}

          <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Runs Table with inline RQD bar */}
            <div className="lg:col-span-8 overflow-x-auto border border-[#D8D5CD] rounded">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF9F5] text-[#475569] font-mono text-[11px] border-b border-[#D8D5CD]">
                    <th className="py-2 px-3">РЕЙС #</th>
                    <th className="py-2 px-3">ОТ–ДО (М)</th>
                    <th className="py-2 px-3 text-right">TCR / SCR (%)</th>
                    <th className="py-2 px-3">ИНДЕКС КАЧЕСТВА КЕРНА (RQD)</th>
                    <th className="py-2 px-3">ISRM (ПОЛЕВАЯ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DFD5]">
                  {runs.map((run) => {
                    const isSelected = run.runNumber === activeRunDetail.runNumber;
                    return (
                      <tr
                        key={run.runNumber}
                        onClick={() => setSelectedRunNumber(run.runNumber)}
                        className={`cursor-pointer ${isSelected ? 'bg-[#F0FDFA]' : 'hover:bg-[#FAF9F5]'}`}
                      >
                        <td className="py-1.5 px-3 font-mono font-semibold">#{run.runNumber}</td>
                        <td className="py-1.5 px-3 font-mono tabular-nums">{run.from.toFixed(1)}–{run.to.toFixed(1)}</td>
                        <td className="py-1.5 px-3 text-right font-mono tabular-nums">
                          {run.tcrPct.toFixed(0)} / {run.scrPct.toFixed(0)}%
                        </td>
                        <td className="py-1.5 px-3">
                          <div className="flex items-center gap-2 font-mono">
                            <div className="w-24 h-2 bg-[#E2DFD5] rounded-xs overflow-hidden shrink-0">
                              <div
                                className={`h-full ${run.rqdPct >= 75 ? 'bg-[#0F766E]' : run.rqdPct >= 50 ? 'bg-[#0284C7]' : 'bg-[#D97706]'}`}
                                style={{ width: `${run.rqdPct}%` }}
                              />
                            </div>
                            <span className="font-semibold tabular-nums">{run.rqdPct.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="py-1.5 px-3 font-mono">{run.isrmCode}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Selected Run & ISRM Field Reference */}
            <div className="lg:col-span-4 space-y-3 text-xs">
              <div className="p-3 bg-[#FAF9F5] border border-[#D8D5CD] rounded space-y-1">
                <div className="font-mono font-semibold text-[#14171A]">
                  Рейс #{activeRunDetail.runNumber} · {activeRunDetail.coreSize} · {activeRunDetail.weathering}
                </div>
                <div className="text-[#334155]">{activeRunDetail.coreCondition}</div>
              </div>

              <div className="p-3 bg-[#FAF9F5] border border-[#D8D5CD] rounded space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#14171A]">Справочник ISRM:</span>
                  <div className="flex gap-1">
                    {(['R2', 'R3', 'R4', 'R5'] as const).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setSelectedIsrm(code)}
                        className={`px-2 py-0.5 text-[11px] font-mono rounded ${
                          selectedIsrm === code ? 'bg-[#14171A] text-white' : 'bg-white border border-[#D8D5CD]'
                        }`}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-2 bg-white border border-[#D8D5CD] rounded text-[11px] text-[#334155]">
                  {isrmInfo[selectedIsrm]}
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
