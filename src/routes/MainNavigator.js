// core
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// components
import Landing from "../screens/Landing";

// routes
import AuthTabs from "./AuthTabs";
import HomeTabs from "./HomeTabs";
import ClassTabs from "./ClassTabs";

import StudentAuthTabs from "./StudentAuthTabs";
import StudentHomeTabs from "./StudentHomeTabs";
import StudentClassTabs from "./StudentClassTabs";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          animationEnabled: true,
          headerShown: false,
        })}
        initialRouteName="landing"
      >
        <Stack.Screen name="landing" component={Landing} />

        <Stack.Screen name="tauth" component={AuthTabs} />
        <Stack.Screen name="thome" component={HomeTabs} />
        <Stack.Screen name="tclass" component={ClassTabs} />

        <Stack.Screen name="sauth" component={StudentAuthTabs} />
        <Stack.Screen name="shome" component={StudentHomeTabs} />
        <Stack.Screen name="sclass" component={StudentClassTabs} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
