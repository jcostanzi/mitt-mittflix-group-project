let targetId = [];


fetch(`http://www.omdbapi.com/?s=galaxy&apikey=e12d294b`)
  .then(response => {
    if (response.status == 200) {
      return response.json();
    } else {
      Promise.reject(response.statusText);
    }
  })
  .then(data => {
    data.Search.forEach(item => targetId.push(item.imdbID));
    console.log(targetId);
    console.log(data);
    createImage(data.Search);
  })
  .catch(error => {
    alert(`Error: "${error}"`);
  });

function findcontent(imdbID){
  let information=[];
  fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=e12d294b`)
  .then(response => {
    if (response.status == 200) {
      return response.json();
    } else {
      Promise.reject(response.statusText);
    }
  })
  .then(data => {
    information.push(data.Title);
    information.push(data.Ratings[0].Value);
    information.push(data.Plot);
    console.log(information);
  })
  .catch(error => {
    alert(`Error: "${error}"`);
  });
}

function createImage(arrayArg) {
  const container = document.querySelector(".movies-container");
  arrayArg.forEach(element => {
    const div = document.createElement("div");
    div.setAttribute("class","movie");
    console.log(element);

    findcontent(element.imdbID);

    div.innerHTML = `<img src="${element.Poster}" alt="Poster not available yet">
    <div class="content">
      <h1 class="title">title:</h1>
      <h3 class="rank">rank:</h3>
      <div class="description">plot:</div>
    </div>`
    container.appendChild(div);
  })
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
