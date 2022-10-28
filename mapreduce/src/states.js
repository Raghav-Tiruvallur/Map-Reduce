import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } =createGlobalState({
    "logs":[]
})

export { setGlobalState,useGlobalState };