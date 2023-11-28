window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('onhashchange', navigator, false)

function navigator () {
    if(location.hash.startsWith('#trends')) {
        trendingPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        detailPage()
    } else if (location.hash.startsWith('#genre=')) {
        genrePage()
    } else if (location.hash.startsWith('#home=')) {
        homePage()
    } else {
        homePage()
    }
}

function homePage() {
    console.log('Home section');
    genreSection.classList.add('inactive');
    homeSection.classList.remove('inactive')
    getGenresPreview()
    getTrendingMoviesPreview()
}

function genrePage() {
    console.log('Genre section');
    homeSection.classList.add('inactive');
    genreSection.classList.remove('inactive')
}

function detailPage() {
    console.log('Movie detail section');
}

function searchPage() {
    console.log('Search section');
}

function trendingPage() {
    console.log('Trending section');
}
