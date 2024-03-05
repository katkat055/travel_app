import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userRef = doc(database, "users", user.uid);
      await setDoc(userRef, {
        displayName: name,
        email: email,
        uid: user.uid,
        phoneNumber: "",
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View>
      {/* White Overlay */}
      <View />
      {/* Title */}
      <Text>Sign Up</Text>
      <View>
        {/* Input Fields */}
        <TextInput
          placeholder="Enter name"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          showSoftInputOnFocus={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {/* Signup Button */}
        <TouchableOpacity onPress={onHandleSignup}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        {/* Navigation to Login Screen */}
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* StatusBar */}
    </View>
  );
}
