import { formatDate } from './formatDate';

describe ('formatDate', () => {
    it ('date example', () => {
        let dateStr = 'Wed Oct 26 2022 14:57:57 GMT+0300 (Москва, стандартное время)';
        expect (formatDate (dateStr)).toEqual (['26 Oct 2022', '14:57']);
    });
})