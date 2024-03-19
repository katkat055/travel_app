import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { styles } from "../styles.js";

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
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        displayName: name,
        email: email,
        uid: user.uid,
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.questions}>
      {/* White Overlay */}
      <View />
      {/* Title */}
      <Text style={styles.title}>Sign Up</Text>
      <View style={{ width: "70%" }}>
        {/* Input Fields */}
        <TextInput
          placeholder="Enter name"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.form}
        />
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
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.form}
        />
        {/* Signup Button */}
        <TouchableOpacity onPress={onHandleSignup} style={styles.btn}>
          <Text style={{ color: "white" }}>Sign Up</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate("Login", { name } )}>
            <Text style={styles.underline}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
