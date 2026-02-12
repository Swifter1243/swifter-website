const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

export function dateFromMonthYear(day: string): Date {
    const tokens = day.split(' ')
    const monthName = tokens[0]
    const year = parseInt(tokens[1])
    const monthIndex = months.indexOf(monthName)
    return new Date(year, monthIndex)
}

export function getDateMonthName(date: Date): string {
    return months[date.getMonth()]
}