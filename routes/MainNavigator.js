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
        <Stack.Screen name="auth" component={AuthTabs} />
        <Stack.Screen name="home" component={HomeTabs} />
        <Stack.Screen name="class" component={ClassTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
