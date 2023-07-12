import React from "react" //react 임포트
import { css } from "@emotion/react"
import { Container } from "react-bootstrap"

export function Slide(props) {
  //Slide라는 이름의 함수형 컴포넌트 서선언
  const { title, children, id } = props
  return (
    <div
      id={id}
      css={css`
        text-align: center;
        border-top: 1px solid #aaa;
        padding-top: 40px;
        padding-bottom: 60px;
        h2 {
          margin-bottom: 24px;
        }
      `}
    >
      <Container>
        <h2>{title}</h2>
        <div>{children}</div>
      </Container>
    </div>
  )
}
