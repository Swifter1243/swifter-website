import { makeProject, type Project } from "./project";

export function createProjects(): Project[] {
    return [
        makeProject('Extra Sensory II', 'extra-sensory-ii', '', ['Games', 'Art'], ['C#', 'Shaders', 'Unity', 'TypeScript', 'Teamwork']),
        makeProject('Derelict', 'derelict', '', ['Games'], ['C#', 'Unity', 'Teamwork', 'Shaders']),
        makeProject('SYNERGY', 'synergy', '', ['Games', 'Tools'], ['C#', 'Unity', 'Shaders']),
        makeProject('743⁺Aether*✧ . * ¹¹¹} ⁺ , .', 'aether', '', ['Art'], ['C#', 'Shaders', 'Unity']),
        makeProject('Grasping At Straws', 'grasping-at-straws', '', ['Games'], ['C#', 'Shaders', 'Unity']),
        makeProject('ZERO Inc.', 'zero-inc', '', ['Games'], ['C#', 'Shaders', 'Teamwork']),
        makeProject('BLOON MAN', 'bloon-man', '', ['Games'], ['C#', 'Teamwork', 'Unity']),
        makeProject('PlasmaShift', 'plasmashift', '', ['Games'], ['C#', 'Teamwork', 'Unity']),
        makeProject('BeatCraft', 'beat-craft', '', ['Games'], ['Java', 'Teamwork']),
        makeProject('ReMapper', 'remapper', '', ['Tools'], ['TypeScript']),
        makeProject('BRLCTAP', 'blood-rushing', '', ['Art'], ['TypeScript', 'Unity', 'Teamwork']),
        makeProject('ricochet', 'ricochet', '', ['Art'], ['Shaders', 'Unity']),
        makeProject('Shadertoy Shaders', 'shadertoy-shaders', '', ['Art'], ['Shaders']),
        makeProject('Beat Saber Levels', 'beat-saber-levels', '', ['Art'], ['Unity', 'TypeScript', 'Shaders']),
        makeProject('Beat Saber Environment Grabber', 'environment-grabber', '', ['Tools'], ['TypeScript']),
        makeProject('Enlighten', 'enlighten', '', ['Tools'], ['Unity', 'C#', 'Shaders']),
        makeProject('My Website', 'my-website', '', ['Art'], ['TypeScript']),
        makeProject('Vivify Template', 'vivify-template', '', ['Tools'], ['C#', 'Unity', 'Teamwork', 'TypeScript'])
    ]
}