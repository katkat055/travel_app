import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles.js";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Addtrip({ navigation }) {
  const [tripDestination, setTripDestination] = useState("");
  const [tripDateTime, setTripDateTime] = useState(new Date());
  const [tripBudget, setTripBudget] = useState("");

  const handleAddTrip = () => {};

  return (
    <View style={styles.questions}>
      <Text style={styles.title}>Add Trip</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          placeholder="Enter your destination"
          value={tripDestination}
          onChangeText={setTripDestination}
          style={styles.form}
        />
        <View style={styles.align}>
          <Text>From:</Text>
          <DateTimePicker
            mode="datetime"
            value={tripDateTime}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || tripDateTime;
              setTripDateTime(currentDate);
            }}
          />
        </View>
        <View style={styles.align}>
          <Text>Until:</Text>
          <DateTimePicker
            mode="datetime"
            value={tripDateTime}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || tripDateTime;
              setTripDateTime(currentDate);
            }}
          />
        </View>
        <TextInput
          placeholder="Enter your budget"
          value={tripBudget}
          onChangeText={setTripBudget}
          keyboardType="numeric"
          style={styles.form}
        />
        <TouchableOpacity style={styles.btn} onPress={handleAddTrip}>
          <Text style={{ color: "white" }}>Add Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
