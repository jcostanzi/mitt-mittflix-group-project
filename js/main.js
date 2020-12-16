


function getImage(src){
  return new Promise((resolve,reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange',() => {
//      console.log(xhr);
      if(xhr.readyState === 4 && xhr.status === 200){
        resolve(JSON.parse(xhr.responseText).Search);
      }else if (xhr.readystate === 4){
        reject("the website is blank.");
      }
    })
    xhr.open('GET',src);
    xhr.send();
  })
}


const movies=document.querySelectorAll(".movie");




// const myPromise = new Promise((resolve,reject) => {
//   const xhr = new XMLHttpRequest();
//   xhr.addEventListener('readystatechange',() => {
//     console.log(xhr);
//     if(xhr.readyState === 4 && xhr.status === 200){
//       resolve(JSON.parse(xhr.responseText).Poster);
//     }else if (xhr.readystate === 4){
//       reject("the website is blank.");
//     }
//   })
//   xhr.open('GET',"http://www.omdbapi.com/?i=tt3896198&apikey=e12d294b");
//   xhr.send();
// })

getImage("http://www.omdbapi.com/?s=galaxy&apikey=e12d294b").then(result => console.log(result), error => console.log(error));
//getImage("http://www.omdbapi.com/?i=tt3896198&apikey=e12d294b").then(result =>createImage(result), error => console.log(error));
getImage("http://www.omdbapi.com/?s=galaxy&apikey=e12d294b").then(result =>createImage(result), error => console.log(error));

function createImage(arrayArg){
  for(let i=0;i<10;i++){
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