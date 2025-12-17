import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const BOTTLE_WIDTH = 160;
const BOTTLE_HEIGHT = 280;

export function Bottle({ animatedHeight }: { animatedHeight: Animated.Value }) {
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true, // ✅ native OK (transform only)
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const waveTranslate = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10],
  });

  return (
    <View style={styles.bottle}>
      {/* WATER LEVEL (JS DRIVER) */}
      <Animated.View
        style={[
          styles.waterContainer,
          {
            height: animatedHeight, // ✅ JS driver ONLY
          },
        ]}
      >
        {/* WAVE (NATIVE DRIVER) */}
        <Animated.View
          style={[
            styles.wave,
            {
              transform: [{ translateX: waveTranslate }], // ✅ native driver
            },
          ]}
        />
      </Animated.View>

      {/* BUBBLES */}
      <View style={styles.bubble1} />
      <View style={styles.bubble2} />
      <View style={styles.bubble3} />
    </View>
  );
}

const styles = StyleSheet.create({
  bottle: {
    width: BOTTLE_WIDTH,
    height: BOTTLE_HEIGHT,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "#38bdf8",
    overflow: "hidden",
    backgroundColor: "#020617",
  },

  waterContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    overflow: "hidden",
  },

  wave: {
    width: "120%",
    height: "100%",
    backgroundColor: "#38bdf8",
    opacity: 0.85,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  bubble1: {
    position: "absolute",
    bottom: 40,
    left: 40,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e0f2fe",
    opacity: 0.4,
  },
  bubble2: {
    position: "absolute",
    bottom: 90,
    right: 50,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#e0f2fe",
    opacity: 0.3,
  },
  bubble3: {
    position: "absolute",
    bottom: 140,
    left: 70,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#e0f2fe",
    opacity: 0.25,
  },
});
