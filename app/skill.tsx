import { View, Text, Button } from "react-native";
import { useSkillStore } from "../store/useSkillStore";

export default function Skill() {
  const { skills, levelUp } = useSkillStore();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Skill Progress</Text>
      {skills.map((skill) => (
        <View key={skill.id}>
          <Text>{skill.name}</Text>
          <Text>Level: {skill.level}</Text>
          <Button title="Level Up" onPress={() => levelUp(skill.id)} />
        </View>
      ))}
    </View>
  );
}
