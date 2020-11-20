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

// component
import MyCard from "../../../components/MyCard";

export default function Marks() {
  //navigation
  const navigation = useNavigation();

  // get marks
  const [marks, setMarks] = useState([]);
  const getMarks = async () => {
    try {
      const values = await storage.multiGet(["classid"]);
      const res = await TeacherApi.getMarks(values[0][1]);
      setMarks(res.data);
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
    getMarks();
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
        {marks.map((mData) => (
          <MyCard
            key={mData.student_name}
            id={mData.student_name}
            std={mData.student_name}
            section={`${mData.mark_obtain}/${mData.total_marks}`}
            subject={mData.assignment_title}
            students={mData.assignment_date.substring(0, 10)}
          />
        ))}
      </Content>
    </Container>
  );
}
