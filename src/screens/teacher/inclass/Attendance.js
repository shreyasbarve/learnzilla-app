// core
import { useNavigation } from "@react-navigation/native";
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
} from "native-base";
import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import storage from "@react-native-community/async-storage";

// api
import TeacherApi from "../../../api/TeacherApi";

// components
import MyCard from "../../../components/MyCard";

export default function Attendance() {
  // navigation
  const navigation = useNavigation();

  // get attendance
  const [attendance, setAttendance] = useState([]);
  const getAttendance = async () => {
    try {
      const values = await storage.multiGet(["classid"]);
      const res = await TeacherApi.getAttendance(values[0][1]);
      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // if harware back button pressed
  const handleBack = () => {
    navigation.navigate("thome");
    return true;
  };

  useEffect(() => {
    getAttendance();
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("tdashboard")}>
            <Icon name="md-arrow-round-back" />
          </Button>
        </Left>
        <Body>
          <Title>Attendance</Title>
        </Body>
        <Right>
          <Button transparent hasText>
            <Text>Update</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        {attendance.map((aData) => (
          <MyCard
            key={aData.name}
            id={aData.name}
            std={aData.name}
            section={""}
            subject={aData.date.substring(0, 10)}
            students={aData.attendance_status}
          />
        ))}
      </Content>
    </Container>
  );
}
