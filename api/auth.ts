import { deleteAccessToken } from "@/api";
import { request } from "@/api/request";

export function getNonce() {
  return request<undefined, { nonce: string }>({
    method: "POST",
    url: "/auth/nonce",
  });
}

export function login(data: { signature: string; message: string }) {
  return request<typeof data, { message: string }>({
    method: "POST",
    url: "/auth/login",
    data,
  });
}

export function getSession() {
  return request<undefined, { address: string; chainId: number }>({
    method: "GET",
    url: "/auth/session",
    needAuth: true,
  });
}

export function logout() {
  return request<undefined, { message: string }>({
    method: "DELETE",
    url: "/auth/logout",
  }).then((data) => {
    deleteAccessToken();
    return data;
  });
}
