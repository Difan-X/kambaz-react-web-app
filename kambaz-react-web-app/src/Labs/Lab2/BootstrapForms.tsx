import { FormGroup, FormLabel, FormControl, FormSelect, FormCheck, InputGroup } from "react-bootstrap";

export default function BootstrapForms() {
    return (
        <div id="wd-css-styling-forms" className="my-4">
            <h2>Forms</h2>
            <FormGroup className="mb-3" controlId="wd-email">
                <FormLabel>Email address</FormLabel>
                <FormControl type="email" placeholder="name@example.com" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="wd-textarea">
                <FormLabel>Example textarea</FormLabel>
                <FormControl as="textarea" rows={3} />
            </FormGroup>

            {/* ---------- Dropdowns Section ---------- */}
            <div id="wd-css-styling-dropdowns" className="mb-4">
                <h3>Dropdowns</h3>
                <FormSelect aria-label="Open this select menu">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </FormSelect>
            </div>

            {/* ---------- Switches Section ---------- */}
            <div id="wd-css-styling-switches" className="mb-4">
                <h3>Switches</h3>
                <FormCheck
                    type="switch"
                    id="wd-switch-1"
                    label="Unchecked switch checkbox input"
                />
                <FormCheck
                    type="switch"
                    id="wd-switch-2"
                    label="Checked switch checkbox input"
                    defaultChecked
                />
                <FormCheck
                    type="switch"
                    id="wd-switch-3"
                    label="Unchecked disabled switch checkbox input"
                    disabled
                />
                <FormCheck
                    type="switch"
                    id="wd-switch-4"
                    label="Checked disabled switch checkbox input"
                    disabled
                    defaultChecked
                />
            </div>

            {/* ---------- Range Slider Section ---------- */}
            <div id="wd-css-styling-range-and-sliders" className="mb-4">
                <h3>Range</h3>
                <FormGroup controlId="wd-range1" className="mb-3">
                  <FormLabel>Example range</FormLabel>
                  <FormControl type="range" min={0} max={5} step={0.5} />
                </FormGroup>
            </div>

            {/* ---------- Addons Section ---------- */}
            <div id="wd-css-styling-addons" className="mb-4">
                <h3>Addons</h3>
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <InputGroup.Text>0.00</InputGroup.Text>
                    <FormControl placeholder="Amount" />
                </InputGroup>

                <InputGroup>
                    <FormControl placeholder="Amount" />
                    <InputGroup.Text>$</InputGroup.Text>
                    <InputGroup.Text>0.00</InputGroup.Text>
                </InputGroup>
            </div>

        </div>
    );
}