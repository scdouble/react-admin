import React, { Component } from "react";
import { Button, Card, Icon, List } from "antd";
import { BASE_IMG_URL } from "../../utils/constants";
import { reqCategory } from "../../api";
const Item = List.Item;
//プロダクトの詳細の子コンポーネント
export default class ProductDetail extends Component {
  state = {
    cName1: "", //親カテゴリの名前
    cName2: "", //子カテゴリの名前
  };

  async componentDidMount() {
    // this.getCateogry()
    // 表示している商品のCateoryIDを取得
    const { pCategoryId, categoryId } = this.props.location.state.record;

    if (pCategoryId === "0") {
      //親カテゴリの名前を問い合わせる
      const result = await reqCategory(categoryId);
      const cName1 = result.data.name;
      this.setState({ cName1 });
    } else {
      const results = await Promise.all([
        reqCategory(pCategoryId),
        reqCategory(categoryId),
      ]);
      console.log(results);
      const cName1 = results[0].data.name;
      const cName2 = results[1].data.name;
      this.setState({ cName1, cName2 });
      // 複数のawaitを列挙して実行する場合は効率が悪い
      // const result1 = await reqCategory(pCategoryId)
      // const result2 = await reqCategory(categoryId)
      // const cName1 = result1.data.name
      // const cName2 = result2.data.name
      // this.setState({ cName1, cName2 })
    }
  }

  render() {
    const { name, desc, price, imgs, detail } =
      this.props.location.state.record;
    const { cName1, cName2 } = this.state;

    const title = (
      <span>
        <Button
          onClick={() => {
            this.props.history.goBack();
          }}
          type="link"
        >
          <Icon type="arrow-left" />
        </Button>
        商品の詳細
      </span>
    );
    const extra = <span>編集</span>;
    return (
      <Card title={title} extra={extra} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品の説明:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">値段:</span>
            <span>¥{price}</span>
          </Item>
          <Item>
            <span className="left">カテゴリー:</span>
            <span>
              {cName1} {cName2 ? "-->" + cName2 : null}
            </span>
          </Item>
          <Item>
            <span className="left">画像:</span>

            {imgs.map((img) => {
              return (
                <span>
                  <img
                    key={img}
                    className="product-img"
                    src={BASE_IMG_URL + img}
                    alt={img}
                  />
                </span>
              );
            })}
          </Item>
          <Item>
            <span className="left">商品の詳細:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    );
  }
}
