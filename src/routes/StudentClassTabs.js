// core
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";

// components
import Students from "../screens/student/inclass/Students";
import Attendance from "../screens/student/inclass/Attendance";
import Assignments from "../screens/student/inclass/Assignments";
import Marks from "../screens/student/inclass/Marks";

const Tab = createBottomTabNavigator();

export default function ClassTabs() {
  return (
    <Tab.Navigator
      initialRouteName="sstudents"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "sstudents") {
            iconName = "ios-people";
          } else if (route.name === "sattendance") {
            iconName = "ios-journal";
          } else if (route.name === "sassignments") {
            iconName = "ios-list-box";
          } else if (route.name === "smarks") {
            iconName = "ios-podium";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="sstudents"
        component={Students}
        options={() => ({
          title: "Students",
        })}
      />
      <Tab.Screen
        name="sattendance"
        component={Attendance}
        options={() => ({
          title: "Attendance",
        })}
      />
      <Tab.Screen
        name="sassignments"
        component={Assignments}
        options={() => ({
          title: "Assigments",
        })}
      />
      <Tab.Screen
        name="smarks"
        component={Marks}
        options={() => ({
          title: "Marks",
        })}
      />
    </Tab.Navigator>
  );
}
