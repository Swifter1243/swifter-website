import { initMVC } from "./initialize";
import { initInput } from "./view/input";
import { initSound } from "./view/sound/main";
import { initThree } from './view/three/main'

initInput()
initSound()
await initThree()
initMVC()