import { useState } from "react";
import { LoginPage } from "./Login";
import { Modal } from "antd";
import { CenterPopup } from "antd-mobile";
import "./App.css";

function App() {
  const [type, setType] = useState("");

  return (
    <div className="App">
      <button onClick={() => setType("antd")}>antd</button>
      <button onClick={() => setType("antd-mobile")} style={{ marginLeft: 30 }}>
        antd-mobile
      </button>

      <Modal open={type === "antd"} onCancel={() => setType("")}>
        <LoginPage />
      </Modal>

      <CenterPopup
        closeOnMaskClick
        visible={type === "antd-mobile"}
        onClose={() => setType("")}
        className="adm-modal"
      >
        <LoginPage />
      </CenterPopup>
    </div>
  );
}

export default App;
