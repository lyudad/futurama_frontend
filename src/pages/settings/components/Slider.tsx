import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

interface Props {
  value: number;
  onChange(newValue: number): void;
}
export function IntegerStep({value, onChange}: Props): JSX.Element {  
  return (
    <Row style={{marginRight: '1.3rem'}}>
      <Col style={{width: '10rem'}} span={20}>
        <Slider
          min={0}
          max={50}
          onChange={onChange}
          value={value}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={50}
          style={{ width: '3.5rem' }}
          value={value}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};
