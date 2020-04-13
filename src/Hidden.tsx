import * as React from "react";
import { Breakpoint, keys } from "./createBreakPoints";
import { breakpoints } from "./gridHelpers";
import debounce from "./debounce";

interface HiddenState {
  visible: boolean;
}

export interface HiddenProps {
  xsUp?: boolean;
  xsDown?: boolean;
  smUp?: boolean;
  smDown?: boolean;
  mdUp?: boolean;
  mdDown?: boolean;
  lgUp?: boolean;
  lgDown?: boolean;
  xlUp?: boolean;
  xlDown?: boolean;
  only?: Breakpoint | Breakpoint[];
  debounce?: number;
  children?: any;
}

// const isTouchDevice: boolean = ((): boolean => {
//   const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

//   const mq = (query: string) => {
//     return window.matchMedia && window.matchMedia(query).matches;
//   };

//   if (
//     "ontouchstart" in window ||
//     // @ts-ignore
//     (window.DocumentTouch && document instanceof DocumentTouch)
//   ) {
//     return true;
//   }

//   // include the 'heartz' as a way to have a non matching MQ to help terminate the join
//   // https://git.io/vznFH
//   const query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(
//     ""
//   );

//   return mq(query);
// })();

const upFrom = (breakpoint: Breakpoint): Breakpoint[] => {
  return keys.slice(keys.indexOf(breakpoint) + 1);
};

const downFrom = (breakpoint: Breakpoint): Breakpoint[] => {
  return keys.slice(0, keys.indexOf(breakpoint));
};

type VisibilityMap = {
  [key in keyof Required<
    Omit<HiddenProps, "children" | "only" | "debounce" | "touch">
  >]: Breakpoint[];
};

export const VisibilityMap: VisibilityMap = {
  xsUp: downFrom("xs"),
  xsDown: upFrom("xs"),
  smUp: downFrom("sm"),
  smDown: upFrom("sm"),
  mdUp: downFrom("md"),
  mdDown: upFrom("md"),
  lgUp: downFrom("lg"),
  lgDown: upFrom("lg"),
  xlUp: downFrom("xl"),
  xlDown: upFrom("xl"),
};

export default class Hidden extends React.Component<HiddenProps, HiddenState> {
  private static keysDsc = [...keys].reverse();
  private static init_: boolean = false;
  private static listeners_: (() => void)[] = [];

  private static init() {
    if (Hidden.init_) {
      return;
    }

    Hidden.init_ = true;

    if (typeof window.matchMedia === "function") {
      for (const [i, key] of keys.entries()) {
        const start = key;
        const end = keys[i + 1];

        const media = window.matchMedia(
          breakpoints.between(start, end).replace("@media", "").trim()
        );

        media.addListener(() => {
          if (process.env.NODE_ENV !== "production") {
            console.log("Fired listener for media items");
          }

          for (const listener of Hidden.listeners_) {
            listener();
          }
        });
      }
    } else {
      window.addEventListener(
        "resize",
        () => {
          for (const listener of Hidden.listeners_) {
            listener();
          }
        },
        false
      );
    }
  }

  private _onResizeDebounced: () => void;

  constructor(props: HiddenProps) {
    super(props);

    Hidden.init();

    const width = window.innerWidth;
    const breakPoint = this._getBreakPoint(width);

    this.state = {
      visible: this._isVisible(breakPoint),
    };

    const { debounce = 5 } = props;

    this._onResizeDebounced = this._getSafeDebounceResize(
      this._onResize,
      debounce
    );
  }

  private _getSafeDebounceResize<T extends Function>(
    callback: T,
    timeout: number | undefined
  ): T {
    return typeof timeout === "number" && timeout > 0
      ? debounce(callback, timeout)
      : callback;
  }

  componentWillReceiveProps(nextProps: HiddenProps) {
    const { debounce = 5 } = nextProps;

    if (this.props.debounce !== debounce) {
      this._onResizeDebounced = this._getSafeDebounceResize(
        this._onResize,
        debounce
      );
    }
  }

  componentDidMount() {
    Hidden.listeners_.push(this._onResizeInvoker);
  }

  componentWillUnmount() {
    Hidden.listeners_ = Hidden.listeners_.filter(
      (listener) => listener !== this._onResizeInvoker
    );
  }

  private _getBreakPoint = (width: number): Breakpoint => {
    const breakPointValues = breakpoints.values;

    for (const key of Hidden.keysDsc) {
      if (width >= breakPointValues[key]) {
        return key;
      }
    }

    return "xl";
  };

  private _getTrueKeyInProp = (): keyof VisibilityMap | null => {
    const props = this.props;

    for (const key in VisibilityMap) {
      // @ts-ignore
      if (props[key] === true) {
        return key as keyof VisibilityMap;
      }
    }

    return null;
  };

  private _isVisible = (breakPoint: Breakpoint): boolean => {
    const { only } = this.props;

    if (Array.isArray(only)) {
      return !only.includes(breakPoint);
    } else if (typeof only === "string") {
      return only !== breakPoint;
    }

    const trueKey = this._getTrueKeyInProp();

    if (trueKey !== null) {
      return VisibilityMap[trueKey].includes(breakPoint);
    }

    return true;
  };

  private _lastBreakPoint: Breakpoint | null = null;
  private _onResize = () => {
    const width = window.innerWidth;
    const breakPoint = this._getBreakPoint(width);

    if (this._lastBreakPoint === breakPoint) {
      return;
    }

    const lastVisible = this.state.visible;
    const nextVisible = this._isVisible(breakPoint);

    if (lastVisible !== nextVisible) {
      this.setState({ visible: nextVisible });
    }

    this._lastBreakPoint = breakPoint;
  };

  private _onResizeInvoker = () => this._onResizeDebounced();

  render(): any | null {
    if (this.state.visible) {
      const { children } = this.props;

      if (children !== undefined) {
        return children;
      }
    }

    return null;
  }
}
