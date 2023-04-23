const quiz_id = decodeURI(window.location.href.split("?").pop())
alert(quiz_id)
fetch("../data/quiz/tiles.json").then(res=>res.json()).then(data=>{
    if (Array.isArray(data) && data.length > 0) {
        titles = data.map(tile=>{
          console.log(data)
          const title_ = tile.name
          console.log(title_)
          return tile;
        });
        console.log(titles)
        titles.forEach(title => {
          if (title.name == quiz_id){
            document.getElementById("title").innerHTML = quiz_id
            const question = document.createElement("div");
            question.innerHTML = `<h1>${title.term1}</h1>`
          }
        });
      }
})