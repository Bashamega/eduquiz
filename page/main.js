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
    if (Array.isArray(data) && data.length > 0) {
      const quiz = data.find((tile) => tile.name === quiz_id);
      if (quiz) {
        const sets = quiz.term;
        const tbody = document.getElementById("set_study");
        tbody.innerHTML = "";
        for (const question_term of sets){
          const tr = document.createElement('tr')
          const td_question = document.createElement('td')
          td_question.id="breaker"
          const td_answer = document.createElement('td')
          td_question.innerText = question_term.question;
          td_answer.innerText = question_term.answer;

          tr.appendChild(td_question);
          tr.appendChild(td_answer);
          tr.appendChild(document.createElement('hr'))
          tbody.appendChild(tr);
        }
      }
      else {
        window.location.href = "https://bashamega.github.io/eduquiz/"
      }
    } else {
      window.location.href = "https://bashamega.github.io/eduquiz/"
    }
  });
