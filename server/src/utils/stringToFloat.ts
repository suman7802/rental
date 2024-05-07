import CustomError from '../errors/customError';

export default function convertStringToFloat(value: string): number {
  const floatValue = parseFloat(value);
  if (isNaN(floatValue)) throw new CustomError('Invalid input', 400);
  return floatValue;
}
