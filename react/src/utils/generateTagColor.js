const tagColor = ['orange', 'green', 'yellow', 'red', 'blue']
let index = -1;

export default function () {
    index++
    return tagColor[index % tagColor.length]
}