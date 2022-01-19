import React, { Component } from "react";
import { Card, Form, Input, Select, Cascader, Upload, Button, Icon } from "antd";
import { reqCategoryList } from "../../api";

const { Item } = Form;
const { TextArea } = Input;

// const options = [
//   {
//     value: "zhejiang",
//     label: "Zhejiang",
//     isLeaf: false,
//   },
//   {
//     value: "jiangsu",
//     label: "Jiangsu",
//     isLeaf: false,
//   },
// ];
//プロダクトの追加更新の子Route
class ProductAddUpdate extends Component {
  state = {
    options: [],
  };

  // 非同期でトップレベルのカテゴリーもしくは子カテゴリーのデータを取得して表示
  // async関数のReturn値はPromise, promiseの結果と値はasync関数の実行結果によって決まる
  getCategories = async (parentId) => {
    const result = await reqCategoryList(parentId); // { status: 0, data: categoryList}
    if (result.status === 0) {
      const categoryList = result.data;

      //トップレベルのカテゴリー
      if (parentId === "0") {
        this.initOptions(categoryList);
      } else {
        // 　子カテゴリーを返す　==>　Async関数が返すPromiseは成功で、かつValueはCategoryList
        return categoryList;
      }
    }
  };

  initOptions = (categoryList) => {
    // categoryListを元にoptionsのデータを生成
    const options = categoryList.map((category) => ({
      value: category._id,
      label: category.name,
      isLeaf: false,
    }));

    this.setState({ options });
  };

  /**
   * 値段Inputの入力値をValidateする
   */
  validatePrice = (rule, value, callback) => {
    console.log(value, typeof value);
    if (value * 1 > 0) {
      callback();
    } else {
      callback("値段は０以上の数値で入力してください");
    }
  };

  submit = () => {
    // Formのバリデーションを実行して、OKだったらリクエストを送信する
    this.props.form.validateFields((error, values) => {
      if (!error) {
        alert("send ajax request");
      }
    });
  };

  /** 次のレベルのカテゴリーのデータをローディング */
  loadData = async (selectedOptions) => {
    // 選択したOptionsを取得
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // データローディングのマークを表示
    targetOption.loading = true;

    // 選択されたカテゴリーからその下のカテゴリーを選択
    const subCategories = await this.getCategories(targetOption.value);
    // データローディングのマークを非表示
    targetOption.loading = false;
    // 子カテゴリーにデータが存在する場合
    if (subCategories && subCategories.length > 0) {
      // 子カテゴリリストを生成
      const childOptions = subCategories.map((category) => {
        return {
          value: category._id,
          label: category.name,
          isLeaf: true,
        };
      });
      // 現在のカテゴリに関連付けする
      targetOption.children = childOptions;
    } else {
      //現在のカテゴリの下に子カテゴリがない場合
      targetOption.isLeaf = true;
    }

    this.setState({
      options: [...this.state.options],
    });
  };

  componentDidMount() {
    this.getCategories("0");
  }

  render() {
    // ItemのLayoutを設定
    const formItemLayout = {
      labelCol: { span: 3 }, //左のラベルの幅が6
      wrapperCol: { span: 8 }, //右のラッパーの設定
    };

    const title = (
      <span>
        <Button type="link">
          <Icon type="arrow-left"></Icon>
        </Button>
        <span>商品を追加</span>
      </span>
    );

    const { getFieldDecorator } = this.props.form;

    return (
      <Card title={title}>
        {/* Formの中でonSubmitを定義していたのなら、prevent defaultをわすれずに */}
        <Form {...formItemLayout}>
          <Item label="商品名">
            {getFieldDecorator("name", {
              initialValue: "",
              rules: [{ required: true, message: "商品名を入力してださい" }],
            })(<Input placeholder="商品名を入力してください"></Input>)}
          </Item>
          <Item label="商品の説明">
            {getFieldDecorator("desc", {
              initialValue: "",
              rules: [{ required: true, message: "商品の説明を入力してださい" }],
            })(<TextArea autoSize={{ minRows: 2 }}></TextArea>)}
          </Item>
          <Item label="商品の値段">
            {getFieldDecorator("price", {
              initialValue: "",
              rules: [{ required: true, message: "値段を入力してださい" }, { validator: this.validatePrice }],
            })(<Input type="number" addonAfter="JPY"></Input>)}
          </Item>
          <Item label="カテゴリー">
            <Cascader options={this.state.options} /** 表示するカテゴリーリスト */ loadData={this.loadData} />
          </Item>
          <Item label="商品の詳細">
            <div>商品の詳細</div>
          </Item>
          <Item>
            <Button type="primary" onClick={this.submit}>
              追加
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ProductAddUpdate);
