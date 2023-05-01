import {run, search} from './data/files/template-part.js'
import {json_fetch_url, url} from './data/files/vars.js'
let titles = [];
document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("search");

  inputElement.addEventListener("input", function () {
    search(inputElement)
  }) 
});
fetch(json_fetch_url)
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
        div.id = name_const.replace('%20', '_');
        div.innerHTML = `<heading>${title.name}</heading><br><br><p>Tags:   </p><a href="tag?${title.tags}"><button id='tag'>${title.tags}</button><Br><br></a><div class="choice"><a href="page?${title.name}"><button>Study</button></a><a href="quiz?${title.name}"><button >Quiz</button></a></div><div id='points'  class="${name_const} clicker"><span>o</span ><span>0</span><span>o</span></div>`;
        
        document.getElementById("container").append(div);
        div.addEventListener('mouseover', function(){
          div.classList.add('visible')
          
        })
        div.addEventListener('mouseout', function(){
          div.classList.remove('visible')
        })



      });
    }
    check()
  })
  .catch((err) => {
    console.log(err);
  });

  

function check(){
  if(window.location.href.includes("?")){
    const id_ = window.location.href.split('?').pop();
    const element = document.getElementById(id_.replace('%20', '_'));
    
    if (element) {

      
      fetch(json_fetch_url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          titles = data.map((tile) => {
            const title_ = tile.name;
            return tile;
          });
          titles.forEach((title) => {
            if (title.name == decodeURI(id_)){
              const tileHotspot = document.createElement('div');
              tileHotspot.id = 'tile_full';
              tileHotspot.innerHTML = `
                <heading>${title.name}</heading>
                <br><br>
                <p>Tags:</p>
                <a href="${url}tag?${title.tags}">
                  <button id="tagBtn">${title.tags}</button>
                </a>
                <br><br>
                <div class="btn">
                  <button class="studyBtn">Study</button>
                  <button class="quizBtn">Quiz</button>
                </div>
              `;

              // Append the tile element to the document body
              const bodyEl = document.getElementById('body');
              if (!bodyEl) {
                console.error('Cannot find element with ID "body"');
              } else {
                bodyEl.classList.add('blur');
                bodyEl.appendChild(tileHotspot);
              }
            }



          });
        }
        check()
      })
      .catch((err) => {
        console.log(err);
      });

    }
  }
  if(document.getElementById('social')){
    document.getElementById('social').parentNode.removeChild(document.getElementById('social'))

  }
  run()
}
