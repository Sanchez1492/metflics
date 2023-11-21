const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': '4a8c17d81315b168bae62a0dbe29bdf6',
    }
})

const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key='
const API_KEY = '4a8c17d81315b168bae62a0dbe29bdf6'

async function getTrendingMoviesPreview() {
    const { data } = await api('/trending/movie/day')

    const movies = data.results;
    

    movies.forEach(movie => {
        const trendingContainer = document.querySelector('.trending-movies')
        const movieContainer = document.createElement('div')
        movieContainer.classList = 'movie-poster'

        const movieImg = document.createElement('img')
        movieImg.setAttribute('alt', movie.original_title)
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
    
        trendingContainer.appendChild(movieContainer)
        movieContainer.appendChild(movieImg)
    });

    const mainMovie = document.querySelector('.main')

    const mainMovieImgContainer = document.createElement('div')
    mainMovieImgContainer.classList = 'movie-poster__main'

    const mainMovieImg = document.createElement('img')
    mainMovieImg.setAttribute('alt', movies[0].original_title);
    mainMovieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movies[0].poster_path)
    
    const mainMovieInfoContainer = document.createElement('article')
    mainMovieInfoContainer.classList = 'movie-info'
    
    const mainMovieDescription = document.createElement('p')
    mainMovieDescription.classList = 'movie-info__description'
    mainMovieDescription.innerText = movies[0].overview

    const mainMovieVotesContainer = document.createElement('div');
    mainMovieVotesContainer.classList = 'votes-container'
    
    const mainMovieVotes = document.createElement('span')
    mainMovieVotes.classList = 'movie-info__votes'
    mainMovieVotes.innerText = movies[0].vote_average

    const starIcon = document.createElement('i')
    starIcon.classList = 'uil uil-star'

    const genreContainer = document.createElement('div')
    genreContainer.classList = 'genre-container'

    const mainMovieGenres = document.createElement('span')
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

    console.log(movies);
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

getGenresPreview()
getTrendingMoviesPreview()