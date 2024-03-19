import React, { useState, useEffect } from "react";
import { View, Text, Button, Pressable, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { styles } from "../styles.js";

export default function Home({ navigation, route }) {
  const { user, name, uid } = route.params;
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        const collectionRef = collection(db, `users/${uid}/trips`);
        const querySnapshot = await getDocs(collectionRef);
        let tripsList = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, "=>", doc.data());
          tripsList.push({ id: doc.id, trip: doc.data() });
        });
        setTrips(tripsList);
        setLoading(false);
      }
    };

    fetchData();
  }, [uid]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.allpadding}>
      <Text style={styles.title}>Welcome, {name}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Addtrip", { user, uid })}
        style={styles.btn}
      >
        <Text style={{ color: "white" }}>Add Trip</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        {trips.map((trip) => (
          <View key={trip.id} style={styles.form}>
            <Text>Destination: {trip.trip.destination}</Text>
            <Text>Start Date: {formatDate(trip.trip.tripDate)}</Text>
            <Text>End Date: {formatDate(trip.trip.endDate)}</Text>
            <Text>Budget: ${trip.trip.budget}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Viewtrip", {
                  tripId: trip.id,
                  user: user,
                  uid: uid,
                })
              }
              style={styles.btn}
            >
              <Text style={{ color: "white" }}>View Trip</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
