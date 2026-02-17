import countryToCurrency from 'country-to-currency';
import { countryNameToCode } from '@/Utils/constants';

export const formatPrice = (priceValue: number, countryName?: string, curr?: string) => {
  const currencyCode = curr || (countryName ? countryToCurrency[countryName as keyof typeof countryToCurrency] : undefined);
  if (currencyCode) {
    return priceValue?.toLocaleString(
      countryNameToCode[countryName as keyof typeof countryNameToCode],
      { style: 'currency', currency: currencyCode },
    );
  }
  return priceValue?.toLocaleString();
};

export const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase();

export const formatPhone = (phone: string) => {
  if (!phone) return '';
  return phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
};
