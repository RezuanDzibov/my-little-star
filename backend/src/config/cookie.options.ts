export const cookieOptions = {
  cookieExpirationInSeconds: +(process.env.COOKIE_EXPIRATION ?? 3600),
};
