const isServer = typeof window === "undefined" ? true : false;
let userAccessToken: string | undefined;

export function getAccessToken() {
  return isServer ? userAccessToken : localStorage.getItem("userAccessToken");
}

export function setAccessToken(token: string) {
  if (isServer) userAccessToken = token;
  else localStorage.setItem("userAccessToken", token);
}

export function deleteAccessToken() {
  if (isServer) userAccessToken = undefined;
  else localStorage.removeItem("userAccessToken");
}
