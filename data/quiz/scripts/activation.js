function activate(){
    const code = document.getElementById('actvationcode_input')
    fetch("https://bashamega.github.io/eduquiz/data/quiz/tiles.json")
      .then(res => res.json())
      .then(data=>{
        if (Array.isArray(data) && data.length > 0) {
          titles = data.map(tile=>{
            const title_ = tile.name
            return tile;
          });
          const value = code.value.toLowerCase()
          titles.forEach(title => {
            if (title.activationCode.toLowerCase() == (value)){
              window.open(`https://bashamega.github.io/eduquiz/quiz?${title.name}`)
            }else{
              code.style.color = 'red'
              code.style.borderBottomColor = 'black'
              
            }
            
          });
        }
    });
}