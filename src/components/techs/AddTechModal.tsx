import React, { useState } from "react";
import { connect } from "react-redux";
import { addTech } from "../../actions/techActions";
import M from "materialize-css/dist/js/materialize.min.js";

interface AddTechModalProps {
  addTech: (tech: Tech) => void;
}

interface Tech {
  firstName: string;
  lastName: string;
}

const AddTechModal: React.FC<AddTechModalProps> = ({ addTech }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const onSubmit = () => {
    if (firstName === "" || lastName === "") {
      M.toast({ html: "Please enter the first and last name" });
    } else {
      const newTech: Tech = {
        firstName,
        lastName,
      };

      addTech(newTech);
      M.toast({ html: `Technician ${firstName} ${lastName} was added!` });

      // Clear fields
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <div id="add-tech-modal" className="modal">
      <div className="modal-content">
        <h4>New Technician</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <label htmlFor="firstName" className="active">
              First Name
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <label htmlFor="lastName" className="active">
              Last Name
            </label>
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

export default connect(null, { addTech })(AddTechModal);
