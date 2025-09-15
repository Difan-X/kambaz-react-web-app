import Table from "react-bootstrap/Table";

export default function ResponsiveTables() {
    return (
        <div id="wd-css-responsive-tables" className="my-4">
            <h2>Responsive tables</h2>
            <Table responsive>
                <thead>
                <tr>
                    <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
                    <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
                    <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
                    <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
                    <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}