var tag = 'none';
if (window.location.href.includes("?")){
  tag = decodeURI(window.location.href.split("?").pop());
  document.getElementById('title_tag').innerText = `Tag - ${tag}`
  document.getElementById("title").innerText = 'Tag: ' + tag
}else{
  window.location.href = "https://bashamega.github.io/eduquiz/"
}


fetch("https://bashamega.github.io/eduquiz/data/quiz/tiles.json")
  .then(res=> res.json())
  .then(data =>{
    if (Array.isArray(data) && data.length > 0) {
      titles = data.map(tile=>{
        console.log(data)
        const title_ = tile.name
        console.log(title_)
        return tile;
      });
      console.log(titles)
      let done = 0;
      titles.forEach(title => {
        if(title.tags = tag){
          const div = document.createElement("div")
          div.id = "tile"
          div.innerHTML = `<a href="quiz?${title.name}"<heading>${title.name}</heading><br></a><p>Tags:   </p><a href="tag?${title.tags}"><button id='tag'>${title.tags}</button></a>`
          document.getElementById('container').append(div)
          done +1
        }
        
        
      });
      if(done = 0){
        window.location.href = "https://bashamega.github.io/eduquiz/"
      }
    }
  })
let titles = [];
document.addEventListener('DOMContentLoaded', function() {
  const inputElement = document.getElementById('search');

  inputElement.addEventListener('input', function() {

    if (document.getElementById("drop")){
      document.querySelector('nav').removeChild(document.getElementById('drop'))
    }
    const val = inputElement.value
    if (val ==""){
      throw Error
    }
    console.log(val);
    const drop = document.createElement("div")
    drop.id="drop"

    document.querySelector('nav').append(drop)
    let mydata;
    fetch("data/quiz/tiles.json")
      .then(res => res.json())
      .then(data=>{
        if (Array.isArray(data) && data.length > 0) {
          titles = data.map(tile=>{
            console.log(data)
            const title_ = tile.name
            console.log(title_)
            return tile;
          });
          console.log(titles)
          const value = val.toLowerCase()
          titles.forEach(title => {
            if (title.name.toLowerCase().includes(value)){
              const tile = document.createElement("div")
              tile.innerHTML = `<a href = "quiz?${title.name}"<heading>${title.name}</heading><a>`
              console.log(tile)
              document.getElementById('drop').append(tile)
            }
          });
        }
      });
  });
});