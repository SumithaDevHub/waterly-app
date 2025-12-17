import { StyleSheet, Text, View } from "react-native";

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waterly 💧</Text>
      <Text style={styles.subtitle}>Hydration, all day</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 12 },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#e0f2fe",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#7dd3fc",
  },
});
