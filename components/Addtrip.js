import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

export default function Addtrip({ navigation, route }) {
  const [destination, setDestination] = useState("");
  const [tripDate, setTripDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [budget, setBudget] = useState("");
  const { user, uid, name } = route.params;

  const handleAddTrip = async () => {
    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/trips`), {
        destination: destination,
        tripDate: tripDate,
        endDate: endDate,
        budget: budget,
        createdAt: new Date(),
      });
      Alert.alert("Trip added", "Your trip has been successfully added.");
      navigation.navigate("Home", { uid: user.uid, name: name, uid: uid  }); 
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Failed to save trip",
        "An error occurred while saving your trip. Please try again."
      );
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
              if (selectedDate) {
                setTripDate(selectedDate);
              }
            }}
          />
        </View>
        <View style={styles.align}>
          <Text>Until:</Text>
          <DateTimePicker
            mode="datetime"
            value={endDate}
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setEndDate(selectedDate);
              }
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
