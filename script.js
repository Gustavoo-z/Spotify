const searchInput = document.getElementById("search-input");
const resultArtists = document.getElementById("card-result");
const resultPlaylist = document.getElementById("main__container__cards");

const titleSearch = document.querySelector('.main__title');
const subtitleSearch = document.querySelector('.main__subtitle');

function requestApi(searchTerm) {
    const url = "http://localhost:3000/artists";

    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            const filteredResults = result.filter(artist =>
                artist.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            console.log("Resultado:", filteredResults);
            displayResults(filteredResults);
        });
}

function displayResults(result) {
    resultPlaylist.classList.add('hidden');
    const artistName = document.getElementById('artist-name');
    const artistImg = document.getElementById('artist-img');

    result.forEach((element) => {
        artistName.innerText = element.name;
        artistImg.src = element.urlImg;
    })

    resultArtists.classList.remove('hidden');
}

searchInput.addEventListener('input', () => {
    
    if(searchInput.value === '') {
        titleSearch.innerText = 'Bem-vindo';
        subtitleSearch.innerText = 'Navegar por todas as seções';
    } else {
        titleSearch.innerText = 'Buscando resultados...';
        subtitleSearch.innerText = 'Melhor resultado:';
    }

    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtists.classList.add('hidden');
        return;
    }
    requestApi(searchTerm);
})