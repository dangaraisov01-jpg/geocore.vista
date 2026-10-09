import React, { useState } from 'react';
import { FileText, ArrowUpRight } from 'lucide-react';
import { DEMO_SAMPLES } from '../data/demoData';

type DocId =
  | 'act-spud'
  | 'act-depth'
  | 'act-closure'
  | 'act-reclamation'
  | 'act-inclinometry'
  | 'lab-order'
  | 'core-sampling-act'
  | 'sample-handover-act'
  | 'chain-of-custody';

interface DocListItem {
  id: DocId;
  code: string;
  title: string;
  subtitle: string;
  group: 'Акты из PDF (BUR-26-005)' | 'Опробование и лаборатория (QA/QC)';
}

const DOC_LIST: DocListItem[] = [
  {
    id: 'act-spud',
    code: 'СТР. 1 ИЗ 6 · АКТ ЗАЛОЖЕНИЯ',
    title: 'АКТ о заложении скважины № BUR-26-005',
    subtitle: '«25» апреля 2026г. · X: 542415.0, Y: 5293105.0, Z: 391.0 · Глубина 600 м',
    group: 'Акты из PDF (BUR-26-005)'
  },
  {
    id: 'act-depth',
    code: 'СТР. 2 ИЗ 6 · КОНТРОЛЬНЫЙ ЗАМЕР',
    title: 'АКТ контрольного замера глубины скважины № BUR-26-005',
    subtitle: '«18» мая 2026г. · По журналу 600 м, по замеру 600 м, разница 0.0 м',
    group: 'Акты из PDF (BUR-26-005)'
  },
  {
    id: 'act-closure',
    code: 'СТР. 3–4 ИЗ 6 · ЗАКРЫТИЕ (КОНСЕРВАЦИЯ)',
    title: 'АКТ о закрытии (консервации) скважины № BUR-26-005',
    subtitle: '«18» мая 2026г. · Станок EX1200, выход керна 96%, 42 ящика',
    group: 'Акты из PDF (BUR-26-005)'
  },
  {
    id: 'act-reclamation',
    code: 'СТР. 5 ИЗ 6 · РЕКУЛЬТИВАЦИЯ',
    title: 'АКТ о рекультивации буровой площадки № BUR-26-005',
    subtitle: '«18» мая 2026г. · Площадь 400 м², мероприятия по рекультивации',
    group: 'Акты из PDF (BUR-26-005)'
  },
  {
    id: 'act-inclinometry',
    code: 'СТР. 6 ИЗ 6 · ЗАМЕР ИСКРИВЛЕНИЯ',
    title: 'Акт замера искривления скважины № BUR-26-005',
    subtitle: '"18" мая 2026 г. · Reflex EZ-Trac, точки 1–13 (0–600 м)',
    group: 'Акты из PDF (BUR-26-005)'
  },
  {
    id: 'lab-order',
    code: 'ФОРМА ЛАБ-01',
    title: 'Наряд-заказ по пробам согласно стандартам QA/QC',
    subtitle: 'Партия BATCH-2026-014 · FA-AAS 50 г + ICP-AES (CRM / Blank / Dup)',
    group: 'Опробование и лаборатория (QA/QC)'
  },
  {
    id: 'core-sampling-act',
    code: 'ФОРМА ГРР-06',
    title: 'Акт отбора рядовых и контрольных керновых проб',
    subtitle: 'Алмазная распиловка керна, ведомость интервалов и QA/QC',
    group: 'Опробование и лаборатория (QA/QC)'
  },
  {
    id: 'sample-handover-act',
    code: 'ФОРМА ЛАБ-02',
    title: 'Акт приёма-передачи проб в лабораторию',
    subtitle: 'Передача мешков #M-01..#M-03, проверка пломб SL-8841..8843',
    group: 'Опробование и лаборатория (QA/QC)'
  },
  {
    id: 'chain-of-custody',
    code: 'ФОРМА CoC-03',
    title: 'Сопроводительная ведомость и помешковая опись',
    subtitle: 'Chain of Custody, этапы транспортировки и опись проб',
    group: 'Опробование и лаборатория (QA/QC)'
  }
];

const INCLINOMETRY_ROWS = [
  { n: '1', depth: '0', dip: '-80', az: '135' },
  { n: '2', depth: '50', dip: '-79.5', az: '135.7' },
  { n: '3', depth: '100', dip: '-79', az: '136.4' },
  { n: '4', depth: '150', dip: '-78.5', az: '137.1' },
  { n: '5', depth: '200', dip: '-78', az: '137.8' },
  { n: '6', depth: '250', dip: '-77.5', az: '138.5' },
  { n: '7', depth: '300', dip: '-77', az: '139.2' },
  { n: '8', depth: '350', dip: '-76.5', az: '139.9' },
  { n: '9', depth: '400', dip: '-76', az: '140.6' },
  { n: '10', depth: '450', dip: '-75.5', az: '141.3' },
  { n: '11', depth: '500', dip: '-75', az: '142' },
  { n: '12', depth: '550', dip: '-74.5', az: '142.7' },
  { n: '13', depth: '600', dip: '-74', az: '143.4' },
  { n: '14', depth: '', dip: '', az: '' },
  { n: '15', depth: '', dip: '', az: '' },
  { n: '16', depth: '', dip: '', az: '' },
  { n: '17', depth: '', dip: '', az: '' },
  { n: '18', depth: '', dip: '', az: '' }
];

export const OfflineRolesAndFaqSection: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocId>('act-spud');

  const boreholeDocs = DOC_LIST.filter((d) => d.group === 'Акты из PDF (BUR-26-005)');
  const labDocs = DOC_LIST.filter((d) => d.group === 'Опробование и лаборатория (QA/QC)');

  return (
    <>
      {/* =====================================================================
          SECTION 06: АВТОМАТИЧЕСКОЕ ФОРМИРОВАНИЕ ДОКУМЕНТАЦИИ
      ===================================================================== */}
      <section id="auto-docs" className="relative py-12 sm:py-16">
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 space-y-5">
          {/* Сверху: описание функционала */}
          <div className="bg-linear-to-r from-[#FAF6EB]/96 to-[#F2E9D5]/95 backdrop-blur-xs border border-[#C6A276] border-l-4 border-l-[#D97706] rounded-lg p-5 shadow-md">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#B45309] font-semibold">
              07 · Автоматическое формирование документации
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1C1612] mt-1">
              Автоматическое формирование актов по скважине, наряд-заказов QA/QC и актов приёма-передачи
            </h2>
            <p className="text-xs sm:text-sm text-[#4A3B2F] mt-1.5 max-w-4xl leading-relaxed">
              Готовые печатные листы из файла <span className="font-mono font-semibold">akty-BUR-26-005-vse-akty.pdf</span> по скважине № BUR-26-005 (участок «Центральный рудный штокверк») и пакет лабораторных документов по опробованию. Выберите документ в списке слева для просмотра оригинального листа справа.
            </p>
          </div>

          {/* Слева список документов, справа соответствующий лист PDF без изменений */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Левая колонка: список актов */}
            <div className="lg:col-span-4 bg-[#FAF6EB]/96 border border-[#C6A276] rounded-xl p-3.5 shadow-md space-y-4 lg:sticky lg:top-20">
              <div>
                <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-[#7A5835] font-semibold border-b border-[#E2D4BE]">
                  Акты из PDF (akty-BUR-26-005-vse-akty.pdf)
                </div>
                <div className="mt-1.5 space-y-1.5">
                  {boreholeDocs.map((doc) => {
                    const active = selectedDoc === doc.id;
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setSelectedDoc(doc.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors border ${
                          active
                            ? 'bg-[#231B15] text-[#FDE68A] border-[#D97706] shadow-xs'
                            : 'bg-[#FFFDF9] text-[#2A2019] border-[#E5D7C3] hover:bg-[#F5ECDC]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${
                              active ? 'text-[#F59E0B]' : 'text-[#8C673E]'
                            }`}
                          >
                            {doc.code}
                          </span>
                          <FileText className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#F59E0B]' : 'text-[#A08466]'}`} />
                        </div>
                        <div className={`text-xs font-semibold mt-0.5 ${active ? 'text-white' : 'text-[#1C1612]'}`}>
                          {doc.title}
                        </div>
                        <div className={`text-[11px] mt-0.5 truncate ${active ? 'text-[#D6C7B2]' : 'text-[#6E5A49]'}`}>
                          {doc.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-[#7A5835] font-semibold border-b border-[#E2D4BE]">
                  Опробование и лаборатория (QA/QC)
                </div>
                <div className="mt-1.5 space-y-1.5">
                  {labDocs.map((doc) => {
                    const active = selectedDoc === doc.id;
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setSelectedDoc(doc.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors border ${
                          active
                            ? 'bg-[#231B15] text-[#FDE68A] border-[#D97706] shadow-xs'
                            : 'bg-[#FFFDF9] text-[#2A2019] border-[#E5D7C3] hover:bg-[#F5ECDC]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${
                              active ? 'text-[#F59E0B]' : 'text-[#0F766E]'
                            }`}
                          >
                            {doc.code}
                          </span>
                          <FileText className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#F59E0B]' : 'text-[#0F766E]'}`} />
                        </div>
                        <div className={`text-xs font-semibold mt-0.5 ${active ? 'text-white' : 'text-[#1C1612]'}`}>
                          {doc.title}
                        </div>
                        <div className={`text-[11px] mt-0.5 truncate ${active ? 'text-[#D6C7B2]' : 'text-[#6E5A49]'}`}>
                          {doc.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Правая колонка: точный лист выбранного акта из PDF */}
            <div className="lg:col-span-8 bg-[#525659] rounded-xl p-3 sm:p-6 border border-[#3A3D40] shadow-xl">
              {/* Верхняя плашка PDF-просмотрщика */}
              <div className="flex items-center justify-between bg-[#323639] text-[#E8EAED] px-4 py-2 rounded-t-md border-b border-[#202124] text-xs font-mono mb-3">
                <span>akty-BUR-26-005-vse-akty.pdf</span>
                <span>
                  {selectedDoc === 'act-spud' && 'Страница 1 / 6'}
                  {selectedDoc === 'act-depth' && 'Страница 2 / 6'}
                  {selectedDoc === 'act-closure' && 'Страницы 3–4 / 6'}
                  {selectedDoc === 'act-reclamation' && 'Страница 5 / 6'}
                  {selectedDoc === 'act-inclinometry' && 'Страница 6 / 6'}
                  {selectedDoc === 'lab-order' && 'Наряд-заказ QA/QC'}
                  {selectedDoc === 'core-sampling-act' && 'Акт отбора проб'}
                  {selectedDoc === 'sample-handover-act' && 'Акт приёма-передачи проб'}
                  {selectedDoc === 'chain-of-custody' && 'Chain of Custody'}
                </span>
              </div>

              {/* =================================================================
                  СТРАНИЦА 1 ИЗ 6: АКТ О ЗАЛОЖЕНИИ СКВАЖИНЫ № BUR-26-005
              ================================================================= */}
              {selectedDoc === 'act-spud' && (
                <div className="bg-white text-black mx-auto max-w-[794px] min-h-[1060px] shadow-2xl px-10 sm:px-16 py-12 font-serif text-[14px] leading-[1.55]">
                  <div className="text-center font-bold text-[16px]">АКТ</div>
                  <div className="text-center font-bold text-[15px]">
                    о заложении скважины №{' '}
                    <span className="inline-block border-b border-black px-2 font-bold">BUR-26-005</span>
                  </div>

                  <div className="text-right mt-3 text-[13px]">
                    « <span className="inline-block border-b border-black px-2 font-bold">25</span> »{' '}
                    <span className="inline-block border-b border-black px-6 font-bold">апреля</span> 2026г.
                  </div>

                  <div className="mt-4">
                    <div className="border-b border-black text-center font-bold text-[14px] pb-0.5">
                      Центральный рудный штокверк
                    </div>
                    <div className="text-center text-[11px] leading-tight mt-0.5">
                      (месторождение, участок работ)
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="pl-8">Мы нижеподписавшиеся члены комиссии в составе:</div>
                    <div className="flex items-baseline gap-1">
                      <span className="shrink-0">Полевой геолог</span>
                      <span className="border-b border-black px-2 font-bold">
                        Ахметов Р.К., ст. геолог Ибраев М.Т.
                      </span>
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="shrink-0">Буровой мастер</span>
                      <span className="flex-1 border-b border-black h-4"></span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    <div>Координаты устья скважины:</div>
                    <div className="flex items-baseline gap-4">
                      <div>
                        X:{' '}
                        <span className="inline-block border-b border-black px-6 font-bold">542415.0</span>
                      </div>
                      <div>
                        Y:{' '}
                        <span className="inline-block border-b border-black px-6 font-bold">5293105.0</span>
                      </div>
                      <div>
                        Z:{' '}
                        <span className="inline-block border-b border-black px-8 font-bold">391.0</span>
                      </div>
                    </div>

                    <div className="pl-8 pt-1">
                      Произвели заложение скважины №{' '}
                      <span className="inline-block border-b border-black px-12 font-bold">BUR-26-005</span>
                    </div>

                    <div>
                      Начальный диаметр скважины{' '}
                      <span className="inline-block border-b border-black px-14 font-bold">112 мм</span>
                    </div>

                    <div>Азимут бурения - 135°.</div>
                    <div>Угол наклона -80°.</div>

                    <div>
                      Проектная глубина скважины{' '}
                      <span className="inline-block border-b border-black px-8 font-bold">600</span> м.
                    </div>

                    <div>Скважина заложена</div>
                    <div>
                      <div className="border-b border-black text-center font-bold pb-0.5">
                        в соответствии с проектом
                      </div>
                      <div className="text-center text-[10.5px] leading-tight mt-0.5">
                        (в соответствии с проектом, с отклонением от проекта; в случае отклонения обосновать причину)
                      </div>
                      <div className="border-b border-black h-5"></div>
                    </div>

                    <div className="pt-1 flex items-baseline gap-2">
                      <span className="shrink-0">Целевое назначение скважины:</span>
                      <span className="flex-1 border-b border-black text-center font-bold">Поисковая</span>
                    </div>

                    <div className="pl-8">
                      Скважина вынесена на местность геологом / топографом на местность.
                    </div>
                    <div className="pl-8">
                      Проектный геологический разрез и геолого-технический наряд (конструкция скважины) прилагается
                    </div>

                    <div className="pl-8">Установленный минимальный процент выхода керна:</div>
                    <div>по рудному телу 95%;</div>
                    <div>по вмещающим породам 90%.</div>
                  </div>

                  <div className="mt-10 space-y-6">
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Полевой геолог</span>
                        <span className="flex-1 border-b border-black text-center font-bold pb-0.5">
                          Ахметов Р.К., ст. геолог Ибраев М.Т.
                        </span>
                      </div>
                      <div className="text-center text-[11px] ml-28 mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>

                    <div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Нач. участка/буровой мастер</span>
                        <span className="flex-1 border-b border-black h-5"></span>
                      </div>
                      <div className="text-center text-[11px] ml-44 mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>

                    <div>
                      <div className="border-b border-black h-5"></div>
                      <div className="text-center text-[11px] mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>

                    <div>
                      <div className="border-b border-black h-5"></div>
                      <div className="text-center text-[11px] mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================
                  СТРАНИЦА 2 ИЗ 6: АКТ КОНТРОЛЬНОГО ЗАМЕРА ГЛУБИНЫ СКВАЖИНЫ № BUR-26-005
              ================================================================= */}
              {selectedDoc === 'act-depth' && (
                <div className="bg-white text-black mx-auto max-w-[794px] min-h-[1060px] shadow-2xl px-10 sm:px-16 py-12 font-serif text-[14px] leading-[1.6]">
                  <div className="text-center font-bold text-[16px]">АКТ</div>
                  <div className="text-center font-bold text-[15px]">
                    контрольного замера глубины скважины №{' '}
                    <span className="inline-block border-b border-black px-2 font-bold">BUR-26-005</span>
                  </div>

                  <div className="text-right mt-3 text-[13px]">
                    « <span className="inline-block border-b border-black px-2 font-bold">18</span> »{' '}
                    <span className="inline-block border-b border-black px-7 font-bold">мая</span> 2026г.
                  </div>

                  <div className="mt-4">
                    <div className="border-b border-black text-center font-bold text-[14px] pb-0.5">
                      Центральный рудный штокверк
                    </div>
                    <div className="text-center text-[11px] leading-tight mt-0.5">
                      (месторождение, участок работ)
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="pl-8">Мы нижеподписавшиеся члены комиссии в составе:</div>
                    <div className="flex items-end gap-2">
                      <span className="shrink-0">Полевой геолог</span>
                      <span className="flex-1 border-b border-black text-center font-bold pb-0.5">
                        Ахметов Р.К., ст. геолог Ибраев М.Т.
                      </span>
                    </div>
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Буровой мастер</span>
                        <span className="flex-1 border-b border-black h-5"></span>
                      </div>
                      <div className="text-center text-[11px] mt-0.5">
                        (должность, фамилия, имя, отчество)
                      </div>
                    </div>

                    <div className="pl-8 pt-1">
                      составили настоящий Акт о том, что нами был произведен контрольный замер глубины
                    </div>
                    <div>
                      скважины №{' '}
                      <span className="inline-block border-b border-black px-16 font-bold">BUR-26-005</span>
                    </div>

                    <div className="pl-8 pt-1">При замере установлена глубина:</div>
                    <div className="pl-20 space-y-2">
                      <div>
                        по буровому журналу{' '}
                        <span className="inline-block border-b border-black px-6 font-bold">600</span> м.
                      </div>
                      <div>
                        по контрольному замеру{' '}
                        <span className="inline-block border-b border-black px-6 font-bold">600</span> м.
                      </div>
                    </div>

                    <div className="pl-8 pt-1">
                      Разница составила{' '}
                      <span className="inline-block border-b border-black px-6 font-bold">0.0</span> м. (указать
                      причину разницы)
                    </div>

                    <div className="pt-1">
                      <div className="border-b border-black text-center font-bold pb-0.5">
                        Расхождений между буровым журналом и контрольным замером не выявлено
                      </div>
                      <div className="border-b border-black h-7"></div>
                      <div className="border-b border-black h-7"></div>
                      <div className="border-b border-black h-7"></div>
                    </div>

                    <div className="pt-4">
                      Фактическая глубина принята в{' '}
                      <span className="inline-block border-b border-black px-6 font-bold">600</span> м.
                    </div>
                  </div>

                  <div className="mt-16 space-y-7">
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Полевой геолог</span>
                        <span className="flex-1 border-b border-black text-center font-bold pb-0.5">
                          Ахметов Р.К., ст. геолог Ибраев М.Т.
                        </span>
                      </div>
                      <div className="text-center text-[11px] ml-28 mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>

                    <div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Буровой мастер</span>
                        <span className="flex-1 border-b border-black h-5"></span>
                      </div>
                      <div className="text-center text-[11px] ml-28 mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>

                    <div>
                      <div className="border-b border-black h-5"></div>
                      <div className="text-center text-[11px] mt-0.5">
                        (должность, фамилия, имя, отчество, подпись)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================
                  СТРАНИЦЫ 3 И 4 ИЗ 6: АКТ О ЗАКРЫТИИ (КОНСЕРВАЦИИ) СКВАЖИНЫ № BUR-26-005
              ================================================================= */}
              {selectedDoc === 'act-closure' && (
                <div className="space-y-6">
                  {/* Страница 3 из 6 */}
                  <div className="bg-white text-black mx-auto max-w-[794px] min-h-[1060px] shadow-2xl px-10 sm:px-16 py-12 font-serif text-[14px] leading-[1.55]">
                    <div className="text-center font-bold text-[16px]">АКТ</div>
                    <div className="text-center font-bold text-[15px]">
                      о закрытии (консервации) скважины №{' '}
                      <span className="inline-block border-b border-black px-2 font-bold">BUR-26-005</span>
                    </div>

                    <div className="text-right mt-3 text-[13px]">
                      « <span className="inline-block border-b border-black px-2 font-bold">18</span> »{' '}
                      <span className="inline-block border-b border-black px-7 font-bold">мая</span> 2026г.
                    </div>

                    <div className="mt-4">
                      <div className="border-b border-black text-center font-bold text-[14px] pb-0.5">
                        Центральный рудный штокверк
                      </div>
                      <div className="text-center text-[11px] leading-tight mt-0.5">
                        (месторождение, участок работ)
                      </div>
                    </div>

                    <div className="mt-5 space-y-2.5">
                      <div>Мы нижеподписавшиеся члены комиссии в составе:</div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Полевой геолог</span>
                        <span className="flex-1 border-b border-black text-center font-bold pb-0.5">
                          Ахметов Р.К., ст. геолог Ибраев М.Т.
                        </span>
                      </div>
                      <div>
                        <div className="flex items-end gap-2">
                          <span className="shrink-0">Буровой мастер</span>
                          <span className="flex-1 border-b border-black h-5"></span>
                        </div>
                        <div className="text-center text-[11px] mt-0.5">
                          (должность, фамилия, имя, отчество)
                        </div>
                      </div>

                      <div className="pt-1">составили настоящий акт о нижеследующем:</div>

                      <div>
                        1. Бурение скважины №{' '}
                        <span className="inline-block border-b border-black px-2 font-bold">BUR-26-005</span>{' '}
                        заложенной « <span className="inline-block border-b border-black px-2 font-bold">25</span> »{' '}
                        <span className="inline-block border-b border-black px-4 font-bold">апреля</span> 2026г.
                      </div>

                      <div>
                        Прекращено « <span className="inline-block border-b border-black px-2 font-bold">18</span> »{' '}
                        <span className="inline-block border-b border-black px-5 font-bold">мая</span> 2026г. по точному
                        замеру на глубине{' '}
                        <span className="inline-block border-b border-black px-5 font-bold">600</span> м.
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                        <div>
                          Начальный диаметр бурения{' '}
                          <span className="inline-block border-b border-black px-4 font-bold">112</span> мм.
                        </div>
                        <div>
                          Конечный диаметр бурения{' '}
                          <span className="inline-block border-b border-black px-4 font-bold">76</span> мм.
                        </div>
                        <div>Проектный угол наклона -80°</div>
                        <div>Проектный азимут - 135°</div>
                        <div>
                          Проектная глубина{' '}
                          <span className="inline-block border-b border-black px-6 font-bold">600</span> м.
                        </div>
                        <div>
                          Фактическая глубина{' '}
                          <span className="inline-block border-b border-black px-6 font-bold">600</span> м.
                        </div>
                      </div>

                      <div className="pt-2">
                        2. Фактические координаты привязки скважины по окончании бурения:
                      </div>
                      <div className="space-y-1.5 max-w-[260px]">
                        <div className="flex items-end">
                          <span className="w-5">X</span>
                          <span className="flex-1 border-b border-black text-center font-bold">542415.0</span>
                        </div>
                        <div className="flex items-end">
                          <span className="w-5">Y</span>
                          <span className="flex-1 border-b border-black text-center font-bold">5293105.0</span>
                        </div>
                        <div className="flex items-end">
                          <span className="w-5">Z</span>
                          <span className="flex-1 border-b border-black text-center font-bold">391.0</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        3. Тип бурового станка: <span className="font-bold">EX1200</span>
                      </div>

                      <div>
                        4. Причины закрытия скважины: выполнение геологического задания
                        <div className="border-b border-black h-4 mt-1"></div>
                      </div>

                      <div className="pt-1">
                        5. Средний выход керна по скважине:{' '}
                        <span className="inline-block border-b border-black px-4 font-bold">96</span> %, по рудной зоне:{' '}
                        <span className="inline-block border-b border-black px-4 font-bold">97</span> %
                      </div>
                      <div>
                        по вмещающим породам:{' '}
                        <span className="inline-block border-b border-black px-4 font-bold">95</span> %
                      </div>

                      <div className="pt-1">
                        Не получено необходимое количество керна на следующих интервалах:
                      </div>

                      <table className="w-full border-collapse border border-black text-[12px] mt-2">
                        <thead>
                          <tr>
                            <th colSpan={2} className="border border-black px-2 py-1.5 text-center font-normal">
                              Интервал глубин
                            </th>
                            <th rowSpan={2} className="border border-black px-2 py-1.5 text-center font-normal">
                              Установленный
                              <br />
                              минимальный %
                              <br />
                              выхода керна
                            </th>
                            <th rowSpan={2} className="border border-black px-2 py-1.5 text-center font-normal">
                              Фактический выход
                              <br />
                              керна %
                            </th>
                          </tr>
                          <tr>
                            <th className="border border-black px-2 py-1 text-center font-normal w-1/6">от</th>
                            <th className="border border-black px-2 py-1 text-center font-normal w-1/6">до</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3, 4].map((r) => (
                            <tr key={r}>
                              <td className="border border-black h-6"></td>
                              <td className="border border-black h-6"></td>
                              <td className="border border-black h-6"></td>
                              <td className="border border-black h-6"></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Страница 4 из 6 */}
                  <div className="bg-white text-black mx-auto max-w-[794px] min-h-[1060px] shadow-2xl px-10 sm:px-16 py-12 font-serif text-[14px] leading-[1.55]">
                    <div className="space-y-3">
                      <div>
                        6. Контрольные замеры глубины скважины производились на глубине{' '}
                        <span className="inline-block border-b border-black px-6 font-bold">600</span> м.
                      </div>

                      <div>
                        Замеры углов искривления произведены методом (прибором){' '}
                        <span className="inline-block border-b border-black px-8 font-bold">Reflex EZ-Trac</span>
                      </div>
                      <div>
                        через <span className="inline-block border-b border-black px-5 font-bold">25</span> м.
                      </div>

                      <div>
                        Каротажные работы произведены (методами){' '}
                        <span className="inline-block border-b border-black px-6 font-bold">
                          ГК, КС, ПС, кавернометрия
                        </span>
                      </div>
                      <div>
                        <span className="inline-block border-b border-black w-52"></span> до глубины{' '}
                        <span className="inline-block border-b border-black px-6 font-bold">600</span> м.
                      </div>

                      <div>Результаты гидрогеологических наблюдений</div>
                      <div>
                        <span className="inline-block border-b border-black pb-0.5 font-bold w-full">
                          Уровень подземных вод зафиксирован на глубине 18.5 м
                        </span>
                      </div>
                      <div className="border-b border-black h-4"></div>

                      <div className="pt-2">7. Техническая конструкция скважины:</div>
                      <table className="w-full border-collapse border border-black text-[12px]">
                        <thead>
                          <tr>
                            <th className="border border-black px-2 py-2 text-center font-normal">Диаметр бурения</th>
                            <th className="border border-black px-2 py-2 text-center font-normal">Обсажено трубами</th>
                            <th className="border border-black px-2 py-2 text-center font-normal">Оставлено труб</th>
                            <th className="border border-black px-2 py-2 text-center font-normal">
                              Данные о<br />
                              цементации
                            </th>
                            <th className="border border-black px-2 py-2 text-center font-normal">Примечание</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-black px-2 py-1.5 text-center font-bold">112 мм (0–18 м)</td>
                            <td className="border border-black px-2 py-1.5 text-center font-bold">108 мм (18 м)</td>
                            <td className="border border-black px-2 py-1.5 text-center font-bold">0 м (извлечены)</td>
                            <td className="border border-black px-2 py-1.5 text-center font-bold">Устьевая тумба</td>
                            <td className="border border-black px-2 py-1.5 text-center"></td>
                          </tr>
                          <tr>
                            <td className="border border-black px-2 py-1.5 text-center font-bold">96 мм (18–80 м)</td>
                            <td className="border border-black px-2 py-1.5 text-center font-bold">89 мм (80 м)</td>
                            <td className="border border-black px-2 py-1.5 text-center font-bold">0 м (извлечены)</td>
                            <td className="border border-black px-2 py-1.5 text-center">—</td>
                            <td className="border border-black px-2 py-1.5 text-center"></td>
                          </tr>
                          <tr>
                            <td className="border border-black px-2 py-1.5 text-center font-bold">76 мм (80–250 м)</td>
                            <td className="border border-black px-2 py-1.5 text-center font-bold">Без обсадки</td>
                            <td className="border border-black px-2 py-1.5 text-center">—</td>
                            <td className="border border-black px-2 py-1.5 text-center">—</td>
                            <td className="border border-black px-2 py-1.5 text-center"></td>
                          </tr>
                          <tr>
                            <td className="border border-black h-6"></td>
                            <td className="border border-black h-6"></td>
                            <td className="border border-black h-6"></td>
                            <td className="border border-black h-6"></td>
                            <td className="border border-black h-6"></td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="pt-2">
                        8. Керн по буровой скважине в количестве{' '}
                        <span className="inline-block border-b border-black px-5 font-bold">42</span> ящиков
                        замаркирован в соответствии с инструкцией и передан на хранение
                      </div>
                      <div>
                        <span className="inline-block border-b border-black pb-0.5 font-bold w-full">
                          кернохранилище участка Бурабай-Жалгызагаш
                        </span>
                      </div>

                      <div className="pt-1">
                        9. Устье скважины{' '}
                        <span className="border-b border-black pb-0.5 font-bold">
                          зацементировано, оборудовано репером
                        </span>{' '}
                        и закреплено{' '}
                        <span className="border-b border-black pb-0.5 font-bold">
                          металлической крышкой с маркировкой № скважины
                        </span>
                      </div>

                      <div className="pt-1">
                        10. При закрытии (консервации) данной скважины осуществлены следующие технические мероприятия:
                      </div>
                      <div>Устранение следов ГСМ, уборка мусора</div>
                      <div className="border-b border-black pb-0.5 text-center font-bold">
                        Демонтаж бурового оборудования, планировка территории
                      </div>
                      <div className="border-b border-black h-5"></div>
                    </div>

                    <div className="mt-12 space-y-7">
                      <div>
                        <div className="flex items-end gap-2">
                          <span className="shrink-0">Полевой геолог</span>
                          <span className="flex-1 border-b border-black text-center font-bold pb-0.5">
                            Ахметов Р.К., ст. геолог Ибраев М.Т.
                          </span>
                        </div>
                        <div className="text-center text-[11px] ml-28 mt-0.5">
                          (фамилия, имя, отчество, подпись)
                        </div>
                      </div>

                      <div>
                        <div className="flex items-end gap-2">
                          <span className="shrink-0">Буровой мастер</span>
                          <span className="flex-1 border-b border-black h-5"></span>
                        </div>
                        <div className="text-center text-[11px] ml-28 mt-0.5">
                          (фамилия, имя, отчество, подпись)
                        </div>
                      </div>

                      <div>
                        <div className="border-b border-black h-5"></div>
                        <div className="text-center text-[11px] mt-0.5">
                          (должность, фамилия, имя, отчество, подпись)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================
                  СТРАНИЦА 5 ИЗ 6: АКТ О РЕКУЛЬТИВАЦИИ БУРОВОЙ ПЛОЩАДКИ № BUR-26-005
              ================================================================= */}
              {selectedDoc === 'act-reclamation' && (
                <div className="bg-white text-black mx-auto max-w-[794px] min-h-[1060px] shadow-2xl px-10 sm:px-16 py-12 font-serif text-[14px] leading-[1.6]">
                  <div className="text-center font-bold text-[16px]">АКТ</div>
                  <div className="text-center font-bold text-[15px]">
                    о рекультивации буровой площадки №{' '}
                    <span className="inline-block border-b border-black px-2 font-bold">BUR-26-005</span>
                  </div>

                  <div className="text-right mt-3 text-[13px]">
                    « <span className="inline-block border-b border-black px-2 font-bold">18</span> »{' '}
                    <span className="inline-block border-b border-black px-7 font-bold">мая</span> 2026г.
                  </div>

                  <div className="mt-4">
                    <div className="border-b border-black text-center font-bold text-[14px] pb-0.5">
                      Центральный рудный штокверк
                    </div>
                    <div className="text-center text-[11px] leading-tight mt-0.5">
                      (месторождение, участок работ)
                    </div>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    <div>
                      Дата заложения скважины «{' '}
                      <span className="inline-block border-b border-black px-2 font-bold">25</span> »{' '}
                      <span className="inline-block border-b border-black px-4 font-bold">апреля</span> 2026г.
                    </div>
                    <div>
                      Дата закрытия скважины «{' '}
                      <span className="inline-block border-b border-black px-2 font-bold">18</span> »{' '}
                      <span className="inline-block border-b border-black px-5 font-bold">мая</span> 2026г.
                    </div>
                    <div>
                      Площадь буровой площадки м<sup>2</sup>{' '}
                      <span className="inline-block border-b border-black px-16 font-bold">400</span>
                    </div>

                    <div className="font-bold uppercase pt-4">МЕРОПРИЯТИЯ ПО РЕКУЛЬТИВАЦИИ</div>
                    <div className="pl-10 space-y-1.5">
                      <div>•Почвенно-растительный слой восстановлен</div>
                      <div>•Участок очищен от мусора и посторонних предметов</div>
                      <div>•Ликвидированы следы ГСМ</div>
                      <div>•Устье скважины зацементировано (при необходимости)</div>
                      <div>•Ликвидированы зумпфы</div>
                    </div>

                    <div className="pt-5">
                      <div className="text-center font-bold">
                        Работы по технической и биологической рекультивации выполнены в полном
                      </div>
                      <div className="border-b border-black pb-0.5 text-center font-bold">
                        объёме, замечаний нет.
                      </div>
                      <div className="border-b border-black h-7"></div>
                      <div className="border-b border-black h-7"></div>
                      <div className="text-center text-[11px] mt-0.5">(комментарии)</div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-6">
                    <div>Ответственный за рекультивацию</div>
                    <div>
                      <div>Буровой мастер</div>
                      <div className="border-b border-black h-6 max-w-md mx-auto"></div>
                      <div className="text-center text-[11px] mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>

                    <div>
                      <div>Полевой геолог</div>
                      <div className="border-b border-black pb-0.5 text-center font-bold max-w-md mx-auto">
                        Ахметов Р.К., ст. геолог Ибраев М.Т.
                      </div>
                      <div className="text-center text-[11px] mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>

                    <div>
                      <div>Землепользователь (при необходимости)</div>
                      <div className="border-b border-black h-6 mt-2"></div>
                      <div className="text-center text-[11px] mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                      <div className="border-b border-black h-6 mt-3"></div>
                      <div className="text-center text-[11px] mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================
                  СТРАНИЦА 6 ИЗ 6: АКТ ЗАМЕРА ИСКРИВЛЕНИЯ СКВАЖИНЫ
              ================================================================= */}
              {selectedDoc === 'act-inclinometry' && (
                <div className="bg-white text-black mx-auto max-w-[794px] min-h-[1060px] shadow-2xl px-10 sm:px-14 py-12 font-serif text-[13.5px] leading-[1.5]">
                  <div className="text-center font-bold text-[16px]">
                    Акт замера искривления скважины
                  </div>

                  <div className="flex justify-end mt-3">
                    <div className="text-center">
                      <div className="border-b border-black px-6 font-bold text-[13px]">
                        &quot; 18 &quot; мая 2026 г.
                      </div>
                      <div className="text-[10px] mt-0.5">(дата проведения измерений)</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 mt-4 text-[13px]">
                    <div className="col-span-5 space-y-5">
                      <div className="font-bold">
                        Участок работ &quot;Центральный рудный
                        <br />
                        штокверк&quot;
                      </div>
                      <div>
                        <span className="font-bold">Скважина №</span>{' '}
                        <span className="inline-block border-b border-black px-3 font-bold">BUR-26-005</span>
                      </div>
                    </div>

                    <div className="col-span-7 space-y-1">
                      <div>Заданный угол наклона скважины - -80 °</div>
                      <div>Заданный азимут бурения - 135 °</div>
                      <div>Магнитное склонение по участку - +7.5 °</div>
                      <div>Глубина забоя - 600</div>
                      <div>Диаметр скважины: 112</div>
                      <div>Тип и номер инклинометра: Reflex EZ-Trac</div>
                    </div>
                  </div>

                  <table className="w-full border-collapse border border-black text-[12px] mt-5">
                    <thead>
                      <tr>
                        <th className="border border-black px-1.5 py-1.5 text-center font-normal">
                          Номер
                          <br />
                          точек
                          <br />
                          замера
                        </th>
                        <th className="border border-black px-1.5 py-1.5 text-center font-normal">
                          Глубина
                          <br />
                          замера, м.
                        </th>
                        <th className="border border-black px-1.5 py-1.5 text-center font-normal">
                          Угол
                          <br />
                          наклона
                          <br />в<br />
                          градусах
                        </th>
                        <th className="border border-black px-1.5 py-1.5 text-center font-normal">
                          Азимут в<br />
                          градусах
                          <br />
                          (истинный)
                        </th>
                        <th className="border border-black px-1.5 py-1.5 text-center font-normal">
                          Номер
                          <br />
                          точек
                          <br />
                          замера
                        </th>
                        <th className="border border-black px-1.5 py-1.5 text-center font-normal">
                          Глубина
                          <br />
                          замера, м.
                        </th>
                        <th className="border border-black px-1.5 py-1.5 text-center font-normal">
                          Угол
                          <br />
                          наклона
                          <br />в<br />
                          градусах
                        </th>
                        <th className="border border-black px-1.5 py-1.5 text-center font-normal">
                          Азимут в<br />
                          градусах
                          <br />
                          (истинный)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {INCLINOMETRY_ROWS.map((row) => (
                        <tr key={row.n}>
                          <td className="border border-black px-2 py-1 text-center font-bold">{row.n}</td>
                          <td className="border border-black px-2 py-1 text-center font-bold">{row.depth}</td>
                          <td className="border border-black px-2 py-1 text-center font-bold">{row.dip}</td>
                          <td className="border border-black px-2 py-1 text-center font-bold">{row.az}</td>
                          <td className="border border-black px-2 py-1 text-center"></td>
                          <td className="border border-black px-2 py-1 text-center"></td>
                          <td className="border border-black px-2 py-1 text-center"></td>
                          <td className="border border-black px-2 py-1 text-center"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-6 space-y-5 text-[12px]">
                    <div className="grid grid-cols-12 items-end gap-3">
                      <div className="col-span-3">Исполнитель:</div>
                      <div className="col-span-3 text-center">
                        <div className="border-b border-black font-bold pb-0.5">геофизик-оператор</div>
                        <div className="text-[10px] mt-0.5">(должность)</div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="border-b border-black h-5"></div>
                        <div className="text-[10px] mt-0.5">(фамилия, инициалы)</div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="border-b border-black h-5"></div>
                        <div className="text-[10px] mt-0.5">(подпись)</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 items-end gap-3">
                      <div className="col-span-3">Члены комиссии:</div>
                      <div className="col-span-3 text-center">
                        <div className="border-b border-black font-bold pb-0.5">геолог</div>
                        <div className="text-[10px] mt-0.5">(должность)</div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="border-b border-black font-bold pb-0.5 leading-tight">
                          Ахметов Р.К., ст. геолог Ибраев М.Т.
                        </div>
                        <div className="text-[10px] mt-0.5">(фамилия, инициалы)</div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="border-b border-black h-5"></div>
                        <div className="text-[10px] mt-0.5">(подпись)</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 items-end gap-3">
                      <div className="col-span-3"></div>
                      <div className="col-span-3 text-center">
                        <div className="border-b border-black font-bold pb-0.5">буровой мастер</div>
                        <div className="text-[10px] mt-0.5">(должность)</div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="border-b border-black h-5"></div>
                        <div className="text-[10px] mt-0.5">(фамилия, инициалы)</div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="border-b border-black h-5"></div>
                        <div className="text-[10px] mt-0.5">(подпись)</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================
                  НАРЯД-ЗАКАЗ ПО ПРОБАМ (СТАНДАРТЫ QA/QC)
              ================================================================= */}
              {selectedDoc === 'lab-order' && (
                <div className="bg-white text-black mx-auto max-w-[794px] min-h-[1060px] shadow-2xl px-10 sm:px-16 py-12 font-serif text-[14px] leading-relaxed">
                  <div className="flex justify-between items-start text-xs border-b border-black pb-3 mb-5">
                    <div>
                      <div className="font-bold">Участок работ: «Центральный рудный штокверк»</div>
                      <div>Скважина № BUR-26-005 (глубина 600 м)</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">Форма ЛАБ-01 (QA/QC)</div>
                      <div>Партия: BATCH-2026-014 от «18» мая 2026 г.</div>
                    </div>
                  </div>

                  <div className="text-center font-bold text-base sm:text-lg">
                    НАРЯД-ЗАКАЗ № НЗ-2026-014
                  </div>
                  <div className="text-center font-bold text-xs sm:text-sm mt-0.5 mb-5">
                    на производство лабораторно-аналитических работ (согласно стандартам QA/QC)
                  </div>

                  <table className="w-full border-collapse border border-black text-xs mb-5">
                    <tbody>
                      <tr>
                        <td className="border border-black px-3 py-1.5 w-1/3">Заказчик / Геологическая служба</td>
                        <td className="border border-black px-3 py-1.5 font-bold">
                          Полевой геолог Ахметов Р.К., ст. геолог Ибраев М.Т.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black px-3 py-1.5">Схема пробоподготовки и анализа</td>
                        <td className="border border-black px-3 py-1.5 font-bold">
                          PRP-85 (дробление до 2 мм, истирание 0,074 мм); Au — FA-AAS 50 г; Cu, Ag, Mo — ICP-AES
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black px-3 py-1.5">Контроль качества QA/QC</td>
                        <td className="border border-black px-3 py-1.5">
                          Включены стандартные образцы CRM (STD-CU-04B), холостые пробы Blank (BLK-QTZ-01) и дубликаты
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="w-full border-collapse border border-black text-xs mb-6">
                    <thead>
                      <tr>
                        <th className="border border-black px-2 py-1.5 text-left">Код пробы</th>
                        <th className="border border-black px-2 py-1.5 text-center">Тип пробы / QA/QC</th>
                        <th className="border border-black px-2 py-1.5 text-center">Масса, кг</th>
                        <th className="border border-black px-2 py-1.5 text-center">Мешок / Пломба</th>
                        <th className="border border-black px-2 py-1.5 text-left">Методика анализа</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DEMO_SAMPLES.slice(0, 10).map((s, idx) => (
                        <tr key={s.sampleId}>
                          <td className="border border-black px-2 py-1 font-mono font-bold">{s.sampleId}</td>
                          <td className="border border-black px-2 py-1 text-center">{s.sampleType}</td>
                          <td className="border border-black px-2 py-1 text-center font-mono">{s.weightKg.toFixed(2)}</td>
                          <td className="border border-black px-2 py-1 text-center font-mono">
                            {idx < 4 ? '#M-01 / SL-8841' : idx < 7 ? '#M-02 / SL-8842' : '#M-03 / SL-8843'}
                          </td>
                          <td className="border border-black px-2 py-1">FA-50 (Au) + ICP-33</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="space-y-5 text-xs sm:text-sm pt-2">
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Полевой геолог</span>
                        <span className="flex-1 border-b border-black text-center font-bold pb-0.5">
                          Ахметов Р.К., ст. геолог Ибраев М.Т.
                        </span>
                      </div>
                      <div className="text-center text-[11px] ml-28 mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Принял в лабораторию</span>
                        <span className="flex-1 border-b border-black h-5"></span>
                      </div>
                      <div className="text-center text-[11px] ml-36 mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================
                  АКТ ОТБОРА РЯДОВЫХ И КОНТРОЛЬНЫХ КЕРНОВЫХ ПРОБ
              ================================================================= */}
              {selectedDoc === 'core-sampling-act' && (
                <div className="bg-white text-black mx-auto max-w-[794px] min-h-[1060px] shadow-2xl px-10 sm:px-16 py-12 font-serif text-[14px] leading-relaxed">
                  <div className="text-center font-bold text-base sm:text-lg">АКТ</div>
                  <div className="text-center font-bold text-sm sm:text-base mt-0.5">
                    отбора рядовых и контрольных керновых проб по скважине №{' '}
                    <span className="inline-block border-b border-black px-3 font-bold">BUR-26-005</span>
                  </div>

                  <div className="text-right mt-3 text-xs sm:text-sm">
                    « <span className="inline-block border-b border-black px-2 font-bold">18</span> »{' '}
                    <span className="inline-block border-b border-black px-6 font-bold">мая</span> 2026г.
                  </div>

                  <div className="text-center mt-4 mb-5">
                    <div className="border-b border-black pb-0.5 font-bold text-sm sm:text-base max-w-xl mx-auto">
                      Центральный рудный штокверк (кернохранилище участка Бурабай-Жалгызагаш)
                    </div>
                    <div className="text-[11px] mt-0.5">(месторождение, участок работ)</div>
                  </div>

                  <p className="indent-8 mb-4 text-xs sm:text-[13px]">
                    Комиссия в составе: полевого геолога <strong>Ахметов Р.К.</strong>, ст. геолога{' '}
                    <strong>Ибраев М.Т.</strong> произвела отбор керновых проб путём продольной алмазной распиловки керна
                    скважины <strong>№ BUR-26-005</strong> (средний выход керна по рудной зоне 97%) с введением контрольных
                    проб QA/QC:
                  </p>

                  <table className="w-full border-collapse border border-black text-xs mb-6">
                    <thead>
                      <tr>
                        <th className="border border-black px-2 py-1.5 text-left">№ пробы</th>
                        <th className="border border-black px-2 py-1.5 text-center">Интервал от–до, м</th>
                        <th className="border border-black px-2 py-1.5 text-center">Длина, м</th>
                        <th className="border border-black px-2 py-1.5 text-center">Категория QA/QC</th>
                        <th className="border border-black px-2 py-1.5 text-left">Примечание</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DEMO_SAMPLES.slice(0, 10).map((s) => (
                        <tr key={s.sampleId}>
                          <td className="border border-black px-2 py-1 font-mono font-bold">{s.sampleId}</td>
                          <td className="border border-black px-2 py-1 text-center font-mono">
                            {s.from !== null && s.to !== null ? `${s.from.toFixed(1)} – ${s.to.toFixed(1)}` : 'Вставка QA/QC'}
                          </td>
                          <td className="border border-black px-2 py-1 text-center font-mono">
                            {s.length !== null ? s.length.toFixed(1) : '—'}
                          </td>
                          <td className="border border-black px-2 py-1 text-center font-bold">{s.sampleType}</td>
                          <td className="border border-black px-2 py-1">{s.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="space-y-5 text-xs sm:text-sm">
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Полевой геолог</span>
                        <span className="flex-1 border-b border-black text-center font-bold pb-0.5">
                          Ахметов Р.К., ст. геолог Ибраев М.Т.
                        </span>
                      </div>
                      <div className="text-center text-[11px] ml-28 mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================
                  АКТ ПРИЁМА-ПЕРЕДАЧИ ПРОБ В ЛАБОРАТОРИЮ
              ================================================================= */}
              {selectedDoc === 'sample-handover-act' && (
                <div className="bg-white text-black mx-auto max-w-[794px] min-h-[1060px] shadow-2xl px-10 sm:px-16 py-12 font-serif text-[14px] leading-relaxed">
                  <div className="text-center font-bold text-base sm:text-lg">АКТ</div>
                  <div className="text-center font-bold text-sm sm:text-base mt-0.5">
                    приёма-передачи геологических проб в лабораторию по скважине №{' '}
                    <span className="inline-block border-b border-black px-3 font-bold">BUR-26-005</span>
                  </div>

                  <div className="text-right mt-3 text-xs sm:text-sm">
                    « <span className="inline-block border-b border-black px-2 font-bold">18</span> »{' '}
                    <span className="inline-block border-b border-black px-6 font-bold">мая</span> 2026г.
                  </div>

                  <div className="text-center mt-4 mb-5">
                    <div className="border-b border-black pb-0.5 font-bold text-sm sm:text-base max-w-xl mx-auto">
                      Центральный рудный штокверк
                    </div>
                    <div className="text-[11px] mt-0.5">(месторождение, участок работ)</div>
                  </div>

                  <p className="indent-8 mb-4 text-xs sm:text-[13px]">
                    Мы нижеподписавшиеся: полевой геолог <strong>Ахметов Р.К., ст. геолог Ибраев М.Т.</strong> сдали, а
                    представитель аналитической лаборатории принял партию керновых и контрольных проб (партия{' '}
                    <strong>BATCH-2026-014</strong>) по скважине <strong>№ BUR-26-005</strong>:
                  </p>

                  <table className="w-full border-collapse border border-black text-xs mb-6">
                    <thead>
                      <tr>
                        <th className="border border-black px-2 py-1.5 text-center">№ мешка</th>
                        <th className="border border-black px-2 py-1.5 text-center">Номер пломбы</th>
                        <th className="border border-black px-2 py-1.5 text-left">Номера проб в мешке</th>
                        <th className="border border-black px-2 py-1.5 text-center">Масса брутто, кг</th>
                        <th className="border border-black px-2 py-1.5 text-center">Целостность пломб</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black px-2 py-1.5 text-center font-bold">#M-01</td>
                        <td className="border border-black px-2 py-1.5 text-center font-mono">SL-8841</td>
                        <td className="border border-black px-2 py-1.5 font-mono">S-10101 .. S-10104 (4 шт.)</td>
                        <td className="border border-black px-2 py-1.5 text-center">14.67</td>
                        <td className="border border-black px-2 py-1.5 text-center font-bold">Не нарушена</td>
                      </tr>
                      <tr>
                        <td className="border border-black px-2 py-1.5 text-center font-bold">#M-02</td>
                        <td className="border border-black px-2 py-1.5 text-center font-mono">SL-8842</td>
                        <td className="border border-black px-2 py-1.5 font-mono">S-10105 .. S-10108 (4 шт.)</td>
                        <td className="border border-black px-2 py-1.5 text-center">13.65</td>
                        <td className="border border-black px-2 py-1.5 text-center font-bold">Не нарушена</td>
                      </tr>
                      <tr>
                        <td className="border border-black px-2 py-1.5 text-center font-bold">#M-03</td>
                        <td className="border border-black px-2 py-1.5 text-center font-mono">SL-8843</td>
                        <td className="border border-black px-2 py-1.5 font-mono">S-10109 .. S-10112 (4 шт.)</td>
                        <td className="border border-black px-2 py-1.5 text-center">11.08</td>
                        <td className="border border-black px-2 py-1.5 text-center font-bold">Не нарушена</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="space-y-5 text-xs sm:text-sm">
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Сдал (полевой геолог)</span>
                        <span className="flex-1 border-b border-black text-center font-bold pb-0.5">
                          Ахметов Р.К., ст. геолог Ибраев М.Т.
                        </span>
                      </div>
                      <div className="text-center text-[11px] ml-36 mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Принял (приёмка лаборатории)</span>
                        <span className="flex-1 border-b border-black h-5"></span>
                      </div>
                      <div className="text-center text-[11px] ml-44 mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================
                  СОПРОВОДИТЕЛЬНАЯ ВЕДОМОСТЬ И ПОМЕШКОВАЯ ОПИСЬ (CoC)
              ================================================================= */}
              {selectedDoc === 'chain-of-custody' && (
                <div className="bg-white text-black mx-auto max-w-[794px] min-h-[1060px] shadow-2xl px-10 sm:px-16 py-12 font-serif text-[14px] leading-relaxed">
                  <div className="text-center font-bold text-base sm:text-lg">
                    СОПРОВОДИТЕЛЬНАЯ ВЕДОМОСТЬ (CHAIN OF CUSTODY)
                  </div>
                  <div className="text-center font-bold text-sm mt-0.5">
                    и помешковая опись проб по скважине №{' '}
                    <span className="inline-block border-b border-black px-3 font-bold">BUR-26-005</span>
                  </div>

                  <div className="text-center mt-4 mb-5">
                    <div className="border-b border-black pb-0.5 font-bold text-sm max-w-xl mx-auto">
                      Центральный рудный штокверк · Кернохранилище участка Бурабай-Жалгызагаш
                    </div>
                  </div>

                  <table className="w-full border-collapse border border-black text-xs mb-6">
                    <thead>
                      <tr>
                        <th className="border border-black px-2 py-1.5 text-left">Этап передачи</th>
                        <th className="border border-black px-2 py-1.5 text-center">Дата</th>
                        <th className="border border-black px-2 py-1.5 text-left">Ответственное лицо</th>
                        <th className="border border-black px-2 py-1.5 text-center">Статус пломб</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black px-2 py-1.5">1. Упаковка на кернохранилище Бурабай-Жалгызагаш</td>
                        <td className="border border-black px-2 py-1.5 text-center">18.05.2026</td>
                        <td className="border border-black px-2 py-1.5 font-bold">Ахметов Р.К., ст. геолог Ибраев М.Т.</td>
                        <td className="border border-black px-2 py-1.5 text-center font-bold">Опломбировано</td>
                      </tr>
                      <tr>
                        <td className="border border-black px-2 py-1.5">2. Транспортировка партии в лабораторию</td>
                        <td className="border border-black px-2 py-1.5 text-center">19.05.2026</td>
                        <td className="border border-black px-2 py-1.5">Экспедитор ГРР</td>
                        <td className="border border-black px-2 py-1.5 text-center font-bold">Без повреждений</td>
                      </tr>
                      <tr>
                        <td className="border border-black px-2 py-1.5">3. Регистрация в приёмке лаборатории</td>
                        <td className="border border-black px-2 py-1.5 text-center">19.05.2026</td>
                        <td className="border border-black px-2 py-1.5">Зав. приёмкой проб</td>
                        <td className="border border-black px-2 py-1.5 text-center font-bold">Принято</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="space-y-5 text-xs sm:text-sm">
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="shrink-0">Полевой геолог</span>
                        <span className="flex-1 border-b border-black text-center font-bold pb-0.5">
                          Ахметов Р.К., ст. геолог Ибраев М.Т.
                        </span>
                      </div>
                      <div className="text-center text-[11px] ml-28 mt-0.5">
                        (фамилия, имя, отчество, подпись)
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER
      ===================================================================== */}
      <footer className="relative z-10 bg-[#1B1510]/96 backdrop-blur-md text-[#B8A793] py-10 border-t border-[#D97706]/30">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-linear-to-br from-[#D97706] to-[#9A3412] flex items-center justify-center text-white font-mono font-bold text-sm">
              ГК
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm tracking-tight">
                ГеоКонтур · Полевая геологическая платформа
              </div>
              <div className="text-xs text-[#9E8C78]">
                Полевая документация скважин, опробование QA/QC, автоматическое формирование актов и экспорт в ГГИС
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="#hero" className="text-[#FDE68A] hover:text-white inline-flex items-center gap-1 font-medium">
              Наверх к устью разреза <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-[#5C4938]">|</span>
            <span className="font-mono text-[11px] text-[#9E8C78]">Micromine · Leapfrog Geo · Datamine · АГР 4.0</span>
          </div>
        </div>
      </footer>
    </>
  );
};
