
import * as donations from "../data/100-last-donations.json";

export const getDonations = () => {
  return donations;
}

export const getPaginatedDonations = (pageSize: number, pageNumber: number) => {
  const items = donations;
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const result = items.slice(startIndex, endIndex);
  return result;
}