const quiz_id = decodeURI(window.location.href.split("?").pop());

fetch("../data/quiz/tiles.json")
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data) && data.length > 0) {
      const quiz = data.find((tile) => tile.name === quiz_id);
      if (quiz) {
        document.getElementById("title").innerHTML = quiz_id;
        const sets = quiz.term;
        for (const question_term of quiz.term) {
          const question_div = document.createElement("div");
          question_div.innerHTML = `<p>${question_term.question}</p><br><input type='text' name="${question_term.answer}">`;
          document.getElementById("options").append(question_div);
        }
      
      }
    }
  });
//answer
document.getElementById("submit").addEventListener('click', ()=>{
  let score ;
  let correct;
  let error;
  const input = document.querySelectorAll('input')
  for (var i = 0; i < inputs.length; i++){
    if (input[i].value.toLowerCase() == input[i].name.toLowerCase()){
      score + 1
      correct +1
    }else{
      error +1
    }
  }
  localStorage.setItem('Score', String(score))
})