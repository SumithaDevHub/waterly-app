import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export function MlSlider({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select amount</Text>
      <Text style={styles.value}>{value} ml</Text>

      <Slider
        minimumValue={50}             
        maximumValue={1000}
        step={50}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#38bdf8"
        maximumTrackTintColor="#1e293b"
        thumbTintColor="#7dd3fc"
      />

      <Text style={styles.hint}>
        250 ml = glass · 1000 ml = bottle
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },

  label: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
  },

  value: {
    color: "#e0f2fe",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 6,
  },

  hint: {
    color: "#64748b",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
});
