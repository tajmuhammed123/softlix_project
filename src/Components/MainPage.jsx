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
  Avatar,
  Card,
  Switch,
  Spin,
  Tag,
} from "antd";

import { runes } from "runes2";
import { useDispatch, useSelector } from "react-redux";

import { saveCopy, exportCopy, updateGeneratedCopy } from "../redux/actions";

import {
  ApartmentOutlined,
  CopyOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ThunderboltOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Meta from "antd/es/card/Meta";
import { Header } from "antd/es/layout/layout";
const { Sider, Content } = Layout;

const { Title } = Typography;
const { Option } = Select;

const MainPage = () => {
  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [body, setBody] = useState("");
  const [fontFamily, setFontFamily] = useState("defaultFont");
  const [textColor, setTextColor] = useState("#000000");
  const [brainstorm, setBrainstorm] = useState(false);
  const [output, setOutput] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      console.log("Generating copy...");
      const dynamicContent = await fetchApi({
        headline,
        subheadline,
        body,
      });
      console.log(dynamicContent);

      dispatch(updateGeneratedCopy(dynamicContent));
      setLoading(false);
      setOutput(true);
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

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const data = [
    {
      key: "1",
      label: "WEBSITE DESIGNING",
      children: [
        "Using the latest technologies for top performance, SEO and clean code.",
      ],
    },
    {
      key: "1",
      label: "SOLUTIONS",
      children: ["Marketing", "Analytics", "Commerce", "Insights"],
    },
    {
      key: "2",
      label: "SUPPORT",
      children: ["Pricing", "Documentation", "Guides", "API Status"],
    },
    {
      key: "2",
      label: "COMPANY",
      children: ["About", "Blog", "Jobs", "Press", "Partners"],
    },
  ];

  const handleBrainstorm = () => {
    setBrainstorm((prevBrainstorm) => !prevBrainstorm);
  };

  const { Text } = Typography;
  if (loading) {
    return (
      <div className="w-40">
        <Spin
          size="large"
          className="w-screen h-screen flex align-middle justify-center items-center "
        />
      </div>
    );
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: "fixed",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "0",
              icon: <UserOutlined />,
            },
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Content
        style={{
          margin: "5px 5px",
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          marginLeft: collapsed ? "80px" : "200px",
          transition: "margin-left 0.3s",
        }}
      >
        <Header
          className="flex align-middle"
          style={{ backgroundColor: "white", borderBottom: "1px solid #ddd", paddingLeft:'0' }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Row className=" justify-between w-full">
            <Col span={12}>

          <Typography className="font-bold text-2xl mt-2 flex items-center">
            Landing Page Copy
          </Typography>
            </Col>
          <Col span={12}
            className="flex items-center h-full justify-end"
            align="middle"
          >
            <Tag color="#2db7f5" className="h-6">
              Click Here to get unlimitted
            </Tag>
            <Button
              type="primary"
              style={{ borderRadius: "3px", fontWeight: "bold" }}
              className="bg-blue-900 text-white"
              onClick={generateCopy}
            >
              Write For Me
            </Button>
          </Col>
          </Row>
        </Header>
        <div
          style={{
            height: "100vh",
            display: "flex",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <Row
            gutter={[16, 16]}
            options="center"
            justify="center"
            style={{ width: "100%" }}
          >
            <Col xs={24} md={12} className="overflow-scroll">
              <Row span={24} style={{ width: "100%" }}>
                <Col span={12} className="flex flex-col pr-2">
                  <Text className="font-semibold">Language</Text>
                  <Select
                    value={fontFamily}
                    onChange={(value) => setFontFamily(value)}
                    label="Language"
                  >
                    <Option value="defaultFont">Default Font</Option>
                    <Option value="Roboto">Roboto</Option>
                    <Option value="Arial">Arial</Option>
                    <Option value="Times New Roman">Times New Roman</Option>
                    <Option value="Verdana">Verdana</Option>
                  </Select>
                </Col>
                <Col span={12} className="flex flex-col pl-2">
                  <Text className="font-semibold">Writing for</Text>
                  <Select
                    value={fontFamily}
                    onChange={(value) => setFontFamily(value)}
                  >
                    <Option value="defaultFont">website design</Option>
                  </Select>
                </Col>
              </Row>
              <Row className="pt-5">
                <Col span={12}>
                  <div className="flex align-middle">
                    <svg
                      className="w-6 font-extrabold"
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      viewBox="0 0 64 64"
                      id="sparkle"
                    >
                      <path d="M51 12a1 1 0 01-1-1V9a1 1 0 012 0v2A1 1 0 0151 12zM49 14H47a1 1 0 010-2h2a1 1 0 010 2zM51 18a1 1 0 01-1-1V15a1 1 0 012 0v2A1 1 0 0151 18zM55 14H53a1 1 0 010-2h2a1 1 0 010 2zM15 48a1 1 0 01-1-1V45a1 1 0 012 0v2A1 1 0 0115 48zM13 50H11a1 1 0 010-2h2a1 1 0 010 2zM15 54a1 1 0 01-1-1V51a1 1 0 012 0v2A1 1 0 0115 54zM19 50H17a1 1 0 010-2h2a1 1 0 010 2zM36 58a1 1 0 01-1-.925c-.056-.737-1.567-18.107-19.224-22.1a1 1 0 010-1.952c17.694-4 19.21-21.917 19.223-22.1A1 1 0 0136 10h0a1 1 0 011 .926c.056.737 1.567 18.107 19.224 22.1a1 1 0 010 1.952c-17.694 4-19.21 21.917-19.223 22.1A1 1 0 0136 58zM19.6 34C30.175 37.774 34.371 46.553 36 52.087 37.629 46.553 41.825 37.774 52.4 34 41.825 30.226 37.629 21.447 36 15.913 34.371 21.447 30.175 30.226 19.6 34zM10 28a1 1 0 01-1-.916 7.221 7.221 0 00-6.2-6.1 1 1 0 010-1.962 7.272 7.272 0 006.2-6.1 1 1 0 011.994 0 7.221 7.221 0 006.2 6.1 1 1 0 010 1.962 7.272 7.272 0 00-6.2 6.1A1 1 0 0110 28zM6.092 20A8.977 8.977 0 0110 23.861 8.977 8.977 0 0113.908 20 8.977 8.977 0 0110 16.139 8.977 8.977 0 016.092 20zM54 56a1 1 0 01-1-.916 7.222 7.222 0 00-6.2-6.1 1 1 0 010-1.962 7.271 7.271 0 006.2-6.1 1 1 0 011.994 0 7.222 7.222 0 006.2 6.1 1 1 0 010 1.962 7.271 7.271 0 00-6.2 6.1A1 1 0 0154 56zm-3.908-8A8.977 8.977 0 0154 51.861 8.977 8.977 0 0157.908 48 8.977 8.977 0 0154 44.139 8.977 8.977 0 0150.092 48z"></path>
                    </svg>
                    <Typography className="font-semibold pl-2">
                      Brainstorm Mode
                    </Typography>
                  </div>
                  <Typography className="text-sm">
                    Disable to write copy specific to your needs
                  </Typography>
                </Col>
                <Col span={12}>
                  <div className="flex align-middle justify-end">
                    <Switch
                      className="bg-gray-500"
                      onChange={handleBrainstorm}
                    />{" "}
                    <Typography className="font-bold pl-3">Enabled</Typography>
                  </div>
                </Col>
              </Row>
              {!brainstorm ? (
                <Form.Item className="pt-5 font-semibold">
                  <Typography className="flex align-middle">Benifit</Typography>
                  <Input
                    count={{
                      show: true,
                      max: 75,
                    }}
                    value={headline}
                    placeholder="Headline"
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                  <Typography className="flex align-middle">Feature</Typography>
                  <Input
                    count={{
                      show: true,
                      max: 75,
                    }}
                    value={headline}
                    placeholder="Headline"
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                  <Typography className="flex align-middle">Topic</Typography>
                  <Input
                    count={{
                      show: true,
                      max: 75,
                    }}
                    value={headline}
                    placeholder="Headline"
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                </Form.Item>
              ) : (
                ""
              )}
              <Row className="pt-5">
                <Col span={12}>
                  <div className="flex align-middle">
                    <CopyOutlined className="w-6" />
                    <Typography className="font-semibold">
                      Inclusive Guidelines
                    </Typography>
                    <Tooltip title="Extra information" className="pl-2">
                      <InfoCircleOutlined
                        style={{
                          color: "rgba(0,0,0,.45)",
                        }}
                      />
                    </Tooltip>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex align-middle justify-end">
                    <Switch className="bg-gray-500" />{" "}
                    <Typography className="font-bold pl-3">Enabled</Typography>
                  </div>
                </Col>
              </Row>
              <Row className="my-9">
                <Button
                  type="primary"
                  style={{ borderRadius: "3px", fontWeight: "bold" }}
                  className="bg-blue-900 text-white"
                  onClick={generateCopy}
                >
                  Write For Me
                </Button>
              </Row>
              <Form layout="vertical">
                <Form.Item style={{ fontWeight: "bold" }}>
                  <Typography className="flex align-middle">
                    Project/ Product/ Service Name
                    <Tooltip title="Extra information">
                      <InfoCircleOutlined
                        className="pl-1"
                        style={{
                          color: "rgba(0,0,0,.45)",
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <Input
                    count={{
                      show: true,
                      strategy: (txt) => runes(txt).length,
                    }}
                    value={headline}
                    placeholder="Headline"
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                </Form.Item>
                <Form.Item style={{ fontWeight: "bold" }}>
                  <Typography className="flex align-middle">
                    Description
                    <Tooltip title="Extra information">
                      <InfoCircleOutlined
                        className="pl-1"
                        style={{
                          color: "rgba(0,0,0,.45)",
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <Input.TextArea
                    value={body}
                    count={{
                      show: true,
                      strategy: (txt) => runes(txt).length,
                    }}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </Form.Item>
              </Form>

              {/* <Space>
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
                <Tooltip title="Saved Copy">
                  <Button onClick={saveCopyHandler}>Save</Button>
                </Tooltip>
                <Tooltip title="Exported Copy">
                  <Button onClick={exportCopyHandler}>Export</Button>
                </Tooltip>
              </Space> */}
            </Col>

            {output ? (
              <Col
                xs={24}
                md={12}
                className="w-100 max-w-full overflow-scroll h-screen"
              >
                <div className="p-3">
                  <div className="flex justify-between">
                    <Typography>website design</Typography>
                    <Typography>Learn More</Typography>
                  </div>
                  <div className="flex justify-center mt-5">
                    <Title level={4} style={{ textAlign: "center" }}>
                      Maximize your online presence with our dynamic and premium
                      website designs
                    </Title>
                  </div>
                  <div className="flex justify-center">
                    <Typography style={{ textAlign: "center" }}>
                      Using the latest technologies for top performance, SEO,
                      and clean code.
                    </Typography>
                  </div>
                  <div className="flex justify-center py-10">
                    <Button
                      type="primary"
                      className="bg-blue-900 font-semibold"
                      style={{ marginRight: "10px" }}
                    >
                      Get Started
                    </Button>
                    <Button
                      type="primary"
                      className="text-blue-900 font-semibold"
                      style={{
                        border: "solid 1px black",
                        marginLeft: "10px",
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                  <div className="flex flex-row justify-between w-full max-w-full">
                    <Card
                      style={{ marginTop: 16, border: "0", width: "200px" }}
                    >
                      <Avatar
                        shape="square"
                        icon={<GlobalOutlined />}
                        className="mb-5"
                        style={{ backgroundColor: "blue" }}
                      />
                      <Meta
                        title="Customized website design"
                        description="Get a website that reflects your unique brand and meets your specific business needs"
                      />
                    </Card>
                    <Card
                      style={{ marginTop: 16, border: "0", width: "200px" }}
                    >
                      <Avatar
                        shape="square"
                        icon={<ApartmentOutlined />}
                        className="mb-5"
                        style={{ backgroundColor: "blue" }}
                      />
                      <Meta
                        title="Customized websites"
                        description="Our team of expert developers will create a website tailored to your unique business needs and goals."
                      />
                    </Card>
                    <Card
                      style={{ marginTop: 16, border: "0", width: "200px" }}
                    >
                      <Avatar
                        shape="square"
                        icon={<ThunderboltOutlined />}
                        className="mb-5"
                        style={{ backgroundColor: "blue" }}
                      />
                      <Meta
                        title="Professional website design"
                        description="Impress your customers with beatifully that reflects your brand and values."
                      />
                    </Card>
                  </div>

                  <div
                    className="bg-blue-900 p-6 flex-col my-8"
                    style={{
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Title level={4} style={{ color: "white" }}>
                      Stand out online
                    </Title>
                    <Typography className="text-center text-white">
                      With our premium quality websites, your business will make
                      a lasting impression and stand out in the compititive
                      online market.
                    </Typography>
                    <Button
                      type="primary"
                      className="bg-white text-blue-900 font-semibold mt-5"
                    >
                      Learn More
                    </Button>
                  </div>
                  <Row gutter={[16, 16]}>
                    {data.map((item) => (
                      <Col key={item.key} xs={24} sm={12} md={8} lg={6}>
                        <Typography className="text-gray-600 font-bold">
                          {item.label}
                        </Typography>
                        {item.children.map((child, index) => (
                          <Typography className="py-2" key={index}>
                            {child}
                            {index < item.children.length - 1 ? ", " : ""}
                          </Typography>
                        ))}
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>
            ) : (
              <Col
                xs={24}
                md={12}
                className="w-100 max-w-full overflow-scroll h-screen"
              ></Col>
            )}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default MainPage;
