import AsyncStorage from "@react-native-async-storage/async-storage";

/* ---------- TYPES ---------- */
export type WaterLog = {
  id: string;
  amount: number;
  timestamp: string;
  date: string;
};

/* ---------- STORAGE KEYS ---------- */
const GOAL_KEY = "dailyGoal";
const LOGS_KEY = "waterLogs";
const LAST_DATE_KEY = "lastActiveDate";

/* ---------- HELPERS ---------- */
export const getToday = () =>
  new Date().toISOString().split("T")[0];

/* ---------- DAILY GOAL ---------- */
export async function saveDailyGoal(goal: number) {
  await AsyncStorage.setItem(GOAL_KEY, goal.toString());
}

export async function getDailyGoal(): Promise<number | null> {
  const value = await AsyncStorage.getItem(GOAL_KEY);
  return value ? Number(value) : null;
}

/* ---------- DATE RESET LOGIC ---------- */
export async function checkAndResetDay(): Promise<boolean> {
  const today = getToday();
  const lastDate = await AsyncStorage.getItem(LAST_DATE_KEY);

  if (lastDate !== today) {
    await AsyncStorage.setItem(LAST_DATE_KEY, today);
    return true; // new day
  }
  return false;
}

/* ---------- LOGS ---------- */
export async function addLog(log: WaterLog) {
  const existing = await getWaterLogs();
  existing.unshift(log);
  await AsyncStorage.setItem(LOGS_KEY, JSON.stringify(existing));
}

export async function getWaterLogs(): Promise<WaterLog[]> {
  const value = await AsyncStorage.getItem(LOGS_KEY);
  return value ? JSON.parse(value) : [];
}
