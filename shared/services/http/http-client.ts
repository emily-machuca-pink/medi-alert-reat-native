import { ENV } from '@/shared/config/env';
import type { AccessTokenProvider, HttpClient, HttpQuery, HttpRequestOptions } from './http-types';
import { HttpError } from './http-types';

function buildQueryString(query: HttpQuery | undefined): string {
  if (!query) return '';

  const params = new URLSearchParams();
  for (const [key, rawValue] of Object.entries(query)) {
    if (rawValue === undefined || rawValue === null) continue;
    params.set(key, String(rawValue));
  }

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, '');
}

function normalizePath(path: string): string {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

export function createHttpClient(params?: { baseUrl?: string; getAccessToken?: AccessTokenProvider }): HttpClient {
  const baseUrl = normalizeBaseUrl(params?.baseUrl ?? ENV.apiUrl);
  const getAccessToken = params?.getAccessToken;

  return {
    async request<T>(path: string, options: HttpRequestOptions = {}): Promise<T> {
      const url = `${baseUrl}${normalizePath(path)}${buildQueryString(options.query)}`;

      const accessToken = getAccessToken ? await getAccessToken() : null;
      const headers: Record<string, string> = {
        Accept: 'application/json',
        ...(options.headers ?? {}),
      };

      if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

      let body: BodyInit | undefined;
      if (options.body !== undefined) {
        if (options.body instanceof FormData) {
          body = options.body;
        } else if (typeof options.body === 'string') {
          body = options.body;
          if (!headers['Content-Type']) headers['Content-Type'] = 'text/plain';
        } else {
          body = JSON.stringify(options.body);
          if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
        }
      }

      const response = await fetch(url, {
        ...options,
        method: options.method ?? 'GET',
        headers,
        body,
      });

      const contentType = response.headers.get('content-type') ?? '';
      const isJson = contentType.includes('application/json');
      const responseBody = isJson ? await response.json().catch(() => null) : await response.text().catch(() => '');

      if (!response.ok) {
        const message =
          typeof responseBody === 'object' && responseBody && 'message' in responseBody
            ? String((responseBody as { message?: unknown }).message)
            : `HTTP ${response.status}`;
        throw new HttpError({ message, status: response.status, url, body: responseBody });
      }

      return responseBody as T;
    },
  };
}

