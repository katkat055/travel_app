import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home"
import Addtrip from "./components/Addtrip"
import Viewtrip from "./components/Viewtrip"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Addtrip" component={Addtrip} />
        <Stack.Screen name="Viewtrip" component={Viewtrip} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
