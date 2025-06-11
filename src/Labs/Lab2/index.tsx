import "./index.css";

import { Container } from "react-bootstrap";

import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders           from "./Borders";
import Padding           from "./Padding";
import Margins           from "./Margins";
import Corners           from "./Corners";
import Dimensions        from "./Dimensions";
import Positions         from "./Positions";
import Zindex            from "./Zindex";
import Float             from "./Float";
import GridLayout        from "./GridLayout";
import Flex              from "./Flex";
import BootstrapGrids    from "./BootstrapGrids";
import ReactIconsSampler from "./ReactIcons";
import ScreenSizeLabel   from "./ScreenSizeLabel";
import BootstrapTables from "./BootstrapTables";
import ResponsiveTables from "./ResponsiveTables";
import BootstrapLists    from "./BootstrapLists";
import HyperlinkLists   from "./HyperlinkLists";
import BootstrapForms     from "./BootstrapForms";
import BootstrapResponsiveForms from "./BootstrapResponsiveForms";
import BootstrapNavigation from "./BootstrapNavigation";

export default function Lab2() {
    return (
        <>
            <ScreenSizeLabel />

            <Container id="wd-lab2" className="py-4">
                <h2>Lab 2 – Cascading Style Sheets</h2>
                <h3>Styling with the STYLE attribute</h3>
                <p>
                    Style attribute allows configuring look and feel right on the element.
                    Although it’s very convenient, it’s considered bad practice and you should
                    avoid using the style attribute.
                </p>

                <div id="wd-css-id-selectors">
                    <h3>ID selectors</h3>
                    <p id="wd-id-selector-1">
                        Instead of changing the look and feel of all the elements of the same name, e.g. <code>&lt;p&gt;</code>,
                        we can refer to a specific element by its <code>id</code>.
                    </p>
                    <p id="wd-id-selector-2">
                        Here&apos;s another paragraph using a different ID and a different look and feel.
                    </p>
                </div>

                <div id="wd-css-class-selectors">
                    <h3>Class selectors</h3>
                    <p className="wd-class-selector">
                        Instead of using IDs to refer to elements, you can use an element&apos;s <code>class</code> attribute.
                    </p>
                    <h4 className="wd-class-selector">
                        This heading has the same style as the paragraph above.
                    </h4>
                </div>

                <div id="wd-css-document-structure">
                    <div className="wd-selector-1">
                        <h3>Document structure selectors</h3>
                        <div className="wd-selector-2">
                            Selectors can be combined to refer elements in particular places in the document.
                            <p className="wd-selector-3">
                                This paragraph&apos;s red background is referenced as
                                <br />
                                <code>.wd-selector-1 .wd-selector-3</code><br />
                                meaning “.wd-selector-3” is a descendant of “.wd-selector-1”.<br />
                                <span className="wd-selector-4">
                  Whereas this <code>&lt;span&gt;</code> is a direct child of its parent
                </span>
                                <br />
                                You can combine these relationships to create specific styles depending on the document structure.
                            </p>
                        </div>
                    </div>
                </div>

                {/* All of “mini-components” in the order you specified */}
                <ForegroundColors />
                <BackgroundColors />
                <Borders />
                <Padding />
                <Margins />
                <Corners />
                <Dimensions />
                <Positions />
                <Zindex />
                <Float />
                <GridLayout />
                <Flex />
                <ReactIconsSampler />
                <BootstrapGrids />
                <BootstrapTables />
                <ResponsiveTables />
                <BootstrapLists />
                <HyperlinkLists />
                <BootstrapForms />
                <BootstrapResponsiveForms />
                <BootstrapNavigation />
            </Container>
        </>
    );
}