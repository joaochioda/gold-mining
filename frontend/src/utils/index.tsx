export const setCookie = (value: boolean) => {
  document.cookie = `isLoggedIn=${value}; path=/; max-age=31536000`; // O max-age define a validade do cookie por 1 ano
};

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};
