import { useNavigation } from "@react-navigation/native";
import { Container, Content, Thumbnail } from "native-base";
import React, { useEffect } from "react";

export default function Landing() {
  const navigation = useNavigation();

  const url =
    "https://community-cdn-digitalocean-com.global.ssl.fastly.net/variants/tUUE7fdHJPYvQGABUcNKLF6d/035575f2985fe451d86e717d73691e533a1a00545d7230900ed786341dc3c882";

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("tauth");
    }, 500);
  }, []);

  return (
    <Container style={{ alignItems: "center" }}>
      <Content>
        <Thumbnail
          style={{ marginTop: 300 }}
          square
          large
          source={{ uri: url }}
        />
      </Content>
    </Container>
  );
}
