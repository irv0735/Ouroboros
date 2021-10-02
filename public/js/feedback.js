// if user feedback is under 50pts return that data
//fetch data from the DB for a specific user
//comes back as a json object 

const suggestionDiv = document.getElementById('suggestion-content');

const feedback = async () => {
    const response = await fetch('/api/activity-log', {
        headers: { 'Content-Type': 'application/json' },
      });
        for (let i = 0; i < response.length; i++) {
            const responseIndex = response[i];
            
            if (responseIndex < 50) {
                document.innerHTML.suggestionDiv = {{first_name}} + " your world might not feel very colorful today may we suggest doing something creative?"
                "Maybe write in a journal, create an en plein air painting or go to the museum." 
                
            } else {
        //do i need to loop through first? 
        return Math.floor(Math.random(activity.badge_name));
    }
}
};