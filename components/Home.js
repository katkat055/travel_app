import { View, Text, Button } from "react-native";

export default function Home({ navigation, route }) {
  const { user, name, uid } = route.params;

  return (
    <View>
      <Text>Welcome, {name ? name : 'User'}</Text>
      <Button title="Add Trip" onPress={() => navigation.navigate("Addtrip", { user, uid })} />
    </View>
  );
}
