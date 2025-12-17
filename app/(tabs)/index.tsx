import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Bottle } from "../../components/Bottle";
import { MlSlider } from "../../components/MlSlider";
import {
  addLog,
  checkAndResetDay,
  getDailyGoal,
  getToday,
  getWaterLogs,
  saveDailyGoal,
} from "../../src/storage/waterStorage";

const BOTTLE_HEIGHT = 280;

export default function HomeScreen() {
  const [dailyGoal, setDailyGoal] = useState<number | null>(null);
  const [goalInput, setGoalInput] = useState("");
  const [intake, setIntake] = useState(0);
  const [selectedMl, setSelectedMl] = useState(250);

  const animatedHeight = useRef(new Animated.Value(0)).current;

  /* ---------- LOAD + DAILY RESET ---------- */
  useEffect(() => {
    async function load() {
      const goal = await getDailyGoal();
      if (goal) setDailyGoal(goal);

      const isNewDay = await checkAndResetDay();

      if (isNewDay) {
        setIntake(0);
        return;
      }

      const logs = await getWaterLogs();
      const today = getToday();

      const todayIntake = logs
        .filter((l) => l.date === today)
        .reduce((sum, l) => sum + l.amount, 0);

      setIntake(todayIntake);
    }

    load();
  }, []);

  /* ---------- BOTTLE ANIMATION ---------- */
  useEffect(() => {
    if (!dailyGoal) return;

    Animated.timing(animatedHeight, {
      toValue: Math.min(intake / dailyGoal, 1) * BOTTLE_HEIGHT,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [intake, dailyGoal]);

  async function handleSetGoal() {
    const value = Number(goalInput);
    if (!value || value < 500) return;

    setDailyGoal(value);
    await saveDailyGoal(value);
  }

  async function handleDrink() {
    const today = getToday();

    setIntake((prev) => prev + selectedMl);

    await addLog({
      id: Date.now().toString(),
      amount: selectedMl,
      timestamp: new Date().toISOString(),
      date: today,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Waterly 💧</Text>
        <Text style={styles.subtitle}>Calm hydration, daily</Text>
      </View>

      {!dailyGoal ? (
        <View style={styles.goalBox}>
          <TextInput
            placeholder="Set daily goal (ml)"
            placeholderTextColor="#64748b"
            value={goalInput}
            onChangeText={setGoalInput}
            keyboardType="numeric"
            style={styles.input}
          />
          <Pressable style={styles.primaryButton} onPress={handleSetGoal}>
            <Text style={styles.primaryButtonText}>Start</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.main}>
            <View style={styles.bottleArea}>
              <Bottle animatedHeight={animatedHeight} />
            </View>

            <Text style={styles.progress}>
              {intake} / {dailyGoal} ml
            </Text>
          </View>

          <View style={styles.controls}>
            <MlSlider value={selectedMl} onChange={setSelectedMl} />

            <Pressable style={styles.primaryButton} onPress={handleDrink}>
              <Text style={styles.primaryButtonText}>
                I drank {selectedMl} ml
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 24,
    paddingTop: 56,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#e0f2fe",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#7dd3fc",
  },

  goalBox: {
    marginTop: 40,
  },

  input: {
    borderWidth: 1,
    borderColor: "#38bdf8",
    borderRadius: 16,
    padding: 16,
    color: "#e0f2fe",
    marginBottom: 14,
    textAlign: "center",
    fontSize: 16,
  },

  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bottleArea: {
    height: BOTTLE_HEIGHT + 40,
    alignItems: "center",
    justifyContent: "center",
  },

  progress: {
    marginTop: 14,
    color: "#cbd5f5",
    fontSize: 16,
  },

  controls: {
    paddingBottom: 28,
  },

  primaryButton: {
    backgroundColor: "#38bdf8",
    paddingVertical: 18,
    borderRadius: 20,
    marginTop: 18,
  },

  primaryButtonText: {
    color: "#020617",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
