export function attachCarousels() {
    const carousels = document.getElementsByClassName('content-carousel')

    for (let i = 0; i < carousels.length; i++) {
        const carousel = carousels[i]!

        const viewport = carousel.children[0]
        const dots = carousel.children[1]
        const images = viewport.children[0]
        const controls = viewport.children[1]

        const count = images.children.length
        let n = 0

        for (let j = 0; j < count; j++) {
            const dot = document.createElement('div')
            dot.className = 'guyperson'
            dots.appendChild(dot)
        }

        function update() {
            if (n >= count)
                n = 0
            if (n < 0)
                n = count - 1

            for (let j = 0; j < count; j++) {
                const image = images.children[j] as HTMLElement
                image.style.display = j === n ? 'block' : 'none'

                const dot = dots.children[j] as HTMLElement
                dot.style.opacity = (j === n ? 1 : 0.2).toString()
            }
        }

        update()

        const leftControl = controls.children[0] as HTMLElement
        const rightControl = controls.children[1] as HTMLElement

        leftControl.onclick = () => {
            n--
            update()
        }

        rightControl.onclick = () => {
            n++
            update()
        }
    }
}