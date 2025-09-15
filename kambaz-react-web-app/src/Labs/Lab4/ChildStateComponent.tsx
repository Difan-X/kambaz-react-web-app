export default function ChildStateComponent({
                                                counter,
                                                setCounter,
                                            }: {
    counter: number;
    setCounter: (newCount: number) => void;
}) {
    return (
        <div id="wd-child-state">
            <h3>Child Counter: {counter}</h3>

            {/*
        Buttons here use the same counter and setCounter that were
        passed from the parent, so clicking “Increment” / “Decrement”
        updates the parent’s state.
      */}
            <button
                onClick={() => setCounter(counter + 1)}
                className="btn btn-primary me-2"
                id="wd-increment-child-state-click"
            >
                Increment
            </button>
            <button
                onClick={() => setCounter(counter - 1)}
                className="btn btn-secondary"
                id="wd-decrement-child-state-click"
            >
                Decrement
            </button>

            <hr />
        </div>
    );
}