// core
import React, { useEffect, useState } from "react";
import { Container, Header, Content, Spinner } from "native-base";

// API
import TeacherApi from "../../models/teacher/TeacherApi";

// components
import MyCard from "../../components/MyCard";

export default function InClass({ route }) {
  const classId = route.params?.classId ?? "1";

  // get class data
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState([]);
  const loadClass = async () => {
    try {
      const res = await TeacherApi.class(classId);
      setClassData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadClass();
  }, []);

  return (
    <>
      {loading ? (
        <Container>
          <Spinner color="blue" />
        </Container>
      ) : (
        <Container>
          <Header></Header>
          <Content>
            <MyCard
              id={classData.id}
              std={classData.username}
              section={classData.email}
              subject={classData.phone}
              students={classData.website}
            />
          </Content>
        </Container>
      )}
    </>
  );
}
