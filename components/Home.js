import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Share,
  Alert,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import * as Calendar from "expo-calendar";
import { styles } from "../styles.js";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation, route }) {
  const { user, name, uid } = route.params;
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(0);

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

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (uid) {
          const collectionRef = collection(db, `users/${uid}/trips`);
          const querySnapshot = await getDocs(collectionRef);
          let tripsList = [];
          querySnapshot.forEach((doc) => {
            tripsList.push({ id: doc.id, trip: doc.data() });
          });
          setTrips(tripsList);
          setLoading(false);
        }
      };
      fetchData();
    }, [uid])
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  const updateBudget = async (tripId, updatedBudget) => {
    try {
      const tripRef = doc(db, `users/${uid}/trips/${tripId}`);
      await updateDoc(tripRef, { budget: updatedBudget });
      console.log("Budget updated successfully in Firebase Firestore");
    } catch (error) {
      console.error("Error updating budget in Firebase Firestore:", error);
    }
  };

  const handleBudgetUpdate = async (tripId, amountToSubtract) => {
    const updatedTrips = trips.map((trip) => {
      if (trip.id === tripId) {
        const updatedBudget = trip.trip.budget - amountToSubtract;
        updateBudget(tripId, updatedBudget);
        return { ...trip, trip: { ...trip.trip, budget: updatedBudget } };
      }
      return trip;
    });
    setTrips(updatedTrips);
  };

  const handleInputChange = (tripId, value) => {
    setInputValue({ ...inputValue, [tripId]: value });
  };

  const handleSubtract = (tripId, amount) => {
    const amountToSubtract = parseFloat(amount);
    if (!isNaN(amountToSubtract)) {
      handleBudgetUpdate(tripId, amountToSubtract);
      handleInputChange(tripId, "");
    }
  };

  // const addToCalendar = async (destination, tripDate, endDate) => {
  //   try {
  //     const { status } = await Calendar.requestCalendarPermissionsAsync();
  //     if (status === "granted") {
  //       const calendars = await Calendar.getCalendarsAsync(
  //         Calendar.EntityTypes.EVENT
  //       );
  //       const defaultCalendar = calendars.find((cal) => cal.isPrimary);
  //       if (defaultCalendar) {
  //         const eventDetails = {
  //           title: `Trip to ${destination}`,
  //           startDate: new Date(tripDate),
  //           endDate: new Date(endDate),
  //           timeZone: "local",
  //           accessLevel: Calendar.CalendarAccessLevel.DEFAULT,
  //         };
  //         await Calendar.createEventAsync(defaultCalendar.id, eventDetails);
  //         Alert.alert("Success", "Trip added to calendar!");
  //       } else {
  //         Alert.alert(
  //           "Calendar Not Found",
  //           "No primary calendar found. Please make sure you have a primary calendar set up on your device."
  //         );
  //       }
  //     } else {
  //       Alert.alert(
  //         "Permission Denied",
  //         "Calendar access permission is required to add trips to your calendar."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error adding trip to calendar:", error);
  //     Alert.alert(
  //       "Error",
  //       "Failed to add trip to calendar. Please try again later."
  //     );
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
    <ScrollView style={styles.allpadding}>
      <Text style={styles.title}>Welcome, {name}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Addtrip", { user: { uid: uid }, name: name })
        }
        style={styles.btn}
      >
        <Text style={{ color: "white" }}>Add Trip</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        {trips.map((trip) => (
          <View key={trip.id} style={styles.form}>
            {/* Trip information */}
            <Text>Destination: {trip.trip.destination}</Text>
            <Text>Start Date: {formatDate(trip.trip.tripDate)}</Text>
            <Text>End Date: {formatDate(trip.trip.endDate)}</Text>
            <Text>Budget: ${trip.trip.budget}</Text>
            {/* Action buttons */}
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
                    name: name,
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
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
            </View>
            {/* Input field for amount spent */}
            <TextInput
              placeholder="Enter amount spent"
              onChangeText={(text) => handleInputChange(trip.id, text)}
              value={inputValue[trip.id] || ""}
              style={{
                width: "100%",
                borderWidth: 1,
                marginTop: 10,
                padding: 5,
              }}
              keyboardType="numeric"
            />
            {/* Submit button */}
            <Button
              title="Submit"
              onPress={() => handleSubtract(trip.id, inputValue[trip.id] || "")}
            />
            {/* Remaining budget */}
            {/* <Text>
              Remaining Budget:{" "}
              {trip.trip.budget - parseFloat(inputValue[trip.id] || 0)}
            </Text> */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
