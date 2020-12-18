const Http = new XMLHttpRequest();
const url='https://api.themoviedb.org/3/movie/550?api_key=3fb7f922af46a3a269fd99898af94702';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
  }