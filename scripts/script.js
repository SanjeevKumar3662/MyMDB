// require("dotenv").config();

// dotenv.config();
// console.log(`api key is here -> ${process.env.API_KEY}`);

const makeMoviePoster = (type, data) => {
  const div = document.createElement("div");
  div.classList.add("card");

  const movieLink = document.createElement("a");
  movieLink.classList.add("link");

  if (type === "movie") {
    movieLink.href = `movieDetails.html?id=${data.id}`;
  } else {
    movieLink.href = `tvDetails.html?id=${data.id}`;
  }
  const posterDiv = document.createElement("div");
  posterDiv.classList.add("poster");
  movieLink.appendChild(posterDiv);
  div.appendChild(movieLink);

  const movieInfo = document.createElement("div");
  movieInfo.classList.add("movie-info");
  div.appendChild(movieInfo);

  posterDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.poster_path})`;

  if (type === "movie") {
    movieInfo.innerHTML = `<div>${data.title}</div>
    <div>Release Date: ${data.release_date}</div>`;
  } else {
    movieInfo.innerHTML = `<div>${data.name}</div>
    <div>Release Date: ${data.first_air_date}</div>`;
  }

  return div;
  // console.log(div);
};

const addMovieToDOM = (movie) => {
  const container = document.querySelector(".home-container");
  container.appendChild(movie);
};

const getPopularMovies = async () => {
  const data = await fetch(
    "https://first-backend-eight.vercel.app/popular_movies"
  );

  console.log("new async code");

  const res = await data.json();

  console.log(res.results[0]);
  const arrMovie = res.results;

  arrMovie.forEach((movie) => {
    addMovieToDOM(makeMoviePoster("movie", movie));
  });
};

const addMovieDetailsToDOM = (type, movie) => {
  //poster
  const div = document.createElement("div");
  div.classList.add("details-poster");

  div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.poster_path})`;
  div.style.position = "absolute";

  const poster = document.querySelector(".details-poster");
  poster.replaceWith(div);

  //movie-Backdrop
  const movieBackdrop = document.querySelector(".movie-Backdrop");
  movieBackdrop.style.background = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) no-repeat center/cover`;

  //description
  const detailsRight = document.querySelector(".details-right");
  if (type === "movie") {
    detailsRight.innerHTML = `<h2>${movie.title}</h2>
    
    <div>⭐${movie.vote_average}/10</div>
    <div>Release Date: ${movie.release_date}</div>
    
    <div class="description">${movie.overview}</div>
    
    <div class="genres"></div>
    
    <a href="${movie.homepage}">Visit Homepage</a>`;
  } else {
    detailsRight.innerHTML = `<h2>${movie.name}</h2>
    
    <div>⭐${movie.vote_average}/10</div>
    <div>Release Date: ${movie.first_air_date}</div>
    
    <div class="description">${movie.overview}</div>
    
    <div class="genres"></div>
    
    <a href="${movie.homepage}">Visit Homepage</a>`;
  }

  movie.genres.forEach((genre, index) => {
    const textNode = document.createTextNode(`${movie.genres[index].name}`);
    const div = document.createElement("div");
    div.appendChild(textNode);

    document.querySelector(".genres").appendChild(div);
  });
};

const getMovieDetails = async () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  console.log("id =>" + id);

  // const request = await fetch(`http://localhost:3000/movie_details/${id}`);
  const request = await fetch(`http://first-backend-eight.vercel.app/movie_details/${id}`);

  const movieID = params.get("id");

  const res = await request.json();
  console.log("new async code", res);
  addMovieDetailsToDOM("movie", res);
  // .catch((err) => console.error(err));
};

//tv shows
const getPopularTvShows = async () => {
  // const data = await fetch("http://localhost:3000/popular_tv");
  const data = await fetch("http://first-backend-eight.vercel.app/popular_tv");

  console.log("new async code");

  const res = await data.json();

  console.log(res.results[0]);
  const arrTv = res.results;

  arrTv.forEach((tv) => {
    addMovieToDOM(makeMoviePoster("tv", tv));
  });
};

const getTvDetails = async () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  console.log("TV details => " + id);

  // const request = await fetch(`http://localhost:3000/tv_details/${id}`);
  const request = await fetch(`http://first-backend-eight.vercel.app/tv_details/${id}`);

  const res = await request.json();
  console.log("new async code", res);
  addMovieDetailsToDOM("tv", res);
  // .catch((err) => console.error(err));
};

//page router
const init = () => {
  switch (window.location.pathname) {
    case "/":
      getPopularMovies();
      break;

    case "/index.html":
      getPopularMovies();
      break;

    case "/movieDetails.html":
      getMovieDetails();
      break;

    case "/tvShows.html":
      getPopularTvShows();
      break;

    case "/tvDetails.html":
      getTvDetails();
      break;
  }

  console.log(window.location.pathname);
};

addEventListener("DOMContentLoaded", init());
// init();
