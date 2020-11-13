// core
import React from "react";
import { Card, CardItem, Body, Text, Left, Button, Icon } from "native-base";

export default function MyCard({ id, std, section, subject, students }) {
  return (
    <Card style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
      <CardItem>
        <Body>
          <Text>
            {std} {section}
          </Text>
          <Text note>{subject}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent textStyle={{ color: "#87838B" }}>
            <Icon name="md-people" />
            <Text>{students}</Text>
          </Button>
        </Left>
      </CardItem>
    </Card>
  );
}
