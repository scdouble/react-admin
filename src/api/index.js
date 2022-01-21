/**アプリの中で使う全てのAPIのFunctionのモジュール
 * APIドキュメントを参照して書く
 * FunctionのReturnはPromise
 */
import { message } from 'antd';
import jsonp from 'jsonp';
import ajax from './ajax';
// export function reqLogin(username, password) {
//   return ajax("/login", { username, password }, 'POST')
// }

// Login
/***
 *
 * @returns promise
 */
export const reqLogin = (username, password) =>
  ajax(
    '/login',
    {
      username,
      password,
    },
    'POST',
  );

// ユーザ追加
export const reqAddUser = (userObj) => ajax('/manage/user/add', userObj, 'POST');

/**
 * dark sky APIから天気情報を取得する
 * @param {*} longitude
 * @param {*} latitude
 * @returns
 */
export const reqWeather = (longitude, latitude) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.darksky.net/forecast/b37ef67575ca36eaa5fab157e9a15ddb/${longitude},${latitude}?lang=ja`;
    //jsonpリクエストを送る
    jsonp(url, {}, (error, data) => {
      if (!error) {
        // 必要なデータを取り出す
        const { summary, icon } = data.currently;
        resolve({ summary, icon });
      } else {
        //リクエスト失敗の場合
        message.error('Request failed for getting weather information');
      }
    });
  });
};

/**
 * カテゴリのリストを取得
 * @param {string} parentId
 * @returns {Promise} Promiseオブジェクト
 */
export const reqCategoryList = (parentId) =>
  ajax('/manage/category/list', { parentId: parentId }, 'GET');

/**
 * カテゴリーを追加する
 * @param {string} parentId
 * @param {string} categoryName
 * @returns
 */
export const reqAddCategory = (parentId, categoryName) =>
  ajax(
    '/manage/category/add',
    {
      parentId: parentId,
      categoryName: categoryName,
    },
    'POST',
  );

/**
 * カテゴリー名を更新する
 * @param {(string|object)} categoryObj
 * @returns
 */
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax(
    '/manage/category/update',
    {
      categoryId: categoryId,
      categoryName: categoryName,
    },
    'POST',
  );

export const reqProducts = (pageNum, pageSize) =>
  ajax('/manage/product/list', { pageNum, pageSize }, 'GET');

/**
 * 商品検索
 * searchType:検索のタイプ、productName/productDesc
 * @param {(string | object)} searchObj
 * @returns
 */
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) =>
  ajax(
    '/manage/product/search',
    {
      pageSize,
      pageNum,
      [searchType]: searchName,
    },
    'GET',
  );

export const reqCategory = (categoryId) => {
  return ajax('/manage/category/info', { categoryId }, 'GET');
};

// 商品のステータスを更新する
export const reqUpdateProductStatus = (productId, status) => {
  return ajax('/manage/product/updateStatus', { productId, status }, 'POST');
};

/**
 * 指定したファイル名のImgを削除
 * @param {string} name
 * @returns
 */
export const reqDeleteImage = (name) => {
  return ajax('/manage/img/delete', { name }, 'POST');
};

// export const reqAddProduct = (product) => {
//   return ajax('/manage/product/add', product, 'POST');
// };

// export const reqUpdateProduct = (product) => {
//   return ajax('/manage/product/update', product, 'POST');
// };

/**
 *
 * @param {object} product
 * @returns
 */
export const reqAddOrUpdateProduct = (product) => {
  return ajax('/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST');
};
