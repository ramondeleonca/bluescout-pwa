import { useEffect, useState } from "react";

export default function useLoaded() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => document.readyState === "complete" ? setLoaded(true) : window.addEventListener("load", () => setLoaded(true)), []);
    return loaded;
}