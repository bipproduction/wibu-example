import { hookstate, useHookstate } from "@hookstate/core";

const localState = hookstate("");

export function useCustomState() {
  const state = useHookstate(localState);
  return [state.value, state.set] as const;
}
