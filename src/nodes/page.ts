import type {Component} from "svelte";

export type Page = {
    loadMethod: () => Promise<Component>,
    loaded?: Component
}

function makePage(url: string): Page {
    return {
        loadMethod: () => import(url).then(m => m.default)
    }
}

export const PAGES = {
    placeHolder: makePage("/src/lib/pages/PlaceHolder.svelte"),
    aboutMe: makePage("/src/lib/pages/AboutMe.svelte")
} satisfies Record<string, Page>