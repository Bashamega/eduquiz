import { run, search } from "https://bashamega.github.io/eduquiz/data/files/template-part.js";
import {json_fetch_url} from 'https://bashamega.github.io/eduquiz/data/files/vars.js'
var tag = 'none';
if (window.location.href.includes("?")){
  tag = decodeURI(window.location.href.split("?").pop());
  document.getElementById('title_tag').innerText = `Tag - ${tag}`
  
  
}else{
  window.location.href = "https://bashamega.github.io/eduquiz/"
}


fetch(json_fetch_url)
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
          div.classList.add("tile")
          const name_const = encodeURI(title.name);
          div.id = name_const.replace('%20', '_');
          div.innerHTML = `<heading id='check'>${title.name}</heading><br><br><p id="check">Tags:   </p><a href="tag?${title.tags}"><button id='tag'>${title.tags}</button><Br><br></a><div class="choice"><a href="page?${title.name}"><button>Study</button></a><a href="quiz?${title.name}"><button >Quiz</button></a></div><div id='points'  class="${name_const} clicker"><span>o</span ><span>0</span><span>o</span></div>`;
          document.getElementById("container").append(div);
          div.addEventListener('mouseover', function(){
            div.classList.add('visible')
            
          })
          div.addEventListener('mouseout', function(){
            div.classList.remove('visible')
          })
        }
        
        
      });
      if(document.getElementById('check')){
        document.getElementById('title').innerHTML = `<h1>Tags:   ${tag}</h1>`
        
      }else{
        window.location.href = "https://bashamega.github.io/eduquiz/"
      }
    }
    run()
})
let titles = [];
document.addEventListener('DOMContentLoaded', function() {
  const inputElement = document.getElementById('search');

  inputElement.addEventListener('input', function() {

    search(inputElement)
  });
});
