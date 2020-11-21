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
  Toast,
} from "native-base";
import { ProgressBar, Colors } from "react-native-paper";

import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import storage from "@react-native-community/async-storage";

// api
import TeacherApi from "../../../api/TeacherApi";

// component
import Card2 from "../../../components/Card2";

export default function Marks() {
  //navigation
  const navigation = useNavigation();

  // if get all marks display
  const [loading, setLoading] = useState(true);

  // get marks
  const [marks, setMarks] = useState([]);
  const getMarks = async () => {
    try {
      const values = await storage.multiGet(["classid"]);
      const res = await TeacherApi.getMarks(values[0][1]);
      setMarks(res.data);
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
    getMarks();
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
              <Title style={{ color: "#000" }}>Marks</Title>
            </Body>
            <Right>
              <Button transparent hasText onPress={getMarks}>
                <Text style={{ color: "#000" }}>Update</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            {marks.map((mData) => (
              <Card2
                title={mData.assignment_title}
                subtitle={mData.assignment_date.substring(0, 10)}
                content={`Name: ${mData.student_name}\nMarks: ${mData.mark_obtain}/${mData.total_marks}`}
                isAction={false}
              />
            ))}
          </Content>
        </Container>
      )}
    </>
  );
}
