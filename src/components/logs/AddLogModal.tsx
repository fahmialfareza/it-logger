import React, { useState } from "react";
import { connect } from "react-redux";
import { addLog } from "../../actions/logActions";
import TechSelectOptions from "../techs/TechSelectOptions";
import M from "materialize-css/dist/js/materialize.min.js";

interface AddLogModalProps {
  addLog: (log: Log) => void;
}

interface Log {
  message: string;
  attention: boolean;
  tech: string;
  date: Date;
}

const AddLogModal: React.FC<AddLogModalProps> = ({ addLog }) => {
  const [message, setMessage] = useState<string>("");
  const [attention, setAttention] = useState<boolean>(false);
  const [tech, setTech] = useState<string>("");

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      const newLog: Log = {
        message,
        attention,
        tech,
        date: new Date(),
      };

      addLog(newLog);

      M.toast({ html: `Log added by ${tech}` });

      // Clear fields
      setMessage("");
      setAttention(false);
      setTech("");
    }
  };

  return (
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <label htmlFor="message" className="active">
              Log Message
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={(event) => setTech(event.target.value)}
            >
              <option value="" disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
            <label htmlFor="tech" className="active">
              Technician
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  onChange={() => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle: React.CSSProperties = {
  width: "75%",
  height: "75%",
};

export default connect(null, { addLog })(AddLogModal);
