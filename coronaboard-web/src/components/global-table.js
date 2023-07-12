import { React, useState } from "react"
import { css } from "@emotion/react"
import { Chart } from "react-google-charts"
import { formatDiffForTable, numberWithCommas } from "../utils/formatter"
import { Button } from "react-bootstrap"

// JS에서 커스텀 객체를 정렬할 때 정렬 기준을 제공하는 함수
function compareConfirmed(x, y) {
  if (x.confirmed > y.confirmed) {
    return -1
  } else if (x.confirmed < y.confirmed) {
    return 1
  }
  return 0
}

// 테이블에 표시되는 데이터를 만들어내는 공통 함수
function generateDiffText(value, valuePrev, colorClassName) {
  return {
    v: value,
    f: `${numberWithCommas(value)}
        <br>
        <span class ="diff ${colorClassName}">
        ${formatDiffForTable(value, valuePrev)}
        </span>
        `,
  }
}

export function GlobalTable(props) {
  const { countryByCc, globalStats } = props

  // 모든 국가 데이터를 보여줄지 상위 20개만 노출할지 결정하는 상태 변수
  const [isShowAll, setIsShowAll] = useState(false)

  // 확진자 많은 순은로 데이터 정렬
  const globalStatsSorted = globalStats.sort(compareConfirmed)

  const rows = globalStatsSorted.map(x => {
    const country = countryByCc[x.cc]
    const countryName = country.title_ko + country.flag
    const deathRateText =
      x.death === 0 ? "-" : ((x.death / x.confirmed) * 100).toFixed(1)

    return [
      {
        v: x.cc,
        f: countryName,
      },
      generateDiffText(x.confirmed, x.confirmedPrev, "red"),
      generateDiffText(x.death, x.deathPrev, "red"),
      generateDiffText(x.released, x.releasedPrev, "green"),
      {
        v: x.death / x.confirmed,
        f: deathRateText,
      },
    ]
  })

  const header = [
    { type: "string", label: "국가" },
    { type: "number", label: "확진자" },
    { type: "number", label: "사망자" },
    { type: "number", label: "격리해제" },
    { type: "number", label: "치명(%)" },
  ]

  const tableData = [header, ...(isShowAll ? rows : rows.slice(0, 20))]

  return (
    <div
      css={css`
        max-width: 640px;
        margin: 20px auto;
        .diff.green {
          color: green;
        }

        .diff.red {
          color: red;
        }

        .google-visualization-table-tr-head th {
          background-image: none;
          background-image: #f8f9fa;
          padding: 14px 4px;
          border-bottom: 2px solid #dee2e6;
        }

        .google-visualization-table-td {
          vertical-align: top;
        }

        butoon {
          display: block;
          width: 100%;
          margin-top: 8px;
          border-radius: 0;
        }
      `}
    >
      <Chart
        chartType="Table"
        loader={<div>로딩중</div>}
        data={tableData}
        options={{
          showRowNumber: true,
          width: "100%",
          height: "100%",
          allowHtml: true,
          cssClassNames: {},
        }}
      />
      {!isShowAll ? (
        <Button variant="secondary" onClick={() => setIsShowAll(true)}>
          전체보기
        </Button>
      ) : null}
    </div>
  )
}
