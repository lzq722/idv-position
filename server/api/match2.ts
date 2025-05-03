/* eslint-disable @typescript-eslint/no-explicit-any */
import position1 from 'public/positions/1.json'
import position2 from 'public/positions/2.json'
import position3 from 'public/positions/3.json'
import position4 from 'public/positions/4.json'
import position5 from 'public/positions/5.json'
import position6 from 'public/positions/6.json'
import position7 from 'public/positions/7.json'
import position8 from 'public/positions/8.json'
import position9 from 'public/positions/9.json'

function getPosition(position: any, xposition: number, yposition: number): number[] {
    const matchedGroups: number[] = []

    for (const key in position) {
        const points = position[key]
        const point = points[4]
        const dx = point.x - xposition
        const dy = point.y - yposition
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 900) {
            const groupNumber = parseInt(key.replace('position', ''), 10)
            matchedGroups.push(groupNumber)
            break
        }
    }
    return matchedGroups
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const mapid = body.mapid;
    const xposition = body.xposition;
    const yposition = body.yposition;
    let position;
    if (mapid === '1') {
        position = position1;
    } else if (mapid === '2') {
        position = position2;
    } else if (mapid === '3') {
        position = position3;
    } else if (mapid === '4') {
        position = position4;
    } else if (mapid === '5') {
        position = position5;
    } else if (mapid === '6') {
        position = position6;
    } else if (mapid === '7') {
        position = position7;
    } else if (mapid === '8') {
        position = position8;
    } else if (mapid === '9') {
        position = position9;
    }
    const matched = getPosition(position, xposition, yposition);
    // console.log(matched)
    return {
        matched
    }
})