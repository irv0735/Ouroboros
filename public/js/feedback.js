// if user feeback is under 50pts return that data
//fetch data from the DB for a specific user
//comes back as a json object 
const feedback = async () => {
    const response = await fetch('/api/activityLog', {
        headers: { 'Content-Type': 'application/json' },
      });
    if (activity.points < 50) {
        return activity.badge_name;
        
    } else {
        //do i need to loop through first? 
        return Math.floor(Math.random(activity.badge_name));
    }
}