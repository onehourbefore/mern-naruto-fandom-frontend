import { checkIsLiked } from "./checkIsLiked";

describe('checkIsLiked', () => {
    it('is liked', () => {
        const likedPosts = ['111222333zzz', '444333222xxx', 'vvvbbbccc222'];
        const postID = 'vvvbbbccc222';
        expect(checkIsLiked(likedPosts, postID)).toBeTruthy();
    });

    it('is not liked', () => {
        const likedPosts = ['111222333zzz', '444333222xxx', 'vvvbbbccc222'];
        const postID = 'oskovdofkv43434';
        expect(checkIsLiked(likedPosts, postID)).toBeFalsy();
    });
});