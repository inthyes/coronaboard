import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import Select from "react-select"

const options = [
  { value: "KR", label: "한국" },
  { value: "JP", label: "일본" },
  { value: "US", label: "미국" },
  { value: "CN", label: "중국" },
]

export default function SelectPage() {
  //* useState 리액트 후크를 이용하여 상태 변수를 정의한다
  const [selectedOptionSingle, setSelectedOptionSingle] = useState()
  const [selectedOptionMulti, setSelectedOptionMulti] = useState()
  //* 단일/다중 선택 상자 종류와 무관하게 선택 가능한 항목의 검색 : isSearchable = {true}
  return (
    <Container className="pt-3">
      <h5>단일 선택 상자</h5>
      <Select
        value={selectedOptionSingle}
        onChange={selectedOption => {
          console.log("Single options selected", selectedOption)
          setSelectedOptionSingle(selectedOption)
        }}
        options={options}
      />
      <hr />
      <h5>다중 선택 상자</h5>
      <Select
        isMulti={true}
        isSearchable={true}
        placeholder="국가 선택..."
        value={selectedOptionMulti}
        onChange={selectedOptions => {
          console.log("Multiple options selected", selectedOptions)
          setSelectedOptionMulti(selectedOptions)
        }}
        options={options}
      />
    </Container>
  )
}
