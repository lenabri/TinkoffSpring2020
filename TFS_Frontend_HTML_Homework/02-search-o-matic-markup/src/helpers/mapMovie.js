export const mapMovie = (movie) => ({
  title: movie.Title,
  year: movie.Year,
  link: `https://www.imdb.com/title/${movie.imdbID}/`,
  poster: movie.Poster,
  rating: movie.Ratings.length > 0 ? movie.Ratings[0].Value : 'Нет рейтинга',
  genre: movie.Genre,
});
