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
import StudentApi from "../../../api/StudentApi";

// component
import MyCard from "../../../components/MyCard";

export default function Assignments() {
  //navigation
  const navigation = useNavigation();

  // get assignments
  const [assignments, setAssignments] = useState([]);
  const getAssignments = async () => {
    try {
      const values = await storage.multiGet(["classid"]);
      const res = await StudentApi.getAssignments(values[0][1]);
      setAssignments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // if harware back button pressed
  const handleBack = () => {
    navigation.navigate("shome");
    return true;
  };

  useEffect(() => {
    getAssignments();
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("sdashboard")}>
            <Icon name="md-arrow-round-back" />
          </Button>
        </Left>
        <Body>
          <Title>Assignments</Title>
        </Body>
      </Header>
      <Content>
        {assignments.map((aData) => (
          <MyCard
            key={aData.title}
            id={aData.id}
            std={aData.title}
            section={""}
            subject={aData.assign_url}
            students={aData.date.substring(0, 10)}
          />
        ))}
      </Content>
    </Container>
  );
}
