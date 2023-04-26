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
    fetch("data/quiz/tiles.json")
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
                tile.innerHTML = `<a href = "quiz?${title.name}"<heading>${title.name}</heading><a>`
                document.getElementById('drop').append(tile)
              }
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
        const title_ = tile.name
        return tile;
      });
      titles.forEach(title => {
        const div = document.createElement("div")
        div.id = "tile"
        div.innerHTML = `<a href="quiz?${title.name}"<heading>${title.name}</heading><br><p>Activation code: ${title.activationCode}</p><br></a><p>Tags:   </p><a href="tag?${title.tags}"><button id='tag'>${title.tags}</button></a>`
        document.getElementById('container').append(div)
        
      });
    }
  })