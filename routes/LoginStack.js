// core
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import HomeDrawer from "./HomeDrawer";
import Login from "../screens/credentials/Login";

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Login}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={HomeDrawer} />
    </Stack.Navigator>
  );
}
