import { type Project } from "./project";
import placeHolderHTML from '../pages/placeholder.html?raw'
import extraSensory2HTML from './pages/extra_sensory_2.html?raw'
import derelictHTML from './pages/derelict.html?raw'
import synergyHTML from './pages/synergy.html?raw'
import aetherHTML from './pages/aether.html?raw'
import graspingAtStrawsHTML from './pages/grasping_at_straws.html?raw'
import zeroIncHTML from './pages/zero_inc.html?raw'
import bloonManHTML from './pages/bloon_man.html?raw'
import plasmaShiftHTML from './pages/plasmashift.html?raw'
import beatCraftHTML from './pages/beatcraft.html?raw'
import remapperHTML from './pages/remapper.html?raw'
import bloodRushingHTML from './pages/blood_rushing.html?raw'

const projects: Project[] = [
    {
        importance: 5,
        name: 'Extra Sensory II',
        key: 'extra-sensory-ii',
        html: extraSensory2HTML,
        category: 'Experiences',
        skills: ['C#', 'Shaders', 'Unity', 'TypeScript', 'Teamwork', 'Audio'],
        demoLink: 'https://beatsaver.com/playlists/797071',
    },
    {
        importance: 4,
        name: 'Derelict',
        key: 'derelict',
        html: derelictHTML,
        category: 'Games',
        skills: ['C#', 'Unity', 'Teamwork', 'Shaders']
    },
    {
        importance: 4,
        name: 'SYNERGY',
        key: 'synergy',
        html: synergyHTML,
        category: 'Games',
        skills: ['C#', 'Unity', 'Shaders'],
        demoLink: 'https://github.com/Swifter1243/SYNERGY/releases/latest',
        sourceLink: 'https://github.com/Swifter1243/SYNERGY'
    },
    {
        importance: 3,
        name: '743+Aether*✧ . * ¹¹¹} + , .',
        key: 'aether',
        html: aetherHTML,
        category: 'Experiences',
        skills: ['C#', 'Shaders', 'Unity'],
        demoLink: 'https://beatsaver.com/maps/4968d',
        sourceLink: 'https://github.com/Swifter1243/aether_map'
    },
    {
        importance: 2,
        name: 'Grasping At Straws',
        key: 'grasping-at-straws',
        html: graspingAtStrawsHTML,
        category: 'Games',
        skills: ['C#', 'Shaders', 'Unity', 'Audio'],
        demoLink: 'https://github.com/Swifter1243/Grasping-At-Straws/releases/latest',
        sourceLink: 'https://github.com/Swifter1243/Grasping-At-Straws'
    },
    {
        importance: 2,
        name: 'ZERO Inc.',
        key: 'zero-inc',
        html: zeroIncHTML,
        category: 'Games',
        skills: ['C#', 'Shaders', 'Teamwork'],
        demoLink: 'https://drive.google.com/drive/u/0/folders/15qEAkHTWxyTDABXE9rn7VNDnCzREBMpl',
    },
    {
        importance: 2,
        name: 'BLOON MAN',
        key: 'bloon-man',
        html: bloonManHTML,
        category: 'Games',
        skills: ['C#', 'Teamwork', 'Unity', 'Audio'],
        demoLink: 'https://github.com/Swifter1243/SLC_GAMEJAM_SEM3/releases/latest',
        sourceLink: 'https://github.com/Swifter1243/SLC_GAMEJAM_SEM3'
    },
    {
        importance: 1,
        name: 'PlasmaShift',
        key: 'plasmashift',
        html: plasmaShiftHTML,
        category: 'Games',
        skills: ['C#', 'Teamwork', 'Unity', 'Shaders'],
        demoLink: 'https://catsandwich1259.itch.io/plasmashift',
        sourceLink: 'https://github.com/CatSandwich/PlasmaShift'
    },
    {
        importance: 5,
        name: 'BeatCraft',
        key: 'beatcraft',
        html: beatCraftHTML,
        category: 'Experiments',
        skills: ['Java', 'Teamwork', 'Mathematics'],
        demoLink: 'https://modrinth.com/mod/beatcraft',
        sourceLink: 'https://github.com/Swifter1243/BeatCraft'
    },
    {
        importance: 5,
        name: 'ReMapper',
        key: 'remapper',
        html: remapperHTML,
        category: 'Tools',
        skills: ['TypeScript', 'Python', 'Mathematics'],
        sourceLink: 'https://github.com/Swifter1243/ReMapper'
    },
    {
        importance: 2,
        name: 'BRLCTAP',
        key: 'blood-rushing',
        html: bloodRushingHTML,
        category: 'Experiences',
        skills: ['TypeScript', 'Unity', 'Teamwork'],
        demoLink: 'https://beatsaver.com/playlists/8713',
        sourceLink: 'https://github.com/Swifter1243/MapScripts'
    },
    {
        importance: 3,
        name: 'ricochet',
        key: 'ricochet',
        html: placeHolderHTML,
        category: 'Experiences',
        skills: ['Shaders', 'Unity'],
        demoLink: 'https://vrchat.com/home/world/wrld_257dfd01-d3ac-45be-9a09-d7a7ef1ed68b/info',
    },
    {
        importance: 3.5,
        name: 'Shadertoy Shaders',
        key: 'shadertoy-shaders',
        html: placeHolderHTML,
        category: 'Experiences',
        skills: ['Shaders'],
    },
    {
        importance: 2,
        name: 'Beat Saber Levels',
        key: 'beat-saber-levels',
        html: placeHolderHTML,
        category: 'Experiences',
        skills: ['Unity', 'TypeScript', 'Shaders'],
        demoLink: 'https://beatsaver.com/profile/4284246'
    },
    {
        importance: 1,
        name: 'Beat Saber Environment Grabber',
        key: 'environment-grabber',
        html: placeHolderHTML,
        category: 'Tools',
        skills: ['TypeScript'],
        sourceLink: 'https://github.com/Swifter1243/EnvironmentGrabber'
    },
    {
        importance: 2,
        name: 'Enlighten',
        key: 'enlighten',
        html: placeHolderHTML,
        category: 'Tools',
        skills: ['Unity', 'C#', 'Shaders'],
        sourceLink: 'https://github.com/Swifter1243/Enlighten'
    },
    {
        importance: 3,
        name: 'My Website',
        key: 'my-website',
        html: placeHolderHTML,
        category: 'Experiences',
        skills: ['TypeScript', 'Audio'],
    },
    {
        importance: 3.5,
        name: 'Vivify Template',
        key: 'vivify-template',
        html: placeHolderHTML,
        category: 'Tools',
        skills: ['C#', 'Unity', 'Teamwork', 'TypeScript'],
        sourceLink: 'https://github.com/Swifter1243/VivifyTemplate'
    },
    {
        importance: 2.5,
        name: 'SDL Minecraft',
        key: 'sdl-minecraft',
        html: placeHolderHTML,
        category: 'Games',
        skills: ['C++', 'Teamwork']
    },
    {
        importance: 2,
        name: 'Excel Software Renderer',
        key: 'excel-software-renderer',
        html: placeHolderHTML,
        category: 'Experiments',
        skills: ['Python', 'Mathematics']
    },
    {
        importance: 2,
        name: 'Magic Nether Portal',
        key: 'magic-nether-portal',
        html: placeHolderHTML,
        category: 'Experiments',
        skills: ['Mathematics'],
        demoLink: 'https://github.com/Swifter1243/magic-nether-portal/releases/latest',
        sourceLink: 'https://github.com/Swifter1243/magic-nether-portal'
    },
    {
        importance: 2,
        name: 'Greenfoot Tetris',
        key: 'magic-nether-portal',
        html: placeHolderHTML,
        category: 'Games',
        skills: ['Java'],
        sourceLink: 'https://github.com/ElijahStafford/GreenFootTetris'
    },
    {
        importance: 1.5,
        name: 'My Music',
        key: 'my-music',
        html: placeHolderHTML,
        category: 'Experiments',
        skills: ['TypeScript', 'Audio'],
        demoLink: 'https://soundcloud.com/swifter1243'
    },
    {
        importance: 5,
        name: 'BoomBox Remastered',
        key: 'boombox-remastered',
        html: placeHolderHTML,
        category: 'Games',
        skills: ['Unity', 'C#', 'Shaders', 'Teamwork'],
        demoLink: 'https://store.steampowered.com/app/4223390/BoomBox_Remastered'
    },
    {
        importance: 2,
        name: 'Unity Animation Window',
        key: 'unity-animation-window',
        html: placeHolderHTML,
        category: 'Tools',
        skills: ['Unity', 'C#'],
        sourceLink: 'https://github.com/Swifter1243/UnityAnimationWindow'
    }
]

export function createProjects(): Project[] {
    return projects
}