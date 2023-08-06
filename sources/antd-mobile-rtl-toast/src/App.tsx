import "./styles.css";
import { Toast } from "antd-mobile";
import { useEffect, useState } from "react";

export default function App() {
  const [rtl, setRtl] = useState(false);

  useEffect(() => {
    document.documentElement.style.direction = rtl ? "rtl" : "ltr";
  }, [rtl]);

  return (
    <div className="App">
      <button
        style={{ margin: "0 20px" }}
        onClick={() => {
          Toast.show({
            duration: 300000,
            content: "hello world"
          });
        }}
      >
        show Toast
      </button>
      <button
        onClick={() => {
          setRtl((m) => !m);
        }}
      >
        RTL Mode
      </button>
      <div>
        <p>
          current direction: <b>{rtl ? "RTL" : "LTR"}</b>
        </p>
      </div>
    </div>
  );
}
