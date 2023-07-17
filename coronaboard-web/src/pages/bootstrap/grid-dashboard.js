import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import { css } from '@emotion/react';

const borderedGrid = css`
  text-align: center;
  div {
    padding: 10px;
    margin-bottom: 20px;
  }
  Row {
    background-color: rgba(39, 41, 43, 0.03);
    border: 1px solid rgba(39, 41, 43, 0.1);
  }
  .bordered-col {
    border: 1px solid rgba(39, 41, 43, 0.1);
    padding: 10px;
  }
`;

export default function ContainerPage() {
  return (
    <div className="pt-3" css={borderedGrid}>
      <Container>
        <h2>전세계</h2>
        {/* 부트스트랩 그리드 시스템은 화면 너비를 12칸으로 등분하며 xs를
        사용하여등분할 수 있다. md를 통해 768px보다 크거나 같아지는 순간부터 행
        가로 너비를 열 개수 만큼으로 등분한다. 768px는 지정된 것인가? */}
        <Row>
          <Col className="bordered-col" xs={4} md>
            확진자
          </Col>
          <Col className="bordered-col" xs={4} md>
            사망자
          </Col>
          <Col className="bordered-col" xs={4} md>
            격리해제
          </Col>
          <Col className="bordered-col" xs={6} md>
            치명률
          </Col>
          <Col className="bordered-col" xs={6} md>
            발생국
          </Col>
        </Row>
        <h2>대한민국</h2>
        <Row>
          <Col className="bordered-col" xs={3} md>
            확진자
          </Col>
          <Col className="bordered-col" xs={3} md>
            사망자
          </Col>
          <Col className="bordered-col" xs={3} md>
            격리해제
          </Col>
          <Col className="bordered-col" xs={3} md>
            치명률
          </Col>
          <Col className="bordered-col" xs={4} md>
            총검사자
          </Col>
          <Col className="bordered-col" xs={4} md>
            검사중
          </Col>
          <Col className="bordered-col" xs={4} md>
            결과음성
          </Col>
        </Row>
      </Container>
    </div>
  );
}
