import { Invokable } from "../../utilities/invokable";

export const onResize = new Invokable<[]>()
export const onPointerMove = new Invokable<[PointerEvent]>()

export function initWindow() {
    window.onpointermove = (e) => onPointerMove.invoke(e)
    window.onresize = () => onResize.invoke()
}