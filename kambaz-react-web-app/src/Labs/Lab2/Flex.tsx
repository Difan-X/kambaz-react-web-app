import "./index.css";

export default function Flex() {
    return (
        <div id="wd-css-flex">
            <h2>Flex Basics</h2>

            {/* 1) Basic row */}
            <div className="wd-flex-row-container">
                <div className="wd-bg-color-yellow">Column 1</div>
                <div className="wd-bg-color-blue">Column 2</div>
                <div className="wd-bg-color-red">Column 3</div>
            </div>

            {/* 2) Grow last column */}
            <h3>Flex Grow</h3>
            <div className="wd-flex-row-container">
                <div className="wd-bg-color-yellow">Column 1</div>
                <div className="wd-bg-color-blue">Column 2</div>
                <div className="wd-bg-color-red wd-flex-grow-1">
                    Column 3 (grows)
                </div>
            </div>

            {/* 3) Fixed width + grow */}
            <h3>Fixed Width + Flex Grow</h3>
            <div className="wd-flex-row-container">
                <div className="wd-bg-color-yellow wd-width-75px">
                    Column 1 (75px)
                </div>
                <div className="wd-bg-color-blue">Column 2</div>
                <div className="wd-bg-color-red wd-flex-grow-1">
                    Column 3 (fills remaining)
                </div>
            </div>
        </div>
    );
}