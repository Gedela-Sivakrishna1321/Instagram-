export const isReqUser = (userId1, userId2) => {
    if(userId1 && userId2) return userId1 === userId2;
}

export const isFollowing = (reqUser, user) => {
   
    if(reqUser && user) {
        for(let item of user.follower) {
            if(item.id === reqUser.id) return true;
        }
    }

    return false;
}


export const isPostLikedByUser = (post, userId) => {
    for(let item of post.likedByUsers) {
        if(item.id === userId) return true;
    }
    return false;
}

export const isPostSavedByUser = (postId, user) => {
    if(user?.savedPost.length > 0) {
        for(let item of user.savedPost) {
            if(item.id === postId) return true;
        }
    }
    return false;
}

export const isCommentLikedByUser = (comment, userId) => {
    for(let item of comment.likedByUsers) {
        if(item.id === userId) return true;
    }
    return false;
}



export const timeDifference = (timeStamp) => {

    const date = new Date(timeStamp);

    const diff = Date.now() - date.getTime();

    const seconds = Math.floor(diff/1000);
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    const weeks = Math.floor(days/7);

    if(weeks > 0) {
        return weeks +" week" + (weeks === 1 ? "" : "s " ) + "ago";
    }
    else if (days > 0) {
        return days +" day" + (days === 1 ? "" : "s " ) + "ago";
    }
    else if (hours > 0) {
        return hours +" hour" + (hours === 1 ? "" : "s " ) + "ago";
    }
    else if (minutes > 0) {
        return minutes +" minute" + (minutes === 1 ? "" : "s " ) + "ago";
    }
    else if (seconds > 0) {
        return seconds +" second" + (seconds === 1 ? "" : "s " ) + "ago";
    }

}

