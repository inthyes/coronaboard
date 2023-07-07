import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import { Container, Button, ButtonGroup } from "react-bootstrap"

export default function ButtonPage() {
  return (
    <Container>
      <div>
        <button varient="primary">Primary</button>
        <button varient="secondary">secondary</button>
        <button varient="success">success</button>
        <button varient="danger">danger</button>
        <button varient="warning">warning</button>
        <button varient="info">info</button>
        <button varient="light">light</button>
        <button varient="dark">dark</button>
      </div>
      <hr />

      <ButtonGroup size="md">
        <Button variant="primary">오늘</Button>
        <Button variant="outline-primary">어제</Button>
      </ButtonGroup>
    </Container>
  )
}
