const COUNTRY_CODE = "62";

export function toLocalPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith(COUNTRY_CODE)) return digits.slice(COUNTRY_CODE.length);
  return digits.replace(/^0+/, "");
}

export function toFullPhone(localInput: string): string {
  const local = toLocalPhone(localInput);
  return local ? `${COUNTRY_CODE}${local}` : "";
}
