// core
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import Home from "../screens/teacher/Home";
import InClass from "../screens/teacher/InClass";

const Stack = createStackNavigator();

export default function ClassStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="InClass" component={InClass} />
    </Stack.Navigator>
  );
}
