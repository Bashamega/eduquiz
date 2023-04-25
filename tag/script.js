var tag = 'none';
if (window.location.href.includes("?")){
  tag = decodeURI(window.location.href.split("?").pop());
  document.getElementById('title_tag').innerText = `Tag - ${tag}`
  document.getElementById("title").innerText = 'Tag: ' + tag
}else{
  window.location.href = "https://bashamega.github.io/eduquiz/"
}
fetch('../dat/quiz/tiles.json')
.then(res=>res.json())
.then(data=>{
    if (Array.isArray(data) && data.length > 0) {
        titles = data.map(tile=>{
          console.log(data)
          const title_ = tile.name
          console.log(title_)
          return tile;
        });
        console.log(titles)
        titles.forEach(title => {
            if (title.tags.toLowerCase() == tag){
                const div = document.createElement("div")
                div.id = "tile"
                div.innerHTML = `<a href="quiz?${title.name}"<heading>${title.name}</heading><br><p>Tags: ${title.tags}</p><a>`
                document.getElementById('container').append(div)
            }
          
        });
    }

})