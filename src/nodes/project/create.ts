import { type Project } from "./project";
import { dateFromMonthYear } from "../../utilities/date";

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
import ricochetHTML from './pages/ricochet.html?raw'
import shadertoyShadersHTML from './pages/shadertoy_shaders.html?raw'
import beatSaberLevelsHTML from './pages/beat_saber_levels.html?raw'
import beatSaberEnvironmentGrabberHTML from './pages/beat_saber_environment_grabber.html?raw'
import enlightenHTML from './pages/enlighten.html?raw'
import vivifyTemplateHTML from './pages/vivify_template.html?raw'
import sdlMinecraftHTML from './pages/sdl_minecraft.html?raw'
import excelSoftwareRendererHTML from './pages/excel_software_renderer.html?raw'
import greenfootTetrisHTML from './pages/greenfoot_tetris.html?raw'
import myMusicHTML from './pages/my_music.html?raw'


const projects: Project[] = [
    {
        importance: 5,
        name: 'Extra Sensory II',
        key: 'extra-sensory-ii',
        html: extraSensory2HTML,
        category: 'Experiences',
        skills: ['C#', 'Shaders', 'Unity', 'TypeScript', 'Teamwork', 'Audio'],
        demoLink: 'https://beatsaver.com/playlists/797071',
        startDate: dateFromMonthYear('September 2023'),
        endDate: dateFromMonthYear('January 2025')
    },
    {
        importance: 4,
        name: 'Derelict',
        key: 'derelict',
        html: derelictHTML,
        category: 'Games',
        skills: ['C#', 'Unity', 'Teamwork', 'Shaders'],
        startDate: dateFromMonthYear('January 2025'),
        endDate: dateFromMonthYear('April 2025')
    },
    {
        importance: 4,
        name: 'SYNERGY',
        key: 'synergy',
        html: synergyHTML,
        category: 'Games',
        skills: ['C#', 'Unity', 'Shaders'],
        demoLink: 'https://github.com/Swifter1243/SYNERGY/releases/latest',
        sourceLink: 'https://github.com/Swifter1243/SYNERGY',
        startDate: dateFromMonthYear('September 2022'),
        endDate: dateFromMonthYear('January 2023')
    },
    {
        importance: 3,
        name: '743+Aether*✧ . * ¹¹¹} + , .',
        key: 'aether',
        html: aetherHTML,
        category: 'Experiences',
        skills: ['C#', 'Shaders', 'Unity'],
        demoLink: 'https://beatsaver.com/maps/4968d',
        sourceLink: 'https://github.com/Swifter1243/aether_map',
        startDate: dateFromMonthYear('May 2025'),
        endDate: dateFromMonthYear('August 2025')
    },
    {
        importance: 2,
        name: 'Grasping At Straws',
        key: 'grasping-at-straws',
        html: graspingAtStrawsHTML,
        category: 'Games',
        skills: ['C#', 'Shaders', 'Unity', 'Audio'],
        demoLink: 'https://github.com/Swifter1243/Grasping-At-Straws/releases/latest',
        sourceLink: 'https://github.com/Swifter1243/Grasping-At-Straws',
        startDate: dateFromMonthYear('February 2025'),
        endDate: dateFromMonthYear('February 2025')
    },
    {
        importance: 2,
        name: 'ZERO Inc.',
        key: 'zero-inc',
        html: zeroIncHTML,
        category: 'Games',
        skills: ['C#', 'Shaders', 'Teamwork'],
        demoLink: 'https://drive.google.com/drive/u/0/folders/15qEAkHTWxyTDABXE9rn7VNDnCzREBMpl',
        startDate: dateFromMonthYear('February 2024'),
        endDate: dateFromMonthYear('February 2024')
    },
    {
        importance: 2,
        name: 'BLOON MAN',
        key: 'bloon-man',
        html: bloonManHTML,
        category: 'Games',
        skills: ['C#', 'Teamwork', 'Unity', 'Audio'],
        demoLink: 'https://github.com/Swifter1243/SLC_GAMEJAM_SEM3/releases/latest',
        sourceLink: 'https://github.com/Swifter1243/SLC_GAMEJAM_SEM3',
        startDate: dateFromMonthYear('October 2024'),
        endDate: dateFromMonthYear('October 2024')
    },
    {
        importance: 1,
        name: 'PlasmaShift',
        key: 'plasmashift',
        html: plasmaShiftHTML,
        category: 'Games',
        skills: ['C#', 'Teamwork', 'Unity', 'Shaders'],
        demoLink: 'https://catsandwich1259.itch.io/plasmashift',
        sourceLink: 'https://github.com/CatSandwich/PlasmaShift',
        startDate: dateFromMonthYear('September 2023'),
        endDate: dateFromMonthYear('September 2023')
    },
    {
        importance: 5,
        name: 'BeatCraft',
        key: 'beatcraft',
        html: beatCraftHTML,
        category: 'Experiments',
        skills: ['Java', 'Teamwork', 'Mathematics'],
        demoLink: 'https://modrinth.com/mod/beatcraft',
        sourceLink: 'https://github.com/Swifter1243/BeatCraft',
        startDate: dateFromMonthYear('January 2021')
    },
    {
        importance: 5,
        name: 'ReMapper',
        key: 'remapper',
        html: remapperHTML,
        category: 'Tools',
        skills: ['TypeScript', 'Python', 'Mathematics'],
        sourceLink: 'https://github.com/Swifter1243/ReMapper',
        startDate: dateFromMonthYear('January 2022')
    },
    {
        importance: 2,
        name: 'BRLCTAP',
        key: 'blood-rushing',
        html: bloodRushingHTML,
        category: 'Experiences',
        skills: ['TypeScript', 'Unity', 'Teamwork'],
        demoLink: 'https://beatsaver.com/playlists/8713',
        sourceLink: 'https://github.com/Swifter1243/MapScripts',
        startDate: dateFromMonthYear('September 2021'),
        endDate: dateFromMonthYear('September 2022')
    },
    {
        importance: 3,
        name: 'ricochet',
        key: 'ricochet',
        html: ricochetHTML,
        category: 'Experiences',
        skills: ['Shaders', 'Unity', 'Mathematics'],
        demoLink: 'https://vrchat.com/home/world/wrld_257dfd01-d3ac-45be-9a09-d7a7ef1ed68b/info',
        sourceLink: 'https://github.com/Swifter1243/ricochet',
        startDate: dateFromMonthYear('December 2023'),
        endDate: dateFromMonthYear('March 2024')
    },
    {
        importance: 3.5,
        name: 'Shadertoy Shaders',
        key: 'shadertoy-shaders',
        html: shadertoyShadersHTML,
        category: 'Experiments',
        skills: ['Shaders', 'Mathematics'],
        startDate: dateFromMonthYear('January 2023')
    },
    {
        importance: 2,
        name: 'Beat Saber Levels',
        key: 'beat-saber-levels',
        html: beatSaberLevelsHTML,
        category: 'Experiences',
        skills: ['Unity', 'TypeScript', 'Shaders'],
        demoLink: 'https://beatsaver.com/profile/4284246',
        startDate: dateFromMonthYear('November 2019')
    },
    {
        importance: 1,
        name: 'Beat Saber Environment Grabber',
        key: 'environment-grabber',
        html: beatSaberEnvironmentGrabberHTML,
        category: 'Tools',
        skills: ['TypeScript'],
        sourceLink: 'https://github.com/Swifter1243/EnvironmentGrabber',
        startDate: dateFromMonthYear('October 2023'),
        endDate: dateFromMonthYear('October 2023')
    },
    {
        importance: 2,
        name: 'Enlighten',
        key: 'enlighten',
        html: enlightenHTML,
        category: 'Tools',
        skills: ['Unity', 'C#', 'Shaders'],
        sourceLink: 'https://github.com/Swifter1243/Enlighten',
        startDate: dateFromMonthYear('August 2023')
    },
    {
        importance: 3,
        name: 'My Website',
        key: 'my-website',
        html: placeHolderHTML,
        category: 'Experiences',
        skills: ['TypeScript', 'Audio'],
        sourceLink: 'https://github.com/Swifter1243/swifter-website',
        startDate: dateFromMonthYear('November 2025')
    },
    {
        importance: 3.5,
        name: 'Vivify Template',
        key: 'vivify-template',
        html: vivifyTemplateHTML,
        category: 'Tools',
        skills: ['C#', 'Unity', 'Shaders', 'Teamwork', 'TypeScript'],
        sourceLink: 'https://github.com/Swifter1243/VivifyTemplate',
        startDate: dateFromMonthYear('February 2024')
    },
    {
        importance: 2.5,
        name: 'SDL Minecraft',
        key: 'sdl-minecraft',
        html: sdlMinecraftHTML,
        category: 'Games',
        skills: ['C++', 'Teamwork'],
        startDate: dateFromMonthYear('February 2024'),
        endDate: dateFromMonthYear('February 2024')
    },
    {
        importance: 2,
        name: 'Excel Software Renderer',
        key: 'excel-software-renderer',
        html: excelSoftwareRendererHTML,
        category: 'Experiments',
        skills: ['Python', 'Mathematics'],
        demoLink: 'https://drive.google.com/file/d/1lVavDQJT7eWCB3lB4XpUlI5SrQxJMPJM/view?usp=sharing',
        startDate: dateFromMonthYear('April 2025'),
        endDate: dateFromMonthYear('April 2025')
    },
    {
        importance: 2,
        name: 'Magic Nether Portal',
        key: 'magic-nether-portal',
        html: placeHolderHTML,
        category: 'Experiments',
        skills: ['Mathematics'],
        demoLink: 'https://github.com/Swifter1243/magic-nether-portal/releases/latest',
        sourceLink: 'https://github.com/Swifter1243/magic-nether-portal',
        startDate: dateFromMonthYear('April 2025'),
        endDate: dateFromMonthYear('April 2025')
    },
    {
        importance: 2,
        name: 'Greenfoot Tetris',
        key: 'greenfoot-tetris',
        html: greenfootTetrisHTML,
        category: 'Experiments',
        skills: ['Java'],
        sourceLink: 'https://github.com/ElijahStafford/GreenFootTetris',
        startDate: dateFromMonthYear('April 2023'),
        endDate: dateFromMonthYear('April 2023')
    },
    {
        importance: 1.5,
        name: 'My Music',
        key: 'my-music',
        html: myMusicHTML,
        category: 'Experiments',
        skills: ['TypeScript', 'Audio'],
        demoLink: 'https://soundcloud.com/swifter1243',
        startDate: dateFromMonthYear('October 2021')
    },
    {
        importance: 5,
        name: 'BoomBox Remastered',
        key: 'boombox-remastered',
        html: placeHolderHTML,
        category: 'Games',
        skills: ['Unity', 'C#', 'Shaders', 'Teamwork'],
        demoLink: 'https://store.steampowered.com/app/4223390/BoomBox_Remastered',
        startDate: dateFromMonthYear('May 2025')
    },
    {
        importance: 2,
        name: 'Unity Animation Window',
        key: 'unity-animation-window',
        html: placeHolderHTML,
        category: 'Tools',
        skills: ['Unity', 'C#'],
        sourceLink: 'https://github.com/Swifter1243/UnityAnimationWindow',
        startDate: dateFromMonthYear('December 2024'),
        endDate: dateFromMonthYear('August 2025')
    }
]

export function createProjects(): Project[] {
    return projects
}