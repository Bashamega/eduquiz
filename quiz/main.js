if (window.location.href.includes("?")){
  const quiz_id = decodeURI(window.location.href.split("?").pop());
  if (document.getElementById('title')){
    document.getElementById('title').innerHTML = `<h1>${quiz_id}</h1>`
  }
}else{
  window.location.href = "https://bashamega.github.io/eduquiz/"
}



function run() {
  const quiz_id = decodeURI(window.location.href.split("?").pop());
  document.getElementById('title_').innerText = `Quiz - ${quiz_id}`
  fetch("../data/quiz/tiles.json")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const quiz = data.find((tile) => tile.name === quiz_id);
        if (quiz) {
          const sets = quiz.term;
          document.getElementById("options").innerHTML = "";
          for (const question_term of quiz.term.question) {
            const question_div = document.createElement("div");
            question_div.innerHTML = `<p>${question_term.question}</p><br><input type='text' name="q_${question_term.answer}">`;
            document.getElementById("options").append(question_div)
          }

        }
      } else {
        window.location.href = "https://bashamega.github.io/eduquiz/"
      }
    });

  document.getElementById("submit").addEventListener('click', () => {
    const input = document.querySelectorAll('input')

    let score = 0;
    let correct = 0;
    let error = 0;
    for (var i = 0; i < input.length; i++) {
      const answer = input[i].name.replace('q_', '');
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
}

console.log(run);
run();

