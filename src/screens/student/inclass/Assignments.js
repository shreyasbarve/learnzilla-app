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
import Card2 from "../../../components/Card2";

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
          <Card2
            title={aData.title}
            subtitle={aData.date.substring(0, 10)}
            content={aData.assign_url}
            isAction={true}
          />
        ))}
      </Content>
    </Container>
  );
}
