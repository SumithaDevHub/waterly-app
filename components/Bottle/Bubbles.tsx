import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export function Bubble({ delay }: { delay: number }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const left = Math.random() * 80 + 10;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -200,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.bubble,
        { left, transform: [{ translateY }], opacity },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: "absolute",
    bottom: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
});
