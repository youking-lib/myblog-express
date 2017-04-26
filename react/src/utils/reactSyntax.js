
export const handleArrWidthKey = (arr) => {
    return arr.map((item, key) => ({...item, key: String(key)}))
}