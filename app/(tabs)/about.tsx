import { useRef } from "react";
import {
    Animated,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function AboutScreen() {
  const bubbleAnim = useRef(new Animated.Value(0)).current;

  function playBubble() {
    bubbleAnim.setValue(0);
    Animated.sequence([
      Animated.timing(bubbleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(bubbleAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const bubbleStyle = {
    opacity: bubbleAnim,
    transform: [
      {
        translateY: bubbleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
      {
        scale: bubbleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.2],
        }),
      },
    ],
  };

  return (
    <Pressable onPress={playBubble} style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* BUBBLE */}
        <Animated.Text style={[styles.bubble, bubbleStyle]}>
          💧
        </Animated.Text>

        {/* TITLE */}
        <Text style={styles.title}>Waterly 💧</Text>

        {/* WHAT IS WATERLY */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What is Waterly?</Text>
          <Text style={styles.cardText}>
            Waterly is a calm hydration companion designed to help you build a
            consistent water-drinking habit — without pressure or noise.
          </Text>
          <Text style={styles.cardText}>
            No logins. No ads. Just mindful hydration, one sip at a time.
          </Text>
        </View>

        {/* BENTO ROW */}
        <View style={styles.row}>
          <View style={[styles.card, styles.half]}>
            <Text style={styles.cardTitle}>Why Hydration?</Text>
            <Text style={styles.cardText}>
              Even mild dehydration affects focus, energy, digestion, and mood.
            </Text>
          </View>

          <View style={[styles.card, styles.half]}>
            <Text style={styles.cardTitle}>Daily Focus</Text>
            <Text style={styles.cardText}>
              Waterly values consistency over perfection.
            </Text>
          </View>
        </View>

        {/* HOW IT HELPS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>How Waterly Helps</Text>
          <Text style={styles.list}>• Simple daily goals</Text>
          <Text style={styles.list}>• Visual progress tracking</Text>
          <Text style={styles.list}>• History & insights</Text>
          <Text style={styles.list}>• Gentle reminders</Text>
        </View>

        {/* CREATOR NOTE */}
        <View style={styles.cardHighlight}>
          <Text style={styles.cardTitle}>From the Creator 🩺</Text>

          <Text style={styles.cardText}>
            “As a BNYS student, I see hydration as one of the most overlooked
            foundations of health.
          </Text>
          <Text style={styles.cardText}>
            Proper water intake supports digestion, circulation,
            detoxification, joint health, and mental clarity.
          </Text>
          <Text style={styles.cardText}>
            Waterly was created to make hydration effortless — not stressful.”
          </Text>

          <Text style={styles.author}>
            — Swethavarsa Kathiresh Krishnan{"\n"}
            BNYS | Currently Pursuing
          </Text>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>Built with care • Stay hydrated 💙</Text>
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#e0f2fe",
    marginBottom: 18,
  },

  bubble: {
    position: "absolute",
    top: 20,
    right: 24,
    fontSize: 24,
    color: "#7dd3fc",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  half: {
    flex: 1,
  },

  card: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },

  cardHighlight: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#38bdf8",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7dd3fc",
    marginBottom: 8,
  },

  cardText: {
    color: "#cbd5f5",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },

  list: {
    color: "#cbd5f5",
    fontSize: 14,
    marginBottom: 4,
  },

  author: {
    marginTop: 10,
    color: "#94a3b8",
    fontSize: 13,
    fontStyle: "italic",
  },

  footer: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 12,
    marginTop: 10,
  },
});
