const quiz_id = decodeURI(window.location.href.split("?").pop())

fetch("../data/quiz/tiles.json")
  .then(res => res.json())
  .then(data => {
    const quiz = data.find(tile => tile.name === quiz_id)

    if (quiz) {
      document.getElementById("title").innerHTML = quiz.name

      quiz.term.forEach(slide => {
        const question_div = document.createElement("div");
        question_div.innerHTML = `<p>${slide.question}</p><br><input type='text' id="${slide.answer}">`
        document.getElementById("options").append(question_div)
      })
    }
  })