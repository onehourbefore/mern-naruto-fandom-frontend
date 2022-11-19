export const getCountOfPages = (numOfPosts: number, limit: number) => {
    if (numOfPosts === 0) return 1;
    return Math.ceil (numOfPosts / limit);
}