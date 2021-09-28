
  let number = document.getElementById("number")
  let counter = 0;
  setInterval(() => {
    //store users progress points
    //pull this number from db? replace the 65
    //edit css animation
    if(counter == 65){
      clearInterval();
    } else {
         counter += 1;
    number.innerHTML = counter + "%";
    }
 
  }, 20)
