// core
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";

// components
import Dashboard from "../screens/teacher/Dashboard";
import Profile from "../screens/teacher/Profile";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="tdashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "tdashboard") {
            iconName = "md-today";
          } else if (route.name === "tprofile") {
            iconName = "ios-person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="tdashboard"
        component={Dashboard}
        options={() => ({
          title: "Dashboard",
        })}
      />
      <Tab.Screen
        name="tprofile"
        component={Profile}
        options={() => ({
          title: "Profile",
        })}
      />
    </Tab.Navigator>
  );
}
