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

// API
import TeacherApi from "../../../models/teacher/TeacherApi";

export default function Attendance() {
  // navigation
  const navigation = useNavigation();

  // get attendance
  const [attendance, setAttendance] = useState([]);
  const getAttendance = async () => {
    try {
      const res = await TeacherApi.getAttendance("classId");
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
    // getAttendance();
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
        <Text>Attendance</Text>
      </Content>
    </Container>
  );
}
