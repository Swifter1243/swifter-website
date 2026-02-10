export function getPathKeySequence(path: string): string[] {
    const entries = path.split('/')

    if (entries.length == 0) {
        return [path]
    }
    else {
        return entries
    }
}

export function getCommonPath(a: string, b: string): string {
    const commonPath: string[] = []
    const aSequence = getPathKeySequence(a)
    const bSequence = getPathKeySequence(b)
    const maxCommonLength = Math.min(aSequence.length, bSequence.length)

    for (let i = 0; i < maxCommonLength; i++) {
        const aKey = aSequence[i]
        const bKey = bSequence[i]

        if (aKey != bKey) {
            break
        } else {
            commonPath.push(aKey)
        }
    }

    return commonPath.join('/')
}

export function locationToNavigationPath(location: string): string {
    if (location[location.length - 1] === '/') { // clear leading '/'
        location = location.substring(0, location.length - 1)
    }

    return '.' + location
}