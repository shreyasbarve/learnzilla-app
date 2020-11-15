// core
import {
  Container,
  Header,
  Form,
  Item,
  Input,
  Label,
  Body,
  Title,
  Right,
  Button,
  Text,
  Icon,
  Thumbnail,
  Content,
} from "native-base";
import React, { useState } from "react";
// import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TeacherApi from "../../models/teacher/TeacherApi";
import axios from "axios";

export default function Login() {
  const navigation = useNavigation();

  const [teacherData, setTeacherData] = useState({
    email: "",
    password: "",
  });

  const authenticateTeacher = async (e) => {
    try {
      console.log(teacherData);
      const res1 = await TeacherApi.login(teacherData);
      console.log(res1.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>Login Page</Title>
        </Body>
        <Right>
          {/* <Button transparent iconLeft onPress={() => BackHandler.exitApp()}> */}
          <Button transparent iconLeft>
            <Icon name="ios-exit" />
            <Text>Exit</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <Thumbnail
          large
          source={{
            uri:
              "https://facebook.github.io/react-native/docs/assets/favicon.png",
          }}
          style={{
            alignSelf: "center",
            marginTop: 30,
          }}
        />

        <Form
          style={{
            marginTop: 30,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 30,
            elevation: 3,
            borderStyle: "solid",
            padding: 20,
          }}
        >
          <Item stackedLabel>
            <Label>Email Address</Label>
            <Input
              keyboardType="email-address"
              value={teacherData.email}
              onChangeText={(e) => setTeacherData({ ...teacherData, email: e })}
            />
          </Item>

          <Item stackedLabel>
            <Label>Password</Label>
            <Input
              keyboardType="default"
              secureTextEntry={true}
              value={teacherData.password}
              onChangeText={(e) =>
                setTeacherData({ ...teacherData, password: e })
              }
            />
          </Item>

          <Button
            onPress={authenticateTeacher}
            iconRight
            rounded
            style={{ alignSelf: "center", marginTop: 40 }}
          >
            <Text>Log In</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
