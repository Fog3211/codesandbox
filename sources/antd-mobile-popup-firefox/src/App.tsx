import { useState } from "react";
import { LoginPage } from "./Login";
import { Modal, Switch } from "antd";
import { CenterPopup } from "antd-mobile";
import "./App.css";

function App() {
  const [type, setType] = useState("");
  const [childType, setChildType] = useState("iframe");

  const loginPageUrl = window.location.origin + "/login"

  const children = childType === 'iframe' ?
    <iframe src={loginPageUrl} frameBorder="0" width="100%" height="300"></iframe>
    :
    <LoginPage />

  return (
    <div className="App">
      <div style={{ marginBottom: 15 }}>
        <Switch
          checkedChildren={'iframe'}
          checked={childType === 'iframe'} onChange={() => setChildType(childType === 'iframe' ? '' : 'iframe')} />
      </div>

      <button onClick={() => setType("antd")}>antd</button>
      <button onClick={() => setType("antd-mobile")} style={{ marginLeft: 30 }}>
        antd-mobile
      </button>

      <Modal open={type === "antd"} onCancel={() => setType("")}>
        {children}
      </Modal>

      <CenterPopup
        closeOnMaskClick
        visible={type === "antd-mobile"}
        onClose={() => setType("")}
      >
        {children}
      </CenterPopup>
    </div>
  );
}

export default App;
