import fs from "fs";
function replaceKeys (partHtml: string, object: Object): string {
    for (let key in object) {
        partHtml = partHtml.replace(`~~${key}~~`, object[key])
    }
    return partHtml
}

export async function engine (path: string, item: object): Promise<string> {
    let html: string = await fs.promises.readFile(path, 'utf-8')
    if (!Array.isArray(item)) {
        replaceKeys(html, item)
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
    if (/~~if.*?~~/.test(html)) {
        if (item[html.slice(html.indexOf('~~if(') + 5, html.indexOf(')~~'))]) {
            console.log('Deu certo')
        }
    }
    html = html.replace(/~~.*?~~/g, "")
    return html
}