import { NextApiRequest, NextApiResponse } from 'next';

export interface TypedNextApiRequest<T> extends NextApiRequest {
  body: T;
}

export type ApiHandler<T = any, R = any> = (
  req: TypedNextApiRequest<T>,
  res: NextApiResponse<R>
) => void | Promise<void>;