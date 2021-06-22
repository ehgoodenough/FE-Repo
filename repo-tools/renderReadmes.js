const DEFAULT_DATA = {
    "encodeURIComponent": encodeURIComponent,
    "encodeURI": encodeURI,
    "escapeParentheses": function(string) {
        // replaces parentheses in a string for safe markdown links.
        return string.replace(/(?=[()\[\]])/g, "\\")
    },
    "DownloadButton": function(url) {
        url = "https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/Klokinator/FE-Repo/tree/main/" + encodeURIComponent(url)
        return "[![Download](https://img.shields.io/badge/Download--red?style=social&logo=github)](" + url + ")"
    }
}

// const weaponData = {
//     "path": "",
//     "animation": {
//         "name": "",
//         "credits": "",
//     },
//     "weapon": {
//         "unit": {
//             "name": "",
//             "credits": "",
//         },
//         "path": "", // url relative to root (with no prefix like ./)
//         "type": "", // string, axe, etc
//         "static": "", // url for image
//         "active": "", // url for animated image
//     }
// }

const template = `
# [<escapeParentheses(unit.name)>](../) - <weapon.type> <DownloadButton(weapon.path)> #

| Static | Animated |
| :---: | :-------: |
| ![](<"./" + encodeURI(weapon.static)>) | ![](<"./" + encodeURI(weapon.active)>) |

## Credit ##

<unit.credits>
`

const copydown = require("copydown")
const lodash = require("lodash")

const battle = require("./data/battle.js")
battle().then((response) => {
    response.categories.forEach((category) => {
        category.anims.forEach((unit) => {
            // unit.category = category
            unit.weapons.forEach((weapon) => {
                const data = lodash.merge({}, DEFAULT_DATA, {weapon, unit})
                console.log(copydown(template, data))
            })
        })
    })
}).catch((error) => {
    console.error(error)
})

// TODO: Read template from file.
// TODO: Write the output to a file.
// TODO: Write complex templates for unit. And then index/category.
