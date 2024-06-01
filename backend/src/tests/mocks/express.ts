import { Request, Response } from 'express';

export const mockRequest = ({
  user = {},
  body = {},
  params = {},
  query = {},
}: any = {}): Request => {
  const req = {
    user,
    body,
    params,
    query,
  } as Request;
  return req;
};

export const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  sendStatus: jest.fn(),
} as unknown as Response<any, Record<string, any>>;
