import React from "react";

export const OPERATIONS_KEYS = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",
  EQUALS: "EQUALS"
};

export default {
  [OPERATIONS_KEYS.ADD]: {
    symbol: "+",
    htmlEntity: () => <>&#43;</>
  },
  [OPERATIONS_KEYS.SUBTRACT]: {
    symbol: "-",
    htmlEntity: () => <>&minus;</>
  },
  [OPERATIONS_KEYS.MULTIPLY]: {
    symbol: "*",
    htmlEntity: () => <>&times;</>
  },
  [OPERATIONS_KEYS.DIVIDE]: {
    symbol: "/",
    htmlEntity: () => <>&divide;</>
  },
  [OPERATIONS_KEYS.EQUALS]: {
    symbol: "=",
    htmlEntity: () => <>&#61;</>
  }
};
