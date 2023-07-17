import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

export default function GoogleTableChart() {
  const header = [
    { type: 'string', label: '지역' },
    { type: 'number', label: '확진자' },
    { type: 'number', label: '사망자' },
    { type: 'number', label: '격리해제' },
    { type: 'number', label: '치명률' },
  ];

  const rows = [
    ['서울', 22717, 227, 17487],
    ['경기', 18378, 393, 14538],
    ['서울', 8176, 206, 7787],
  ];

  const fatalityRateAddedRows = rows.map((row) => {
    const [region, confirmed, death, released] = row;
    const fatalityRate = (death / confirmed) * 100;

    const fatalityRateFormatted = {
      v: fatalityRate,
      f: `${fatalityRate.toFixed(1)}`,
    };

    const confirmedFormatted = {
      v: confirmed,
      f: `${confirmed}<br><span class = "text-danger">(+101)</span>`,
    };
    const releasedFormatted = {
      v: released,
      f: `${released}<br><span class = "text-danger">(+101)</span>`,
    };

    return [
      region,
      confirmedFormatted,
      death,
      releasedFormatted,
      fatalityRateFormatted,
    ];
  });

  const data = [
    header, // 데이터의 첫 번째 요소는 헤더 정보
    ...fatalityRateAddedRows,
  ];

  return (
    <Container>
      <Chart
        chartType="Table"
        loader={<div>로딩 중</div>}
        data={data}
        options={{
          showRowNumber: true, // 행 번호를 표시하는 열 추가
          allowHTML: true, // 데이터에 HTML 태그가 존재하는 것을 허용
          width: '100%',
          height: '100%',
        }}
      />
    </Container>
  );
}
