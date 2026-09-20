'use strict';

const STORAGE_KEY = 'sdd-team-5-movie-watchlist';
const FILTERS = ['all', 'unwatched', 'watched'];

let state = {
  items: [],
  filter: 'all',
  query: '',
};

const form = document.querySelector('#item-form');
const titleInput = document.querySelector('#input-name');
const genreInput = document.querySelector('#input-genre');
const yearInput = document.querySelector('#input-year');
const searchInput = document.querySelector('#search-input');
const formError = document.querySelector('#form-error');
const summaryText = document.querySelector('#summary-text');
const filterSection = document.querySelector('#filter-section');
const itemList = document.querySelector('#item-list');
const emptyState = document.querySelector('#empty-state');
const noResults = document.querySelector('#no-results');
const clearButton = document.querySelector('#btn-clear');

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
}

function showError(message) {
  formError.textContent = message;
  formError.hidden = !message;
}

function isValidRating(rating) {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
}

function normalizeItem(item) {
  if (!item || typeof item.id !== 'string' || typeof item.title !== 'string') return null;

  const title = item.title.trim();
  if (!title) return null;

  return {
    id: item.id,
    title,
    genre: typeof item.genre === 'string' ? item.genre : '',
    releaseYear: typeof item.releaseYear === 'string' ? item.releaseYear : '',
    watched: Boolean(item.watched),
    rating: isValidRating(item.rating) ? item.rating : null,
    createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const parsed = JSON.parse(saved);
    if (!parsed || !Array.isArray(parsed.items)) throw new Error('รูปแบบข้อมูลไม่ถูกต้อง');

    state = {
      items: parsed.items.map(normalizeItem).filter(Boolean),
      filter: FILTERS.includes(parsed.filter) ? parsed.filter : 'all',
      query: typeof parsed.query === 'string' ? parsed.query : '',
    };
  } catch (error) {
    console.warn('โหลดข้อมูลเดิมไม่สำเร็จ เริ่มจากข้อมูลว่าง', error);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('บันทึกข้อมูลไม่สำเร็จ', error);
  }
}

function addItem(title, genre, releaseYear) {
  state.items.unshift({
    id: createId(),
    title,
    genre,
    releaseYear,
    watched: false,
    rating: null,
    createdAt: new Date().toISOString(),
  });
}

function getItem(id) {
  return state.items.find((item) => item.id === id);
}

function getVisibleItems() {
  const query = state.query.trim().toLocaleLowerCase();

  return state.items.filter((item) => {
    const matchesFilter = state.filter === 'all'
      || (state.filter === 'watched' && item.watched)
      || (state.filter === 'unwatched' && !item.watched);
    const matchesQuery = !query || item.title.toLocaleLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });
}

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) => (
    `<span class="${index < rating ? 'is-filled' : ''}">★</span>`
  )).join('');
}

function renderRating(item) {
  if (!item.watched) {
    return '<div class="rating"><span class="rating-hint">ดูจบแล้วจึงให้คะแนนได้</span></div>';
  }

  const buttons = Array.from({ length: 5 }, (_, index) => {
    const value = index + 1;
    return `<button type="button" class="btn btn-star ${item.rating === value ? 'is-selected' : ''}" data-action="rate" data-rating="${value}" aria-label="ให้คะแนน ${value} ดาว">${value}</button>`;
  }).join('');

  const currentRating = item.rating
    ? `<span class="rating-stars" aria-label="คะแนน ${item.rating} จาก 5 ดาว">${renderStars(item.rating)}</span>`
    : '<span class="rating-hint">ยังไม่ได้ให้คะแนน</span>';

  return `<div class="rating">${currentRating}<div class="rating-controls"><span>ให้คะแนน:</span>${buttons}</div></div>`;
}

function renderItem(item) {
  const metadata = [item.genre, item.releaseYear].filter(Boolean)
    .map((value) => `<span>${escapeHtml(value)}</span>`).join('');

  return `
    <li class="movie-card ${item.watched ? 'is-watched' : ''}" data-id="${item.id}">
      <div class="movie-card__top">
        <h2 class="movie-title">${escapeHtml(item.title)}</h2>
        <span class="status">${item.watched ? 'ดูจบแล้ว' : 'ยังไม่ได้ดู'}</span>
      </div>
      ${metadata ? `<div class="movie-card__meta">${metadata}</div>` : ''}
      ${renderRating(item)}
      <div class="movie-card__actions">
        <button type="button" class="btn" data-action="toggle">${item.watched ? 'ทำเครื่องหมายว่ายังไม่ได้ดู' : 'ทำเครื่องหมายว่าดูจบแล้ว'}</button>
        <button type="button" class="btn" data-action="edit">แก้ไข</button>
        <button type="button" class="btn btn-danger" data-action="delete">ลบ</button>
      </div>
    </li>
  `;
}

function render() {
  const visibleItems = getVisibleItems();
  const watchedCount = state.items.filter((item) => item.watched).length;
  const remainingCount = state.items.length - watchedCount;

  itemList.innerHTML = visibleItems.map(renderItem).join('');
  emptyState.hidden = state.items.length > 0;
  noResults.hidden = state.items.length === 0 || visibleItems.length > 0;
  summaryText.textContent = `ดูจบแล้ว ${watchedCount} เรื่อง · เหลืออีก ${remainingCount} เรื่อง`;
  searchInput.value = state.query;
  clearButton.disabled = watchedCount === 0;

  filterSection.querySelectorAll('.btn-filter').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.filter === state.filter);
  });

  saveState();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();

  if (!title) {
    showError('กรุณากรอกชื่อเรื่องก่อนกดเพิ่ม');
    titleInput.focus();
    return;
  }

  showError('');
  addItem(title, genreInput.value.trim(), yearInput.value.trim());
  form.reset();
  titleInput.focus();
  render();
});

itemList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  const card = event.target.closest('.movie-card');
  if (!button || !card) return;

  const item = getItem(card.dataset.id);
  if (!item) return;

  if (button.dataset.action === 'toggle') {
    item.watched = !item.watched;
  }

  if (button.dataset.action === 'delete') {
    state.items = state.items.filter((entry) => entry.id !== item.id);
  }

  if (button.dataset.action === 'edit') {
    const title = window.prompt('ชื่อเรื่อง', item.title);
    if (title === null) return;

    const nextTitle = title.trim();
    if (!nextTitle) {
      showError('ชื่อเรื่องต้องไม่ว่าง');
      return;
    }

    const genre = window.prompt('แนวหนัง', item.genre);
    item.title = nextTitle;
    if (genre !== null) item.genre = genre.trim();
    showError('');
  }

  if (button.dataset.action === 'rate' && item.watched) {
    const rating = Number(button.dataset.rating);
    if (isValidRating(rating)) item.rating = rating;
  }

  render();
});

filterSection.addEventListener('click', (event) => {
  const filter = event.target.closest('[data-filter]')?.dataset.filter;
  if (!FILTERS.includes(filter)) return;
  state.filter = filter;
  render();
});

searchInput.addEventListener('input', () => {
  state.query = searchInput.value;
  render();
});

clearButton.addEventListener('click', () => {
  const watchedCount = state.items.filter((item) => item.watched).length;
  if (!watchedCount) return;
  if (!window.confirm(`ยืนยันการลบรายการที่ดูจบแล้ว ${watchedCount} เรื่อง?`)) return;

  state.items = state.items.filter((item) => !item.watched);
  render();
});

loadState();
render();
