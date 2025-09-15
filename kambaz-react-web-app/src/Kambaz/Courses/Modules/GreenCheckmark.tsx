import { FaCheckCircle } from "react-icons/fa";

interface GreenCheckmarkProps {
    className?: string;
}

/**
 * Renders a green check icon. Accepts an optional className to allow additional styling.
 */
export default function GreenCheckmark({ className }: GreenCheckmarkProps) {
    return <FaCheckCircle className={`text-success ${className ?? ""}`} />;
}