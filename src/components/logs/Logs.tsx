import React, { useEffect } from "react";
import { connect } from "react-redux";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";
import { getLogs } from "../../actions/logActions";
import { RootState } from "../../reducers"; // Adjust path if necessary

interface Log {
  id: number;
  message: string;
  attention: boolean;
  tech: string;
  date: string;
}

interface LogsProps {
  log: {
    logs: Log[] | null;
    loading: boolean;
  };
  getLogs: () => void;
}

const Logs: React.FC<LogsProps> = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
  }, [getLogs]);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center">No logs to show...</p>
      ) : (
        logs.map((log) => <LogItem key={log.id} log={log} />)
      )}
    </ul>
  );
};

const mapStateToProps = (state: RootState) => ({
  log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);
