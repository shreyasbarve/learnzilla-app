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
import { ProgressBar, Colors } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import storage from "@react-native-community/async-storage";

// api
import TeacherApi from "../../../api/TeacherApi";

// component
import Card2 from "../../../components/Card2";

export default function Assignments() {
  //navigation
  const navigation = useNavigation();

  // if get all assignmets display
  const [loading, setLoading] = useState(true);

  // get assignments
  const [assignments, setAssignments] = useState([]);
  const getAssignments = async () => {
    try {
      const values = await storage.multiGet(["classid"]);
      const res = await TeacherApi.getAssignments(values[0][1]);
      setAssignments(res.data);
      setLoading(false);
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
    getAssignments();
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Container>
          <ProgressBar indeterminate color={Colors.blue800} />
        </Container>
      ) : (
        <Container>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left>
              <Button
                dark
                transparent
                onPress={() => navigation.navigate("tdashboard")}
              >
                <Icon name="md-arrow-round-back" />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "#000" }}>Assignments</Title>
            </Body>
            <Right>
              <Button transparent hasText>
                <Text style={{ color: "#000" }}>Add</Text>
              </Button>
            </Right>
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
      )}
    </>
  );
}
