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

export default function Students() {
  // navigation
  const navigation = useNavigation();

  // get students
  const [students, setStudents] = useState([]);
  const getStudents = async () => {
    try {
      const res = await TeacherApi.getStudents(
        { email: "from login", password: "from login" },
        "classId"
      );
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // add student
  const [studentData, setStudentData] = useState({
    teacher_email: "teacheremail", // from login
    classroom_id: "classid", // from dasshboard
    student_email: "",
    key: "teacherkey", // from login
  });
  const addStudent = async () => {
    console.log(studentData);
    try {
      await TeacherApi.addStudent(studentData);
      getStudents();
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
    // getStudents();
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
          <Title>Students</Title>
        </Body>
        <Right>
          <Button transparent hasText>
            <Text>Add Student</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <Text>Students</Text>
      </Content>
    </Container>
  );
}
