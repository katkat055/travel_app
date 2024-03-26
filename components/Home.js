import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";
import * as Calendar from "expo-calendar";
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

  // const addEventToCalendar = async (destination, tripDate, endDate, budget) => {
  //   try {
  //     const { status } = await Calendar.requestCalendarPermissionsAsync();
  //     if (status === "granted") {
  //       console.log("Permissions granted. Fetching available calendars...");
  //       const calendars = await Calendar.getCalendarsAsync(
  //         Calendar.EntityTypes.EVENT
  //       );
  //       const defaultCalendar =
  //         calendars.find((calendar) => calendar.isPrimary) || calendars[0];
  //       if (defaultCalendar) {
  //         const eventConfig = {
  //           destination,
  //           tripDate,
  //           endDate,
  //           budget,
  //         };
  //         console.log("eventConfig:", eventConfig);
  //         const eventId = await Calendar.createEventAsync(
  //           defaultCalendar.id,
  //           eventConfig
  //         );
  //         console.log(eventId);
  //         Alert.alert("Success", "Event added to your calendar");
  //       } else {
  //         console.warn("No available calendars found.");
  //       }
  //     } else {
  //       console.warn("Calendar permission not granted.");
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  const shareTrip = (destination, tripDate, endDate, budget) => {
    try {
      Share.share({
        message: `View my trip! Destination: ${destination}, Starts: ${tripDate}, Ends: ${endDate}, Budget: $${budget}`,
      });
    } catch (error) {
      alert("Unable to share trip");
    }
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Viewtrip", {
                    tripId: trip.id,
                    user: user,
                    uid: uid,
                  })
                }
                style={[styles.btn, { width: '45%' }]}
              >
                <Text style={{ color: "white" }}>View Trip</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
              onPress={() =>
                addEventToCalendar(
                  trip.trip.destination,
                  trip.trip.tripDate,
                  trip.trip.endDate,
                  trip.trip.budget
                )
              }
              style={styles.btn}
            >
              <Text style={{ color: "white" }}>Add to Calendar</Text>
            </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() =>
                  shareTrip(
                    trip.trip.destination,
                    formatDate(trip.trip.tripDate),
                    formatDate(trip.trip.endDate),
                    trip.trip.budget
                  )
                }
                style={[styles.btn, { width: '45%' }]}
              >
                <Text style={{ color: "white" }}>Share Trip</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
