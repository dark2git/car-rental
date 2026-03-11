export const formatMileage = (mileage: number): string => {
  return `${new Intl.NumberFormat("uk-UA").format(mileage)} km`;
};
