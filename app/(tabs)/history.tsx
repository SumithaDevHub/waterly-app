import { useEffect, useMemo, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  getDailyGoal,
  getWaterLogs,
} from "../../src/storage/waterStorage";

type WaterLog = {
  id: string;
  amount: number;
  timestamp: string;
  date: string;
};

type Bubble = {
  id: string;
  x: number;
  y: number;
  anim: Animated.Value;
};

export default function HistoryScreen() {
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [dailyGoal, setDailyGoal] = useState<number>(2000);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    async function load() {
      const allLogs = await getWaterLogs();
      const goal = await getDailyGoal();

      setLogs(allLogs.reverse());
      if (goal) setDailyGoal(goal);
    }
    load();
  }, []);

  // GROUP BY DATE
  const grouped = useMemo(() => {
    const map: Record<string, WaterLog[]> = {};
    for (const log of logs) {
      if (!map[log.date]) map[log.date] = [];
      map[log.date].push(log);
    }
    return Object.entries(map);
  }, [logs]);

  // BUBBLE EFFECT
  function spawnBubble(x: number, y: number) {
    const anim = new Animated.Value(0);
    const bubble: Bubble = {
      id: Date.now().toString(),
      x,
      y,
      anim,
    };

    setBubbles((prev) => [...prev, bubble]);

    Animated.timing(anim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
    });
  }

  return (
    <Pressable
      style={styles.container}
      onPressIn={(e) =>
        spawnBubble(e.nativeEvent.locationX, e.nativeEvent.locationY)
      }
    >
      <Text style={styles.title}>History</Text>

      <FlatList
        contentContainerStyle={{ paddingBottom: 40 }}
        data={grouped}
        keyExtractor={([date]) => date}
        renderItem={({ item }) => {
          const [date, dayLogs] = item;
          const total = dayLogs.reduce((sum, l) => sum + l.amount, 0);
          const progress = Math.min(total / dailyGoal, 1);

          return (
            <View style={styles.card}>
              <Text style={styles.date}>{date}</Text>

              <Text style={styles.summary}>
                {total} / {dailyGoal} ml
              </Text>

              <View style={styles.progressBg}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progress * 100}%` },
                  ]}
                />
              </View>

              {dayLogs.map((log) => (
                <View key={log.id} style={styles.logRow}>
                  <Text style={styles.logAmount}>{log.amount} ml</Text>
                  <Text style={styles.logTime}>
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              ))}
            </View>
          );
        }}
      />

      {/* BUBBLES */}
      {bubbles.map((b) => (
        <Animated.View
          key={b.id}
          style={[
            styles.bubble,
            {
              left: b.x - 6,
              top: b.y - 6,
              opacity: b.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.7, 0],
              }),
              transform: [
                {
                  translateY: b.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -40],
                  }),
                },
                {
                  scale: b.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.8],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 18,
    paddingTop: 40,
  },

  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    color: "#e0f2fe",
    marginBottom: 18,
  },

  card: {
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
  },

  date: {
    color: "#7dd3fc",
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },

  summary: {
    color: "#cbd5f5",
    marginBottom: 10,
    textAlign: "center",
  },

  progressBg: {
    height: 8,
    backgroundColor: "#1e293b",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 10,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#38bdf8",
  },

  logRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  logAmount: {
    color: "#e0f2fe",
  },

  logTime: {
    color: "#94a3b8",
    fontSize: 12,
  },

  bubble: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#7dd3fc",
  },
});
