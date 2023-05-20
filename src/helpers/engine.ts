import fs from "fs";
function replaceKeys (partHtml: string, object: Object): string {
    for (let key in object) {
        partHtml = partHtml.replace(`~~${key}~~`, object[key])
    }
    return partHtml
}
function condition (partHtml: string, object: object): string {
    if (!object[partHtml.slice(partHtml.indexOf('~~if(') + 5, partHtml.indexOf(')~~'))]) {
        partHtml = partHtml.replace(partHtml.slice(partHtml.indexOf('~~if('), partHtml.indexOf('~~/if~~') + 7), '')
        return partHtml
    }
    return partHtml.slice(partHtml.indexOf('~~if('), partHtml.indexOf('~~/if~~') + 7), partHtml.slice(partHtml.indexOf(')~~') + 3, partHtml.indexOf('~~/if~~'))
}
export async function engine (path: string, item: object): Promise<string> {
    let html: string = await fs.promises.readFile(path, 'utf-8')
    if (!Array.isArray(item)) {
        html = replaceKeys(html, item)
    } else {
        if (html.includes('~~forEach~~')) {
            let allExprs: string = html.slice(html.indexOf('~~forEach~~'), html.indexOf('~~/forEach') + 12)
            let exprsContent: string  = html.slice(html.indexOf('~~forEach~~') + 11, html.indexOf('~~/forEach~~'))
            let eachOne: string = ''
            item.forEach(e => {
                eachOne += replaceKeys(exprsContent, e)
            })
            html = html.replace(allExprs, eachOne)
        }
    }
    while (html.includes('~~if(')) {
        html = html.replace(html.slice(html.indexOf('~~if('), html.indexOf('~~/if~~') + 7), condition(html, item))
    }
    // html = html.replace(/~~.*?~~/g, "")
    return html
}