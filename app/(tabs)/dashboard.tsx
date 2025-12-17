import { StyleSheet, Text, View } from "react-native";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.text}>XP, Streaks & Weekly stats coming next 💧</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#e0f2fe",
    fontSize: 24,
    fontWeight: "700",
  },
  text: {
    marginTop: 10,
    color: "#94a3b8",
  },
});
