import * as React from "react";
import Grid from "react-fast-grid";

export default function App() {
  const styles = {
    outer: {
      boxShadow: "0 5px 20px #ddd",
      padding: 20,
    },
  };

  return (
    <Grid container spacing={3} style={styles.outer}>
      <Grid
        container
        item
        xs
        justify="center"
        alignItems="flex-start"
        direction="column"
      >
        <Grid container spacing={2} direction="column">
          <Grid item>
            <div>Name</div>
            <input />
          </Grid>
          <Grid item>
            <div>City</div>
            <input />
          </Grid>
          <Grid item>
            <div>Country</div>
            <input />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} justify="center">
        <div>Name</div>
        <input />
      </Grid>
    </Grid>
  );
}
