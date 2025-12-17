import { Animated, StyleSheet } from "react-native";

export function WaterFill({ height }: { height: Animated.Value }) {
  return <Animated.View style={[styles.water, { height }]} />;
}

const styles = StyleSheet.create({
  water: {
    width: "100%",
    backgroundColor: "#38bdf8",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
});
