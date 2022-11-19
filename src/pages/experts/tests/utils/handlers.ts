import { rest } from 'msw';
import { hostName } from '../../../../api/apiData';

export const handlers = (response: any) => {
    return [
        rest.get(`${hostName}/api/experts`, (req, res, ctx) => {
            if(!response) return res(ctx.status(404), ctx.delay(250));
            return res(ctx.json(response), ctx.delay(250));
        })
    ]
};