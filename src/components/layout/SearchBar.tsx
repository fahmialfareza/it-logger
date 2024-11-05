import React, { useRef, ChangeEvent } from "react";
import { connect } from "react-redux";
import { searchLogs } from "../../actions/logActions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../reducers"; // Adjust this import based on your actual root reducer

interface SearchBarProps {
  searchLogs: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchLogs }) => {
  const text = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (text.current) {
      searchLogs(text.current.value);
    }
  };

  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search Logs..."
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

// Map dispatch to props for TypeScript
const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => ({
  searchLogs: (text: string) => dispatch(searchLogs(text)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
