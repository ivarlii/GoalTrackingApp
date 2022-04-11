import { Card, Col, Row } from "antd";

const cardStyle = {
  marginTop: "0 auto",
  border: "1px solid #e0e0e0",
  borderRadius: 5,
};

const cardBodyStyle = {
  width: "100%",
  height: "calc(38rem - 30px",
  overflow: "auto",
};

const ImprovementComponent = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card
          title={"Improvement Panel"}
          style={cardStyle}
          bodyStyle={cardBodyStyle}
        >
          <p>
            {"Lorem Ipsum is simply dummy text of the printing and typesetting\n" +
              "              industry. Lorem Ipsum has been the industry's standard dummy text\n" +
              "              ever since the 1500s, when an unknown printer took a galley of type\n" +
              "              and scrambled it to make a type specimen book. It has survived not\n" +
              "              only five centuries, but also the leap into electronic typesetting,\n" +
              "              remaining essentially unchanged. It was popularised in the 1960s\n" +
              "              with the release of Letraset sheets containing Lorem Ipsum passages,\n" +
              "              and more recently with desktop publishing software like Aldus\n" +
              "              PageMaker including versions of Lorem Ipsum."}
          </p>
        </Card>
      </Col>
      <Col span={18}>
        <Card
          title={"Improvement Details"}
          style={cardStyle}
          bodyStyle={cardBodyStyle}
        >
          <p>
            {"  Lorem Ipsum is simply dummy text of the printing and typesetting\n" +
              "            industry. Lorem Ipsum has been the industry's standard dummy text\n" +
              "            ever since the 1500s, when an unknown printer took a galley of type\n" +
              "            and scrambled it to make a type specimen book. It has survived not\n" +
              "            only five centuries, but also the leap into electronic typesetting,\n" +
              "            remaining essentially unchanged. It was popularised in the 1960s\n" +
              "            with the release of Letraset sheets containing Lorem Ipsum passages,\n" +
              "            and more recently with desktop publishing software like Aldus\n" +
              "            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply\n" +
              "            dummy text of the printing and typesetting industry. Lorem Ipsum has\n" +
              "            been the industry's standard dummy text ever since the 1500s, when\n" +
              "            an unknown printer took a galley of type and scrambled it to make a\n" +
              "            type specimen book. It has survived not only five centuries, but\n" +
              "            also the leap into electronic typesetting, remaining essentially\n" +
              "            unchanged. It was popularised in the 1960s with the release of\n" +
              "            Letraset sheets containing Lorem Ipsum passages, and more recently\n" +
              "            with desktop publishing software like Aldus PageMaker including\n" +
              "            versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the\n" +
              "            printing and typesetting industry. Lorem Ipsum has been the\n" +
              "            industry's standard dummy text ever since the 1500s, when an unknown\n" +
              "            printer took a galley of type and scrambled it to make a type\n" +
              "            specimen book. It has survived not only five centuries, but also the\n" +
              "            leap into electronic typesetting, remaining essentially unchanged.\n" +
              "            It was popularised in the 1960s with the release of Letraset sheets\n" +
              "            containing Lorem Ipsum passages, and more recently with desktop\n" +
              "            publishing software like Aldus PageMaker including versions of Lorem\n" +
              "            Ipsum."}
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default ImprovementComponent;
