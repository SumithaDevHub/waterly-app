import { Pressable, StyleSheet, Text } from "react-native";
import { getDrinkLabel } from "../utils/drinkLabel";

export function DrinkButton({
  ml,
  onPress,
}: {
  ml: number;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>
        I drank {getDrinkLabel(ml)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#38bdf8",
    paddingVertical: 18,
    borderRadius: 18,
    marginBottom: 28,
    marginTop: 20,
  },
  text: {
    color: "#020617",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
