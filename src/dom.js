import { headStyle } from './utils.js';

let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;

const createElement = ({
  tag = 'div',
  attrs = {},
  container = null,
  position = 'append',
  event = null,
  handler = null,
}) => {
  const el = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'innerHTML') {
      el.innerHTML = value;
    } else {
      el.setAttribute(key, value);
    }
  });

  if (container && position === 'prepend') {
    container.prepend(el);
  }
  if (container && position === 'append') {
    container.append(el);
  }

  if (event && handler && typeof handler === 'function') {
    el.addEventListener(event, handler);
  }

  return el;
};

const createStyle = () => {
  createElement({
    tag: 'style',
    attrs: { innerHTML: headStyle },
    container: document.head,
  });
};

const createMarkup = () => {
  const container = createElement({
    attrs: { class: 'container' },
    container: document.body,
    position: 'prepend',
  });

  createElement({
    tag: 'h1',
    attrs: { innerHTML: 'Застосунок пошуку фільмів' },
    container,
  });

  const searchBox = createElement({
    attrs: { class: 'search' },
    container,
  });

  const intputBox = createElement({
    attrs: { class: 'search__group search__group--input' },
    container: searchBox,
  });

  createElement({
    tag: 'label',
    attrs: {
      class: 'search__label-input',
      for: 'search',
      innerHTML: 'Пошук фільмів',
    },
    container: intputBox,
  });

  inputSearch = createElement({
    tag: 'input',
    attrs: {
      class: 'search__input',
      id: 'search',
      type: 'search',
      placeholder: 'Почніть вводити назву фільму...',
    },
    container: intputBox,
  });

  const checkBox = createElement({
    attrs: { class: 'search__group search__group--checkbox' },
    container: searchBox,
  });

  createElement({
    tag: 'input',
    attrs: {
      class: 'search__checkbox',
      id: 'checkbox',
      type: 'checkbox',
    },
    container: checkBox,
    event: 'click',
    handler: () => {
      triggerMode = !triggerMode;
    },
  });

  createElement({
    tag: 'label',
    attrs: {
      class: 'search__label-checkbox',
      for: 'checkbox',
      innerHTML: 'Додавати фільми до вже існуючого списку',
    },
    container: checkBox,
  });

  moviesList = createElement({
    attrs: { class: 'movies' },
    container,
  });
};

export const addMovieToList = (movie) => {
  const item = createElement({
    tag: 'div',
    attrs: { class: 'movie' },
    container: moviesList,
    position: 'prepend',
  });

  createElement({
    tag: 'img',
    attrs: {
      class: 'movie__image',
      src: /(http|https):\/\//i.test(movie.Poster)
        ? movie.Poster
        : 'img/no-image.png',
      alt: `${movie.Title} ${movie.Year}`,
      title: `${movie.Title} ${movie.Year}`,
    },
    container: item,
  });
};

export const clearMoviesMarkup = () => {
  moviesList && (moviesList.innerHTML = '');
};

export const renderApp = () => {
  createMarkup();
  createStyle();
};
