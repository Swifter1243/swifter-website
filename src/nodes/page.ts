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
    aboutMe: makePage("/src/lib/pages/AboutMe.svelte"),
    myLinks: makePage("/src/lib/pages/MyLinks.svelte"),
    aether: makePage("/src/lib/pages/projects/Aether.svelte"),
    beatSaberEnvironmentGrabber: makePage("/src/lib/pages/projects/BeatSaberEnvironmentGrabber.svelte"),
    beatCraft: makePage("/src/lib/pages/projects/BeatCraft.svelte"),
    beatSaberLevels: makePage("/src/lib/pages/projects/BeatSaberLevels.svelte"),
    bloodRushing: makePage("/src/lib/pages/projects/BloodRushing.svelte"),
    bloonMan: makePage("/src/lib/pages/projects/BloonMan.svelte"),
    boomboxRemastered: makePage("/src/lib/pages/projects/BoomboxRemastered.svelte"),
} satisfies Record<string, Page>