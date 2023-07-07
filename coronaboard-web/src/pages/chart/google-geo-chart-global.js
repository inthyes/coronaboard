import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Chart } from "react-google-charts" // 임포트

export default function GoogleGeoChart() {
  const data = [
    ["Country", "Confirmed"],
    ["United States", 29506328],
    ["Brazil", 17513996],
    ["France", 62663328],
    ["Turkey", 53392811],
  ]

  const options = {
    colorAxis: { colors: ["skyblue", "purple"] },
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
