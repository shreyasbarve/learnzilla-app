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

// api
// import TeacherApi from "../../../models/teacher/TeacherApi";

export default function Marks() {
  //navigation
  const navigation = useNavigation();

  // get marks
  const [marks, setMarks] = useState([]);
  const getMarks = async () => {
    // try {
    //   const res = await TeacherApi.getMarks("classId");
    //   setMarks(res.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // if harware back button pressed
  const handleBack = () => {
    navigation.navigate("thome");
    return true;
  };

  useEffect(() => {
    // getMarks();
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
          <Title>Marks</Title>
        </Body>
        <Right>
          <Button transparent hasText>
            <Text>Add</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <Text>Marks</Text>
      </Content>
    </Container>
  );
}
