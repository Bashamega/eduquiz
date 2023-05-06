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
