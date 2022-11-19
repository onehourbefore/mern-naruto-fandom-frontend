export const checkIsLiked = (
    likedPosts: string[],
    postID: string
): boolean =>  {
    for(let i = 0; i < likedPosts.length; i++) {
        if(likedPosts[i] === postID) {
            return true;
        }
    }
    return false;
};