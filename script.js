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
fetch("data/quiz/tiles.json")
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
      titles.forEach(title => {
        const div = document.createElement("div")
        div.id = "tile"
        div.innerHTML = `<a href="quiz?${title.name}"<heading>${title.name}</heading><br></a><div id='tags'></div>`
        document.getElementById('container').append(div)
        for (i in title.tags){
          const tagDiv = document.getElementById('tags')
          const div_ = document.createElement('span')
          div_.id = "tag"
          div_.innerHTML = `<a href='tag?${title.tag}'><p>${title.tag}</p></a>`
        }
        
      });
    }
  })