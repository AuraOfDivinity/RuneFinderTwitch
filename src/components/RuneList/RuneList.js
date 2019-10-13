import React from "react";

import Grid from "@material-ui/core/Grid";
import RuneItem from "../RuneItem/RuneItem";

class RuneList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (
      this.props.runeDetailsArr.length < 1 ||
      this.props.runeDetailsArr == undefined
    ) {
      return <p>undefined</p>;
    } else {
      return (
        <Grid container justify="center">
          <Grid item xs={6}>
            <Grid container justify="center" alignItems="center">
              {this.props.runeDetailsArr.slice(0, 4).map((runeObject, i) => {
                return <RuneItem link={runeObject.link}></RuneItem>;
              })}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="center">
              {this.props.runeDetailsArr.slice(4, 6).map((runeObject, i) => {
                return (
                  <RuneItem
                    link={runeObject.link}
                    description={runeObject.description}
                  ></RuneItem>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }
}

export default RuneList;
