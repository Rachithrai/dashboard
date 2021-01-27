import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "./content.module.css";
import cx from "classnames";
import commonStyles from "../constants/styles.module.css";
import LineChart from "../sessionChart/Line/LineChart";
import PieChart from "../sessionChart/PieChart/PieChart";
import Statistics from "../sessionChart/statistics/Statistics";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { requestApi } from "../action";

function Content(props) {
  const [state, setState] = useState("");
  const [sessionPercent, setSessionPercent] = useState(80);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  useEffect(() => {
    props.requestApi();

    const interval = setInterval(() => {
      props.requestApi();

      return () => clearInterval(interval);
    }, 10000);
  }, []);

  return (
    <div className={styles.topBar}>
      <div>
        {/* Top bar */}
        <div className={styles.topNav}>
          <nav>
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <select
                  value={state}
                  onChange={handleChange}
                  className={cx(styles.dropDown)}
                >
                  <option value="grapefruit">Export</option>
                  <option value="lime">Download</option>
                </select>
              </li>
              <li>
                <a>Add to Dashboard</a>
              </li>
              <li>
                <a>Shortcut</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Sessions */}
      <div className={styles.mainContent}>
        <div className={styles.session}>
          <div className={styles.sessionContainer}>
            <CircularProgress
              variant="determinate"
              value={sessionPercent}
              size="35px"
            />
            <div className={styles.userSession}>
              <p className={commonStyles.mediumText}>All users</p>
              <p className={cx(commonStyles.smallText)}>
                {parseFloat(sessionPercent).toFixed(2)}% Sessions
              </p>
            </div>
          </div>
          <div className={cx(styles.sessionContainer, styles.sessionInactive)}>
            <CircularProgress
              variant="determinate"
              value={99}
              size="35px"
              classes={{ circleDeterminate: styles.sessionInactiveCircle }}
            />
            <div className={styles.userSession}>
              <p
                className={cx(
                  commonStyles.mediumText,
                  styles.sessionInactiveCircle
                )}
              >
                + Add segment
              </p>
            </div>
          </div>
        </div>
        {/* Line Chart */}
        <LineChart
          data={
            props.data.length > 0 && props.data[0].lineChart
              ? props.data[0].lineChart
              : []
          }
        />

        {/* Pie Chart */}
        <div className={styles.secondContent}>
          <div className={styles.statisticsWrapper}>
            <Statistics
              data={
                props.data.length > 0 && props.data[1].bounceRate
                  ? props.data[1]
                  : []
              }
            />
          </div>

          <PieChart
            data={
              props.data.length > 0 && props.data[2].pieChart
                ? props.data[2].pieChart
                : [2]
            }
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ data: state.data });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestApi }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Content);
