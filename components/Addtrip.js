import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles.js";

export default function Addtrip() {
  return (
    <View style={styles.questions}>
      <Text style={styles.title}>Add Trip</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          placeholder="Enter your destination"
          onPress={() => navigation.navigate("")}
          style={styles.form}
        />
        <TextInput
          placeholder="Days for your trip"
          onPress={() => navigation.navigate("")}
          style={styles.form}
        />
        <TextInput
          placeholder="Enter your budget"
          onPress={() => navigation.navigate("")}
          style={styles.form}
        />
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: "white" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
