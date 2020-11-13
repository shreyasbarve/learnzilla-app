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
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  // navigation
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent iconLeft onPress={() => navigation.openDrawer()}>
            <Icon name="md-menu" />
          </Button>
        </Left>
        <Body style={{ marginLeft: -60 }}>
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
            <Input />
          </Item>

          <Item stackedLabel>
            <Label>Email</Label>
            <Input />
          </Item>

          <Item stackedLabel>
            <Label>Mobile</Label>
            <Input />
          </Item>

          <Item stackedLabel>
            <Label>Institution Email</Label>
            <Input />
          </Item>

          <Item stackedLabel>
            <Label>Old Password</Label>
            <Input />
          </Item>

          <Item stackedLabel>
            <Label>New Password</Label>
            <Input />
          </Item>

          <Button
            onPress={() => navigation.navigate("Home")}
            iconRight
            rounded
            style={{ alignSelf: "center", marginTop: 40 }}
          >
            <Text>change Password</Text>
            <Icon name="ios-key" />
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
