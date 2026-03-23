import { useState, useEffect, useMemo } from "react";

export default function WelcomeTyping({ part1 = "", part2 = "", speed = 100, pause = 2000 }) {
    const [index, setIndex] = useState(0);

    // Combine parts once
    const fullText = useMemo(() => part1 + part2, [part1, part2]);

    useEffect(() => {
        let timeout;

        if (index < fullText.length) {
            timeout = setTimeout(() => setIndex(index + 1), speed);
        } else {
            // Reset after pause
            timeout = setTimeout(() => setIndex(0), pause);
        }

        return () => clearTimeout(timeout);
    }, [index, fullText, speed, pause]);

    // Split typed text for styling
    const typedPart1 = fullText.slice(0, Math.min(index, part1.length));
    const typedPart2 = fullText.slice(part1.length, index);

    return (
        <h2 className="text-2xl md:text-3xl font-semibold">
            <span>{typedPart1}</span>
            <br />
            <span className="text-pink-500">{typedPart2}</span>
        </h2>
    );
}