import { CarProps, FilterProps } from "@/types";

const basePricePerDay = 50; 
const mileageFactor = 0.1; 
const ageFactor = 0.05; 

export const calculateCarRent = (city_mpg: number, year: number) => {

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;


  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);

  newSearchParams.delete(type.toLocaleLowerCase());

  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchCars(filters: FilterProps){
  const {manufacturer,year,model,limit,fuel}=filters;
  const headers = {
      
          'x-rapidapi-key': '1238ed3d48msh9386b050abf4e2ap1547aejsn89d0d6d4b0c9',
          'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
      
  }
  const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}
      &fuel_type=${fuel}`,{
      headers: headers,
  });
  const result = await response.json();
  return result;
}
