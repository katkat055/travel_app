import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Share, Alert } from "react-native";
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

  const addToCalendar = async (destination, tripDate, endDate) => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        const defaultCalendar = calendars.find((cal) => cal.isPrimary);
        if (defaultCalendar) {
          const eventDetails = {
            title: `Trip to ${destination}`,
            startDate: new Date(tripDate),
            endDate: new Date(endDate),
            timeZone: "local",
            accessLevel: Calendar.CalendarAccessLevel.DEFAULT,
          };
          await Calendar.createEventAsync(defaultCalendar.id, eventDetails);
          Alert.alert("Success", "Trip added to calendar!");
        } else {
          Alert.alert(
            "Calendar Not Found",
            "No primary calendar found. Please make sure you have a primary calendar set up on your device."
          );
        }
      } else {
        Alert.alert(
          "Permission Denied",
          "Calendar access permission is required to add trips to your calendar."
        );
      }
    } catch (error) {
      console.error("Error adding trip to calendar:", error);
      Alert.alert(
        "Error",
        "Failed to add trip to calendar. Please try again later."
      );
    }
  };

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
                style={[styles.btn]}
              >
                <Text style={{ color: "white" }}>View Trip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  shareTrip(
                    trip.trip.destination,
                    formatDate(trip.trip.tripDate),
                    formatDate(trip.trip.endDate),
                    trip.trip.budget
                  )
                }
                style={[styles.btn]}
              >
                <Text style={{ color: "white" }}>Share Trip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  addToCalendar(
                    trip.trip.destination,
                    trip.trip.tripDate.toDate(),
                    trip.trip.endDate.toDate() 
                  )
                }
                style={[styles.btn]}
              >
                <Text style={{ color: "white" }}>Add to Calendar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
