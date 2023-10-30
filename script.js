const btnXhr = document.getElementById("xhrsearch");
const btnFetch = document.getElementById("fetchSearch");
const btnAsyncAwait = document.getElementById("fetchAsyncAwaitSearch");

let searchQueryElem = document.getElementById('query');
let searchResults = document.getElementById('searchResults');

const API_URL = 'https://api.giphy.com/v1/gifs/search';
const API_KEY = 'cU4sy92BScTTYGMYabEBTeienQqicIkw';

btnXhr.addEventListener('click', () => {
    searchUsingXHR(searchQueryElem.value);
});

btnFetch.addEventListener('click', () => {
    searchUsingFetch(searchQueryElem.value);
});

btnAsyncAwait.addEventListener('click', () => {
    searchUsingFetchAsyncAwait(searchQueryElem.value);
});

function searchUsingXHR(query) {
    if (!query || query.trim().length === 0) {
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            displayResults(JSON.parse(xhr.responseText));
        }
    });
    let params = "api_key=" + API_KEY + "&q=" + query + "&limit=5&rating=g";
    xhr.open('GET', API_URL + '?' + params);
    xhr.send();
}

function searchUsingFetch(query) {
    if (!query || query.trim().length === 0) {
        return;
    }

    fetch(`${API_URL}?api_key=${API_KEY}&q=${query}&limit=5&rating=g`)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error(error));
}

async function searchUsingFetchAsyncAwait(query) {
    if (!query || query.trim().length === 0) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}?api_key=${API_KEY}&q=${query}&limit=5&rating=g`);
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error(error);
    }
}

function displayResults(data) {
    
    searchResults.innerHTML = '';

    
    if (data.data.length === 0) {
        searchResults.innerHTML = 'No results found.';
        return;
    }

   
    data.data.forEach(gif => {
       
        const imgElement = document.createElement('img');
        imgElement.src = gif.images.fixed_height.url;
        imgElement.alt = gif.title; 

     
        searchResults.appendChild(imgElement);
    });
}
