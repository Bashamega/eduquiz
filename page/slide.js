const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const totalPages = 10;
let currentPage = 1;

function handleNextClick() {
    currentPage++;
    if (currentPage === totalPages) {
        nextBtn.removeEventListener('click', handleNextClick);
    }else{
        next()
    }
}
function handlePrevClick() {
    currentPage--;
    if (currentPage === 1) {
        prevBtn.removeEventListener('click', handlePrevClick);
    }else{
        prev()
    }
          // do something else
}

        // Attach event listeners
nextBtn.addEventListener('click', handleNextClick());
prevBtn.addEventListener('click', handlePrevClick());

let slideIndex = 0;
    
function showSlides() {
    fetch("https://bashamega.github.io/eduquiz/data/quiz/tiles.json")
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            const quiz = data.find((tile) => tile.name === quiz_id);
            const slidesDiv = document.getElementById("slides");
            slidesDiv.innerHTML = "";
            if (quiz) {
                const sets = quiz.term;
                for (question_term of sets){
                  const div = document.createElement("div");
                  div.setAttribute("class", "slide");

                  div.innerHTML = `<h1>Question</h1><br><h2>${question_term.question}</h2>`;
                  slidesDiv.append(div);
                }

                // Add end slide
                const endSlide = document.createElement("div");
                endSlide.setAttribute("class", "slide");
                endSlide.id ="end"
                endSlide.innerHTML = "<h1>The End</h1><br><p>Thank you for taking this quiz!</p>";
                slidesDiv.append(endSlide);

              }

              const slides = slidesDiv.getElementsByClassName("slide");
              for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
              }
              slideIndex++;
              if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";

        }
    });
}
showSlides();
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
function next(){
    slideIndex + 1;
    showSlides();
}
function prev(){
    slideIndex - 1;
    showSlides()
}
prevButton.addEventListener("click", prevButton());
nextButton.addEventListener("click", nextBtn());
const  endslide = document.getElementById('end')
        