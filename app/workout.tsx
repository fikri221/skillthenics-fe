import { View, Text, Button } from "react-native";
import { useWorkoutStore } from "../store/useWorkoutStore";

export default function Workout() {
  const { reps, addRep, reset } = useWorkoutStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Reps: {reps}</Text>

      <Button title="Add Rep" onPress={addRep} />
      <Button title="Reset" onPress={reset} />
    </View>
  );
}
