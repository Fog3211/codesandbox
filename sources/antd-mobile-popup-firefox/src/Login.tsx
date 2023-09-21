import "./Login.css";
import svgIcon from "./assets/react.svg";

export const LoginPage = () => {
  return (
    <div className="login">
      <div
        onClick={() => {
          alert("click div");
        }}
        className="btn1"
      >
        div button
      </div>

      <button
        onClick={() => {
          alert("click button");
        }}
        className="btn2"
      >
        button
      </button>

      <img
        onClick={() => {
          alert("click img");
        }}
        src={svgIcon}
        className="img"
      />
    </div>
  );
};
