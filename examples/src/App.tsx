import * as React from "react";
import Grid, { Hidden } from "react-fast-grid";
import { Example1, Example2, Example3, Example4 } from "./components/Examples";

export default function App() {
  return (
    <Grid container spacing={4} style={{ padding: 20 }} direction="column">
      <Hidden only={["sm", "md", "lg", "xl"]} debounce={300}>
        <Grid item>Test 1: xs</Grid>
      </Hidden>
      <Hidden only={["xs", "md", "lg", "xl"]} debounce={300}>
        <Grid item>Test 1: sm</Grid>
      </Hidden>
      <Hidden only={["xs", "sm", "lg", "xl"]} debounce={300}>
        <Grid item>Test 1: md</Grid>
      </Hidden>
      <Hidden only={["xs", "sm", "md", "xl"]} debounce={300}>
        <Grid item>Test 1: lg</Grid>
      </Hidden>
      <Hidden only={["xs", "sm", "md", "lg"]} debounce={300}>
        <Grid item>Test 1: xl</Grid>
      </Hidden>
      <Hidden xsUp debounce={300}>
        <Grid item>Test 2: xs,sm,md,lg,xl</Grid>
      </Hidden>
      <Hidden smUp debounce={300}>
        <Grid item>Test 2: sm,md,lg,xl</Grid>
      </Hidden>
      <Hidden mdUp debounce={300}>
        <Grid item>Test 2: md,lg,xl</Grid>
      </Hidden>
      <Hidden lgUp debounce={300}>
        <Grid item>Test 2: lg,xl</Grid>
      </Hidden>
      <Hidden xlUp debounce={300}>
        <Grid item>Test 2: xl</Grid>
      </Hidden>
      <Hidden xsDown debounce={300}>
        <Grid item>Test 3: xs</Grid>
      </Hidden>
      <Hidden smDown debounce={300}>
        <Grid item>Test 3: xs,sm</Grid>
      </Hidden>
      <Hidden mdDown debounce={300}>
        <Grid item>Test 3: xs,sm,md</Grid>
      </Hidden>
      <Hidden lgDown debounce={300}>
        <Grid item>Test 3: xs,sm,md,lg</Grid>
      </Hidden>
      <Hidden xlDown debounce={300}>
        <Grid item>Test 3: xs,sm,md,lg,xl</Grid>
      </Hidden>
      <div />
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
    </Grid>
  );
}
