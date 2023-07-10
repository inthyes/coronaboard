import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import { css } from "@emotion/react"

import { Dashboard } from "../components/dashboard"

export default function SinglePage({ pageContext }) {
  // pageContext를 통해 전달된 데이터를 추출해서 사용
  const { dataSource } = pageContext
  const { lastUpdated, globalStats } = dataSource

  const lastUpdatedFormatted = new Date(lastUpdated).toLocaleString()

  return (
    <div id="top">
      <div
        css={css`
          position: absolute;
          background-color: black;
          width: 100%;
          height: 300px;
          z-index: -9;
        `}
      />

      <h1
        css={css`
          padding-top: 48px;
          padding-bottom: 24px;
          color: white;
          text-align: center;
          font-size: 28px;
        `}
      >
        코로나19(COVID-19)
        <br />
        실시간 상황판
      </h1>
      <p className="text-center text-white">
        마지막 업데이트: {lastUpdatedFormatted}
      </p>

      <Dashboard globalStats={globalStats} />
    </div>
  )
}
