const searchElem = document.querySelector('.search');
const deleteBtn = document.querySelector('.delete');
const container = document.querySelector(".movies-container");

let movies = [];

function search(keyword) {
  container.innerHTML = '';
  movies = [];
  fetch(`http://www.omdbapi.com/?s=${keyword}&apikey=e12d294b`)
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
      alert(`Error: "${error}"`);
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
      movie.Rating = data.Ratings[0].Value;
      movie.Plot = data.Plot;

      createImage(movie);
    })
    .catch(error => {
      alert(`Error: "${error}"`);
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

search('galaxy');