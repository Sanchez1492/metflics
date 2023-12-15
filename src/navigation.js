let page = 1
let maxPage;
let infiniteScroll;

logoContainer.addEventListener('click', () => {
    location.hash = '#home'
})

searchBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchBox.value
})

searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        location.hash = '#search=' + searchBox.value
    }
});

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
window.addEventListener('scroll', infiniteScroll, { passive: false })

function navigator () {

    if(infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false })
        infiniteScroll = undefined;
    }

    if(location.hash.startsWith('#trends')) {
        trendingPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        detailPage()
    } else if (location.hash.startsWith('#genre=')) {
        genrePage()
    } else {
        homePage()
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    searchBox.value = ""

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false })
    }
}

function homePage() {
    console.log('Home section');
    genreSection.classList.add('inactive');
    searchSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    homeSection.classList.remove('inactive');
}

function genrePage() {
    console.log('Genre section');
    homeSection.classList.add('inactive');
    searchSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    genreSection.classList.remove('inactive');

    const [_, genreInfo] = location.hash.split('=')
    const [genreId, genreName] = genreInfo.split('-')

    const sectionTitle = document.querySelector('.genre-section__title')
    sectionTitle.innerHTML = genreName
    
    getMoviesByGenre(genreId);
    infiniteScroll = getPaginatedMoviesByGenre(genreId);
}

function detailPage() {
    console.log('Movie detail section');
    homeSection.classList.add('inactive');
    searchSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    genreSection.classList.add('inactive')

    const [_, id] = location.hash.split('=')
    getMovieById(id);
}

function searchPage() {
    console.log('Search section');
    homeSection.classList.add('inactive');
    searchSection.classList.remove('inactive');
    trendingSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    genreSection.classList.add('inactive')

    const [_, query] = location.hash.split('=')
    getMoviesBySearch(query)

    infiniteScroll = getPaginatedMoviesBySearch(query)
}

function trendingPage() {
    console.log('Trending section');
    homeSection.classList.add('inactive');
    searchSection.classList.add('inactive');
    trendingSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    genreSection.classList.add('inactive')

    getTrendingMovies()
    infiniteScroll = getPaginatedTrendingMovies
}

getGenresPreview()
getTrendingMoviesPreview()
getActionMovies()
getCrimeMovies()
getHorrorMovies()
window.scrollTo(0, 0)