import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateLog } from "../../actions/logActions";
import TechSelectOptions from "../techs/TechSelectOptions";
import M from "materialize-css/dist/js/materialize.min.js";
import { RootState } from "../../reducers"; // Adjust path as needed

interface Log {
  id: number;
  message: string;
  attention: boolean;
  tech: string;
  date: Date;
}

interface EditLogModalProps {
  current: Log | null;
  updateLog: (log: Log) => void;
}

const EditLogModal: React.FC<EditLogModalProps> = ({ current, updateLog }) => {
  const [message, setMessage] = useState<string>("");
  const [attention, setAttention] = useState<boolean>(false);
  const [tech, setTech] = useState<string>("");

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      const updLog: Log = {
        id: current ? current.id : 0, // Ensure id is provided
        message,
        attention,
        tech,
        date: new Date(),
      };

      updateLog(updLog);
      M.toast({ html: `Log updated by ${tech}` });

      // Clear fields
      setMessage("");
      setAttention(false);
      setTech("");
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
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

const mapStateToProps = (state: RootState) => ({
  current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
