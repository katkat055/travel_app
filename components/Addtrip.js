import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db, collection, doc, setDoc } from "firebase/firestore";

export default function Addtrip({ navigation, route }) {
  const [destination, setDestination] = useState("");
  const [tripDate, setTripDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [budget, setBudget] = useState("");
  const { user, uid } = route.params;

  const handleAddTrip = async () => {
    try {
      if (!user) {
        Alert.alert("Error", "User is not logged in.");
        navigation.navigate("Login");
      }

      const userRef = doc(db, "users", user.uid);
      await setDoc(collection(userRef, "trips"), {
        destination: destination,
        tripDate: tripDate,
        endDate: endDate,
        budget: budget,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert("Success", "Trip added successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.questions}>
      <Text style={styles.title}>Add Trip</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          placeholder="Enter your destination"
          value={destination}
          onChangeText={setDestination}
          style={styles.form}
        />
        <View style={styles.align}>
          <Text>From:</Text>
          <DateTimePicker
            mode="datetime"
            value={tripDate}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || tripDate;
              setTripDate(currentDate);
            }}
          />
        </View>
        <View style={styles.align}>
          <Text>Until:</Text>
          <DateTimePicker
            mode="datetime"
            value={endDate}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || endDate;
              setEndDate(currentDate);
            }}
          />
        </View>
        <TextInput
          placeholder="Enter your budget"
          value={budget}
          onChangeText={setBudget}
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
