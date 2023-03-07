import ReactSwitch from "react-switch";
import { useState } from "react";
import "./Toggle.scss";
import PhoneIcon from "../sidebar/icons/PhoneIcon";
import MailIcon from "../sidebar/icons/MailIcon";

export default function Toggle(props) {
  const [checked, setChecked] = useState(props.value);

  const handleChange = (val) => {
    setChecked(val);
    props.onChange(val);
  };
  return (
    <ReactSwitch
      checked={checked}
      onChange={handleChange}
      handleDiameter={34}
      className="toggle"
      onColor="#579CFB" //#F0F1F2
      offColor="#20E2BA" //#F0F1F2
      onHandleColor="#FFFFFF"
      offHandleColor="#FFFFFF"
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            paddingRight: 2,
          }}
        >
          <PhoneIcon />
        </div>
      }
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            paddingRight: 2,
          }}
        >
          <MailIcon />
        </div>
      }
      width={85}
      height={40}
    />
  );
}
