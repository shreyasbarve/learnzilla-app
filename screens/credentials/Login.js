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
import React from "react";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

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
            <Input />
          </Item>

          <Item stackedLabel>
            <Label>Password</Label>
            <Input />
          </Item>

          <Button
            onPress={() => navigation.navigate("Home")}
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
