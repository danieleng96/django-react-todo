import React, { useState } from 'react';

const DateTimePicker = () => {
  const [minDatetime, setMinDatetime] = useState(new Date().toISOString().slice(0, 16));

  return (
    <input type="datetime-local" min={minDatetime} />
  );
};

export default DateTimePicker;