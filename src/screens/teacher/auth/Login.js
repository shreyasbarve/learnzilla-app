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
import storage from "@react-native-community/async-storage";

// api
import TeacherApi from "../../../models/teacher/TeacherApi";

export default function Login() {
  // navigation
  const navigation = useNavigation();

  // data for login
  const [teacherData, setTeacherData] = useState({
    email: "teacher@gmail.com", //remove these string afterwards
    password: "12345", //remove these string afterwards
  });

  const loginTeacher = async () => {
    try {
      const { data: loginRes } = await TeacherApi.login(teacherData);
      const { data: detailsRes } = await TeacherApi.getTeacherDetails({
        email: loginRes.email,
        key: loginRes.key,
      });
      // var Tdata = {
      //   email: loginRes.email,
      //   key: loginRes.key,
      //   institution_email: detailsRes.institution_email,
      //   name: detailsRes.name,
      //   phone_number: detailsRes.phone_number,
      // };
      // await storage.setItem("tData", JSON.stringify(Tdata));
      await storage.multiSet([
        ["tmail", loginRes.email],
        ["tkey", loginRes.key],
        ["timail", detailsRes.institution_email],
        ["tname", detailsRes.name],
        ["tphone", detailsRes.phone_number],
      ]);
      navigation.navigate("thome");
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
