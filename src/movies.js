import {
  renderApp,
  addMovieToList,
  inputSearch,
  clearMoviesMarkup,
  triggerMode,
} from './dom.js';

let searchLast = null;

// Функция для создания задержки
const debounceTime = (() => {
  let timer = null;

  return (cb, ms) => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    timer = setTimeout(cb, ms);
  };
})();

// Функция для получения данных с сервера
const getData = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data || !data.Search) throw Error('No data');
      return data.Search; // Получаем массив найденных фильмов
    });

const inputSearchHandler = (e) => {
  debounceTime(() => {
    const searchString = e.target.value.trim(); // Получение строки поиска без лишних пробелов

    if (searchString.length < 4 || searchString === searchLast) return;
    if (!triggerMode) clearMoviesMarkup();

    // Получение данных по запросу API
    getData(`https://www.omdbapi.com/?apikey=18b8609f&s=${searchString}`)
      .then((data) => data.forEach((movie) => addMovieToList(movie))) // Добавление фильма в список
      .catch((err) => console.log(err)); // Обработка ошибок

    searchLast = searchString; // Обновление последнего запроса
  }, 1500); // Задержка в 1.5 секунды
};

export const appInit = () => {
  renderApp();
  inputSearch.addEventListener('input', inputSearchHandler);
};
