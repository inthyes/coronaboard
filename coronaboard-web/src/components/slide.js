import React from "react" //react 임포트

export function Slide(props) {
  //Slide라는 이름의 함수형 컴포넌트 서선언
  const { title, children } = props
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  )
}
