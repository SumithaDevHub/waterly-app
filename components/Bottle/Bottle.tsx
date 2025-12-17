import { Animated, StyleSheet, View } from "react-native";
import { Bubble } from "./Bubbles";
import { WaterFill } from "./WaterFill";

const BOTTLE_HEIGHT = 280;

export function Bottle({ animatedHeight }: { animatedHeight: Animated.Value }) {
  return (
    <View style={styles.bottle}>
      <WaterFill height={animatedHeight} />
      <Bubble delay={0} />
      <Bubble delay={1200} />
      <Bubble delay={2400} />
    </View>
  );
}

const styles = StyleSheet.create({
  bottle: {
    width: 120,
    height: BOTTLE_HEIGHT,
    borderWidth: 4,
    borderColor: "#7dd3fc",
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#020617",
    marginBottom: 20,
  },
});
