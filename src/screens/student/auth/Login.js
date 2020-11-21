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
import StudentApi from "../../../api/StudentApi";

export default function Login() {
  // navigation
  const navigation = useNavigation();

  // data for login
  const [studentData, setStudentData] = useState({
    email: "student@gmail.com",
    password: "octahacks123",
  });

  const loginStudent = async () => {
    try {
      const { data: loginRes } = await StudentApi.login(studentData);
      const { data: detailsRes } = await StudentApi.getStudentDetails({
        email: loginRes.email,
        key: loginRes.key,
      });
      await storage.multiSet([
        ["smail", loginRes.email],
        ["skey", loginRes.key],
        ["sname", detailsRes[0].name],
        ["sphone", detailsRes[0].phone_number],
        ["sid", JSON.stringify(detailsRes[0].id)],
      ]);
      Toast.show({
        text: "Login Succesful!",
        buttonText: "Okay",
      });
      navigation.navigate("shome");
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
      <Header noLeft style={{ backgroundColor: "#fff" }}>
        <Body>
          <Title style={{ color: "#000" }}>Student Login</Title>
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
            uri:
              "https://www.vhv.rs/dpng/d/156-1566120_png-logo-for-student-transparent-png.png",
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
              value={studentData.email}
              onChangeText={(e) => setStudentData({ ...studentData, email: e })}
            />
          </Item>

          <Item stackedLabel>
            <Label>Password</Label>
            <Input
              keyboardType="default"
              secureTextEntry={true}
              value={studentData.password}
              onChangeText={(e) =>
                setStudentData({ ...studentData, password: e })
              }
            />
          </Item>

          <Button
            onPress={loginStudent}
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
