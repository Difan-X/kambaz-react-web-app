import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

interface ModuleControlButtonsProps {
    moduleId: string;
    deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void;
}

export default function ModuleControlButtons({
                                                 moduleId,
                                                 deleteModule,
                                                 editModule,
                                             }: ModuleControlButtonsProps) {
    return (
        <div className="float-end d-flex align-items-center">
            {/* 1. Pencil icon: when clicked, invoke editModule(moduleId) */}
            <FaPencil
                className="text-primary me-3"
                style={{ cursor: "pointer" }}
                onClick={() => editModule(moduleId)}
            />

            {/* 2. Trash icon: when clicked, invoke deleteModule(moduleId) */}
            <FaTrash
                className="text-danger me-2"
                style={{ cursor: "pointer" }}
                onClick={() => deleteModule(moduleId)}
            />

            {/* 3. Green check icon (publish toggle, etc.) */}
            <GreenCheckmark className="me-2" />

            {/* 4. Plus icon (e.g., “Add lesson,” not wired up here) */}
            <BsPlus className="fs-4 me-2" style={{ cursor: "pointer" }} />

            {/* 5. Ellipsis for more options (not wired up here) */}
            <IoEllipsisVertical className="fs-4" style={{ cursor: "pointer" }} />
        </div>
    );
}