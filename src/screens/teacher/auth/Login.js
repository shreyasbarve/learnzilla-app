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
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";

// API
import TeacherApi from "../../../models/teacher/TeacherApi";

export default function Login() {
  const navigation = useNavigation();

  // data for login
  const [teacherData, setTeacherData] = useState({
    email: "teacher@gmail.com",
    password: "12345",
  });

  const loginTeacher = async (e) => {
    try {
      const res1 = await TeacherApi.login(teacherData);
      console.log(res1.data);
      const res2 = await TeacherApi.getTeacherDetails({
        email: res1.data.email,
        key: res1.data.key,
      });
      console.log(res2.data);
      navigation.navigate("thome");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>Login Page</Title>
        </Body>
        <Right>
          <Button transparent iconLeft onPress={() => BackHandler.exitApp()}>
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
            onPress={loginTeacher}
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
