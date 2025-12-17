import { StyleSheet, Text, TextInput, View } from "react-native";

export function GoalInput({
  goal,
  onChange,
}: {
  goal: number;
  onChange: (v: number) => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Daily Goal (ml)</Text>
      <TextInput
        value={String(goal)}
        onChangeText={(t) => onChange(Number(t) || 0)}
        keyboardType="numeric"
        style={styles.input}
        placeholder="2000"
        placeholderTextColor="#64748b"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: "center",
  },
  label: {
    color: "#7dd3fc",
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    width: 120,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#e0f2fe",
    borderBottomWidth: 2,
    borderColor: "#38bdf8",
    paddingVertical: 4,
  },
});
