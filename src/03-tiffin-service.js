/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  if(typeof(name)!=="string" || name === "" || typeof(mealType)!=="string" || typeof(days)!=="number") return null;

  let res = {
    name:name,
    mealType:mealType,
    days:days,
    dailyRate:0,
    totalCost:0
  }

  if(mealType === "veg") res.dailyRate = 80;
  else if(mealType === "nonveg") res.dailyRate = 120;
  else if(mealType === "jain") res.dailyRate = 90;
  else return null

  res.totalCost = res.dailyRate*res.days;
  return res;

}

export function combinePlans(...plans) {
  // Your code here
  if(plans.length===0) return null;
  return plans.reduce((total,cur)=> {
    total.totalCustomers++;
    total.totalRevenue+=cur.totalCost;
    total.mealBreakdown[cur.mealType]++;
    return total;
  },{totalCustomers:0,totalRevenue:0,mealBreakdown:{"veg":0,"nonveg":0,"jain":0}});
}

export function applyAddons(plan, ...addons) {
  if (!plan) return null;

  // Extract existing values safely
  const { name, mealType, days, dailyRate, totalCost } = plan;

  // Calculate total addon price
  const addonTotal = addons.reduce((sum, addon) => {
    return sum + (addon?.price || 0);
  }, 0);

  // New daily rate
  const newDailyRate = (dailyRate || 0) + addonTotal;

  // New total cost
  const newTotalCost = newDailyRate * (days || 0);

  // Collect addon names
  const addonNames = addons.map(addon => addon?.name).filter(Boolean);

  // Return NEW object (immutability maintained)
  return {
    ...plan,
    dailyRate: newDailyRate,
    totalCost: newTotalCost,
    addonNames
  };
}
