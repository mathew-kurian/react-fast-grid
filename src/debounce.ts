type TimerID = number;

export default <T extends Function>(
  func: T,
  wait: number,
  immediate?: boolean
): T => {
  let timeout: TimerID;

  return (function () {
    const args = arguments;
    const later = () => {
      timeout = 0;
      if (!immediate) func.apply(arguments);
    };

    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = (setTimeout(later, wait) as unknown) as TimerID;

    if (callNow) {
      func.apply(arguments, args);
    }
  } as unknown) as T;
};
