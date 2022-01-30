import React, { Component } from 'react';
import { Button, Card, Cascader, Form, Icon, Input, message } from 'antd';
import { reqAddOrUpdateProduct, reqCategoryList } from '../../api';
import PicturesWall from './PictureWall';
import RichTextEditor from './RichTextEditor';
import memoryUtils from '../../utils/memoryUtils';

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

  constructor(props) {
    super(props);
    // refのタグのコンテナを保管する
    this.pw = React.createRef();
    this.editor = React.createRef();
  }

  // 非同期でトップレベルのカテゴリーもしくは子カテゴリーのデータを取得して表示
  // async関数のReturn値はPromise, promiseの結果と値はasync関数の実行結果によって決まる
  getCategories = async (parentId) => {
    const result = await reqCategoryList(parentId); // { status: 0, data: categoryList}
    if (result.status === 0) {
      const categoryList = result.data;

      //トップレベルのカテゴリー
      if (parentId === '0') {
        this.initOptions(categoryList);
      } else {
        // 　子カテゴリーを返す　==>　Async関数が返すPromiseは成功で、かつValueはCategoryList
        return categoryList;
      }
    }
  };

  initOptions = async (categoryList) => {
    // categoryListを元にoptionsのデータを生成
    const options = categoryList.map((category) => ({
      value: category._id,
      label: category.name,
      isLeaf: false,
    }));

    const { isUpdate, product } = this;
    const { pCategoryId, categoryId } = product;
    if (isUpdate && pCategoryId !== '0') {
      // 対応する子カテゴリのデータを取得
      const subCategories = await this.getCategories(pCategoryId);
      // 子カテゴリのoptionsを生成
      const childOptions = subCategories.map((category) => {
        return {
          value: category._id,
          label: category.name,
          isLeaf: true,
        };
      });
      // 該当商品のトップカテゴリを取得
      const targetOption = options.find((option) => {
        return option.value === pCategoryId;
      });

      // 該当商品のトップカテゴリーに関連づけを行う
      targetOption.children = childOptions;
    }

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
      callback('値段は０以上の数値で入力してください');
    }
  };

  submit = () => {
    // Formのバリデーションを実行して、OKだったらリクエストを送信する
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        // formのデータを収集 Productオブジェクトにする
        const { name, desc, price, categoryIds } = values;
        let pCategoryId, categoryId;
        if (categoryIds.length === 1) {
          pCategoryId = '0';
          categoryId = categoryIds[0];
        } else {
          pCategoryId = categoryIds[0];
          categoryId = categoryIds[1];
        }
        const imgs = this.pw.current.getImgs();
        const detail = this.editor.current.getDetail();

        const product = { name, desc, price, imgs, detail, pCategoryId, categoryId };

        // 商品の更新であれば、IDを追加
        if (this.isUpdate) {
          product._id = this.product._id;
        }
        // APIをリクエストして、商品を追加もしくは更新
        const result = await reqAddOrUpdateProduct(product);

        if (result.status === 0) {
          message.success(`商品の${this.isUpdate ? '更新' : '追加'}が完了しました`);
          this.props.history.goBack();
        } else {
          message.error(`商品の${this.isUpdate ? '更新' : '追加'}が失敗しました`);
        }
        // リクエスト結果によってメッセージ表示
        console.log('submit()', values);
        // const imgs = this.pw.current.getImgs();
        // const detail = this.editor.current.getDetail();
        // console.log('imgs', imgs);
        // console.log('details', detail);

        // alert('send ajax request');
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
    this.getCategories('0');
  }

  componentWillMount() {
    // ルートから送られてくるデータを取得
    // const product = this.props.location.state;
    //  メモリの中からProductを取得
    const product = memoryUtils.product;
    //productの中に_idがあれば更新ということがわかる
    this.isUpdate = !!product._id; //!!は強制的にBooleanに変換.
    // 商品の情報を保存、undefined防止のため、データがない場合は空のオブジェクトを付与
    this.product = product || {};
  }

  // Unmountする前にメモリのデータを削除
  componentWillUnmount() {
    memoryUtils.product = {};
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { product } = this;
    const { pCategoryId, categoryId, imgs, detail } = product;

    // カスケード選択ボックスのデータを受け取るリスト
    const categoryIds = [];
    if (this.isUpdate) {
      // トップカテゴリの商品

      if (pCategoryId === '0') {
        categoryIds.push(categoryId);
      } else {
        // 子カテゴリの商品
        categoryIds.push(pCategoryId);
        categoryIds.push(categoryId);
      }
    }

    // ItemのLayoutを設定
    const formItemLayout = {
      labelCol: { span: 3 }, //左のラベルの幅が6
      wrapperCol: { span: 8 }, //右のラッパーの設定
    };

    const title = (
      <span>
        <Button type='link' onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' />
        </Button>
        <span>{this.isUpdate ? '商品を追加' : '商品を編集'}</span>
      </span>
    );

    return (
      <Card title={title}>
        {/* Formの中でonSubmitを定義していたのなら、prevent defaultをわすれずに */}
        <Form {...formItemLayout}>
          <Item label='商品名'>
            {getFieldDecorator('name', {
              initialValue: product.name,
              rules: [{ required: true, message: '商品名を入力してださい' }],
            })(<Input placeholder='商品名を入力してください' />)}
          </Item>
          <Item label='商品の説明'>
            {getFieldDecorator('desc', {
              initialValue: product.desc,
              rules: [{ required: true, message: '商品の説明を入力してださい' }],
            })(<TextArea autoSize={{ minRows: 2 }} />)}
          </Item>
          <Item label='商品の値段'>
            {getFieldDecorator('price', {
              initialValue: product.price,
              rules: [
                { required: true, message: '値段を入力してださい' },
                { validator: this.validatePrice },
              ],
            })(<Input type='number' addonAfter='JPY' />)}
          </Item>
          <Item label='カテゴリー'>
            {getFieldDecorator('categoryIds', {
              initialValue: categoryIds,
              rules: [{ required: true, message: 'カテゴリーを選択してください' }],
            })(
              <Cascader
                options={this.state.options}
                placeholder='カテゴリーを選択してください'
                /** 表示するカテゴリーリスト */
                loadData={this.loadData}
              />,
            )}
          </Item>
          <Item label='商品の画像'>
            <PicturesWall ref={this.pw} imgs={imgs} />
          </Item>
          <Item label='商品の詳細' labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
            <RichTextEditor ref={this.editor} detail={detail} />
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>
              追加
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ProductAddUpdate);

/**
 * １。　子コンポーネントが親コンポーネントの関数を実行する：親の関数をpropsとして子に渡す
 * ２。親コンポーネントが子コンポーネントの関数を実行する：親コンポーネントの中でRefを通して子コンポーネントを獲得して、子コンポーネントの方法を実行する
 */
