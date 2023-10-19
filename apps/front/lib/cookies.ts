import cookies from "js-cookie";

export const getAuthTokenCodeVerifierCookie = (): string =>
  cookies.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_CODE_VERIFIER ?? "") || "";

export const setAuthTokenCodeVerifierCookie = (code: string) => {
  cookies.set(process.env.NEXT_PUBLIC_AUTH_TOKEN_CODE_VERIFIER ?? "", code);
};