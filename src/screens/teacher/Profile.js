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
  Left,
  Button,
  Text,
  Icon,
  Content,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import TeacherApi from "../../models/teacher/TeacherApi";

export default function Profile() {
  // navigation
  const navigation = useNavigation();

  // change password
  const [teacherData, setTeacherData] = useState({
    name: "teachername", // from login
    email: "teacheremail", // from login
    password: "",
    newpass: "",
    key: "teacherkey", // from login
  });
  const changePassword = async () => {
    console.log(teacherData);
    // try {
    //   await TeacherApi.changePassword(teacherData, "Teacher Name from login");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // if harware back button pressed
  const handleBack = () => {
    navigation.navigate("tdashboard");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("tdashboard")}>
            <Icon name="md-arrow-round-back" />
          </Button>
        </Left>
        <Body>
          <Title>Profile</Title>
        </Body>
      </Header>
      <Content>
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
            <Label>Name</Label>
            <Input disabled value={teacherData.name} />
          </Item>

          <Item stackedLabel>
            <Label>Email</Label>
            <Input disabled value={teacherData.email} />
          </Item>

          <Item stackedLabel>
            <Label>Mobile</Label>
            <Input value={"from login"} />
          </Item>

          <Item stackedLabel>
            <Label>Institution Email</Label>
            <Input disabled value={"from login"} />
          </Item>

          <Item stackedLabel>
            <Label>Old Password</Label>
            <Input
              secureTextEntry={true}
              value={teacherData.password}
              onChangeText={(e) =>
                setTeacherData({ ...teacherData, password: e })
              }
            />
          </Item>

          <Item stackedLabel>
            <Label>New Password</Label>
            <Input
              secureTextEntry={true}
              value={teacherData.newpass}
              onChangeText={(e) =>
                setTeacherData({ ...teacherData, newpass: e })
              }
            />
          </Item>

          <Button
            onPress={() => navigation.navigate("Home")}
            rounded
            style={{ alignSelf: "center", marginTop: 40 }}
          >
            <Text>change Password</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
