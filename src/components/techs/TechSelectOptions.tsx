import React, { useEffect } from "react";
import { connect } from "react-redux";
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

interface TechSelectOptionsProps {
  tech: TechState;
  getTechs: () => void;
}

const TechSelectOptions: React.FC<TechSelectOptionsProps> = ({
  getTechs,
  tech: { techs, loading },
}) => {
  useEffect(() => {
    getTechs();
  }, [getTechs]);

  return (
    <>
      {!loading &&
        techs !== null &&
        techs.map((t) => (
          <option key={t.id} value={`${t.firstName} ${t.lastName}`}>
            {t.firstName} {t.lastName}
          </option>
        ))}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechSelectOptions);
