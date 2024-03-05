import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { deleteAccessToken, getAccessToken, setAccessToken } from "@/api";
import Router from "next/router";

const isServer = typeof window === "undefined" ? true : false;

const api = axios.create({
  baseURL: "https://test2.asterfi.net/v1",
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
  withCredentials: true,
});

export class RequestCanceledError extends Error {
  constructor() {
    super("Request canceled.");
  }
}

export class NotLoggedInError extends Error {
  constructor() {
    super("Please log in again.");
  }
}

export class RequestError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class NetworkError extends RequestError {
  constructor() {
    super("Network error.");
  }
}

export class ApiError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export interface RequestConfig<DT> extends AxiosRequestConfig<DT> {
  needAuth?: boolean;
  redirectIfNotLogin?: boolean;
}

export async function request<DT, RT>({
  needAuth,
  redirectIfNotLogin = true,
  ...config
}: RequestConfig<DT>): Promise<RT> {
  const accessToken = getAccessToken();
  if (needAuth && !accessToken) {
    if (!isServer && redirectIfNotLogin) {
      Router.push("/");
    }
    throw new NotLoggedInError();
  }

  try {
    const response = await api<{ data: RT }>({
      ...config,
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...config.headers,
      },
    });

    if (
      "data" in response.data &&
      typeof response.data.data === "object" &&
      response.data.data !== null &&
      "token" in response.data.data &&
      typeof response.data.data.token === "object" &&
      response.data.data.token !== null &&
      "access" in response.data.data.token &&
      typeof response.data.data.token.access === "string"
    ) {
      setAccessToken(response.data.data.token.access);
    }

    return response.data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new RequestCanceledError();
    }

    const { response, message } = error as AxiosError<{
      error?: { message?: string };
      message?: string;
    }>;
    if (message === "Network Error") {
      throw new NetworkError();
    }

    if (!response) throw new RequestError(message);

    if (response.status === 401) {
      deleteAccessToken();
      if (!isServer && redirectIfNotLogin) {
        Router.push("/");
      }
      throw new NotLoggedInError();
    }

    if (
      "error" in response.data &&
      typeof response.data.error === "object" &&
      response.data.error !== null &&
      "message" in response.data.error &&
      typeof response.data.error.message === "string"
    ) {
      throw new ApiError(response.data.error.message);
    }

    if (
      "message" in response.data &&
      typeof response.data.message === "string"
    ) {
      throw new ApiError(response.data.message);
    }

    throw new ApiError(message);
  }
}

export function cancelableRequest<RT>(
  sendRequest: (signal: AbortSignal) => Promise<RT>
): CancelableRequest<RT> {
  const abortController = new AbortController();
  return {
    promise: sendRequest(abortController.signal).catch((error) => {
      if (error instanceof RequestCanceledError) return undefined;
      throw error;
    }),
    abortController,
  };
}
