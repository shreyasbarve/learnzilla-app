import * as React from "react";
import { Linking } from "react-native";
import { Card, Paragraph, Button, Text } from "react-native-paper";

export default function MyComponent({ title, subtitle, content, isAction }) {
  return (
    <Card
      style={{
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        elevation: 5,
        marginBottom: 10,
        paddingBottom: 10,
      }}
    >
      <Card.Title title={title} subtitle={subtitle} />
      <Card.Content>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
      {isAction ? (
        <Card.Actions>
          <Button onPress={() => Linking.openURL(content)}>Go to</Button>
        </Card.Actions>
      ) : null}
    </Card>
  );
}
