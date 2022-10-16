import React from "react";
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
} from "../../components";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import { productList1, productList2, productList3 } from "./mockups";
import { Col, Row, Typography } from "antd";
import styles from "./HomePage.module.css";
import { withRouter, RouteComponetProps } from "../../helpers/withRouter";

class HomePageComponent extends React.Component<RouteComponetProps> {
  // this.props.navigate;
  render() {
    return (
      <>
        <Header />
        <div className={styles["page-content"]}>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <div>
                <SideMenu />
              </div>
            </Col>
            <Col span={18}>
              <div>
                <Carousel />
              </div>
            </Col>
          </Row>
          <ProductCollection
            title={
              <Typography.Title level={3} type="warning">
                Hot Product
              </Typography.Title>
            }
            sideImage={sideImage}
            products={productList1}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                New Product
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList2}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                Trival Recommand
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList3}
          />
        </div>
        <Footer />
      </>
    );
  }
}

export const HomePage = withRouter(HomePageComponent);
