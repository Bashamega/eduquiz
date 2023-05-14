//view
function view(){
    window.location.href = "?view_source_code_api_key"
}
function view_jsfunc(){
    document.getElementById("content_admin").parentNode.removeChild(document.getElementById("content_admin"))
    document.getElementById("quiz_maker").parentNode.removeChild(document.getElementById("quiz_maker"))
    document.getElementById('viewsource').style.visibility = 'visible'
    
}