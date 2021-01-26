import { clearNode } from '../helpers/clearContainer.js';
import { getDeclension } from '../helpers/getDeclension.js';
import { debounce } from '../helpers/debounce.js';

const dMovies = getDeclension('фильм', 'фильма', 'фильмов');

export const createView = () => {
  let timer;
  // Search list
  const resultsContainer = document.querySelector('.results__grid');
  const resultsHeading = document.querySelector('.results__heading');

  // Tags list
  const searchTags = document.querySelector('.search__tags');

  // Form
  const searchForm = document.querySelector('.search__form');
  const searchInput = document.querySelector('.search__input');

  // Spinner
  const spinner = document.querySelector('.spinner');

  // Renderers
  const renderList = (results) => {
    const list = document.createDocumentFragment();

    results.forEach((movieData) => {
      const movie = document.createElement('movie-card');

      movie.poster = movieData.poster;
      movie.title = movieData.title;
      movie.year = movieData.year;
      movie.link = movieData.link;
      movie.rating = movieData.rating;
      movie.genre = movieData.genre;

      list.appendChild(movie);
    });

    clearNode(resultsContainer);
    resultsContainer.appendChild(list);
  };

  const renderSearchList = (terms) => {
    const list = document.createDocumentFragment();

    terms.forEach((movie) => {
      const tag = document.createElement('a');
      tag.classList.add('search__tag');
      tag.href = `/?search=${movie}`;
      tag.textContent = movie;
      tag.dataset.movie = movie;

      list.appendChild(tag);
    });

    clearNode(searchTags);
    searchTags.appendChild(list);
  };

  const renderCount = (count) => {
    resultsHeading.textContent = `Нашли ${count} ${dMovies(count)}`;
  };

  const renderError = (error) => {
    resultsHeading.textContent = error;
  };

  const renderSpinner = (isLoading) => {
    spinner.style.display = isLoading ? 'flex' : 'none';
  };

  // Events
  const onSearchSubmit = (_listener) => {
    const listener = (event) => {
      //event.preventDefault();
      if(searchInput.value.trim() != '') {
        _listener(searchInput.value);
      }
     // searchInput.value = '';
    };

    const debounced_listener = debounce(listener, 300);
    searchInput.addEventListener('input', debounced_listener);

    return () => searchInput.removeEventListener('input', debounced_listener);
  };

  const onTagClick = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.classList.contains('search__tag')) {
        if (event.detail === 1) {
          timer = setTimeout(() => {
            _listener(event.target.dataset.movie);
          }, 300)
        }
      }
    };

    searchTags.addEventListener('click', listener);
    return () => searchTags.removeEventListener('click', listener);
  };

  const onTagRemove = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.classList.contains('search__tag')) {
        clearTimeout(timer);
        _listener(event.target.dataset.movie);
      }
    };

    searchTags.addEventListener('dblclick', listener);
    return () => searchTags.removeEventListener('dblclick', listener);
  };

  return {
    renderList,
    renderCount,
    renderError,
    renderSearchList,
    renderSpinner,
    onSearchSubmit,
    onTagClick,
    onTagRemove,
  };
};
