const menuList = [
  {
    title: "ホーム",
    icon: "home",
    key: "/home",
  },
  {
    title: "プロダクト",
    icon: "appstore",
    key: "/products",
    children: [
      {
        title: "カテゴリー管理",
        icon: "tags",
        key: "/category",
      },
      {
        title: "商品管理",
        icon: "barcode",
        key: "/product",
      }
    ]
  },
  {
    title: "ユーザ管理",
    icon: "user",
    key: "/user",
  },
  {
    title: "ロール管理",
    icon: "team",
    key: "/role",
  },
  {
    title: "データ",
    icon: "area-chart",
    key: "/charts",
    children: [
      {
        title: "パイチャート",
        icon: "pie-chart",
        key: "/charts/pie",
      },
      {
        title: "棒グラフ",
        icon: "bar-chart",
        key: "/charts/bar",
      },
      {
        title: "折れ線グラフ",
        icon: "line-chart",
        key: "/charts/line",
      },

    ]
  },

]

export default menuList
