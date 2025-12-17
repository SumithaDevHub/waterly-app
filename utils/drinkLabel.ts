export function getDrinkLabel(ml: number) {
  const GLASS_ML = 250;
  const BOTTLE_ML = 1000;

  if (ml >= BOTTLE_ML) {
    const bottles = ml / BOTTLE_ML;
    return Number.isInteger(bottles)
      ? `${bottles} bottle${bottles > 1 ? "s" : ""}`
      : `${bottles.toFixed(1)} bottles`;
  }

  const glasses = ml / GLASS_ML;
  return Number.isInteger(glasses)
    ? `${glasses} glass${glasses > 1 ? "es" : ""}`
    : `${glasses.toFixed(1)} glasses`;
}
