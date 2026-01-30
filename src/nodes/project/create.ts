import { makeProject, type Project } from "./project";
import placeHolderHTML from '../pages/placeholder.html?raw'
import extraSensory2HTML from './pages/extra_sensory_2.html?raw'

export function createProjects(): Project[] {
    return [
        makeProject('Extra Sensory II', 'extra-sensory-ii', extraSensory2HTML, 'Tech Art', ['C#', 'Shaders', 'Unity', 'TypeScript', 'Teamwork']),
        makeProject('Derelict', 'derelict', placeHolderHTML, 'Games', ['C#', 'Unity', 'Teamwork', 'Shaders']),
        makeProject('SYNERGY', 'synergy', placeHolderHTML, 'Games', ['C#', 'Unity', 'Shaders']),
        makeProject('743⁺Aether*✧ . * ¹¹¹} ⁺ , .', 'aether', placeHolderHTML, 'Tech Art', ['C#', 'Shaders', 'Unity']),
        makeProject('Grasping At Straws', 'grasping-at-straws', placeHolderHTML, 'Games', ['C#', 'Shaders', 'Unity']),
        makeProject('ZERO Inc.', 'zero-inc', placeHolderHTML, 'Games', ['C#', 'Shaders', 'Teamwork']),
        makeProject('BLOON MAN', 'bloon-man', placeHolderHTML, 'Games', ['C#', 'Teamwork', 'Unity']),
        makeProject('PlasmaShift', 'plasmashift', placeHolderHTML, 'Games', ['C#', 'Teamwork', 'Unity']),
        makeProject('BeatCraft', 'beat-craft', placeHolderHTML, 'Games', ['Java', 'Teamwork']),
        makeProject('ReMapper', 'remapper', placeHolderHTML, 'Tools', ['TypeScript']),
        makeProject('BRLCTAP', 'blood-rushing', placeHolderHTML, 'Tech Art', ['TypeScript', 'Unity', 'Teamwork']),
        makeProject('ricochet', 'ricochet', placeHolderHTML, 'Tech Art', ['Shaders', 'Unity']),
        makeProject('Shadertoy Shaders', 'shadertoy-shaders', placeHolderHTML, 'Tech Art', ['Shaders']),
        makeProject('Beat Saber Levels', 'beat-saber-levels', placeHolderHTML, 'Tech Art', ['Unity', 'TypeScript', 'Shaders']),
        makeProject('Beat Saber Environment Grabber', 'environment-grabber', placeHolderHTML, 'Tools', ['TypeScript']),
        makeProject('Enlighten', 'enlighten', placeHolderHTML, 'Tools', ['Unity', 'C#', 'Shaders']),
        makeProject('My Website', 'my-website', placeHolderHTML, 'Tech Art', ['TypeScript']),
        makeProject('Vivify Template', 'vivify-template', placeHolderHTML, 'Tools', ['C#', 'Unity', 'Teamwork', 'TypeScript'])
    ]
}