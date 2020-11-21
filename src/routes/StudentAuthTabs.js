// core
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";

// components
import Login from "../screens/student/auth/Login";
import SignUp from "../screens/student/auth/SignUp";

const Tab = createBottomTabNavigator();

export default function StudentAuthTabs() {
  return (
    <Tab.Navigator
      initialRouteName="login"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "slogin") {
            iconName = "ios-log-in";
          } else if (route.name === "ssignup") {
            iconName = "ios-create";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="slogin"
        component={Login}
        options={() => ({
          title: "Login",
        })}
      />
      <Tab.Screen
        name="ssignup"
        component={SignUp}
        options={() => ({
          title: "SignUp",
        })}
      />
    </Tab.Navigator>
  );
}
