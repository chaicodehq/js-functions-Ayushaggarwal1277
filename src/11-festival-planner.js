export function createFestivalManager() {
  const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  const validTypes = ["religious", "national", "cultural"];

  let festivals = []; // private

  const addFestival = (name, date, type) => {
    if (
      !name ||
      typeof date !== "string" ||
      !pattern.test(date) ||
      !validTypes.includes(type)
    ) return -1;

    if (festivals.some(f => f.name === name)) return -1;

    festivals.push({ name, date, type });
    return festivals.length;
  };

  const removeFestival = (name) => {
    const index = festivals.findIndex(f => f.name === name);
    if (index === -1) return false;

    festivals.splice(index, 1);
    return true;
  };

  const getAll = () => {
    return festivals.map(f => ({ ...f })); // copy
  };

  const getByType = (type) => {
    return festivals
      .filter(f => f.type === type)
      .map(f => ({ ...f }));
  };

  const getUpcoming = (currentDate, n = 3) => {
    return festivals
      .filter(f => f.date >= currentDate)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, n)
      .map(f => ({ ...f }));
  };

  const getCount = () => festivals.length;

  return {
    addFestival,
    removeFestival,
    getAll,
    getByType,
    getUpcoming,
    getCount
  };
}