// if user feedback is under 50pts return that data
//fetch data from the DB for a specific user
//comes back as a json object 

const suggestionDiv = document.getElementById('suggestion-content');

const feedback = async () => {
    const response = await fetch('/api/activity-log', {
        headers: { 'Content-Type': 'application/json' },
        //how are we getting back the points data 
        //the response we send back will just be the total
        //get a count of activity query activity model 
        //gt back all activies and points nad 
      })
     
            
            if (responseIndex < 50) {
              const creativeDiv = document.innerHTML.suggestionDiv =  + " your world might not feel very colorful today may we suggest doing something creative?"
                "Maybe write in a journal, create an en plein air painting or go to the museum."
            
                const movementDiv = document.innerHTML.suggestionDiv = "GET YA ASS UP "
            
            
            
            }

}


const suggestionDiv = document.getElementById('suggestion-content');

const feedback = async () => {
    const response = await fetch('/api/activity-log', {
        headers: { 'Content-Type': 'application/json' },
        //how are we getting back the points data 
        //the response we send back will just be the total
        //get a count of activity query activity model 
        //gt back all activies and points nad 
      })
     
            
            if (responseIndex < 50) {
              const creativeDiv = document.innerHTML.suggestionDiv =  + " your world might not feel very colorful today may we suggest doing something creative?"
                "Maybe write in a journal, create an en plein air painting or go to the museum."
            
                const movementDiv = document.innerHTML.suggestionDiv = "GET YA ASS UP "
            
            
            
            }

}