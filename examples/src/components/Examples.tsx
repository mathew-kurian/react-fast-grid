import * as React from "react";
import Grid from "../../../";
import { IoIosCheckmarkCircleOutline, IoMdMenu } from "react-icons/io";

const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10,
  },
};

export const Example1 = () => (
  <div style={styles.outer}>
    <Grid container spacing={2} direction="row">
      <Grid item sm={6} xs={12}>
        <div>First Name</div>
        <input />
      </Grid>
      <Grid item sm={6} xs={12}>
        <div>First Name</div>
        <input />
      </Grid>
      <Grid item sm={6} xs={12}>
        <div>Last Name</div>
        <input />
      </Grid>
      <Grid item sm={6} xs={12}>
        <div>Last Name</div>
        <input />
      </Grid>
      <Grid item sm={6} xs={12}>
        <div>Last Name</div>
        <input />
      </Grid>
    </Grid>
  </div>
);

export const Example2 = () => (
  <div style={styles.outer}>
    <Grid container justify="space-between">
      <Grid container xs spacing={1} justify="flex-start">
        <Grid item justify="center" alignItems="center">
          <IoMdMenu />
        </Grid>
        <Grid item>Description</Grid>
      </Grid>
      <Grid item justify="flex-end" alignItems="center">
        <IoIosCheckmarkCircleOutline />
      </Grid>
    </Grid>
  </div>
);

export const Example3 = () => (
  <Grid container spacing={2}>
    <Grid item xs={2}>
      <Grid
        container
        maximize
        style={styles.outer}
        justify="center"
        alignItems="center"
      >
        <IoIosCheckmarkCircleOutline />
      </Grid>
    </Grid>
    <Grid item xs>
      <Grid container style={{ ...styles.outer }} maximize>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item>
            <div>Last Name</div>
          </Grid>
          <Grid item>
            <input />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={2}>
      <Grid
        container
        maximize
        style={styles.outer}
        justify="center"
        alignItems="center"
      >
        <IoIosCheckmarkCircleOutline />
      </Grid>
    </Grid>
  </Grid>
);

export const Example4 = () => (
  <Grid container justify="center" alignContent="center">
    <Grid
      item
      direction="column"
      container
      style={{ ...styles.outer, width: 400, height: 400 }}
      justify="space-between"
    >
      <Grid item xs>
        Header
      </Grid>
      <Grid item xs={10} style={{ overflowY: "scroll" }}>
        <Grid container direction="row">
          {Array(50)
            .fill(0)
            .map((_, i) => (
              <Grid key={i} item xs={12}>
                <div>Last Name</div>
                <input />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs>
        Footer
      </Grid>
    </Grid>
  </Grid>
);
