        /*************
        SAMPLE URLS
        
        1. To get the config data like image base urls
        https://api.themoviedb.org/3/configuration?api_key=<APIKEY>
        
        2. To fetch a list of movies based on a keyword
        https://api.themoviedb.org/3/search/movie?api_key=<APIKEY>&query=<keyword>
        
        3. To fetch more details about a movie
        https://api.themoviedb.org/3/movie/<movie-id>?api_key=<APIKEY>
        *************/
        //const APIKEY is inside key.js
        let baseURL = 'https://api.themoviedb.org/3/';
        let configData = null;
        let baseImageURL = null;
        
        function myFunction() {
            var search = document.getElementById("buttonInput").value;
            var release = document.getElementById("buttonTime").value;
           // document.getElementById("demo").innerHTML = search;
            document.addEventListener('DOMContentLoaded', getConfig(search, release));
            
          }
        
       // var search = prompt("Please enter a keyword to search:");
        let getConfig = function (search, release) {
            let url = "".concat(baseURL, 'configuration?api_key=', APIKEY); 
            fetch(url)
            .then((result)=>{
                return result.json();
            })
            .then((data)=>{
                baseImageURL = data.images.secure_base_url;
                configData = data.images;
                console.log('config:', data);
                console.log('config fetched');
                if (search != null) {
                    runSearch(search, release);
            }
            })
            .catch(function(err){
                alert(err);
            });
        }
        
        let runSearch = function (keyword, release) {
            let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', keyword, '&primary_release_year=', release);
            fetch(url)
            .then(result=>result.json())
            .then((data)=>{
                //process the returned data
               // document.getElementById('output').innerHTML = JSON.stringify(data, null, 4);
                //work with results array...
                let movieArray = JSON.stringify(data, null, 4).split("}"); 
                //sort
                let title = "";
                let voteaverage = "";
                document.getElementById('results').innerHTML = "Search results for '" + keyword +", "+release + "':";
                document.getElementById('output').innerHTML = 'Title: <br>';
                document.getElementById('output2').innerHTML = 'Rating: <br>';
                for (let i = 0; i < movieArray.length; i++) {
                    let movieInfo = movieArray[i].split(","); 
                    for (let a = 0; a < movieInfo.length; a++) {
                        if (movieInfo[a].includes("original_title")){
                            title = movieInfo[a].slice(32, -1);
                           // document.getElementById('body').innerHTML += ''.concat("<div class=",'"content"',">");
                           // document.getElementById('body').innerHTML += "<p><b>Lorem ipsum dolor sit amet.</p>";
                            //document.getElementById('body').innerHTML += "</div>";
                            document.getElementById('output').innerHTML += movieInfo[a].slice(32, -1) + "<br>";
                        
                        }
                        else if (movieInfo[a].includes("vote_average")){
                            voteaverage = movieInfo[a].slice(26, -1);
                            document.getElementById('output2').innerHTML += movieInfo[a].slice(28) + "<br>";
                        }
                    }
                    //document.getElementById('body').innerHTML += ''.concat("<button type=",'"button"',"class=",'"collapsible"',">",title,"</button>","<div class=",'"content"',"><p>",overview,"</p></div>");

                     //document.getElementById('output').innerHTML += movieName + "<br>";
                }
                //document.getElementById('output').innerHTML = movieArray[0];
                });
                }
        
        //document.addEventListener('DOMContentLoaded', getConfig);
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
            content.style.display = "none";
            } else {
            content.style.display = "block";
            }
        });
        }
        // let bubble_Sort = function (array1) {
        //     let swapp;
        //     let n = a.length-1;
        //     let x=a;
        //     do {
        //         swapp = false;
        //         for (let i=0; i < n; i++)
        //         {
        //             let movieInfo = array1[i].split(",");
        //             for (let a = 0; a < movieInfo.length; a++) {
        //                 if (movieInfo[a].includes("vote_average")){
        //                     document.getElementById('output').innerHTML += movieInfo[a].slice(32, -1) + "<br>";
        //                 }
        //             if (x[i] < x[i+1])
        //             {
        //             let temp = x[i];
        //             x[i] = x[i+1];
        //             x[i+1] = temp;
        //             swapp = true;
        //             }
        //         }
        //         n--;
        //     } while (swapp);
       // return x; 
    //     }
    // }
        /*******************************
        SAMPLE SEARCH RESULTS DATA
        { "vote_count": 2762, 
            "id": 578, 
            "video": false, 
            "vote_average": 7.5, 
            "title": "Jaws", 
            "popularity": 16.273358, 
            "poster_path": "/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg", 
            "original_language": "en", 
            "original_title": "Jaws", 
            "genre_ids": [ 27, 53, 12 ], 
            "backdrop_path": "/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg", 
            "adult": false, 
            "overview": "An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.", 
            "release_date": "1975-06-18" 
        }
        *******************************/
