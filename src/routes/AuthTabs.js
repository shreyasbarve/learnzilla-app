// core
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";

// components
import Login from "../screens/authentication/Login";
import SignUp from "../screens/authentication/SignUp";

const Tab = createBottomTabNavigator();

export default function AuthTabs() {
  return (
    <Tab.Navigator
      initialRouteName="login"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "login") {
            iconName = "ios-log-in";
          } else if (route.name === "signup") {
            iconName = "ios-create";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="login" component={Login} />
      <Tab.Screen name="signup" component={SignUp} />
    </Tab.Navigator>
  );
}
