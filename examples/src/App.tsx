import * as React from "react";
import Grid from "react-fast-grid";
import { Example1, Example2, Example3, Example4 } from "./components/Examples";

export default function App() {
  return (
    <Grid container spacing={4} style={{ padding: 20 }} direction="column">
      <Grid item>
        <Example1 />
      </Grid>
      <Grid item>
        <Example2 />
      </Grid>
      <Grid item>
        <Example3 />
      </Grid>
      <Grid item>
        <Example4 />
      </Grid>
      6
      <div />
    </Grid>
  );
}
