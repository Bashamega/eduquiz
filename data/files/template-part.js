function sidemenu(string) {
    const name_decoded = decodeURI(string);
    if(document.getElementById('menu')){
      document.getElementById('menu').parentNode.removeChild(document.getElementById('menu'))
  
    }
   
    const div =  document.createElement('div')
    div.id = 'menu'
    let content = `<a href="https://bashamega.github.io/eduquiz/quiz?${string}"><button>Open</button></a><button id="share">Share</button>`;
    div.innerHTML= content
    document.getElementById(string).getElementsByClassName('clicker')[0].appendChild(div);
    document.getElementById('share').addEventListener('click', function() {
      share(string)
    })
  
    
}
function share(string){
    const div = document.createElement('div');
    div.id = "social";
    const input = document.createElement('input');
    input.readOnly = true;
    input.value = `https://bashamega.github.io/eduquiz/?${string}`;
    document.body.append(div);
    document.getElementById('social').appendChild(input);
    
  
    const btn = document.createElement('button')
    document.getElementById("body").classList.add('blur')
    btn.innerText ='close'
    document.getElementById('social').appendChild(btn)
    btn.addEventListener('click', function(){
      document.getElementById('social').parentNode.removeChild(document.getElementById('social'))
      document.getElementById("body").classList.remove('blur')
    })
}
export function run(){
  
  for (var i = 0; i < document.getElementsByClassName('clicker').length; i++){
    const li = i 
    
    document.getElementsByClassName('clicker')[li].addEventListener('click', function() {
        sidemenu(document.getElementsByClassName('tile')[li].id);
    });
  }

}
export function search(inputElement){
  if (document.getElementById("drop")) {
    document
      .querySelector("nav")
      .removeChild(document.getElementById("drop"));
  }
  const val = inputElement.value;
  if (val == "") {
    throw Error;
  }
  const drop = document.createElement("div");
  drop.id = "drop";

  document.querySelector("nav").append(drop);
  let mydata;
  fetch("data/quiz/tiles.json")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        titles = data.map((tile) => {
          const title_ = tile.name;
          return tile;
        });
        const value = val.toLowerCase();
        titles.forEach((title) => {
          if (title.name.toLowerCase().includes(value)) {
            const tile = document.createElement("div");
            tile.innerHTML = `<a href = "quiz?${title.name}"<heading>${title.name}</heading><a>`;
            document.getElementById("drop").append(tile);
          } else {
            if (title.tags.toLowerCase().includes(value)) {
              const tile = document.createElement("div");
              tile.innerHTML = `<a href = "quiz?${title.name}"<heading>${title.name}</heading><a>`;
              document.getElementById("drop").append(tile);
            }
          }
        });
      }
    });
}