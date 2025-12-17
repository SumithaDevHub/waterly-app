export function getDrinkLabel(ml: number) {
  const GLASS = 250;
  const BOTTLE = 1000;

  if (ml >= BOTTLE) {
    const b = ml / BOTTLE;
    return `${b % 1 === 0 ? b : b.toFixed(1)} bottle${b > 1 ? "s" : ""}`;
  }

  const g = ml / GLASS;
  return `${g % 1 === 0 ? g : g.toFixed(1)} glass${g > 1 ? "es" : ""}`;
}
