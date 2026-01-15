const fade = document.getElementById('fade')!

export function fadeIn() {
    fade.style.opacity = '0'
    
    setTimeout(() => {
        fade.remove()
    }, 1000)
}