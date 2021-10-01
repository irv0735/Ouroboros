// if user feeback is under 50pts return that data

const feedback = async () => {
    const response = await fetch('/api/activityLog', {
        headers: { 'Content-Type': 'application/json' },
      });
    if (activity.points < 50) {
        return activity.badge_name;
        
    } else {
        return Math.floor(Math.random(activity.badge_name))
    }
}