import { ClockCircleOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';

function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ display: 'flex', marginRight: 50, alignItems: 'center' }}>
      <ClockCircleOutlined style={{ marginRight: 10 }} />
      <p style={{ marginBottom: 0, marginRight: 5 }}>Time:</p>
      <p style={{ marginBottom: 0, width: 30 }}>
        <strong>
          {currentTime.toLocaleTimeString([], {
            hour12: false,
          })}
        </strong>
      </p>
    </div>
  );
}

export default LiveClock;
