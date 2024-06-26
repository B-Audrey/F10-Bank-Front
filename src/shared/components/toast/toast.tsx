import './toast.scss';
import { useEffect, useState } from 'react';

export default function Toast({color, message}) {
  const duration = 4000
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  });

  if (!visible) {
    return null;
  }
  return (
    <div className="toast-container">
      <div className="toast" style={{ backgroundColor: color }}>
        <p>{message}</p>
      </div>
    </div>
  );
}
