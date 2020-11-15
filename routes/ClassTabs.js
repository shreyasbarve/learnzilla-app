// core
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// components
import Students from "../screens/teacher/inclass/Students";
import Attendance from "../screens/teacher/inclass/Attendance";
import Assignments from "../screens/teacher/inclass/Assignments";
import Marks from "../screens/teacher/inclass/Marks";

const Tab = createBottomTabNavigator();

export default function ClassTabs() {
  return (
    <Tab.Navigator initialRouteName="tstudents">
      <Tab.Screen name="tstudents" component={Students} />
      <Tab.Screen name="tattendance" component={Attendance} />
      <Tab.Screen name="tassignments" component={Assignments} />
      <Tab.Screen name="tmarks" component={Marks} />
    </Tab.Navigator>
  );
}
