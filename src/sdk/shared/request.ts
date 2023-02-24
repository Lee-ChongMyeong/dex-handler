import request from 'request';
import {ErrorResponse} from '../1inch/types';

const toJSON = (body: any) =>
  JSON.parse(body, (_, value) => {
    if (typeof value === 'string' && !value.startsWith('0x')) {
      const number = Number(value);
      if (!Number.isNaN(number)) return Number(value);
    }
    return value;
  });

class Request {
  get<Params, Response>(url: string, qs?: Params): Promise<Response> {
    return new Promise((resolve, reject) => {
      request.get(
        url,
        {
          qs: qs,
        },
        (err: any, _res: request.Response, body: any) => {
          if (err) {
            reject(err);
          } else {
            if (_res.statusCode !== 200) {
              const errorResponse: ErrorResponse = toJSON(body);
              console.log(errorResponse);
              reject(errorResponse.description);
            } else resolve(toJSON(body));
          }
        }
      );
    });
  }

  post<Body, Response>(url: string, body: Body): Promise<Response> {
    return new Promise((resolve, reject) => {
      request.post(
        url,
        {
          body: body,
        },
        (err: any, _res, body: any) => {
          if (err) {
            reject(err);
          } else {
            if (_res.statusCode !== 200) {
              const errorResponse: ErrorResponse = toJSON(body);
              console.log(errorResponse);
              reject(errorResponse.description);
            } else resolve(toJSON(body));
          }
        }
      );
    });
  }
}

export default new Request();
