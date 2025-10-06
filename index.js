// Константы
const CONFIG = {
  BREAKPOINT_MOBILE: 620,
  CURRENCY_SYMBOL: '₽',
  THOUSAND_SUFFIX: 'K',
  DEFAULT_RATING: 0,
  DEFAULT_DECIMAL_PLACES: 1,
  STAR_COUNT: 5
};

// Валидаторы
const Validators = {
  isPositiveNumber: (value) => typeof value === 'number' && value >= 0,
  isArrayWithData: (array) => Array.isArray(array) && array.length > 0,
  isString: (value) => typeof value === 'string' && value.trim().length > 0,
  isInRange: (value, min, max) => value >= min && value <= max
};

// Утилиты
const Formatters = {
  formatNumber: (amount) => {
    if (!Validators.isPositiveNumber(amount)) {
      console.warn('Некорректная сумма для форматирования:', amount);
      return `0 ${CONFIG.CURRENCY_SYMBOL}`;
    }

    try {
      if (amount >= 1000000) {
        const millions = amount / 1000000;
        return `${Formatters.formatDecimal(millions)}M ${CONFIG.CURRENCY_SYMBOL}`;
      } else if (amount >= 1000) {
        const thousands = amount / 1000;
        return `${Formatters.formatDecimal(thousands)}${CONFIG.THOUSAND_SUFFIX} ${CONFIG.CURRENCY_SYMBOL}`;
      }
      
      return `${Math.round(amount)} ${CONFIG.CURRENCY_SYMBOL}`;
    } catch (error) {
      console.error('Ошибка при форматировании числа:', error);
      return `${amount} ${CONFIG.CURRENCY_SYMBOL}`;
    }
  },


  formatDecimal: (number, decimalPlaces = CONFIG.DEFAULT_DECIMAL_PLACES) => {
    const rounded = Number(number);
    return rounded.toFixed(1);
  },

  /**
   * Форматирование рейтинга
   * @param {number} rating - Рейтинг
   * @returns {string} Отформатированный рейтинг
   */
  formatRating: (rating) => {
    const validRating = Validators.isPositiveNumber(rating) ? rating : CONFIG.DEFAULT_RATING;
    
    return Formatters.formatDecimal(validRating);
  }
};

// SVG компоненты
const SVGComponents = {
  /**
   * заполненные звезды
   */
  fullStar: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clip-path="url(#clip0_1_17)">
        <path d="M7.68334 1.53C7.71255 1.47097 7.75769 1.42129 7.81364 1.38655C7.86959 1.35181 7.93414 1.3334 8.00001 1.3334C8.06587 1.3334 8.13042 1.35181 8.18637 1.38655C8.24232 1.42129 8.28746 1.47097 8.31667 1.53L9.85667 4.64933C9.95812 4.85465 10.1079 5.03227 10.2931 5.16697C10.4783 5.30167 10.6934 5.38941 10.92 5.42267L14.364 5.92667C14.4293 5.93612 14.4906 5.96365 14.541 6.00613C14.5914 6.04862 14.629 6.10437 14.6494 6.16707C14.6697 6.22978 14.6722 6.29694 14.6564 6.36096C14.6406 6.42498 14.6072 6.4833 14.56 6.52933L12.0693 8.95467C11.9051 9.11474 11.7822 9.31232 11.7112 9.53042C11.6403 9.74852 11.6234 9.98059 11.662 10.2067L12.25 13.6333C12.2615 13.6986 12.2545 13.7657 12.2297 13.8271C12.2049 13.8885 12.1633 13.9417 12.1097 13.9807C12.0561 14.0196 11.9927 14.0427 11.9266 14.0473C11.8605 14.0519 11.7945 14.0378 11.736 14.0067L8.65734 12.388C8.45448 12.2815 8.22879 12.2258 7.99967 12.2258C7.77055 12.2258 7.54486 12.2815 7.342 12.388L4.264 14.0067C4.20556 14.0376 4.1396 14.0515 4.07364 14.0468C4.00767 14.0421 3.94435 14.019 3.89087 13.9801C3.83739 13.9412 3.79589 13.8881 3.77111 13.8268C3.74632 13.7655 3.73924 13.6985 3.75067 13.6333L4.338 10.2073C4.3768 9.98116 4.35999 9.74893 4.28903 9.5307C4.21807 9.31246 4.09508 9.11477 3.93067 8.95467L1.44 6.53C1.3924 6.48402 1.35867 6.4256 1.34265 6.36138C1.32663 6.29717 1.32896 6.22975 1.34939 6.16679C1.36982 6.10384 1.40752 6.04789 1.45819 6.00532C1.50886 5.96275 1.57047 5.93527 1.636 5.926L5.07934 5.42267C5.30618 5.38967 5.5216 5.30204 5.70706 5.16733C5.89252 5.03261 6.04247 4.85485 6.144 4.64933L7.68334 1.53Z" fill="#F3BB44" stroke="#F3BB44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_1_17">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>`,

  /**
   * пустые звезды
   */
  emptyStar: `
    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.68335 1.43381C7.71257 1.37478 7.7577 1.3251 7.81366 1.29036C7.86961 1.25562 7.93416 1.23721 8.00002 1.23721C8.06588 1.23721 8.13043 1.25562 8.18639 1.29036C8.24234 1.3251 8.28747 1.37478 8.31669 1.43381L9.85669 4.55314C9.95814 4.75845 10.1079 4.93608 10.2931 5.07078C10.4783 5.20547 10.6934 5.29322 10.92 5.32648L14.364 5.83048C14.4293 5.83993 14.4906 5.86746 14.541 5.90994C14.5914 5.95243 14.629 6.00817 14.6494 6.07088C14.6698 6.13359 14.6722 6.20075 14.6564 6.26477C14.6406 6.32879 14.6072 6.38711 14.56 6.43314L12.0694 8.85848C11.9051 9.01854 11.7822 9.21613 11.7112 9.43423C11.6403 9.65233 11.6234 9.8844 11.662 10.1105L12.25 13.5371C12.2615 13.6024 12.2545 13.6695 12.2297 13.7309C12.2049 13.7923 12.1633 13.8455 12.1097 13.8845C12.0561 13.9234 11.9927 13.9465 11.9266 13.9511C11.8605 13.9557 11.7945 13.9416 11.736 13.9105L8.65735 12.2918C8.4545 12.1853 8.22881 12.1296 7.99969 12.1296C7.77057 12.1296 7.54488 12.1853 7.34202 12.2918L4.26402 13.9105C4.20557 13.9414 4.13962 13.9553 4.07365 13.9506C4.00769 13.946 3.94437 13.9229 3.89088 13.884C3.8374 13.8451 3.79591 13.7919 3.77112 13.7306C3.74634 13.6693 3.73926 13.6023 3.75069 13.5371L4.33802 10.1111C4.37682 9.88496 4.36001 9.65274 4.28905 9.43451C4.21808 9.21627 4.09509 9.01858 3.93069 8.85848L1.44002 6.43381C1.39242 6.38783 1.35868 6.32941 1.34266 6.26519C1.32664 6.20098 1.32898 6.13355 1.34941 6.0706C1.36983 6.00765 1.40753 5.9517 1.4582 5.90913C1.50888 5.86656 1.57049 5.83907 1.63602 5.82981L5.07935 5.32648C5.30619 5.29348 5.52161 5.20585 5.70708 5.07113C5.89254 4.93642 6.04249 4.75866 6.14402 4.55314L7.68335 1.43381Z" fill="#F6F6F6" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

  /**
   * бонусы
   */
  bonusIcon: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.26953 8.77109V14.7086H3.05273C2.27051 14.7084 1.63677 14.0739 1.63672 13.2916V8.77109H7.26953ZM14.3643 13.2916C14.3642 14.074 13.7296 14.7086 12.9473 14.7086H8.54395V8.77109H14.3643V13.2916ZM9.32031 1.34921C10.3583 0.687889 11.7361 0.992935 12.3975 2.03085C13.0586 3.06889 12.7528 4.44667 11.7148 5.108C11.6855 5.12669 11.6538 5.1434 11.6221 5.16171H14.292C14.6832 5.16171 15 5.4795 15 5.8707V7.00742C15 7.20472 14.9084 7.3789 14.7676 7.4957H8.54395V5.03867H7.26953V7.4957H1.23242C1.09152 7.37889 1.00003 7.20459 1 7.00742V5.8707C1 5.4796 1.31696 5.16189 1.70801 5.16171H4.38086C4.34891 5.14329 4.31662 5.1268 4.28711 5.108C3.24952 4.4466 2.94448 3.06873 3.60547 2.03085C4.26673 0.993195 5.64377 0.688259 6.68164 1.34921C7.11038 1.62239 7.61868 2.1541 8.00098 2.71542C8.38323 2.15409 8.89154 1.62249 9.32031 1.34921ZM5.99707 2.42441C5.55301 2.1416 4.96358 2.27227 4.68066 2.7164C4.39797 3.16053 4.52876 3.74986 4.97266 4.03281C5.24116 4.20382 5.84235 4.41684 6.44434 4.49179C6.73918 4.52847 6.99034 4.5252 7.1709 4.48984C7.36149 4.45242 7.37828 4.40031 7.3623 4.42538C7.34719 4.44945 7.38708 4.4114 7.34082 4.22421C7.29662 4.04553 7.19215 3.81698 7.03418 3.56503C6.71183 3.051 6.26555 2.59552 5.99707 2.42441ZM11.3223 2.7164C11.0394 2.27239 10.4499 2.14174 10.0059 2.42441C9.73735 2.59558 9.2901 3.05099 8.96777 3.56503C8.80989 3.81689 8.70629 4.04559 8.66211 4.22421C8.61563 4.41224 8.65531 4.45008 8.63965 4.42538C8.62379 4.40056 8.64106 4.45247 8.83105 4.48984C9.01153 4.52527 9.26275 4.52843 9.55762 4.49179C10.1597 4.41689 10.7617 4.20384 11.0303 4.03281C11.474 3.74986 11.6048 3.16048 11.3223 2.7164Z" fill="#262F56"/>
    </svg>`,

  /**
   * отзывы
   */
  reviewIcon: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14.543 7.75537C15.0442 8.39863 15.3329 9.1486 15.333 9.95068C15.333 10.5728 15.1602 11.1645 14.8486 11.6987C14.6967 11.9591 14.8711 12.8508 15.0518 13.5767C15.1537 13.9863 14.7423 14.364 14.3438 14.2251C13.5729 13.9566 12.5805 13.6614 12.2529 13.7896C11.4777 14.0927 10.5985 14.2631 9.66699 14.2632C7.97345 14.2632 6.4544 13.6966 5.41602 12.8003C5.9271 12.8885 6.457 12.936 7 12.936C10.7681 12.9359 13.899 10.7008 14.543 7.75537Z" fill="#262F56"/>
      <path d="M13.3337 6.63465C13.3337 9.3828 10.4981 11.6106 7.00033 11.6106C6.04768 11.6106 5.14415 11.4454 4.33366 11.1493C3.95204 11.01 2.63467 11.3481 1.68826 11.6253C1.28107 11.7445 0.893237 11.3381 1.02305 10.9342C1.2726 10.1576 1.52942 9.16653 1.33366 8.85933C0.90706 8.18987 0.666992 7.43429 0.666992 6.63465C0.666992 3.88651 3.50252 1.65869 7.00033 1.65869C10.4981 1.65869 13.3337 3.88651 13.3337 6.63465Z" fill="#262F56"/>
    </svg>`
};

/**
 * Создать HTML для звезд
 * @param {number} rating - Рейтинг от 0 до 5
 * @returns {string} HTML строка со звездами
 */
function createStars(rating) {
  const validatedRating = Validators.isInRange(rating, 0, 5) ? rating : CONFIG.DEFAULT_RATING;
  
  if (window.innerWidth < CONFIG.BREAKPOINT_MOBILE) {
    return SVGComponents.fullStar;
  }

  try {
    const fullStars = Math.floor(validatedRating + 0.4);
    const emptyStars = CONFIG.STAR_COUNT - fullStars;

    const starsHtml = 
      SVGComponents.fullStar.repeat(fullStars) + 
      SVGComponents.emptyStar.repeat(emptyStars);

    return starsHtml;
  } catch (error) {
    console.error('Ошибка при создании звезд рейтинга:', error);
    return SVGComponents.emptyStar.repeat(CONFIG.STAR_COUNT);
  }
}

/**
 * Бейдж надежности
 * @param {string} badge - Тип бейджа
 * @returns {string} HTML бейджа или пустая строка
 */
function createReliabilityBadge(badge) {
  if (!Validators.isString(badge) || badge === 'none') {
    return '';
  }

  const badgeTextMap = {
    'no-bonus': 'Нет бонуса',
    'no-deposit': 'Без депозита',
    'exclusive': 'Эксклюзив'
  };

  const badgeText = badgeTextMap[badge] || 
    badge.replace(/-/g, ' ')
         .replace(/\b\w/g, c => c.toUpperCase());

  return `<span class="reliability-badge reliability-badge--${badge}">${badgeText}</span>`;
}

/**
 * Создать инфу о букмекере
 * @param {Object} item - Данные букмекера
 * @returns {string} HTML ячейки
 */
function createBookmakerCell(item) {
  const hasBonus = Validators.isPositiveNumber(item.bonus_amount) && item.bonus_amount > 0;
  const logoAlt = `Логотип букмекера ${item.id || 'Неизвестный'}`;
  const logoUrl = item.logo || '';

  return `
    <td class="rating-table__cell rating-table__cell--bookmaker">
      <div class="bookmaker-name ${!hasBonus ? 'after-none' : ''}">
        <picture>
          <source srcset="${logoUrl}" type="image/svg+xml">
          <img src="${logoUrl}" alt="${logoAlt}" loading="lazy" width="100" height="20" />
        </picture>
      </div>
    </td>`;
}

/**
 * Создать ячейку с рейтингом
 * @param {Object} item - Данные букмекера
 * @returns {string} HTML ячейки
 */
function createRatingCell(item) {
  const rating = Validators.isPositiveNumber(item.rating) ? item.rating : CONFIG.DEFAULT_RATING;
  const formattedRating = Formatters.formatRating(rating);


  return `
    <td class="rating-table__cell rating-table__cell--rating">
      <a href="#" aria-label="Рейтинг: ${formattedRating} из 5">
        ${createStars(rating)}
        ${formattedRating}
      </a>
    </td>`;
}

/**
 * Создать кол-во отзывов
 * @param {Object} item - Данные букмекера
 * @returns {string} HTML ячейки
 */
function createReviewsCell(item) {
  const reviewCount = Validators.isPositiveNumber(item.review_count) ? item.review_count : 0;

  return `
    <td class="rating-table__cell rating-table__cell--bonus">
      ${SVGComponents.reviewIcon}
      ${reviewCount}
    </td>`;
}

/**
 * Создать инфу о надежности и бонусе
 * @param {Object} item - Данные букмекера
 * @returns {string} HTML ячейки
 */
function createReliabilityCell(item) {
  const badgeHtml = createReliabilityBadge(item.badge);
  const hasBonus = Validators.isPositiveNumber(item.bonus_amount) && item.bonus_amount > 0;
  
  let bonusHtml = '';
  if (hasBonus) {
    const formattedBonus = Formatters.formatNumber(item.bonus_amount);
    bonusHtml = `
      <div class="reliability-amount">
        ${SVGComponents.bonusIcon}
        ${formattedBonus}
      </div>`;
  }

  return `
    <td class="rating-table__cell rating-table__cell--reliability">
      ${badgeHtml}
      ${bonusHtml}
    </td>`;
}

/**
 * Создать ячейку с ссылками
 * @param {Object} item - Данные букмекера
 * @returns {string} HTML ячейки
 */
function createLinksCell(item) {
  const internalLink = item.internal_link || '#';
  const externalLink = item.external_link || '#';

  return `
    <td class="rating-table__cell rating-table__cell--links">
      <a href="${internalLink}" class="btn btn--more">Обзор</a>
      <a href="${externalLink}" class="btn btn--site" target="_blank" rel="noopener noreferrer">Сайт</a>
    </td>`;
}

/**
 * Создать строку таблицы для букмекера
 * @param {Object} item - Данные букмекера
 * @returns {string} HTML строки
 */
function createTableRow(item) {
  if (!item || typeof item !== 'object') {
    console.warn('Некорректные данные для создания строки таблицы:', item);
    return '';
  }

  try {
    return `
      <tr class="rating-table__row">
        ${createBookmakerCell(item)}
        ${createRatingCell(item)}
        ${createReviewsCell(item)}
        ${createReliabilityCell(item)}
        ${createLinksCell(item)}
      </tr>`;
  } catch (error) {
    console.error('Ошибка при создании строки таблицы:', error, item);
    return '';
  }
}

/**
 * Создать HTML таблицы с рейтингом
 * @param {Array} data - Массив букмекеров
 * @returns {string} HTML таблицы
 */
function createTable(data) {
  if (!Validators.isArrayWithData(data)) {
    return '<p class="no-data-message">Нет данных для отображения</p>';
  }

  try {
    let html = '<table class="rating-table" aria-label="Рейтинг букмекеров">';
    html += '<tbody class="rating-table__body">';

    data.forEach((item, index) => {
      const rowHtml = createTableRow(item);
      if (rowHtml) {
        html += rowHtml;
      } else {
        console.warn(`Пропущена строка с индексом ${index} из-за ошибок в данных`);
      }
    });

    html += '</tbody></table>';
    return html;
  } catch (error) {
    console.error('Критическая ошибка при создании таблицы:', error);
    return '<p class="error-message">Произошла ошибка при создании таблицы</p>';
  }
}

const TAB_CONFIG = {
  byuser: 0,
  byeditors: 1,
  bybonus: 2,
  bysubrating: 3 
};

/**
 * Переключает активную вкладку
 * @param {string} type - Тип вкладки
 */
function switchTabByType(type) {
  const tabs = document.querySelectorAll('.tabs__row .tabs__cell--header');
  const index = TAB_CONFIG[type];

  if (index === undefined) {
    console.warn(`Неизвестный тип вкладки: ${type}`);
    return;
  }

  tabs.forEach((tab, i) => {
    const isSelected = i === index;
    tab.classList.toggle('selected', isSelected);
    tab.setAttribute('aria-selected', isSelected.toString());
  });
}

async function loadData(type = 'byuser') {
  const container = document.getElementById('rating-table-container');
  
  if (!container) {
    console.error('Контейнер для таблицы не найден');
    return;
  }

  try {
    container.innerHTML = '<p class="loading-message">Загрузка данных...</p>';

    const response = await fetch('data.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    switchTabByType(type);
    
    const tableData = data[type];
    if (tableData) {
      container.innerHTML = createTable(tableData);
    } else {
      container.innerHTML = '<p class="no-data-message">Нет данных для выбранного типа рейтинга</p>';
    }
  } catch (error) {
    console.error('Ошибка при загрузке или обработке данных:', error);
    container.innerHTML = '<p class="error-message">Не удалось загрузить данные рейтинга. Пожалуйста, попробуйте позже.</p>';
  }
}

/**
 * Загружает данные на основе URL параметров
 */
function loadDataFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type') || 'byuser';
  loadData(type);
}


function initializeTabHandlers() {
  const tabs = document.querySelectorAll('.tabs__row .tabs__cell--header');
  
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', function() {
      const type = Object.keys(TAB_CONFIG).find(key => TAB_CONFIG[key] === index);
      if (type) {
        loadData(type);
        

        const url = new URL(window.location);
        url.searchParams.set('type', type);
        window.history.pushState({}, '', url);
      }
    });
  });
}


function initializeApp() {
  document.addEventListener('DOMContentLoaded', function() {
    loadDataFromURL();
    initializeTabHandlers();
    

    window.addEventListener('popstate', loadDataFromURL);
  });
}

// Запуск приложения
initializeApp();