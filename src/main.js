const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': '4a8c17d81315b168bae62a0dbe29bdf6',
    }
})

const Cr = (element) => document.createElement(element);

const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key='
const API_KEY = '4a8c17d81315b168bae62a0dbe29bdf6'

async function getTrendingMoviesPreview() {
    const { data } = await api('/trending/movie/day')

    const movies = data.results;

    const mainMovie = document.querySelector('.main')
    
    const mainMovieImgContainer = Cr('div')
    mainMovieImgContainer.classList = 'movie-poster__main'
    
    const mainMovieImg = Cr('img')
    mainMovieImg.setAttribute('alt', movies[0].original_title);
    mainMovieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movies[0].poster_path)
    
    const mainMovieInfoContainer = Cr('article')
    mainMovieInfoContainer.classList = 'movie-info'
    
    const mainMovieDescription = Cr('p')
    mainMovieDescription.classList = 'movie-info__description'
    mainMovieDescription.innerText = movies[0].overview

    const mainMovieVotesContainer = Cr('div');
    mainMovieVotesContainer.classList = 'votes-container'
    
    const mainMovieVotes = Cr('span')
    mainMovieVotes.classList = 'movie-info__votes'
    mainMovieVotes.innerText = movies[0].vote_average
    
    const starIcon = Cr('i')
    starIcon.classList = 'uil uil-star'
    
    const genreContainer = Cr('div')
    genreContainer.classList = 'genre-container'
    
    const mainMovieGenres = Cr('span')
    mainMovieGenres.classList = 'movie-info__genres'
    
    mainMovie.appendChild(mainMovieImgContainer)
    mainMovieImgContainer.appendChild(mainMovieImg)
    
    mainMovie.appendChild(mainMovieInfoContainer)
    
    mainMovieInfoContainer.appendChild(mainMovieDescription)
    mainMovieInfoContainer.appendChild(mainMovieVotesContainer)
    mainMovieVotesContainer.appendChild(starIcon)
    mainMovieVotesContainer.appendChild(mainMovieVotes)
    // mainMovieInfoContainer.appendChild(genreContainer)
    // genreContainer.appendChild(mainMovieGenres)
    
    movies.shift()
    movies.forEach(movie => {
        const trendingContainer = document.querySelector('.trending-movies')
        const movieContainer = Cr('div')
        movieContainer.classList = 'movie-poster'
    
        const movieImg = Cr('img')
        movieImg.setAttribute('alt', movie.original_title)
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
    
        trendingContainer.appendChild(movieContainer)
        movieContainer.appendChild(movieImg)
    });
}

async function getGenresPreview () {
    const { data } = await api('genre/movie/list')
    
    const genres = data.genres
    genres.forEach(genre => {
        const categoryContainer = document.querySelector('.genres')
        const categoryList = document.createElement('li')
        categoryList.classList = 'genre'
        categoryList.innerText = genre.name

        categoryContainer.appendChild(categoryList)
    })

    console.log(genres);
}
