import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
import { withRouter, RouteComponetProps } from "../../helpers/withRouter";
import React from "react";
import store from "../../redux/store";
import { LanguageState } from "../../redux/language/languageReducer";
import { withTranslation, WithTranslation } from "react-i18next";
import { changeLanguageActionCreator, addLanguageActionCreator } from "../../redux/language/languageActions";

interface State extends LanguageState {}

class HeaderComponent extends React.Component<RouteComponetProps & WithTranslation, State> {
  constructor(props) {
    super(props);
    const storeState = store.getState();
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList,
    };
    store.subscribe(this.handleStoreChange);
  }

  handleStoreChange = () => {
    const storeState = store.getState();
    this.setState({
      language: storeState.language,
      languageList: storeState.languageList,
    });
  };

  menuClickHandler = (e) => {
    if(e.key === "new") {
      const action = addLanguageActionCreator("新语言", "new_lang");
      store.dispatch(action);
    } else {
      const action = changeLanguageActionCreator(e.key);
      store.dispatch(action);
    }
  };

  render(): React.ReactNode {
    const { navigate, t } = this.props;
    return (
      <div className={styles["app-header"]}>
        {/* top-header */}
        <div className={styles["top-header"]}>
          <div className={styles.inner}>
            <Typography.Text>{t("header.slogan")}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu
                  onClick={this.menuClickHandler}
                  items={[
                    ...this.state.languageList.map((l) => {
                      return { key: l.code, label: l.name };
                    }),
                    { key: "new", label: t("header.add_new_language") },
                  ]}
                ></Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.state.language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => navigate("register")}>{t("header.register")}</Button>
              <Button onClick={() => navigate("signIn")}>{t("header.signin")}</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles["main-header"]}>
          <span onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className={styles["App-logo"]}></img>
            <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
            </Typography.Title>
          </span>
          <Input.Search
            placeholder={"Please enter your place which is you wanted."}
            className={styles["search-input"]}
          ></Input.Search>
        </Layout.Header>
        <Menu
          mode={"horizontal"}
          className={styles["main-menu"]}
          items={[
            { key: "1", label: t("header.home_page") },
            { key: "2", label: t("header.weekend") },
            { key: "3", label: t("header.group") },
            { key: "4", label: t("header.backpack") },
            { key: "5", label: t("header.private") },
            { key: "6", label: t("header.cruise") },
            { key: "7", label: t("header.hotel") },
            { key: "8", label: t("header.local") },
            { key: "9", label: t("header.theme") },
            { key: "10", label: t("header.custom") },
            { key: "11", label: t("header.study") },
            { key: "12", label: t("header.visa") },
            { key: "13", label: t("header.enterprise") },
            { key: "14", label: t("header.high_end") },
            { key: "15", label: t("header.outdoor") },
            { key: "16", label: t("header.insurance") },
          ]}
        ></Menu>
      </div>
    );
  }
}

export const Header = withTranslation()(withRouter(HeaderComponent));
