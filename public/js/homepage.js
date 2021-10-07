var liked = document.querySelector('.liked');
var notLiked = document.querySelector('.notLiked');

function changeImage() {
   
    if (notLiked.src.match("/images/liked.png")) {
        console.log("/images/liked.png");
        notLiked.src = "/images/notliked.png" 
    }
    else {
        notLiked.src = "/images/liked.png";
    }
}
