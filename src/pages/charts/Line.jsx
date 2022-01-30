import React, { Component } from 'react';
import { Button, Card } from 'antd';
import ReactEcharts from 'echarts-for-react';

export default class Line extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    stocks: [23, 20, 15, 7, 12, 22],
  };

  update = () => {
    this.setState((state) => {
      return {
        sales: state.sales.map((sale) => {
          return sale + 1;
        }),
        stocks: state.stocks.reduce((pre, stocks) => {
          pre.push(stocks - 1);
          return pre;
        }, []),
      };
    });

  };
  getOptions = (sales, stocks) => {
    return {
      title: {
        text: '販売数と在庫数',
      },
      tooltip: {},
      legend: {
        data: ['販売', '在庫'],
      },
      xAxis: {
        data: ['シャツ', 'セーター', 'Tシャツ', 'ズボン', 'スニーカー', 'ソックス'],
      },
      yAxis: {},
      series: [
        {
          name: '販売',
          type: 'line',
          data: sales,
        },
        {
          name: '在庫',
          type: 'line',
          data: stocks,
        },
      ],
    };
  };

  render() {
    const { sales, stocks } = this.state;
    return (
      <>

        <Card>
          <Button type={'primary'} onClick={this.update}>更新</Button>
        </Card>


        <Card>
          <ReactEcharts option={this.getOptions(sales, stocks)} />
        </Card>
      </>

    );
  }
}
