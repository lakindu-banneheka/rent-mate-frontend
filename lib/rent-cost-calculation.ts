interface CalculateRentCostArgs {
  quantity: number;
  amountPerDay: number;
  startDate: Date;
  endDate: Date;
}

export function calculateRentCost({
  quantity,
  amountPerDay,
  endDate,
  startDate,
}: CalculateRentCostArgs): { costPerItem: number; totalCost: number } {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  let diffDays = Math.round(
    Math.abs((endDate.getTime() - startDate.getTime()) / oneDay)
  );

  if (diffDays <= 0) {
    diffDays = 1;
  }

  const costPerItem = amountPerDay * diffDays;
  const totalCost = costPerItem * quantity;

  return { costPerItem, totalCost };
}

// Example usage:
const quantity = 5;
const amountPerDay = 20;
const startDate = new Date("2023-10-01");
const endDate = new Date("2023-10-10");

const result = calculateRentCost({
  quantity,
  amountPerDay,
  startDate,
  endDate,
});
console.log(result); // { costPerItem: 180, totalCost: 900 }
