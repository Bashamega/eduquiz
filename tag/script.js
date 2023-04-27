var tag = 'none';
if (window.location.href.includes("?")){
  tag = decodeURI(window.location.href.split("?").pop());
  document.getElementById('title_tag').innerText = `Tag - ${tag}`
  
  
}else{
  window.location.href = "https://bashamega.github.io/eduquiz/"
}


fetch("https://bashamega.github.io/eduquiz/data/quiz/tiles.json")
  .then(res=> res.json())
  .then(data =>{
    if (Array.isArray(data) && data.length > 0) {
      titles = data.map(tile=>{
        const title_ = tile.name
        return tile;
      });
      titles.forEach(title => {
        if(title.tags ==tag){
          const div = document.createElement("div")
          div.id = "tile"
          div.innerHTML = `<heading>${title.name}</heading><br><br><p>Tags:   </p><a id="check" href="tag?${title.tags}"><button id='tag'>${title.tags}</button><Br><br></a><div class="choice"><a href="page?${title.name}"><button>Study</button></a><a href="quiz?${title.name}"><button >Quiz</button></a></div>`
          document.getElementById('container').append(div)
        }
        
        
      });
      if(document.getElementById('check')){
        document.getElementById('title').innerHTML = `<h1>Tags:   ${tag}</h1>`
        
      }else{
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
    const drop = document.createElement("div")
    drop.id="drop"

    document.querySelector('nav').append(drop)
    let mydata;
    fetch("https://bashamega.github.io/eduquiz/data/quiz/tiles.json")
      .then(res => res.json())
      .then(data=>{
        if (Array.isArray(data) && data.length > 0) {
          titles = data.map(tile=>{
            const title_ = tile.name
            return tile;
          });
          const value = val.toLowerCase()
          titles.forEach(title => {
            if (title.name.toLowerCase().includes(value)){
              const tile = document.createElement("div")
              tile.innerHTML = `<a href = "quiz?${title.name}"<heading>${title.name}</heading><a>`
              document.getElementById('drop').append(tile)
            }else{
              if(title.tags.toLowerCase().includes(value)){
                const tile = document.createElement("div")
                tile.innerHTML = `<a href = "https://bashamega.github.io/eduquiz/quiz?${title.name}"<heading>${title.name}</heading><a>`
                document.getElementById('drop').append(tile)
              }
            }
          });
        }
      });
  });
});