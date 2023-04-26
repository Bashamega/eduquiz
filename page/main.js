var quiz_id = 'none';
if (window.location.href.includes("?")){
  quiz_id = decodeURI(window.location.href.split("?").pop());
  if (document.getElementById('title')){
    document.getElementById('title').innerHTML = `<h1>${quiz_id}</h1>`
  }
}else{
  window.location.href = "https://bashamega.github.io/eduquiz/"
}

document.getElementById('title_').innerText = `Study - ${quiz_id}`
fetch("../data/quiz/tiles.json")
  .then((res) => res.json())
  .then((data) => {
    let done = 0;
    if (Array.isArray(data) && data.length > 0) {
      const quiz = data.find((tile) => tile.name === quiz_id);
      if (quiz) {
        const sets = quiz.term;
        document.getElementById("options").innerHTML = "";
        for (question_term of sets){
          const div = document.createElement('tr')
          const td_question = document.createElement('td')
          const td_answer = document.createElement('td')
          td_question.innerText = question_term.question;
          td_answer.innerText = question_term.answer;
          div.id="term"

          document.getElementById('set_study').append(div)
          document.getElementById('term').append(td_question)
          document.getElementById('term').append(td_answer)
        }
        let +1
      }
    } else {
      window.location.href = "https://bashamega.github.io/eduquiz/"
    }
    if(done == 0){window.location.href = "https://bashamega.github.io/eduquiz/"}
  });

document.getElementById("submit").addEventListener('click', () => {
  const input = document.querySelectorAll('input')

  let score = 0;
  let correct = 0;
  let error = 0;
  for (var i = 0; i < input.length; i++) {
    const answer = input[i].name
    if (input[i].value.toLowerCase() == answer.toLowerCase()) {
      score++;
      correct++;
    } else {
      error++;
    }
  }
  localStorage.setItem('Score', String(score));
  let question = correct + error

  document.getElementById('container').style.visibility = 'hidden'
  const div = document.createElement('div');
  div.id = "congrats"
  let heading = 0;

  div.innerHTML = `<h1>Done</h1><br><h2>Score: ${correct} / ${question}</h2><br><a href="https://bashamega.github.io/eduquiz/"><button>Home</button></a>`
  document.body.append(div)
})
