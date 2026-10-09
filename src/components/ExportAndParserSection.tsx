import React from 'react';

interface SoftwareItem {
  id: string;
  name: string;
  vendor: string;
  category: string;
  badgeColor: string;
  badgeBg: string;
}

export const ExportAndParserSection: React.FC = () => {
  const softwareList: SoftwareItem[] = [
    {
      id: 'leapfrog',
      name: 'Leapfrog Geo',
      vendor: 'Seequent',
      category: '3D геологическое моделирование',
      badgeColor: '#15803D',
      badgeBg: '#DCFCE7'
    },
    {
      id: 'micromine',
      name: 'Micromine',
      vendor: 'Micromine Origin & Beyond',
      category: 'Горно-геологическая система (ГГИС)',
      badgeColor: '#B45309',
      badgeBg: '#FEF3C7'
    },
    {
      id: 'surpac',
      name: 'GEOVIA Surpac',
      vendor: 'Dassault Systèmes',
      category: 'Каркасное и блочное моделирование',
      badgeColor: '#1D4ED8',
      badgeBg: '#DBEAFE'
    },
    {
      id: 'datamine',
      name: 'Datamine Studio RM',
      vendor: 'Datamine',
      category: 'Подсчёт запасов и моделирование',
      badgeColor: '#BE123C',
      badgeBg: '#FFE4E6'
    },
    {
      id: 'qgis-arcgis',
      name: 'QGIS / ArcGIS Pro',
      vendor: 'ГИС-платформы',
      category: 'Картография и пространственный анализ',
      badgeColor: '#0F766E',
      badgeBg: '#CCFBF1'
    },
    {
      id: 'autocad',
      name: 'AutoCAD / Civil 3D',
      vendor: 'Autodesk / CAD',
      category: 'Маркшейдерия и чертежи (DXF)',
      badgeColor: '#6D28D9',
      badgeBg: '#EDE9FE'
    },
    {
      id: 'excel',
      name: 'Microsoft Excel (XLSX / CSV)',
      vendor: 'Табличная выгрузка',
      category: 'Готовый многолистовый Excel-файл',
      badgeColor: '#166534',
      badgeBg: '#DCFCE7'
    }
  ];

  const renderSoftwareLogo = (id: string, name: string) => {
    if (id === 'qgis-arcgis') {
      return (
        <div
          className="h-11 px-2 rounded-lg flex items-center justify-center gap-1.5 shrink-0 bg-white border border-[#C49E92]/70 shadow-xs"
          aria-hidden="true"
        >
          <img
            src="/logos/qgis.svg"
            alt="QGIS"
            className="w-6 h-6 object-contain"
            loading="lazy"
          />
          <span className="w-px h-5 bg-[#C49E92]/50" />
          <img
            src="/logos/arcgis-pro.png"
            alt="ArcGIS Pro"
            className="w-6 h-6 object-contain"
            loading="lazy"
          />
        </div>
      );
    }

    const logoMap: Record<string, { src: string; className?: string }> = {
      leapfrog: {
        src: '/logos/seequent-icon.svg',
        className: 'w-7 h-7 object-contain'
      },
      micromine: {
        src: '/logos/micromine-icon.jpg',
        className: 'w-8 h-8 object-contain rounded-sm'
      },
      surpac: {
        src: '/logos/3ds-logo.svg',
        className: 'w-9 h-7 object-contain'
      },
      datamine: {
        src: '/logos/datamine-icon.png',
        className: 'w-7 h-7 object-contain'
      },
      autocad: {
        src: '/logos/autocad-icon.svg',
        className: 'w-7 h-7 object-contain'
      },
      excel: {
        src: '/logos/excel2.svg',
        className: 'w-7 h-7 object-contain'
      }
    };

    const logo = logoMap[id];

    return (
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-white border border-[#C49E92]/70 shadow-xs p-1.5"
        aria-hidden="true"
      >
        {logo && (
          <img
            src={logo.src}
            alt={name}
            className={logo.className || 'w-7 h-7 object-contain'}
            loading="lazy"
          />
        )}
      </div>
    );
  };

  return (
    <>
      <section id="validation-docs" className="relative py-12 sm:py-16">
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="max-w-3xl space-y-1.5 bg-linear-to-r from-[#FAF4F0]/96 to-[#F3E8E2]/95 backdrop-blur-xs border border-[#C49E92] border-l-4 border-l-[#9A3412] rounded-lg p-4 sm:p-5 shadow-md">
            <p className="text-xs font-mono uppercase tracking-wider font-semibold text-[#9A3412]">
              06 · Экспорт и шаблоны под профильное ПО
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#241815]">
              Готовые шаблоны для переноса в другое ПО и выгрузка в Excel
            </h2>
            <p className="text-sm text-[#483530] leading-relaxed">
              Для переноса данных на другое программное обеспечение Geocore.vista выдаёт готовые шаблоны под выбранную программу, которые сразу можно открыть в целевом ПО, а также позволяет напрямую выгрузить сводный <strong>Excel-файл (.xlsx)</strong>.
            </p>
          </div>

          {/* Перечень программного обеспечения с мини-логотипами */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {softwareList.map((sw) => (
              <div
                key={sw.id}
                className="p-3.5 rounded-lg border bg-[#FCF9F6]/96 border-[#C49E92] hover:border-[#9A3412] transition-colors flex items-start gap-3 shadow-sm"
              >
                {renderSoftwareLogo(sw.id, sw.name)}
                <div className="min-w-0 flex-1">
                  <div className="font-display text-xs sm:text-sm font-bold text-[#241815] truncate">
                    {sw.name}
                  </div>
                  <div className="text-[11px] font-mono text-[#73564E] truncate">{sw.vendor}</div>
                  <div className="text-[11px] text-[#483530] mt-1">{sw.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
