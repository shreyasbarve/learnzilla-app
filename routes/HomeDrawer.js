// core
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// screens
import ClassStack from "./ClassStack";
import Profile from "../screens/teacher/Profile";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "md-home";
          } else if (route.name === "Profile") {
            iconName = "ios-list-box";
          }
          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
      initialRouteName={ClassStack}
    >
      <Drawer.Screen name="Home" component={ClassStack} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
