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
    derelict: makePage("/src/lib/pages/projects/Derelict.svelte"),
    enlighten: makePage("/src/lib/pages/projects/Enlighten.svelte"),
    excelSoftwareRenderer: makePage("/src/lib/pages/projects/ExcelSoftwareRenderer.svelte"),
    extraSensory2: makePage("/src/lib/pages/projects/ExtraSensory2.svelte"),
    graspingAtStraws: makePage("/src/lib/pages/projects/GraspingAtStraws.svelte"),
    greenfootTetris: makePage("/src/lib/pages/projects/GreenfootTetris.svelte"),
    magicNetherPortal: makePage("/src/lib/pages/projects/MagicNetherPortal.svelte"),
    myMusic: makePage("/src/lib/pages/projects/MyMusic.svelte"),
    plasmaShift: makePage("/src/lib/pages/projects/PlasmaShift.svelte"),
    remapper: makePage("/src/lib/pages/projects/ReMapper.svelte"),
    ricochet: makePage("/src/lib/pages/projects/Ricochet.svelte"),
    sdlMinecraft: makePage("/src/lib/pages/projects/SDLMinecraft.svelte"),
} satisfies Record<string, Page>