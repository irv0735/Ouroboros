var btn_up = document.querySelector('.liked');
var btn_down = document.querySelector('.notLiked');

function changeImage(elem){
    elem.classList.toggle('clicked');
    if(elem === btn_up){
        btn_down.classList.remove('clicked');
    }else{
        btn_up.classList.remove('clicked');
    }
}

