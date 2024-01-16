import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Select,
  Typography,
  Col,
  Row,
  Form,
  Space,
  Tooltip,
  Flex,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { saveCopy, exportCopy, updateGeneratedCopy } from "../redux/actions";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const MainPage = () => {
  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [body, setBody] = useState("");
  const [fontFamily, setFontFamily] = useState("defaultFont");
  const [textColor, setTextColor] = useState("#000000");

  const dispatch = useDispatch();
  const generatedCopy = useSelector((state) => state.generatedCopy);

  const fetchApi = async ({ headline, subheadline, body }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ headline, subheadline, body }),
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch dynamic content");
      }

      const dynamicContent = await response.json();
      return dynamicContent;
    } catch (error) {
      console.error("Error in fetchDynamicContentAPI:", error);
      throw error;
    }
  };

  const generateCopy = async () => {
    try {
      console.log("Generating copy...");
      const dynamicContent = await fetchApi({
        headline,
        subheadline,
        body,
      });
      console.log(dynamicContent);

      dispatch(updateGeneratedCopy(dynamicContent));
    } catch (error) {
      console.error("Error while fetching content:", error);
    }
  };

  const saveCopyHandler = () => {
    console.log("Saving copy...");
    dispatch(saveCopy(generatedCopy));
  };

  const exportCopyHandler = () => {
    console.log("Exporting copy...");
    dispatch(exportCopy(generatedCopy));
  };

  useEffect(() => {
    const head = document.head || document.getElementsByTagName("head")[0];
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      /\s+/g,
      "+"
    )}:wght@400;700&display=swap`;
    link.rel = "stylesheet";
    head.appendChild(link);

    return () => {
      head.removeChild(link);
    };
  }, [fontFamily]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Flex gap="center" align="center" justify="center">
        <Row options="center" align="center" justify="center">
          <Col className="w-100 max-w-full">
            <Title level={1} align="center" justify="center">
              COPY GENERATION
            </Title>
            <Form layout="vertical">
              <Form.Item label="Headline" style={{ fontWeight: "bold" }}>
                <Input
                  style={{
                    border: "hidden",
                    borderBottom: "1px solid #000",
                    borderRadius: "0",
                  }}
                  value={headline}
                  placeholder="Headline"
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Subheadline" style={{ fontWeight: "bold" }}>
                <Input
                  style={{
                    border: "hidden",
                    borderBottom: "1px solid #000",
                    borderRadius: "0",
                  }}
                  value={subheadline}
                  placeholder="Subheadline"
                  onChange={(e) => setSubheadline(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Body" style={{ fontWeight: "bold" }}>
                <Input.TextArea
                  style={{
                    border: "hidden",
                    borderBottom: "1px solid #000",
                    borderRadius: "0",
                  }}
                  value={body}
                  placeholder="Body"
                  onChange={(e) => setBody(e.target.value)}
                />
              </Form.Item>
            </Form>

            <Space>
              <Select
                value={fontFamily}
                onChange={(value) => setFontFamily(value)}
              >
                <Option value="defaultFont">Default Font</Option>
                <Option value="Roboto">Roboto</Option>
                <Option value="Arial">Arial</Option>
                <Option value="Times New Roman">Times New Roman</Option>
                <Option value="Verdana">Verdana</Option>
              </Select>
              <Input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </Space>

            <Space>
              <Button
                type="primary"
                style={{ borderRadius: "3px", fontWeight: "bold" }}
                ghost
                onClick={generateCopy}
              >
                Generate Copy
              </Button>
              <Tooltip title="Saved Copy">
                <Button onClick={saveCopyHandler}>Save</Button>
              </Tooltip>
              <Tooltip title="Exported Copy">
                <Button onClick={exportCopyHandler}>Export</Button>
              </Tooltip>
            </Space>
          </Col>

          <Col span={12} className="w-100 max-w-full">
            <Space direction="vertical">
              <Typography>
                <Title
                  style={{
                    fontFamily:
                      fontFamily !== "Default Font" ? fontFamily : undefined,
                    color: textColor,
                  }}
                >
                  {headline}
                </Title>
                <Title
                  level={2}
                  style={{
                    fontFamily:
                      fontFamily !== "Default Font" ? fontFamily : undefined,
                    color: textColor,
                  }}
                >
                  {subheadline}
                </Title>
                <Paragraph
                  style={{
                    fontFamily:
                      fontFamily !== "Default Font" ? fontFamily : undefined,
                    color: textColor,
                  }}
                >
                  {body}
                </Paragraph>
              </Typography>
              <Tooltip title="Preview">
                <Paragraph type="secondary">Output displays here</Paragraph>
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Flex>
    </div>
  );
};

export default MainPage;
