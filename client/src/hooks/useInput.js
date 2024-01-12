import { useState } from 'react';


const useInput = (initialValue = {}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
   
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const reset = () => {
    setValue(initialValue);
  };

  return {
    value,
    setValue,
    onChange: handleChange,
    reset,
  };
};

export default useInput;
