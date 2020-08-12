// A grid component using the following libs as inspiration.
//
// For the implementation:
// - https://getbootstrap.com/docs/4.3/layout/grid/
// - https://github.com/kristoferjoseph/flexboxgrid/blob/master/src/css/flexboxgrid.css
// - https://github.com/roylee0704/react-flexbox-grid
// - https://material.angularjs.org/latest/layout/introduction
//
// Follow this flexbox Guide to better understand the underlying model:
// - https://css-tricks.com/snippets/css/a-guide-to-flexbox/

import * as React from "react";
import clsx from "clsx";
import { breakpoints, generateGutter, generateGrid } from "./gridHelpers";
import { Breakpoint } from "./createBreakPoints";
// @ts-ignore
import injectSheet from "react-jss";
import Hidden, { HiddenProps } from "./Hidden";

const baseStyles = {
  /* Styles applied to the root element */
  root: {},
  /* Styles applied to the root element if `container={true}`. */
  container: {
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
  },
  containerRow: {
    width: "100%",
  },
  containerColumn: {
    height: "100%",
  },
  maximize: {
    width: "100%",
    height: "100%",
    maxWidth: "100% !important",
    maxHeight: "100% !important",
  },
  relative: {
    position: "relative",
  },
  /* Styles applied to the root element if `item={true}`. */
  item: {
    boxSizing: "border-box",
    margin: "0", // For instance, it's useful when used with a `figure` element.
  },
  flex: {
    display: "flex",
  },
  /* Styles applied to the root element if `zeroMinWidth={true}`. */
  zeroMinWidth: {
    minWidth: 0,
  },
  /* Styles applied to the root element if `direction="column"` or `direction="column-reverse"`. */
  "direction-xs-column": {
    flexDirection: "column",
  },
  /* Styles applied to the root element if `direction="column-reverse"`. */
  "direction-xs-column-reverse": {
    flexDirection: "column-reverse",
  },
  /* Styles applied to the root element if `direction="rwo-reverse"`. */
  "direction-xs-row-reverse": {
    flexDirection: "row-reverse",
  },
  /* Styles applied to the root element if `wrap="nowrap"`. */
  "wrap-xs-nowrap": {
    flexWrap: "nowrap",
  },
  /* Styles applied to the root element if `wrap="reverse"`. */
  "wrap-xs-wrap-reverse": {
    flexWrap: "wrap-reverse",
  },
  /* Styles applied to the root element if `alignItems="center"`. */
  "align-items-xs-center": {
    alignItems: "center",
  },
  /* Styles applied to the root element if `alignItems="flex-start"`. */
  "align-items-xs-flex-start": {
    alignItems: "flex-start",
  },
  /* Styles applied to the root element if `alignItems="flex-end"`. */
  "align-items-xs-flex-end": {
    alignItems: "flex-end",
  },
  /* Styles applied to the root element if `alignItems="baseline"`. */
  "align-items-xs-baseline": {
    alignItems: "baseline",
  },
  /* Styles applied to the root element if `alignContent="center"`. */
  "align-content-xs-center": {
    alignContent: "center",
  },
  /* Styles applied to the root element if `alignContent="flex-start"`. */
  "align-content-xs-flex-start": {
    alignContent: "flex-start",
  },
  /* Styles applied to the root element if `alignContent="flex-end"`. */
  "align-content-xs-flex-end": {
    alignContent: "flex-end",
  },
  /* Styles applied to the root element if `alignContent="space-between"`. */
  "align-content-xs-space-between": {
    alignContent: "space-between",
  },
  /* Styles applied to the root element if `alignContent="space-around"`. */
  "align-content-xs-space-around": {
    alignContent: "space-around",
  },
  /* Styles applied to the root element if `justify="center"`. */
  "justify-xs-center": {
    justifyContent: "center",
  },
  /* Styles applied to the root element if `justify="flex-end"`. */
  "justify-xs-flex-end": {
    justifyContent: "flex-end",
  },
  /* Styles applied to the root element if `justify="space-between"`. */
  "justify-xs-space-between": {
    justifyContent: "space-between",
  },
  /* Styles applied to the root element if `justify="space-around"`. */
  "justify-xs-space-around": {
    justifyContent: "space-around",
  },
  /* Styles applied to the root element if `justify="space-evenly"`. */
  "justify-xs-space-evenly": {
    justifyContent: "space-evenly",
  },
};

// Default CSS values
// flex: '0 1 auto',
// flexDirection: 'row',
// alignItems: 'flex-start',
// flexWrap: 'nowrap',
// justifyContent: 'flex-start',
export const styles = {
  ...baseStyles,
  ...generateGutter("xs"),
  ...breakpoints.keys.reduce(
    (accumulator: object, key: Breakpoint | number) => {
      // Use side effect over immutability for better performance.
      generateGrid(accumulator, key, baseStyles);
      return accumulator;
    },
    {}
  ),
};

export declare type GridSize =
  | boolean
  | "auto"
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

interface HTMLProps {
  div: React.HTMLAttributes<HTMLDivElement>;
  button: React.ButtonHTMLAttributes<HTMLButtonElement>;
  span: React.HTMLAttributes<HTMLSpanElement>;
  a: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  iframe: React.IframeHTMLAttributes<HTMLIFrameElement>;
  img: React.ImgHTMLAttributes<HTMLImageElement>;
  input: React.InputHTMLAttributes<HTMLInputElement>;
  object: React.ObjectHTMLAttributes<HTMLObjectElement>;
}

export declare type GridProps = {
  alignContent?:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  children?: React.ReactNode;
  className?: string;
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  container?: boolean;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  item?: boolean;
  relative?: boolean;
  maximize?: boolean;
  classes?: any;
  component?: React.ReactType;
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  lg?: GridSize;
  md?: GridSize;
  sm?: GridSize;
  xl?: GridSize;
  xs?: GridSize;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  zeroMinWidth?: boolean;
  style?: React.CSSProperties;
  forwardRef?:
    | React.Ref<any>
    | ((ref: React.ReactInstance | HTMLElement) => void);
};

export declare type GridBase<T extends GridProps> = (
  props: T
) => React.ReactElement<T>;

const isGridComponent = (
  element: any
): element is React.ReactElement<GridProps> => {
  return (
    (element &&
      element.type &&
      element.type.InnerComponent &&
      element.type.InnerComponent === GridBase) ||
    (element && element.type === GridStrict) ||
    (element && element.type === Grid)
  );
};

const isHiddenComponent = (
  element: any
): element is React.ReactElement<HiddenProps> => {
  return (
    element != null &&
    typeof element === "object" &&
    element.type &&
    element.type === Hidden
  );
};

const isNull = (element: any): element is null => {
  return element == null;
};

const isReactElement = (element: any): element is React.ReactElement => {
  return !!element.type;
};

export const debug = {
  styles: {},
  useReadableTagNames: true,
};

// TODO update to use SFC/FunctionComponent
function GridBase<T extends GridProps>(props: T): React.ReactElement<T> {
  let {
    classes,
    alignContent = "stretch",
    alignItems = "stretch",
    className: classNameProp,
    component: Component_,
    container = false,
    direction = "row",
    item = false,
    justify = "flex-start",
    lg = false,
    md = false,
    sm = false,
    spacing = 0,
    wrap = "wrap",
    xl = false,
    xs = false,
    zeroMinWidth = false,
    maximize = false,
    relative = false,
    children = null,
    forwardRef = null,
    ...other
  } = props;

  const className = clsx(
    classes.root,
    {
      [classes.container]: container,
      [classes.containerRow]:
        container &&
        !item &&
        (direction === "row" || direction === "row-reverse"),
      [classes.containerColumn]:
        container &&
        !item &&
        (direction === "column" || direction === "column-reverse"),
      [classes.item]: item,
      [classes.maximize]: maximize,
      [classes.relative]: relative,
      [classes.flex]:
        props.hasOwnProperty("justify") ||
        props.hasOwnProperty("alignContent") ||
        props.hasOwnProperty("alignItems") ||
        props.hasOwnProperty("wrap") ||
        props.hasOwnProperty("direction"),
      [classes.zeroMinWidth]: zeroMinWidth,
      [classes[`spacing-xs-${String(spacing)}`]]: container && spacing !== 0,
      [classes[`direction-xs-column`]]:
        direction === "column" || direction === "column-reverse",
      [classes[`direction-xs-${String(direction)}`]]: direction !== "row",
      [classes[`wrap-xs-${String(wrap)}`]]: wrap !== "wrap",
      [classes[`align-items-xs-${String(alignItems)}`]]:
        alignItems !== "stretch",
      [classes[`align-content-xs-${String(alignContent)}`]]:
        alignContent !== "stretch",
      [classes[`justify-xs-${String(justify)}`]]: justify !== "flex-start",
      [classes[`grid-xs-${String(xs)}`]]: xs !== false,
      [classes[`grid-sm-${String(sm)}`]]: sm !== false,
      [classes[`grid-md-${String(md)}`]]: md !== false,
      [classes[`grid-lg-${String(lg)}`]]: lg !== false,
      [classes[`grid-xl-${String(xl)}`]]: xl !== false,
    },
    classNameProp
  );

  if (process.env.NODE_ENV !== "production") {
    const pkg = require("../package.json");

    if (container && item && spacing > 0) {
      console.warn(
        `[${pkg.name}] Grid component has container=true and item=true i.e. <Grid item container>. Expect spacing issues.`
      );
    }

    if (!container && item && spacing > 0) {
      console.warn(
        `[${pkg.name}] Grid component has spacing=${spacing} and item=true but does not have container=true. Is this expected?`
      );
    }

    if (
      container &&
      spacing > 0 &&
      other.style &&
      (other.style.margin ||
        other.style.marginLeft ||
        other.style.marginRight ||
        other.style.marginBottom ||
        other.style.marginRight)
    ) {
      console.warn(
        `[${pkg.name}] Grid component has spacing=${spacing} but has style.margin defined. Please remove margins on this component.`
      );
    }

    if (container) {
      for (const child of React.Children.toArray(children)) {
        if (isNull(child) || isHiddenComponent(child)) {
          continue;
        } else if (isGridComponent(child)) {
          if (!child.props.item) {
            console.warn(
              `[${pkg.name}] Immediate children of <Grid container> should be marked as "item=true" i.e. <Grid item>`,
              child
            );
          } else if (
            spacing > 0 &&
            child.props.style &&
            (child.props.style.padding ||
              child.props.style.paddingLeft ||
              child.props.style.paddingRight ||
              child.props.style.paddingBottom ||
              child.props.style.paddingRight)
          ) {
            console.warn(
              `[${pkg.name}] Grid component's parent has spacing=${spacing} but child has style.padding defined. Please remove padding on this component.`,
              child
            );
          }
        } else if (isReactElement(child)) {
          // @ts-ignore
          const displayName = child.type.displayName || child.type;

          console.warn(
            `[${pkg.name}] Immediate children of <Grid container> should be a <Grid> but instead found <${displayName}>`,
            child
          );
        } else {
          const displayName = child;

          console.warn(
            `[${pkg.name}] Immediate children of <Grid container> should be a <Grid> but instead found ${displayName}`,
            child
          );
        }
      }
    }
  }

  if (process.env.NODE_ENV !== "production") {
    const style = { ...other.style, ...debug.styles };

    if (Component_ == null && debug.useReadableTagNames) {
      // @ts-ignore
      Component_ = "grid";

      if (container) {
        Component_ += "-container";
      }

      if (item) {
        Component_ += "-item";
      }
    }

    return (
      // @ts-ignore
      <Component_
        {...props}
        classes={null}
        container={null}
        item={null}
        class={className}
        ref={forwardRef}
        {...other}
      >
        {children}
      </Component_>
    );
  }

  if (Component_ == null) {
    Component_ = "div";
  }

  return (
    <Component_ className={className} ref={forwardRef} {...other}>
      {children}
    </Component_>
  );
}

declare type GridPropsStrict<T extends keyof HTMLProps> = GridProps & {
  component?: T;
} & HTMLProps[T];

declare type GridPropsUnrestricted<T extends React.ReactType> = GridProps & {
  component?: T;
};

interface StyledGridType {
  <T extends GridProps>(props: T): React.ReactElement<T>;
}

const StyledGrid: StyledGridType = (injectSheet(styles)(
  GridBase
) as unknown) as StyledGridType;

function GridStrict<T extends keyof HTMLProps = "div">(
  props: GridPropsStrict<T>
): React.ReactElement<GridPropsStrict<T>> {
  // @ts-ignore
  return <StyledGrid {...props} />;
}

function Grid<T extends React.ReactType>(
  props: GridPropsUnrestricted<T>
): React.ReactElement<GridPropsUnrestricted<T>> {
  return <StyledGrid {...props} />;
}

Grid.Strict = GridStrict;

export { Hidden };

export default Grid;

export { GridStrict };
