// core
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";

// components
import Login from "../screens/teacher/auth/Login";
import SignUp from "../screens/teacher/auth/SignUp";

const Tab = createBottomTabNavigator();

export default function AuthTabs() {
  return (
    <Tab.Navigator
      initialRouteName="login"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "tlogin") {
            iconName = "ios-log-in";
          } else if (route.name === "tsignup") {
            iconName = "ios-create";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="tlogin"
        component={Login}
        options={() => ({
          title: "Login",
        })}
      />
      <Tab.Screen
        name="tsignup"
        component={SignUp}
        options={() => ({
          title: "SignUp",
        })}
      />
    </Tab.Navigator>
  );
}
