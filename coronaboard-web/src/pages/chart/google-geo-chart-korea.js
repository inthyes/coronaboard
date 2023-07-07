import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Chart } from "react-google-charts"

export default function GoogleGeoChart() {
  const data = [
    ["City", "City", "확진자", "사망자"],
    ["KR-11", "서울", 47142, 502],
    ["KR-26", "부산", 15322, 124],
  ]

  const options = {
    colorAxis: { minValue: 0, maxValue: 50000, colors: ["#ffffff", "#710000"] },
    region: "KR",
    resolution: "provinces",
  }
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
  )
}
