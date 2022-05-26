import React, { useState } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

export function IntegerStep(): JSX.Element {
  const [inputValue, setInputValue] = useState(1);

  const onChange = (newValue: number): void => {
    setInputValue(newValue);
  };

  return (
    <Row style={{marginRight: '1.3rem'}}>
      <Col style={{width: '10rem'}} span={20}>
        <Slider
          min={0}
          max={50}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue: 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={50}
          style={{ width: '3.5rem' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};
