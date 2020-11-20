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

export default function Students() {
  // navigation
  const navigation = useNavigation();

  // get students
  const [students, setStudents] = useState([]);
  const getStudents = async () => {
    try {
      const values = await storage.multiGet(["tmail", "tkey", "classid"]);
      studentData.teacher_email = values[0][1];
      studentData.classroom_id = values[1][1];
      studentData.key = values[2][1];
      const res = await TeacherApi.getStudents(
        { email: values[0][1], key: values[1][1] },
        values[2][1]
      );
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // add student
  let studentData = {
    teacher_email: "", // from login
    classroom_id: "", // from dasshboard
    student_email: "",
    key: "", // from login
  };

  const addStudent = async () => {
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
    getStudents();
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
        {students.map((sData) => (
          <MyCard
            key={sData.student_id}
            id={sData.student_id}
            std={sData.student_email}
            section={sData.student_name}
            subject={sData.student_phone_no}
          />
        ))}
      </Content>
    </Container>
  );
}
