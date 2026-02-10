import { initSystems } from "./initialize";
import { fadeIn } from "./view/fade";
import { initSound } from "./view/sound/main";
import { initThree } from './view/three/main'

await initSound()
await initThree()
initSystems()
fadeIn()