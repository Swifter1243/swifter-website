import { onRender } from "./renderer"

const currentUpdateables = new Set<IUpdateable>()

export interface IUpdateable {
    update(deltaTime: number): void
}

export function initUpdateables() {
    onRender.subscribe((deltaTime) => currentUpdateables.forEach(updateable => {
        updateable.update(deltaTime)
    }))
}

export function addUpdateable(updateable: IUpdateable) {
    currentUpdateables.add(updateable)
}

export function removeUpdateable(updateable: IUpdateable) {
    currentUpdateables.delete(updateable)
}