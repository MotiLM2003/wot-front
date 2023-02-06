import React, { useState } from "react";
import AnimatedNumber from "animated-number-react";
import { Button } from "@chakra-ui/react";
const index = () => {
  const [value, setValue] = useState(150);
  const handleChange = ({ target: { value } }) => {
    setValue({ value });
  };
  const formatValue = (value) => value.toFixed(2);
  return (
    <div>
      <Button onClick={() => setValue(3000)}>Hello</Button>
      <AnimatedNumber
        value={value}
        formatValue={formatValue}
        duration={2000}
        easing="linear"
      />
    </div>
  );
};

export default index;
