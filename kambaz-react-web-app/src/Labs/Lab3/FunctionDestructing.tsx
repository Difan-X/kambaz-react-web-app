export default function FunctionDestructing() {
    const add = (a: number, b: number) => a + b;
    const sum = add(1, 2);
    const subtract = ({ a, b }: { a: number; b: number }) => a - b;
    const difference = subtract({ a: 4, b: 2 });
    return (
        <div id="wd-function-destructing" className="p-3">
            <h4>Function Destructing</h4>
            <p>const add = (a, b) =&gt; a + b;</p>
            <p>const sum = add(1, 2);</p>
            <p>const subtract = (&#123; a, b &#125;) =&gt; a - b;</p>
            <p>const difference = subtract(&#123; a: 4, b: 2 &#125;);</p>
            <p>sum = {sum}</p>
            <p>difference = {difference}</p>
            <hr />
        </div>
    );
}