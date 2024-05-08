import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const AboutCards = (props) => (
  <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src={props.image}
      />
    }
  >
    <Meta
      title={props.title}
      description={props.description}
    />
  </Card>
);
export default AboutCards;