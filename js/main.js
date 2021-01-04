const searchElem = document.querySelector('.search');
const deleteBtn = document.querySelector('.delete');
const container = document.querySelector('.movies-container');
const paginationElem = document.querySelector('.pagination');
const pageNumbersElem = document.querySelector('#page-numbers');
const prevPageBtn = document.querySelector('#prev-page');
const nextPageBtn = document.querySelector('#next-page');

let movies = [];
const resultsPerPage = 10;

function generatePageNumbers(keyword, currentPage, totalResults) {

  pageNumbersElem.innerHTML = '';
  let totalPages = Math.ceil(totalResults / resultsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement("a");

    if (i != currentPage) {
      pageNumber.setAttribute('href', '#');
      pageNumber.addEventListener('click', function (e) {
          search(keyword, i);
          e.preventDefault();
      });
      pageNumber.textContent = `(${i})`;
    } else {
      pageNumber.textContent = `${i}`;
    }

    pageNumbersElem.appendChild(pageNumber);
  }

  if (currentPage == 1) {
    prevPageBtn.setAttribute('disabled', 'disabled');
  } else {
    prevPageBtn.removeAttribute('disabled');
  }

  if (currentPage == totalPages) {
    nextPageBtn.setAttribute('disabled', 'disabled');
  } else {
    nextPageBtn.removeAttribute('disabled');
  }

  prevPageBtn.onclick = function (e) {
    search(keyword, currentPage - 1);
    e.preventDefault();
  };

  nextPageBtn.onclick = function (e) {
    search(keyword, currentPage + 1);
    e.preventDefault();
  };
}

function search(keyword, page = 1) {
  container.innerHTML = '';
  paginationElem.style.display = 'none';
  movies = [];
  fetch(`http://www.omdbapi.com/?s=${keyword}&apikey=e12d294b&page=${page}`)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        Promise.reject(response.statusText);
      }
    })
    .then(data => {
      if (data.Response == 'False') {
        Promise.reject(data.Error);
        throw data.Error;
      }
      return data;
    })
    .then(data => {
      paginationElem.style.display = 'flex';
      generatePageNumbers(keyword, page, data.totalResults);
      data.Search.forEach(e => {
        const movie = {
          imdbID: e.imdbID,
          Poster: e.Poster,
        };
        if (movie.Poster == 'N/A') {
          movie.Poster = 'img/poster-placeholder.png';
        }
        movies.push(movie);
      });

      movies.forEach(m => {
        findContent(m);
      });
    })
    .catch(error => {
      console.log(`Error: "${error}"`);
    });
}

function findContent(movie) {
  return fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=e12d294b`)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        Promise.reject(response.statusText);
      }
    })
    .then(data => {
      movie.Title = data.Title;
      movie.Rating = data.Ratings.length > 0 ? data.Ratings[0].Value : '0';
      movie.Plot = data.Plot;

      createImage(movie);
    })
    .catch(error => {
      console.log(`Error: "${error}"`);
    });
}

function createImage(movie) {
  const div = document.createElement("div");
  div.setAttribute("class", "movie");

  div.innerHTML = `<img src="${movie.Poster}" alt="Poster not available yet">
  <div class="content">
    <h1 class="title">${movie.Title}</h1>
    <h3 class="rank">${movie.Rating}</h3>
    <div class="description">${movie.Plot}</div>
  </div>`
  container.appendChild(div);
}

deleteBtn.addEventListener('click', function(event) {
  console.log("deletebtn");
  searchElem.value = '';
})

searchElem.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (searchElem.value !== '') {
      search(searchElem.value);
    }
  }
});

// search('galaxy');