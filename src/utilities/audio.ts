export function rampAudioParam(audioCtx: AudioContext, param: AudioParam, value: number, fadeTime: number) {
    const curr = param.value
    const now = audioCtx.currentTime
    param.cancelScheduledValues(now)
    param.setValueAtTime(curr, now)
    param.linearRampToValueAtTime(value, now + fadeTime)
}