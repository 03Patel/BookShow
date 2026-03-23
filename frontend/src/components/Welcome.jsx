import { useState, useEffect } from "react";

export default function WelcomeTyping({ part1, part2 }) {
    const [typedText, setTypedText] = useState("");
    const [typedPart2, setTypedPart2] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fullText = part1 + part2;
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                if (index < part1.length) {
                    setTypedText(fullText.slice(0, index + 1));
                } else {
                    setTypedPart2(fullText.slice(part1.length, index + 1));
                }
                setIndex(index + 1);
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            const resetTimeout = setTimeout(() => {
                setTypedText("");
                setTypedPart2("");
                setIndex(0);
            }, 2000);
            return () => clearTimeout(resetTimeout);
        }
    }, [index, part1, part2]);

    return (
        <h2 className="text-2xl md:text-3xl font-semibold">
            <span>{typedText}</span>
            <br />
            <span className="text-pink-500 ">{typedPart2}</span>

        </h2>
    );
}