// core
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";

// components
import Students from "../screens/teacher/inclass/Students";
import Attendance from "../screens/teacher/inclass/Attendance";
import Assignments from "../screens/teacher/inclass/Assignments";
import Marks from "../screens/teacher/inclass/Marks";

const Tab = createBottomTabNavigator();

export default function ClassTabs() {
  return (
    <Tab.Navigator
      initialRouteName="tstudents"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "tstudents") {
            iconName = "ios-people";
          } else if (route.name === "tattendance") {
            iconName = "ios-journal";
          } else if (route.name === "tassignments") {
            iconName = "ios-list-box";
          } else if (route.name === "tmarks") {
            iconName = "ios-podium";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="tstudents"
        component={Students}
        options={() => ({
          title: "Students",
        })}
      />
      <Tab.Screen
        name="tattendance"
        component={Attendance}
        options={() => ({
          title: "Attendance",
        })}
      />
      <Tab.Screen
        name="tassignments"
        component={Assignments}
        options={() => ({
          title: "Assigments",
        })}
      />
      <Tab.Screen
        name="tmarks"
        component={Marks}
        options={() => ({
          title: "Marks",
        })}
      />
    </Tab.Navigator>
  );
}
