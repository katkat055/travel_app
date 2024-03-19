import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { styles } from "../styles.js";

export default function Home({ navigation, route }) {
  const { user, name, uid } = route.params;
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        const collectionRef = collection(db, `users/${uid}/trips`);
        const querySnapshot = await getDocs(collectionRef);
        let tripsList = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          tripsList.push({ id: doc.id, trip: doc.data() });
        });
        setTrips(tripsList);
      }
    };

    fetchData();
  }, [uid]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  return (
    <View style={styles.allpadding}>
      <Text>Welcome, {name ? name : "User"}</Text>
      <Button
        title="Add Trip"
        onPress={() => navigation.navigate("Addtrip", { user, uid })}
      />
      <View>
        {trips.map((trip) => (
          <View key={trip.id} style={styles.form}>
            <Text>Destination: {trip.trip.destination}</Text>
            <Text>Start Date: {formatDate(trip.trip.tripDate)}</Text>
            <Text>End Date: {formatDate(trip.trip.endDate)}</Text>
            <Text>Budget: ${trip.trip.budget}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
