import React from "react";

import type { FCC } from "@/types/util.types";

export const Show: FCC<{ when?: boolean }> = (props) => {
  return <>{props.when ? <>{props.children}</> : null}</>;
};
