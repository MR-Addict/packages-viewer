type StateName = "update-package";

function setCookie(name: StateName, value: string, maxAge: number = 10) {
  document.cookie = `${name}=${value}; max-age=${maxAge}`;
}

function getCookie(name: StateName, clear: boolean = true) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((cookie) => cookie.startsWith(name));
  const res = cookie ? cookie.split("=")[1] : null;
  if (clear) removeCookie(name);
  return res;
}

function removeCookie(name: StateName) {
  document.cookie = `${name}=; max-age=0`;
}

const useCookieState = { set: setCookie, get: getCookie, remove: removeCookie };

export default useCookieState;
