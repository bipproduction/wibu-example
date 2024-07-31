import { hookstate, useHookstate } from "@hookstate/core";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";

const localState = hookstate(false);
export function useOpenDrawer() {
  const state = useHookstate(localState);
  return [state.value, state.set] as const;
}
