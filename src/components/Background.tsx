import { forwardRef } from "react"

type Props = {loaded?: boolean, out?: boolean, faded?: boolean, loader?: boolean}
const Background =  forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    return (
        <div ref={ref} className={`bg ${!props.loaded ? "unloaded" : ""} ${props.out ? "out" : ""} ${props.faded ? "faded" : ""} ${props.loader ? "loader" : ""}`}></div>
    )
});

Background.displayName = "Background";
export default Background;