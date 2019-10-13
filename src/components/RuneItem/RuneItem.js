import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import Tooltip from "react-simple-tooltip";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))(Tooltip);

const RuneItem = props => {
  return (
    <Grid item xs={12}>
      <Tooltip title={props.description}>
        <div style={{ textAlign: "center" }}>
          <img
            src={props.link}
            style={{ maxWidth: "40px", maxHeight: "40px", marginTop: "15px" }}
          />
        </div>
      </Tooltip>
    </Grid>
  );
};

export default RuneItem;
