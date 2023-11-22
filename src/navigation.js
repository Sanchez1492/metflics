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
    } else {
        homePage()
    }
}

function homePage() {
    console.log('Home section');
    getGenresPreview()
    getTrendingMoviesPreview()
}

function genrePage() {
    console.log('Genre section');
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
