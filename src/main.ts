import { initMVC } from "./initialize";
export { navigation } from "./navigation/navigation";
import { fadeIn } from "./view/fade";
import { initInput } from "./view/input";
import { initSound } from "./view/sound/main";
import { initThree } from './view/three/main'

initInput()
await initSound()
await initThree()
initMVC()
fadeIn()