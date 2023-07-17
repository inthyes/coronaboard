import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

export default function GoogleGeoChart() {
  const data = [
    ['Country', 'Value'],
    ['KR-11', 777],
    ['KR-42', 666],
    ['KR-38', 555],
    ['KR-31', 444],
    ['KR-43', 333],
    ['KR-47', 222],
    ['KR-39', 111],
  ];

  const options = {
    colorAxis: { colors: ['skyblue', 'green'] },
    region: 'KR',
    resolution: 'provinces',
  };
  return (
    <Container>
      <Chart
        chartType="GeoChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
    </Container>
  );
}
