import { Button, Dropdown, Layout, Menu } from "antd";
import styles from "./UserLayout.module.css";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
const { Header, Footer, Content } = Layout;

interface PropsType {
  children: React.ReactNode;
}

export const UserLayout: React.FC<PropsType> = ({ children }) => {
  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  );
  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown overlay={menu}>
            <Button>
              {" "}
              选择语言
              <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              <img alt="logo" className={styles["logo"]} src={logo} />
              <span className={styles["title"]}>React 旅游网</span>
            </Link>
          </div>
          <div className={styles["desc"]}>
            慕课网 是我朝最具影响力的 线上课程学习网站
          </div>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Footer就不写了，太累了</Footer>
    </Layout>
  );
};
