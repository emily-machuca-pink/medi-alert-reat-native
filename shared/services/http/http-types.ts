export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpQuery = Record<string, string | number | boolean | null | undefined>;

export type HttpRequestOptions = Omit<RequestInit, 'method' | 'body' | 'headers'> & {
  method?: HttpMethod;
  headers?: Record<string, string | undefined>;
  query?: HttpQuery;
  body?: unknown;
};

export class HttpError extends Error {
  status: number;
  url: string;
  body: unknown;

  constructor(params: { message: string; status: number; url: string; body: unknown }) {
    super(params.message);
    this.name = 'HttpError';
    this.status = params.status;
    this.url = params.url;
    this.body = params.body;
  }
}

export type AccessTokenProvider = () => string | null | undefined | Promise<string | null | undefined>;

export type HttpClient = {
  request<T>(path: string, options?: HttpRequestOptions): Promise<T>;
};

