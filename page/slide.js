
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const totalPages = 10;
let currentPage = 1;



let slideIndex = 0;
class Flashcard {
    constructor(question_term, slidesDiv) {
      this.question_term = question_term;
      this.slidesDiv = slidesDiv;
      this.switch_ = false;
  
      this.div = document.createElement("div");
      this.div.setAttribute("class", "slide");
  
      this.div.innerHTML = `<h1 id="title">Question</h1><br><h2 id ="term">${this.question_term.question}</h2>`;
      this.slidesDiv.append(this.div);
      
      this.div.addEventListener('click', this.flipCard.bind(this));
    }
  
    flipCard() {
      const title = this.div.querySelector('#title');
      const term = this.div.querySelector('#term');
  
      if (this.switch_ == false) {
        this.switch_ = true;
        title.innerText = "Answer";
        term.innerText = this.question_term.answer;
        
      } else {
        this.switch_ = false;
        title.innerText = "Question";
        term.innerText = this.question_term.question;
        
      }
    }
  }
  
     
function showSlides() {
    fetch("https://bashamega.github.io/eduquiz/data/quiz/tiles.json")
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            const quiz = data.find((tile) => tile.name === decodeURI(window.location.href.split('?').pop()));
            const slidesDiv = document.getElementById("slides");
            slidesDiv.innerHTML = "";
            if (quiz) {
                const sets = quiz.term;
                for (const question_term of sets){
                  new Flashcard(question_term, slidesDiv)
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
    
    slideIndex --;
    showSlides()
}

const  endslide = document.getElementById('end')
