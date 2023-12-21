import { FadeLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader />
      </div>
    </div>
  );
};
export default Spinner;
