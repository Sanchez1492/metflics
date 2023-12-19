//Data

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

function likedMoviesList () {
    const item = JSON.parse(localStorage.getItem('liked_movies'))
    let movies;
    

    if (item) {
        movies = item
    } else {
        movies = {}
    }

    return movies
}

function likeMovie(movie) {
    const likedMovies = likedMoviesList();

    console.log(likedMovies);

    if(likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked_movies',JSON.stringify(likedMovies))
}

//Helpers

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url)
        }
    })
})

function createMovies(movies, container, { lazyLoad = false, clean = true } = {}) {
    if(clean) {
        container.innerHTML = ""
    }
    movies.forEach(movie => {
        const movieContainer = Cr('div')
        movieContainer.classList = 'movie-poster'

        const movieImg = Cr('img')
        movieImg.setAttribute('alt', movie.original_title)
        movieImg.setAttribute(lazyLoad? 'data-img' : 'src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
        movieImg.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id
        })
    
        const movieBtn = Cr ('button')

        if(likedMoviesList()[movie.id]) {
            movieBtn.classList.add('like-btn--liked')
        }

        movieBtn.classList.add('like-btn')
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('like-btn--liked')
            likeMovie(movie)
            getFavouriteMovies()
        })

        if(lazyLoad) {
            lazyLoader.observe(movieImg)
        }

        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', '../assets/404-img-not-found.jpg')
            movieImg.style.objectFit = 'cover'
        })

        container.appendChild(movieContainer)
        movieContainer.appendChild(movieBtn)
        movieContainer.appendChild(movieImg)
    });
}

function createCategories(genres, container) {
    genres.forEach(genre => {
        const genreList = document.createElement('span')
        genreList.classList = 'genre'
        const genreName = genre.name
        genreList.innerText = genreName.replace(/%20/g, ' ');
        genreList.addEventListener('click', () => {
            location.hash = `#genre=${genre.id}-${genre.name}`
        })


        container.appendChild(genreList)
    })
}

const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key='
const API_KEY = '4a8c17d81315b168bae62a0dbe29bdf6'

async function getTrendingMoviesPreview() {
    const { data } = await api('/trending/movie/day')

    const movies = data.results;
    const mainMovie = document.querySelector('.main')
    mainMovie.innerHTML = ""

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
    
    createMovies(
        movies,
        trendingContainer,
        {
            lazyLoad : true,
            clean: true,
        })
}

async function getTrendingMovies() {
    const { data } = await api('/trending/movie/day', {
        params: {
            page: 1,
        }
    })

    const movies = data.results;
    maxPage = movies.total_pages;

    createMovies(movies,
        trendingImgContainer,
        {
            lazyLoad: false,
            clean: true
        })
}

async function getPaginatedTrendingMovies () {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight - 15
    const pageIsMax = page >= maxPage

    if(scrollIsBottom && !pageIsMax) {
        page++;
    
        const { data } = await api('/trending/movie/day', {
            params: {
                page,
            }
        })
    
        const movies = data.results;
        createMovies(movies,
            trendingImgContainer,
            {
                lazyLoad: false,
                clean: false
            }
        )
    }
}

async function getGenresPreview () {
    const { data } = await api('genre/movie/list')
    
    const genres = data.genres
    
    createCategories(genres, genreContainer)

    console.log(genres);
}

async function getMoviesByGenre(id) {
    const { data } = await api('/discover/movie?with_genres', {
        params: {
            with_genres: id,
        }
    })

    const movies = data.results;
    genreImgContainer.innerHTML = ""

    maxPage = data.total_pages

    createMovies(
        movies,
        genreImgContainer,
        {
            lazyLoad : false,
            clean: false,
        })
}

function getPaginatedMoviesByGenre (id) {
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight - 15
        const pageIsMax = page >= maxPage
    
        if(scrollIsBottom && !pageIsMax) {
            page++;
        
            const { data } = await api('/discover/movie?with_genres', {
                params: {
                    with_genres: id,
                    page,
                }
            })
        
            const movies = data.results;
    
            createMovies(movies,
                genreImgContainer,
                {
                    lazyLoad: false,
                    clean: false
                }
            )
        }
    }
}


async function getMoviesBySearch(query) {
    const { data } = await api('/search/movie', {
        params: {
            query,
        }
    })

    let decodeValue = decodeURIComponent(query)

    maxPage = data.total_pages

    const movies = data.results;
    
    if (query.length == 0) {
        searchValueTitle.innerText = 'There are no results for an empty search'
        body.style.height = '100vh';
    } else if(movies.length == 0) {
        searchImgContainer.innerHTML = ""
        searchValueTitle.innerText = 'There are no results for ' + decodeValue

        footer.style.position = 'fixed';
        footer.style.bottom = '0';
    } else {
        searchImgContainer.innerHTML = ""
        searchValueTitle.innerText = 'Results for ' + decodeValue;

        body.style.height = '';
        footer.style.position = '';
        footer.style.bottom = '';
    
        createMovies(
            movies,
            searchImgContainer,
            {
                lazyLoad : false,
                clean: false,
            })
    }
}

function getPaginatedMoviesBySearch (query) {
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight - 15
        const pageIsMax = page >= maxPage
    
        if(scrollIsBottom && !pageIsMax) {
            page++;
        
            const { data } = await api('/search/movie', {
                params: {
                    query,
                    page,
                }
            })
        
            const movies = data.results;
    
            createMovies(movies,
                searchImgContainer,
                {
                    lazyLoad: false,
                    clean: false
                }
            )
        }
    }
}

async function getActionMovies() {
    const { data } = await api('/discover/movie?with_genres', {
        params: {
            with_genres: 28,
        }
    })

    const movies = data.results;

    createMovies(
        movies,
        actionContainer,
        {
            lazyLoad : true,
            clean: true,
        })
}

async function getHorrorMovies() {
    const { data } = await api('/discover/movie?with_genres', {
        params: {
            with_genres: 27,
        }
    })

    const movies = data.results;

    createMovies(
        movies,
        horrorContainer,
        {
            lazyLoad : true,
            clean: true,
        })
}

async function getMovieById(id) {
    const { data: movie } = await api(`/movie/${id}`)
    console.log(movie);
    movieDetailTitle.innerText = movie.original_title
    moviePosterContainer.innerHTML = ""
    movieDetailGenres.innerHTML = ""
    
    const movieImg = Cr ('img');
    movieImg.setAttribute('alt', movie.original_title)
    movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path )

    movieImg.addEventListener('error', () => {
        movieImg.setAttribute('src', '../assets/404-img-not-found.jpg')
        movieImg.style.objectFit = 'cover'
        movieImg.style.height = '100%'
    })

    moviePosterContainer.appendChild(movieImg);

    movieDescription.innerText = movie.overview
    movieVotes.innerText = movie.vote_average

    createCategories(movie.genres, movieDetailGenres)

    getRelatedMoviesById(id)
}

async function getRelatedMoviesById(id) {
    const { data } = await api(`/movie/${id}/similar`)
    const movies = data.results
    relatedMoviesContainer.innerHTML = ""

    createMovies(
        movies,
        relatedMoviesContainer,
        {
            lazyLoad : true,
            clean: true,
        })

    relatedMoviesContainer.scrollTo(0, 0);
}

function getFavouriteMovies () {
    const likedMovies = likedMoviesList()
    const moviesArray = Object.values(likedMovies)

    if (moviesArray.length === 0) {
        favouriteMoviesImgContainer.innerHTML = ""
        const emptyCard = Cr ('div')
        emptyCard.classList.add('empty-card')
        const emptyCardText = Cr ('p')
        emptyCardText.innerText = 'Click the ♥ in the movie poster to add it to favourites'
        
        emptyCard.appendChild(emptyCardText)
        favouriteMoviesImgContainer.appendChild(emptyCard)
    } else {
        createMovies(moviesArray, favouriteMoviesImgContainer, { lazyLoad: true, clean: true})
    }
}