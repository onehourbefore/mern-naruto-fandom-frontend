import { getCountOfPages } from './getCountOfPages';

describe ('getCountOfPages', () => {
    it ('countOfPosts 8, limit 4', () => {
        expect (getCountOfPages (8, 4)).toBe (2);
    });

    it ('countOfPosts 16, limit 3', () => {
        expect (getCountOfPages (16, 3)).toBe (6);
    });

    it ('countOfPosts 1, limit 2', () => {
        expect (getCountOfPages (1, 2)).toBe (1);
    });

    it ('countOfPosts 0, limit 2', () => {
        expect (getCountOfPages (0, 2)).toBe (1);
    });
});