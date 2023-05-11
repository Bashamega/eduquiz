
function quiz(){
    if(window.location.href.includes('?')){
        if(window.location.href.split("?").pop() ==""){
            
        }else{
            document.getElementById("content_admin").parentNode.removeChild(document.getElementById("content_admin"))
            
            const name = window.location.href.split("?").pop().replace("+", " ").split("=").pop()

            document.getElementById('quiz_maker').style.visibility = 'visible'
            document.getElementById('quiz_title').value = name 
            document.getElementById('quiz_title').setAttribute("readonly", "readonly")

        }
        
        
        
        

    }   
}

function message_error(string){
    const close = document.getElementById('close_dialog')
        close.addEventListener('click', function(){
          modal.close()
        })
    const modal = document.getElementById('error-message')
    modal.showModal()
    document.getElementById('error').innerHTML = string
}
function add(){
    const content ='<div><label for="">Question</label><input type="text" class="question"></div><div id="spacer"></div><div><label for="">Answer</label><input type="text" class="Answer"></div>'
    const row = document.createElement('div')
    row.classList.add("row")
    row.innerHTML = content

    document.getElementById("sets").appendChild(row)

}

function create(){
    
    const set =document.getElementsByClassName("row")
    const question = document.getElementsByClassName("question")
    const answer = document.getElementsByClassName("Answer")
    if(set.length > 3){
        let sets = []

        for(var i = 0; i < set.length; i++){
            if(question[i].value ==""){
                message_error('Please fill out all the required inputs')
            }
            if(answer[i].value ==""){
                message_error('Please fill out all the required inputs')
            }
            sets.push(question[i].value)
            sets.push(answer[i].value)
            

        }
        // Data to be sent to JSON file
        const terms = [];
        for(var i =0; i<set.length; i++){
            const question_= question[i].value;
            const answer_ = answer[i].value;
            terms.push({question_, answer_});
        };
        const title = document.getElementById('quiz_title').value
        const tag = document.getElementById("quiz_tags").value
        // Data to be sent to JSON file
        const data = {
        "name": title,
        "tags": tag,
        "lang": "en",
        "term": terms
        };

                    
        // Request options
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        
        // Send data to JSON file using Fetch API
        fetch('https://bashamega.github.io/eduquiz/data/quiz/tiles.json', options)
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => {message_error("Database error. <br> " + error)});        
        
    }else{
        stop()
    }
}
