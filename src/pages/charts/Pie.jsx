import React, { Component } from 'react';
import { Button, Card } from 'antd';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {
  // state = {
  //   sales: [5, 20, 36, 10, 10, 20],
  //   stocks: [23, 20, 15, 7, 12, 22],
  // };
  //
  // update = () => {
  //   this.setState((state) => {
  //     return {
  //       sales: state.sales.map((sale) => {
  //         return sale + 1;
  //       }),
  //       stocks: state.stocks.reduce((pre, stocks) => {
  //         pre.push(stocks - 1);
  //         return pre;
  //       }, []),
  //     };
  //   });
  //
  // };
  getOptions = (sales, stocks) => {
    return {
      backgroundColor: '#2c343c',
      title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 274, name: 'Union Ads' },
            { value: 235, name: 'Video Ads' },
            { value: 400, name: 'Search Engine' }
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
  };

  getOptions2 = (sales, stocks) => {
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
    return (
      <>
        <Card>
          <ReactEcharts option={this.getOptions() } style={{height:"400px"}}/>
        </Card>

        {/*<Card>*/}
        {/*  <ReactEcharts option={this.getOptions2()} />*/}
        {/*</Card>`*/}
      </>

    );
  }
}
