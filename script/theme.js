import Cookies from "../library/js.cookie.min.mjs";

const getCurrentTheme = () => {
  if (Cookies.get("theme")) return Cookies.get("theme");

  const isSystemDarkTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return isSystemDarkTheme ? "dark" : "light";
};

document.body.classList.add(getCurrentTheme());

window.changeTheme = (targetTheme) => {
  document.body.className = targetTheme;

  Cookies.set("theme", targetTheme);
};
