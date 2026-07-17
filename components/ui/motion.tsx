"use client";

import { m, type HTMLMotionProps } from "framer-motion";

export function MotionDiv(props: HTMLMotionProps<"div">) {
  return <m.div {...props} />;
}
