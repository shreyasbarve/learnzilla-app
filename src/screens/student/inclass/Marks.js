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

export default function Marks() {
  //navigation
  const navigation = useNavigation();

  // get marks
  const [marks, setMarks] = useState([]);
  const getMarks = async () => {
    try {
      const values = await storage.multiGet(["sid"]);
      const res = await StudentApi.getMarks(values[0][1]);
      setMarks(res.data);
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
          <Button transparent onPress={() => navigation.navigate("sdashboard")}>
            <Icon name="md-arrow-round-back" />
          </Button>
        </Left>
        <Body>
          <Title>Marks</Title>
        </Body>
      </Header>
      <Content>
        {marks.map((mData) => (
          <Card2
            title={mData.assignment_title}
            subtitle={mData.assignment_date.substring(0, 10)}
            content={`Marks: ${mData.mark_obtain}/${mData.total_marks}`}
            isAction={false}
          />
        ))}
      </Content>
    </Container>
  );
}
