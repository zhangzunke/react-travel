import { useLocation, useParams } from "react-router-dom";
import { FilterArea, Footer, Header, ProductList } from "../../components";
import styles from "./SearchPage.module.css";
import { useAppDispatch, useSelector } from "../../redux/hooks";
import { Spin } from "antd";
import { useEffect } from "react";
import { searchProduct } from "../../redux/productSearch/slice";
import { MainLayout } from "../../layouts/mainLayout";

type MatchParams = {
  keywords: string | undefined;
};

export const SearchPage: React.FC = () => {
  let { keywords } = useParams<MatchParams>();
  const loading = useSelector((state) => state.productSearch.loading);
  const error = useSelector((state) => state.productSearch.error);
  const pagination = useSelector((state) => state.productSearch.pagination);
  const productList = useSelector((state) => state.productSearch.data);

  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
  }, [location]);

  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ nextPage, pageSize, keywords }));
  };

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
        <div className={styles["product-list-container"]}>
          <FilterArea />
        </div>
        <div className={styles["product-list-container"]}>
          <ProductList
            data={productList}
            paging={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </MainLayout>
    </>
  );
};
