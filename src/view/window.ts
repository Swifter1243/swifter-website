import { Invokable } from "../utilities/invokable";

export const onResize = new Invokable<[]>()

export function initWindow() {
    window.onresize = () => onResize.invoke()
}