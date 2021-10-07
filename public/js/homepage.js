var notLiked = document.querySelector('.notLiked');

function changeImage(event) {
   
    console.log(event.target.src);
    if (event.target.src.match("/images/liked.png")) {
        

        event.target.src = "/images/notliked.png" 
    }
    else {
        event.target.src = "/images/liked.png";
    }
}

//uniqe name from entry 
//attach id to image when rendered 
//attah db id to button
//do  a fecth request to back end 
//save the url or if it's liked or not 
//set boolean 
//map over 