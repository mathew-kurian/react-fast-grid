import * as React from "react";
import { Breakpoint, keys } from "./createBreakPoints";
import { breakpoints } from "./gridHelpers";
import debounce from "./debounce";

let keysDsc = [...keys].reverse();
let listeners: (() => void)[] = [];

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

      for (const listener of listeners) {
        listener();
      }
    });
  }
} else {
  window.addEventListener(
    "resize",
    () => {
      for (const listener of listeners) {
        listener();
      }
    },
    false
  );
}

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
  children?: React.ReactNode;
  debounce?: number;
}

export const isHiddenComponent = (
  element: any
): element is React.ReactElement<HiddenProps> => {
  return (
    element != null &&
    typeof element === "object" &&
    element.type &&
    element.type === Hidden
  );
};

const upFrom = (breakpoint: Breakpoint): Breakpoint[] => {
  return keys.slice(keys.indexOf(breakpoint));
};

const downFrom = (breakpoint: Breakpoint): Breakpoint[] => {
  return keys.slice(0, keys.indexOf(breakpoint) + 1);
};

type UpDownMap = {
  [key in keyof Required<
    Omit<HiddenProps, "children" | "only" | "debounce">
  >]: Breakpoint[];
};

const upDownMap: UpDownMap = {
  xsUp: upFrom("xs"),
  xsDown: downFrom("xs"),
  smUp: upFrom("sm"),
  smDown: downFrom("sm"),
  mdUp: upFrom("md"),
  mdDown: downFrom("md"),
  lgUp: upFrom("lg"),
  lgDown: downFrom("lg"),
  xlUp: upFrom("xl"),
  xlDown: downFrom("xl"),
};

export default class Hidden extends React.Component<HiddenProps, HiddenState> {
  _onResizeDebounced: () => void;

  constructor(props: HiddenProps) {
    super(props);

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

  _getSafeDebounceResize<T extends Function>(
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
    listeners.push(this._onResizeInvoker);
  }

  componentWillUnmount() {
    listeners = listeners.filter(
      (listener) => listener !== this._onResizeInvoker
    );
  }

  _getBreakPoint = (width: number): Breakpoint => {
    const breakPointValues = breakpoints.values;

    for (const key of keysDsc) {
      if (width >= breakPointValues[key]) {
        return key;
      }
    }

    return "xl";
  };

  _getTrueKeyInProp = (): keyof UpDownMap | null => {
    const props = this.props;

    for (const key in upDownMap) {
      // @ts-ignore
      if (props[key] === true) {
        return key as keyof UpDownMap;
      }
    }

    return null;
  };

  _isVisible = (breakPoint: Breakpoint): boolean => {
    const { only } = this.props;

    if (Array.isArray(only)) {
      return only.includes(breakPoint);
    } else if (typeof only === "string") {
      return only === breakPoint;
    }

    const trueKey = this._getTrueKeyInProp();

    if (trueKey !== null) {
      return upDownMap[trueKey].includes(breakPoint);
    }

    return false;
  };

  _lastBreakPoint: Breakpoint | null = null;
  _onResize = () => {
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

  _onResizeInvoker = () => this._onResizeDebounced();

  render() {
    if (this.state.visible) {
      return this.props.children;
    }

    return null;
  }
}
