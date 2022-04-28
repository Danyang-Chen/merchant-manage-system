import React, { useState } from 'react';

const Test = () => {
  const [data, setData] = useState([
    { title: 'A', description: 'a' },
    { title: 'B', description: 'b' },
    { title: 'C', description: 'c' },
  ]);

  // [{ title：'A1', description: 'a-1'}]

  const newArr = data.map((item, index) => {
    return {
      title: `${item.title}${item.index}`,
      description: `${item.description}-${item.index}`,
    };
  });

  return <div></div>;
};

export default Test;
