import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { GlobalOutlined } from "@ant-design/icons";
import { Layout, Typography, Input, Dropdown, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import ButtonGroup from "antd/es/button/button-group";
import { userSlice } from "../../redux/user/slice";

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();

  const jwt = useSelector((s) => s.user.token);
  const [userName, setUserName] = useState("");

  const shoppingCartItems= useSelector(s => s.shoppingCart.items);
  const shoppingCartLoading = useSelector(s => s.shoppingCart.loading);

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUserName(token.username);
    }
  }, [jwt]);

  const menuClickHandler = (e) => {
    console.log(e);
    if (e.key === "new") {
      dispatch(addLanguageActionCreator("新语言", "new_lang"));
    } else {
      dispatch(changeLanguageActionCreator(e.key));
    }
  };
  const items: MenuProps["items"] = [
    ...languageList.map((l) => {
      return {
        label: l.name,
        key: l.code,
        onClick: menuClickHandler,
      };
    }),
    {
      key: "new",
      label: t("header.add_new_language"),
      onClick: menuClickHandler,
    },
  ];

  const onLogout = () => {
    dispatch(userSlice.actions.logOut());
    navigate("/");
  };

  return (
    <div className={styles["app-header"]}>
      {/* top-header */}
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15, display: "inline" }}
            menu={{ items }}
            icon={<GlobalOutlined />}
          >
            {language === "zh" ? "中文" : "English"}
          </Dropdown.Button>
          {jwt ? (
            <Button.Group className={styles["button-group"]}>
              <span>{t("header.welcome")}</span>
              <Typography.Text strong>{userName}</Typography.Text>
              <Button 
              loading={shoppingCartLoading}
              onClick={() => navigate("/shoppingCart")}>
                {t("header.shoppingCart")}({shoppingCartItems.length})
              </Button>
              <Button onClick={onLogout}>{t("header.signOut")}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => navigate("/register")}>
                {t("header.register")}
              </Button>
              <Button onClick={() => navigate("/signIn")}>
                {t("header.signin")}
              </Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span onClick={() => navigate("/")}>
          <img src={logo} alt="" className={styles["App-logo"]}></img>
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
          </Typography.Title>
        </span>
        <Input.Search
          placeholder="请输入旅游目的地、主题、或关键字"
          className={styles["search-input"]}
          onSearch={(keywords) => navigate("/search/" + keywords)}
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
};
