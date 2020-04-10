import * as React from "react";
import assert from "assert";
import Hidden, { VisibilityMap } from "../lib/Hidden";
import renderer from "react-test-renderer";
import { toMatchDiffSnapshot } from "snapshot-diff";

expect.extend({ toMatchDiffSnapshot });
type Callback = () => void;

class Media {
  static listeners: Callback[] = [];
  addListener(callback: Callback) {
    Media.listeners.push(callback);
  }
}

const setup = (height: number = 1280, width: number = 1024) => {
  //@ts-ignore
  window.innerHeight = height;
  //@ts-ignore
  window.innerWidth = width;
  //@ts-ignore
  window.matchMedia = (mediaString: String): Media => {
    return new Media();
  };
};

const sizes = [
  {
    size: "md",
    width: 1024,
    height: 1280,
  },
  {
    size: "sm",
    width: 768,
    height: 1024,
  },
  {
    size: "xs",
    width: 389,
    height: 512,
  },
  {
    size: "xl",
    width: 2560,
    height: 1440,
  },
  {
    size: "lg",
    width: 1920,
    height: 1080,
  },
];

function helper(a: React.ReactElement, b: React.ReactElement) {
  expect(renderer.create(a).toJSON()).toMatchSnapshot();
  expect(renderer.create(b).toJSON()).toMatchSnapshot();
  expect(renderer.create(a).toJSON()).toMatchDiffSnapshot(
    renderer.create(b).toJSON()
  );
}

for (const { size, width, height } of sizes) {
  assert.deepEqual(VisibilityMap, {
    xsUp: [],
    xsDown: ["sm", "md", "lg", "xl"],
    smUp: ["xs"],
    smDown: ["md", "lg", "xl"],
    mdUp: ["xs", "sm"],
    mdDown: ["lg", "xl"],
    lgUp: ["xs", "sm", "md"],
    lgDown: ["xl"],
    xlUp: ["xs", "sm", "md", "lg"],
    xlDown: [],
  });

  test(`Test viewport.${size} against xs rules`, () => {
    setup(height, width);

    helper(
      <Hidden xsDown>xsDown=true</Hidden>,
      <Hidden only={["xs"]}>xsDown=true</Hidden>
    );

    helper(
      <Hidden xsUp>xsUp=true</Hidden>,
      <Hidden only={["xs", "sm", "md", "lg", "xl"]}>xsUp=true</Hidden>
    );
  });

  test(`Test viewport.${size} against sm rules`, () => {
    setup(height, width);

    helper(
      <Hidden smDown>smDown=true</Hidden>,
      <Hidden only={["xs", "sm"]}>smDown=true</Hidden>
    );

    helper(
      <Hidden smUp>smUp=true</Hidden>,
      <Hidden only={["sm", "md", "lg", "xl"]}>smUp=true</Hidden>
    );
  });

  test(`Test viewport.${size} against md rules`, () => {
    setup(height, width);

    helper(
      <Hidden mdDown>mdDown=true</Hidden>,
      <Hidden only={["xs", "sm", "md"]}>mdDown=true</Hidden>
    );

    helper(
      <Hidden mdUp>mdUp=true</Hidden>,
      <Hidden only={["md", "lg", "xl"]}>mdUp=true</Hidden>
    );
  });

  test(`Test viewport.${size} against lg rules`, () => {
    setup(height, width);

    helper(
      <Hidden lgDown>lgDown=true</Hidden>,
      <Hidden only={["xs", "sm", "md", "lg"]}>lgDown=true</Hidden>
    );

    helper(
      <Hidden lgUp>lgUp=true</Hidden>,
      <Hidden only={["lg", "xl"]}>lgUp=true</Hidden>
    );
  });

  test(`Test viewport.${size} against xl rules`, () => {
    setup(height, width);

    helper(
      <Hidden xlDown>xlDown=true</Hidden>,
      <Hidden only={["xs", "sm", "md", "lg", "xl"]}>lgDown=true</Hidden>
    );

    helper(
      <Hidden xlUp>xlUp=true</Hidden>,
      <Hidden only={["xl"]}>xlUp=true</Hidden>
    );
  });
}
