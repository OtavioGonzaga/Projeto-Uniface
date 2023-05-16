import fs from "fs";
export async function engine(path: string, obj: object) {
    let html: string = await fs.promises.readFile(path, 'utf-8')
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            html = html.replace(`~~${key}~~`, obj[key])
        }
    }
    return html
}