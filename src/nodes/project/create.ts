import { makeProject, type Project } from "./project";
import placeHolderHTML from '../pages/placeholder.html?raw'
import extraSensory2HTML from './pages/extra_sensory_2.html?raw'
import derelictHTML from './pages/derelict.html?raw'

export function createProjects(): Project[] {
    return [
        makeProject('Extra Sensory II', 'extra-sensory-ii', extraSensory2HTML, 'Experiences', ['C#', 'Shaders', 'Unity', 'TypeScript', 'Teamwork']),
        makeProject('Derelict', 'derelict', derelictHTML, 'Games', ['C#', 'Unity', 'Teamwork', 'Shaders']),
        makeProject('SYNERGY', 'synergy', placeHolderHTML, 'Games', ['C#', 'Unity', 'Shaders']),
        makeProject('743⁺Aether*✧ . * ¹¹¹} ⁺ , .', 'aether', placeHolderHTML, 'Experiences', ['C#', 'Shaders', 'Unity']),
        makeProject('Grasping At Straws', 'grasping-at-straws', placeHolderHTML, 'Games', ['C#', 'Shaders', 'Unity']),
        makeProject('ZERO Inc.', 'zero-inc', placeHolderHTML, 'Games', ['C#', 'Shaders', 'Teamwork']),
        makeProject('BLOON MAN', 'bloon-man', placeHolderHTML, 'Games', ['C#', 'Teamwork', 'Unity']),
        makeProject('PlasmaShift', 'plasmashift', placeHolderHTML, 'Games', ['C#', 'Teamwork', 'Unity']),
        makeProject('BeatCraft', 'beat-craft', placeHolderHTML, 'Games', ['Java', 'Teamwork']),
        makeProject('ReMapper', 'remapper', placeHolderHTML, 'Tools', ['TypeScript']),
        makeProject('BRLCTAP', 'blood-rushing', placeHolderHTML, 'Experiences', ['TypeScript', 'Unity', 'Teamwork']),
        makeProject('ricochet', 'ricochet', placeHolderHTML, 'Experiences', ['Shaders', 'Unity']),
        makeProject('Shadertoy Shaders', 'shadertoy-shaders', placeHolderHTML, 'Experiences', ['Shaders']),
        makeProject('Beat Saber Levels', 'beat-saber-levels', placeHolderHTML, 'Experiences', ['Unity', 'TypeScript', 'Shaders']),
        makeProject('Beat Saber Environment Grabber', 'environment-grabber', placeHolderHTML, 'Tools', ['TypeScript']),
        makeProject('Enlighten', 'enlighten', placeHolderHTML, 'Tools', ['Unity', 'C#', 'Shaders']),
        makeProject('My Website', 'my-website', placeHolderHTML, 'Experiences', ['TypeScript']),
        makeProject('Vivify Template', 'vivify-template', placeHolderHTML, 'Tools', ['C#', 'Unity', 'Teamwork', 'TypeScript']),
        makeProject('SDL Minecraft', 'sdl-minecraft', placeHolderHTML, 'Games', ['C++', 'Teamwork']),
        makeProject('Excel Software Renderer', 'excel-software-renderer', placeHolderHTML, 'Experiments', ['Python', 'Mathematics']),
        makeProject('Magic Nether Portal', 'magic-nether-portal', placeHolderHTML, 'Experiments', ['Mathematics']),
        makeProject('Greenfoot Tetris', 'magic-nether-portal', placeHolderHTML, 'Games', ['Java']),
        makeProject('Music Sketch Catalogue', 'music-sketch-catalogue', placeHolderHTML, 'Experiments', ['TypeScript']),
        makeProject('BoomBox Remastered', 'boombox-remastered', placeHolderHTML, 'Games', ['Unity', 'C#', 'Shaders', 'Teamwork']),
    ]
}