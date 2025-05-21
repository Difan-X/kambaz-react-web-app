import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <BsPlus className="fs-4 ms-2" />
        </div>
    );
}