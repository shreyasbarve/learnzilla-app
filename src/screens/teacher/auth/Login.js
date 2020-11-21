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
  Toast,
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
    email: "teacher@gmail.com",
    password: "octahacks123",
  });

  const loginTeacher = async () => {
    try {
      const { data: loginRes } = await TeacherApi.login(teacherData);
      try {
        const { data: detailsRes } = await TeacherApi.details({
          email: loginRes.email,
          key: loginRes.key,
        });
        Toast.show({
          text: "Login Succesful!",
          buttonText: "Okay",
          position: "top",
          type: "success",
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
        Toast.show({
          text: "Login Failed!",
          buttonText: "Okay",
          position: "top",
          type: "danger",
        });
        console.log(error);
      }
    } catch (error) {
      Toast.show({
        text: "Login Failed!",
        buttonText: "Okay",
        position: "top",
        type: "danger",
      });
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
      <Header noLeft style={{ backgroundColor: "#fff" }}>
        <Body>
          <Title style={{ color: "#000" }}>Teacher Login</Title>
        </Body>
        <Right>
          <Button dark transparent iconLeft onPress={handleBack}>
            <Icon name="ios-exit" />
            <Text>Exit</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <Thumbnail
          large
          source={{
            uri: "https://image.flaticon.com/icons/png/512/234/234694.png",
          }}
          style={{
            alignSelf: "center",
            marginTop: 30,
            height: 150,
            width: 150,
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
