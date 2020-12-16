fetch(`http://www.omdbapi.com/?s=galaxy&apikey=e12d294b`)
  .then(response => {
    if (response.status == 200) {
      return response.json();
    } else {
      Promise.reject(response.statusText);
    }
  })
  .then(data => {
    createImage(data.Search);
  })
  .catch(error => {
    alert(`Error: "${error}"`);
  });

const movies = document.querySelectorAll(".movie");

function createImage(arrayArg) {
  for (let i = 0; i < 10; i++) {
    movies[i].firstElementChild.src = arrayArg[i].Poster;
  }
  // const ul = document.createElement("ul");
  // arrayArg.forEach(element => {
  //   const li = document.createElement("li");
  //   li.innerHTML = `<img class="fit-picture"
  //   src="${element.Poster}"
  //   alt="Grapefruit slice atop a pile of other slices">`;
  //   ul.appendChild(li);
  // })
  // const body = document.querySelector("body");
  // body.prepend(ul);
}

const search = document.querySelector('.search');
const deleteBtn = document.querySelector('.delete');

deleteBtn.addEventListener('click', function(event) {
  console.log("deletebtn");
  search.value = '';
})

search.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (search.value !== '') {
      search.innerHTML = search.value;
      search.value = '';
    }
  }
});