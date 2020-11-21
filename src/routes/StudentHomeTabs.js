// core
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";

// components
import Dashboard from "../screens/student/Dashboard";
import Profile from "../screens/student/Profile";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="sdashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "sdashboard") {
            iconName = "md-today";
          } else if (route.name === "sprofile") {
            iconName = "ios-person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="sdashboard"
        component={Dashboard}
        options={() => ({
          title: "Dashboard",
        })}
      />
      <Tab.Screen
        name="sprofile"
        component={Profile}
        options={() => ({
          title: "Profile",
        })}
      />
    </Tab.Navigator>
  );
}
