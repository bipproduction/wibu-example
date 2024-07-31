import { loadExampleHookState } from "../action/loadExample";

export async function LoadExampleHookState({ children }: { children: (data: string) => React.ReactNode }) {
    const example = await loadExampleHookState();
    return <div>{children(example)}</div>;
}