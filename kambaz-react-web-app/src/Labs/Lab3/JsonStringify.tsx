export default function JsonStringify() {
    const squares = [1, 4, 16, 25, 36];
    return (
        <div id="wd-json-stringify" className="p-3">
            <h4>JSON Stringify</h4>
            squares = {JSON.stringify(squares)}
            <hr />
        </div>
    );
}
