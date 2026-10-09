import React from 'react';

const IMG_TOPSOIL_PRS = '/src/assets/images/topsoil_prs_stratum_1791465594036.jpg';
const IMG_STRATA_UPPER = '/src/assets/images/strata_upper_ochre_terracotta_1791466733185.jpg';
const IMG_SANDSTONE = '/src/assets/images/sedimentary_sandstone_stratum_1791465607641.jpg';
const IMG_STRATA_MIDDLE = '/src/assets/images/strata_middle_shale_limestone_1791466752957.jpg';
const IMG_GRANODIORITE = '/src/assets/images/granodiorite_porphyry_stratum_1791465630056.jpg';
const IMG_STOCKWORK = '/src/assets/images/ore_stockwork_quartz_stratum_1791465640677.jpg';

/**
 * Единый непрерывный фон геологического разреза на весь сайт:
 * - Тонкий верхний пласт ПРС (почвенно-растительный слой) только у самой кромки верха страницы.
 * - Деликатный минимальный блюр (1.2px) и улучшенная чёткость/микроконтраст текстуры породы.
 * - Глубокое взаимное перекрытие пластов без видимых стыков.
 */
export const ContinuousEarthBackground: React.FC = () => {
  const smoothFeatherMask =
    'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 6%, rgba(0,0,0,0.28) 14%, rgba(0,0,0,0.65) 24%, rgba(0,0,0,0.92) 34%, black 42%, black 58%, rgba(0,0,0,0.92) 66%, rgba(0,0,0,0.65) 76%, rgba(0,0,0,0.28) 86%, rgba(0,0,0,0.08) 94%, transparent 100%)';

  const topPrsFeatherMask =
    'linear-gradient(to bottom, black 0%, black 42%, rgba(0,0,0,0.85) 56%, rgba(0,0,0,0.45) 75%, transparent 100%)';

  const bottomFeatherMask =
    'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.35) 18%, rgba(0,0,0,0.72) 30%, black 44%, black 100%)';

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[#1E1712]"
    >
      {/* SVG-фильтр повышения микрорезкости и чёткости минеральной текстуры породы */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="rock-hd-clarity" colorInterpolationFilters="sRGB">
            <feConvolveMatrix
              order="3 3"
              preserveAlpha="true"
              kernelMatrix="0 -0.25 0 -0.25 2 -0.25 0 -0.25 0"
              result="sharpened"
            />
            <feGaussianBlur in="sharpened" stdDeviation="0.9" result="softened" />
            <feComponentTransfer in="softened">
              <feFuncR type="linear" slope="1.05" intercept="-0.02" />
              <feFuncG type="linear" slope="1.04" intercept="-0.02" />
              <feFuncB type="linear" slope="1.03" intercept="-0.02" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Обёртка с минимальным деликатным блюром и HD-коррекцией текстуры пород */}
      <div
        className="absolute -inset-2"
        style={{ filter: 'url(#rock-hd-clarity) saturate(1.08)' }}
      >
        {/* Базовый непрерывный цветовой градиент недр на всю высоту документа */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #3A2E21 0%, #8C6232 7%, #7C3A23 24%, #6E533B 42%, #2F3133 60%, #4E3C35 78%, #22252A 100%)'
          }}
        />

        {/* ПЛАСТ 1 (0% – 4.8% высоты сайта): Компактный пласт ПРС только у самой верхней кромки */}
        <div
          className="absolute inset-x-0 top-0 h-[4.8%] overflow-hidden"
          style={{
            maskImage: topPrsFeatherMask,
            WebkitMaskImage: topPrsFeatherMask
          }}
        >
          <img
            src={IMG_TOPSOIL_PRS}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_14%] scale-[1.01]"
          />
        </div>

        {/* ПЛАСТ 2 (1.8% – 35% высоты сайта): Золотисто-охристый песчаник и красно-терракотовая складка сразу под ПРС */}
        <div
          className="absolute inset-x-0 top-[1.8%] h-[33.2%] overflow-hidden"
          style={{
            maskImage: smoothFeatherMask,
            WebkitMaskImage: smoothFeatherMask
          }}
        >
          <img
            src={IMG_STRATA_UPPER}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-bottom scale-[1.06] origin-bottom"
          />
        </div>

        {/* ПЛАСТ 3 (22% – 56% высоты сайта): Слоистый охристо-бурый песчаник и алевролит */}
        <div
          className="absolute inset-x-0 top-[22%] h-[34%] overflow-hidden"
          style={{
            maskImage: smoothFeatherMask,
            WebkitMaskImage: smoothFeatherMask
          }}
        >
          <img
            src={IMG_SANDSTONE}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-[1.01]"
          />
        </div>

        {/* ПЛАСТ 4 (41% – 74% высоты сайта): Тонкослоистые тёмно-серые сланцы, известняк и ожелезнённый горизонт */}
        <div
          className="absolute inset-x-0 top-[41%] h-[33%] overflow-hidden"
          style={{
            maskImage: smoothFeatherMask,
            WebkitMaskImage: smoothFeatherMask
          }}
        >
          <img
            src={IMG_STRATA_MIDDLE}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-[1.01]"
          />
        </div>

        {/* ПЛАСТ 5 (59% – 89% высоты сайта): Полнокристаллический гранодиорит-порфир с кварц-халькопиритовыми жилами */}
        <div
          className="absolute inset-x-0 top-[59%] h-[30%] overflow-hidden"
          style={{
            maskImage: smoothFeatherMask,
            WebkitMaskImage: smoothFeatherMask
          }}
        >
          <img
            src={IMG_GRANODIORITE}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-[1.02]"
          />
        </div>

        {/* ПЛАСТ 6 (74% – 100% высоты сайта): Глубинный тёмный фундамент с кварц-сульфидным штокверком */}
        <div
          className="absolute inset-x-0 top-[74%] h-[26%] overflow-hidden"
          style={{
            maskImage: bottomFeatherMask,
            WebkitMaskImage: bottomFeatherMask
          }}
        >
          <img
            src={IMG_STOCKWORK}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-left-top scale-[1.08] origin-top-left"
          />
        </div>
      </div>

      {/* Тонкая микрозернистая текстура камня поверх всего полотна для тактильной детализации */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,248,235,0.7) 0.75px, transparent 0.75px), radial-gradient(rgba(20,14,10,0.8) 0.75px, transparent 0.75px)',
          backgroundSize: '14px 14px',
          backgroundPosition: '0 0, 7px 7px'
        }}
      />

      {/* Мягкое единое виньетирование по краям разреза */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(16,12,9,0.34) 0%, rgba(16,12,9,0.06) 14%, rgba(16,12,9,0.06) 86%, rgba(16,12,9,0.34) 100%)'
        }}
      />
    </div>
  );
};
