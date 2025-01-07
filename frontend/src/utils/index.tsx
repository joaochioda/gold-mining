export const setCookieAddress = (value: string | null) => {
  document.cookie = `address=${value}; path=/; max-age=31536000`;
};

export const getAddress = (): string | null => {
  const fullAddress = getCookie("address");
  return fullAddress
    ? fullAddress.slice(0, 5) + "..." + fullAddress.slice(-4)
    : null;
};

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const sliceNumber = (number: string, start: number, end: number) => {
  return number.slice(start, number.indexOf(".") + end);
};
