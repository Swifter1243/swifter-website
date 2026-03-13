import type {Component} from "svelte";

export type Page = {
    loadMethod: () => Promise<Component>,
    loaded?: Component
}

function makePage(loader: () => Promise<any>): Page {
    return {
        loadMethod: () => loader().then(m => m.default)
    };
}

export const PAGES = {
    placeHolder: makePage(() => import("$lib/pages/PlaceHolder.svelte")),
    aboutMe: makePage(() => import("$lib/pages/AboutMe.svelte")),
    myLinks: makePage(() => import("$lib/pages/MyLinks.svelte")),

    aether: makePage(() => import("$lib/pages/projects/Aether.svelte")),
    beatSaberEnvironmentGrabber: makePage(() => import("$lib/pages/projects/BeatSaberEnvironmentGrabber.svelte")),
    beatCraft: makePage(() => import("$lib/pages/projects/BeatCraft.svelte")),
    beatSaberLevels: makePage(() => import("$lib/pages/projects/BeatSaberLevels.svelte")),
    bloodRushing: makePage(() => import("$lib/pages/projects/BloodRushing.svelte")),
    bloonMan: makePage(() => import("$lib/pages/projects/BloonMan.svelte")),
    boomboxRemastered: makePage(() => import("$lib/pages/projects/BoomboxRemastered.svelte")),
    derelict: makePage(() => import("$lib/pages/projects/Derelict.svelte")),
    enlighten: makePage(() => import("$lib/pages/projects/Enlighten.svelte")),
    excelSoftwareRenderer: makePage(() => import("$lib/pages/projects/ExcelSoftwareRenderer.svelte")),
    extraSensory2: makePage(() => import("$lib/pages/projects/ExtraSensory2.svelte")),
    graspingAtStraws: makePage(() => import("$lib/pages/projects/GraspingAtStraws.svelte")),
    greenfootTetris: makePage(() => import("$lib/pages/projects/GreenfootTetris.svelte")),
    magicNetherPortal: makePage(() => import("$lib/pages/projects/MagicNetherPortal.svelte")),
    myMusic: makePage(() => import("$lib/pages/projects/MyMusic.svelte")),
    plasmaShift: makePage(() => import("$lib/pages/projects/PlasmaShift.svelte")),
    remapper: makePage(() => import("$lib/pages/projects/ReMapper.svelte")),
    ricochet: makePage(() => import("$lib/pages/projects/Ricochet.svelte")),
    sdlMinecraft: makePage(() => import("$lib/pages/projects/SDLMinecraft.svelte")),
    shadertoyShaders: makePage(() => import("$lib/pages/projects/ShadertoyShaders.svelte")),
    synergy: makePage(() => import("$lib/pages/projects/Synergy.svelte")),
    unityAnimationWindow: makePage(() => import("$lib/pages/projects/UnityAnimationWindow.svelte")),
    vivifyTemplate: makePage(() => import("$lib/pages/projects/VivifyTemplate.svelte")),
    zeroInc: makePage(() => import("$lib/pages/projects/ZeroInc.svelte")),
} satisfies Record<string, Page>