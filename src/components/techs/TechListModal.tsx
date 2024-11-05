import React, { useEffect } from "react";
import { connect } from "react-redux";
import TechItem from "./TechItem";
import { getTechs } from "../../actions/techActions";
import { RootState } from "../../reducers"; // Adjust path if necessary

interface Tech {
  id: number;
  firstName: string;
  lastName: string;
}

interface TechState {
  techs: Tech[] | null;
  loading: boolean;
}

interface TechListModalProps {
  tech: TechState;
  getTechs: () => void;
}

const TechListModal: React.FC<TechListModalProps> = ({
  getTechs,
  tech: { techs, loading },
}) => {
  useEffect(() => {
    getTechs();
  }, [getTechs]);

  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        <h4>Technician List</h4>
        <ul className="collection">
          {!loading &&
            techs !== null &&
            techs.map((tech) => <TechItem key={tech.id} tech={tech} />)}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechListModal);
