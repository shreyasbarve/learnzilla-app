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
import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import storage from "@react-native-community/async-storage";

// api
import TeacherApi from "../../../api/TeacherApi";

export default function Login() {
  // navigation
  const navigation = useNavigation();

  // data for login
  const [teacherData, setTeacherData] = useState({
    email: "",
    password: "",
  });

  const loginTeacher = async () => {
    try {
      const { data: loginRes } = await TeacherApi.login(teacherData);
      const { data: detailsRes } = await TeacherApi.details({
        email: loginRes.email,
        key: loginRes.key,
      });
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

  // goback
  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>Login Page</Title>
        </Body>
        <Right>
          <Button transparent iconLeft onPress={handleBack}>
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
