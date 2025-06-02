import { useSelector } from "react-redux";

// 1. Define the TypeScript type for the slice of state we expect
interface HelloState {
    message: string;
}

export default function HelloRedux() {
    // 2. Use useSelector to extract `message` from state.helloReducer.
    //    (We cast “state” to “any” here for simplicity; in a stricter TS setup,
    //    you could define RootState = ReturnType<typeof store.getState>.)
    const { message } = useSelector((state: any) => state.helloReducer as HelloState);

    return (
        <div id="wd-hello-redux">
            <h3>Hello Redux</h3>
            <h4>{message}</h4>
            <hr />
        </div>
    );
}