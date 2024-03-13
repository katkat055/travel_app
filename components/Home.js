import { View, Text, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View>
      <Button title="Add Trip" onPress={() => navigation.navigate("Addtrip")}  />
    </View>
  );
}
