//fetch to get data 
//create a js file with all fetch requests 
//public js file with multiple api calls 
//create object with a function on it METHOD 
//w that 


  let number = document.getElementById("number")
  let counter = 0;
  let points = Progress.exercise;

  //pull data in from model?
  // if(exercise) {
  //   const response = await fetch()
  // }
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
