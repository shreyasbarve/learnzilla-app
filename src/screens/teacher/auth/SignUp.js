// core
import { useNavigation } from "@react-navigation/native";
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
import React, { useState } from "react";

// api
import TeacherApi from "../../../api/TeacherApi";

export default function SignUp() {
  // navigation
  const navigation = useNavigation();

  // teacher data
  const [teacherData, setTeacherData] = useState({
    institution_email: "patna@gmail.com",
    email: "",
    name: "",
    phone_number: "",
    password: "",
  });

  // signup
  const signUpTeacher = async () => {
    try {
      await TeacherApi.signup(teacherData);
      Toast.show({
        text: "SignUp Succesful!",
        buttonText: "Okay",
        position: "top",
        type: "success",
      });
    } catch (error) {
      Toast.show({
        text: "SignUp Failed!",
        buttonText: "Okay",
        position: "top",
        type: "danger",
      });
      console.log(error);
    }
    navigation.navigate("tlogin");
  };

  return (
    <Container>
      <Header noLeft style={{ backgroundColor: "#fff" }}>
        <Body>
          <Title style={{ color: "#000" }}>Teacher SignUp</Title>
        </Body>
        <Right>
          <Button dark transparent iconLeft onPress={() => navigation.goBack()}>
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
            <Label>Full Name</Label>
            <Input
              keyboardType="default"
              value={teacherData.name}
              onChangeText={(e) => setTeacherData({ ...teacherData, name: e })}
            />
          </Item>

          <Item stackedLabel>
            <Label>Email Address</Label>
            <Input
              keyboardType="email-address"
              value={teacherData.email}
              onChangeText={(e) => setTeacherData({ ...teacherData, email: e })}
            />
          </Item>

          <Item stackedLabel>
            <Label>Mobile Number</Label>
            <Input
              keyboardType="phone-pad"
              value={teacherData.phone_number}
              maxLength={10}
              onChangeText={(e) =>
                setTeacherData({ ...teacherData, phone_number: e })
              }
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
            onPress={signUpTeacher}
            rounded
            style={{ alignSelf: "center", marginTop: 40 }}
          >
            <Text>Sign Up</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
