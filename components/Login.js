import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { styles } from "../styles.js";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // If login successful, navigate to another screen
          navigation.navigate("Home");
          console.log("Login success");
        })
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  return (
    <View style={styles.questions}>
      {/* White Overlay */}
      <View />
      {/* Title */}
      <Text style={styles.title}>Login</Text>
      <View style={{ width: "70%" }}>
        {/* Input Fields */}
        <TextInput
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.form}
        />
        <TextInput
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.form}
        />
        {/* Login Button */}
        <TouchableOpacity onPress={onHandleLogin} style={styles.btn}>
          <Text style={{ color: "white" }}>Log In</Text>
        </TouchableOpacity>
        {/* Navigation to Signup Screen */}
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.underline}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
