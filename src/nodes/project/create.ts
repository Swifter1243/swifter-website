import { makeProject, type Project } from "./project";
import placeHolderHTML from '../pages/placeholder.html?raw'
import extraSensory2HTML from './pages/extra_sensory_2.html?raw'
import derelictHTML from './pages/derelict.html?raw'
import synergyHTML from './pages/synergy.html?raw'
import aetherHTML from './pages/aether.html?raw'
import graspingAtStrawsHTML from './pages/grasping_at_straws.html?raw'
import zeroIncHTML from './pages/zero_inc.html?raw'

export function createProjects(): Project[] {
    return [
        makeProject(5, 'Extra Sensory II', 'extra-sensory-ii', extraSensory2HTML, 'Experiences', ['C#', 'Shaders', 'Unity', 'TypeScript', 'Teamwork', 'Audio']),
        makeProject(4, 'Derelict', 'derelict', derelictHTML, 'Games', ['C#', 'Unity', 'Teamwork', 'Shaders']),
        makeProject(4, 'SYNERGY', 'synergy', synergyHTML, 'Games', ['C#', 'Unity', 'Shaders']),
        makeProject(3, '743⁺Aether*✧ . * ¹¹¹} ⁺ , .', 'aether', aetherHTML, 'Experiences', ['C#', 'Shaders', 'Unity']),
        makeProject(2, 'Grasping At Straws', 'grasping-at-straws', graspingAtStrawsHTML, 'Games', ['C#', 'Shaders', 'Unity', 'Audio']),
        makeProject(2, 'ZERO Inc.', 'zero-inc', zeroIncHTML, 'Games', ['C#', 'Shaders', 'Teamwork']),
        makeProject(2, 'BLOON MAN', 'bloon-man', placeHolderHTML, 'Games', ['C#', 'Teamwork', 'Unity', 'Audio']),
        makeProject(1, 'PlasmaShift', 'plasmashift', placeHolderHTML, 'Games', ['C#', 'Teamwork', 'Unity']),
        makeProject(3, 'BeatCraft', 'beat-craft', placeHolderHTML, 'Games', ['Java', 'Teamwork']),
        makeProject(5, 'ReMapper', 'remapper', placeHolderHTML, 'Tools', ['TypeScript']),
        makeProject(2, 'BRLCTAP', 'blood-rushing', placeHolderHTML, 'Experiences', ['TypeScript', 'Unity', 'Teamwork']),
        makeProject(3, 'ricochet', 'ricochet', placeHolderHTML, 'Experiences', ['Shaders', 'Unity']),
        makeProject(3.5, 'Shadertoy Shaders', 'shadertoy-shaders', placeHolderHTML, 'Experiences', ['Shaders']),
        makeProject(2, 'Beat Saber Levels', 'beat-saber-levels', placeHolderHTML, 'Experiences', ['Unity', 'TypeScript', 'Shaders']),
        makeProject(1, 'Beat Saber Environment Grabber', 'environment-grabber', placeHolderHTML, 'Tools', ['TypeScript']),
        makeProject(2, 'Enlighten', 'enlighten', placeHolderHTML, 'Tools', ['Unity', 'C#', 'Shaders']),
        makeProject(3, 'My Website', 'my-website', placeHolderHTML, 'Experiences', ['TypeScript', 'Audio']),
        makeProject(3.5, 'Vivify Template', 'vivify-template', placeHolderHTML, 'Tools', ['C#', 'Unity', 'Teamwork', 'TypeScript']),
        makeProject(2.5, 'SDL Minecraft', 'sdl-minecraft', placeHolderHTML, 'Games', ['C++', 'Teamwork']),
        makeProject(2, 'Excel Software Renderer', 'excel-software-renderer', placeHolderHTML, 'Experiments', ['Python', 'Mathematics']),
        makeProject(2, 'Magic Nether Portal', 'magic-nether-portal', placeHolderHTML, 'Experiments', ['Mathematics']),
        makeProject(2, 'Greenfoot Tetris', 'magic-nether-portal', placeHolderHTML, 'Games', ['Java']),
        makeProject(1.5, 'My Music', 'my-music', placeHolderHTML, 'Experiments', ['TypeScript', 'Audio']),
        makeProject(5, 'BoomBox Remastered', 'boombox-remastered', placeHolderHTML, 'Games', ['Unity', 'C#', 'Shaders', 'Teamwork']),
        makeProject(2, 'Unity Animation Window', 'unity-animation-window', placeHolderHTML, 'Tools', ['Unity', 'C#']),
    ]
}