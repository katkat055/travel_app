import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { styles } from "../styles.js";

export default function Viewtrip({ navigation, route }) {
  const { tripId, uid } = route.params;
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, `users/${uid}/trips/${tripId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTrip(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchData();
  }, [tripId, uid]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  const deleteTrip = async () => {
    try {
      await deleteDoc(doc(db, `users/${uid}/trips/${tripId}`));
      setTrip(null);
      console.log("Trip deleted successfully!");
      alert("Trip deleted successfully!");
      navigation.navigate("Home", { uid }); 
    } catch (error) {
      console.error("Error deleting trip: ", error);
      alert("Trip deleted successfully!");
    }
  };

  if (!trip) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.allpadding}>
      <Text>Destination: {trip.destination}</Text>
      <Text>Start Date: {formatDate(trip.tripDate)}</Text>
      <Text>End Date: {formatDate(trip.endDate)}</Text>
      <Text>Budget: ${trip.budget}</Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <TouchableOpacity style={[styles.btn, { width: "50%" }]}>
          <Text style={{ color: "white" }}>Edit 📝</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteTrip}
          style={[styles.btn, { width: "50%", backgroundColor: "red" }]}
        >
          <Text style={{ color: "white" }}>Delete 🗑️</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
