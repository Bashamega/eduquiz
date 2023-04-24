const quiz_id = decodeURI(window.location.href.split("?").pop());

fetch("../data/quiz/tiles.json")
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data) && data.length > 0) {
      const quiz = data.find((tile) => tile.name === quiz_id);
      if (quiz) {
        document.getElementById("title").innerHTML = quiz_id;
        for( question in quiz.term) {
          const question_div = document.createElement("div");
          question_div.innerHTML = `<p>${question.question}</p><br><input type='text' id="${question.answer}">`;
          document.getElementById("options").append(question_div);
        });
      }
    }
  });
