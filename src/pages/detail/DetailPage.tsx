import {
  Col,
  Row,
  Spin,
  DatePicker,
  Divider,
  Typography,
  Anchor,
  Menu,
  Button,
} from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailPage.module.css";
import { ProductComments } from "../../components";
import ProductIntro from "../../components/productIntro/ProductIntro";
import { commentMockData } from "./mockup";
import {
  getProductDetail,
} from "../../redux/productDetail/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layouts/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";

const { RangePicker } = DatePicker;
type MatchParams = {
  touristRouteId: string;
};
export const DetailPage: React.FC = () => {
  const { touristRouteId } = useParams<MatchParams>();
  // const [loading, setLoading] = useState<boolean>(true);
  // const [product, setProduct] = useState<any>(null);
  // const [error, setError] = useState<string | null>(null);
  const loading = useSelector((state) => state.productDetail.loading);
  const product = useSelector((state) => state.productDetail.data);
  const error = useSelector((state) => state.productDetail.error);
  const dispatch = useAppDispatch();
  const jwt = useSelector((s) => s.user.token) as string;
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);
  useEffect(() => {
    if (touristRouteId) {
      dispatch(getProductDetail(touristRouteId));
    }
  }, [touristRouteId, dispatch]);
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错: {error}</div>;
  }
  return (
    <>
      <MainLayout>
        {/* Product and Datetime*/}
        <div className={styles["product-intro-container"]}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.shortDescription}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.discount}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <Button
                style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                type="primary"
                danger
                loading={shoppingCartLoading}
                onClick={() => {
                  console.log(jwt, product.id);
                  dispatch(addShoppingCartItem({jwt, touristRouteId: product.id}))
                }}
              >
                <ShoppingCartOutlined />
                放入购物车
              </Button>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Anchor.Link href="#fees" title="费用"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href="#notes" title="预定须知"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>
        <div id="fees" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>费用</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>
        <div id="notes" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>
        <div id="comments" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>用户评价</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
        </div>
      </MainLayout>
    </>
  );
};
