import ListGroup from "react-bootstrap/ListGroup";

export default function BootstrapLists() {
    return (
        <div id="wd-css-styling-lists" className="my-4">
            <h2>Favorite movies</h2>
            <ListGroup>
                <ListGroup.Item active>Aliens</ListGroup.Item>
                <ListGroup.Item>Terminator</ListGroup.Item>
                <ListGroup.Item>Blade Runner</ListGroup.Item>
                <ListGroup.Item>Lord of the Rings</ListGroup.Item>
                <ListGroup.Item disabled>Star Wars</ListGroup.Item>
            </ListGroup>
        </div>
    );
}