import "./index.css";

export default function Float() {
    return (
        <div id="wd-float-divs" style={{ marginTop: "2rem" }}>
            <h2>Float</h2>

            <div>
                <img
                    className="wd-float-right"
                    src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
                    alt="Starship"
                />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
                deleniti nemo expedita architecto, voluptatibus atque maxime magnam
                provident. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eius hic deleniti.
                <br />
                <img
                    className="wd-float-left"
                    src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
                    alt="Starship"
                />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
                deleniti nemo expedita architecto, voluptatibus atque maxime magnam.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
                deleniti.
                <div className="wd-float-done" />
            </div>

            <div style={{ marginTop: "2rem" }}>
                <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
                    Yellow
                </div>
                <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
                    Blue
                </div>
                <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
                    Red
                </div>
                <img
                    className="wd-float-right"
                    src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
                    alt="Starship"
                />
                <div className="wd-float-done" />
            </div>
        </div>
    );
}