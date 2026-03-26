import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Skillthenics App</Text>

      <Button title="Start Workout" onPress={() => router.push("/workout")} />
      <Button title="Skill Progress" onPress={() => router.push("/skill")} />
    </View>
  );
}
