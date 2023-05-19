

function message_error(string){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: string,
    })
}
function message_correct(string){
    Swal.fire(
        string
      )
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
            const newData = {
                name: title,
                tags: tag,
                lang: "en",
                term: terms,
            }
            fetch('add.php', {
                method: 'POST',
                body: JSON.stringify(newData), // New data to add
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              .then(response => response.json())
              .then(result => {
                message_correct('Data successfully added');
              })
              .catch(error => {
                message_error( error);
              });
            

        
              

        

    }else{
        message_error("At least 3 terms")
    }
}
