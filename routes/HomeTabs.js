// core
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// components
import Home from "../screens/teacher/Home";
import Profile from "../screens/teacher/Profile";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="thome">
      <Tab.Screen name="thome" component={Home} />
      <Tab.Screen name="tprofile" component={Profile} />
    </Tab.Navigator>
  );
}
