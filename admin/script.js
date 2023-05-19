const json_fetch_url = 'https://bashamega.github.io/eduquiz/data/quiz/tiles.json'
function latest(){
    let slides = 0
    fetch(json_fetch_url)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const titles = data.map((tile) => {
          const title_ = tile.name;
          return tile;
        });
        titles.forEach((title) => {
          
          const div = document.createElement("div");
          if(slides == 5){
          }else{
            div.classList.add(title.tags);
            div.classList.add('tile')
  
            const name_const = encodeURI(title.name);
            div.id = "list";
            div.innerHTML = `<heading>${title.name}</heading>`;
  
            
            document.getElementById("latest").append(div);
            slides = slides + 1
          }
          
  
  
        });
        const div = document.createElement("div");
          
  
        div.id = "";
  
        div.innerHTML = `<button>View all</button>`;
        document.getElementById("latest").append(div);
        div.addEventListener('click', function(){
          const close = document.getElementsByClassName('material-symbols-outlined')[0]
          close.addEventListener('click', function(){
            modal.close()
          })
          const modal = document.getElementById('dialog')
          modal.showModal()
          titles.forEach((title_) =>{
            const div = document.createElement("div");
            div.classList.add(title_.tags);
            div.classList.add('tile')
  
            const name_const = encodeURI(title_.name);
            div.id = "list";
            div.innerHTML = `<heading>${title_.name}</heading>`;
  
              
            modal.append(div);
            
          })
        })
  
      
      }
      
    })
    .catch((err) => {
        message_error('Error Loading')
    });
}
function default_adminview(){
  latest()
  document.getElementById('quiz_maker').parentNode.removeChild(document.getElementById('quiz_maker'))
  document.getElementById('viewsource').parentNode.removeChild(document.getElementById('viewsource'))
}
function check(){
    if(window.location.href.includes('?')){
        if(window.location.href.split("?").pop() ==""){
            default_adminview()
            
        }else{
         if(window.location.href.split("?").pop().includes("Title=")){
          document.getElementById("content_admin").parentNode.removeChild(document.getElementById("content_admin"))
          const name = window.location.href.split("?").pop().replace(/\+/g, " ").split("=").pop();
          document.getElementById('quiz_maker').style.visibility = 'visible'
          document.getElementById('quiz_title').value = name 
          document.getElementById('quiz_title').setAttribute("readonly", "readonly")
         }
         else{
          if (window.location.split("?").pop() = "view_source_code_api_key") {
            window.location.href="https://github.com/Bashamega/eduquiz"
          } else {
            default_adminview()
          }
          
         }
          
          

        }
        
        
        
        

    }else{
        default_adminview()
        
    }
}