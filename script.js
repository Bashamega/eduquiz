let titles = [];
document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("search");

  inputElement.addEventListener("input", function () {
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
  });
  
});
fetch("https://bashamega.github.io/eduquiz/data/quiz/tiles.json")
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data) && data.length > 0) {
      titles = data.map((tile) => {
        const title_ = tile.name;
        return tile;
      });
      titles.forEach((title) => {
        const div = document.createElement("div");
        
        div.classList.add(title.tags);
        div.classList.add('tile')

        const name_const = encodeURI(title.name);
        div.id = name_const;
        div.innerHTML = `<heading>${title.name}</heading><br><br><p>Tags:   </p><a href="tag?${title.tags}"><button id='tag'>${title.tags}</button><Br><br></a><div class="choice"><a href="page?${title.name}"><button>Study</button></a><a href="quiz?${title.name}"><button >Quiz</button></a></div><div id='points' onclick="sidemenu('${name_const}')" class="${name_const}"><span>o</span ><span>0</span><span>o</span></div>`;
        
        document.getElementById("container").append(div);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

  
function sidemenu(string) {
  const name_decoded = decodeURI(string);
  if(document.getElementById('menu')){
    document.getElementById('menu').parentNode.removeChild(document.getElementById('menu'))

  }
 
  const div =  document.createElement('div')
  div.id = 'menu'
  let content = `<a href="https://bashamega.github.io/eduquiz/quiz?${string}"><button>Open</button></a><button onclick="share('${string}')">Share</button>`;
  div.innerHTML= content
  document.getElementsByClassName(string)[0].appendChild(div);

  
}
function share(string){
  const div = document.createElement('div');
  div.id = "social";
  const input = document.createElement('input');
  input.readOnly = true;
  input.value = `https://bashamega.github.io/eduquiz/#${string}`;
  document.body.append(div);
  document.getElementById('social').appendChild(input);
  

  const btn = document.createElement('button')
  btn.innerText ='close'
  document.getElementById('social').appendChild(btn)
  btn.addEventListener('click', function(){
    document.getElementById('social').parentNode.removeChild(document.getElementById('social'))
  })
}

document.addEventListener('DOMContentLoaded', function() {
  if(window.location.href.includes("#")){
    const id = window.location.href.split('#').pop();
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('hover');
      
    }
  }
  if(document.getElementById('social')){
    document.getElementById('social').parentNode.removeChild(document.getElementById('social'))

  }
});
