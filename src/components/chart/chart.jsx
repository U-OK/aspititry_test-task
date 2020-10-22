import React from "react";
import { Line } from '@ant-design/charts';

const Chart = ({data}) => {
  const config = {
    data,
    height: 230,
    xField: 'date',
    yField: 'distance',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };
  return <Line {...config} />;
};

export default Chart;