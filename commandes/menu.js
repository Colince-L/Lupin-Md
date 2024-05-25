const util = require('util');
const fs = require('fs-extra');
const { lupin } = require(__dirname + "/../framework/lupin");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

lupin({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//lupin");
    var coms = {};
    var mode = "private";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }  
 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });


    moment.tz.setDefault('Africa/Nairobi');

// Create a date and time in EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY')

  let infoMsg =  `
╭────✧𝐋𝐔𝐏𝐈𝐍-𝐌𝐃✧═───❖
│╭─────────────···▸
││▸ ➊Préfix : ${s.PREFIXE}
││▸ ➋User: ${s.OWNER_NAME}
││▸ ➌Mode: ${mode}
││▸ ➍Cmds: ${cm.length} 
││▸ ➎Date: ${date}
││▸ ➏Time: ${temps} 
││▸ ➐Ram: ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
││▸ ➑Platform: ${os.platform()}
││▸ ➒Developer: 𝕔𝕠𝕝𝕚𝕟𝕔𝕖-𝕃
│╰──────────────
╰─────✧Ⓛ︎Ⓤ︎Ⓟ︎Ⓘ︎Ⓝ︎✧─────◆ \n\n`;

  let menuMsg=`  

*LUPIN-COMMANDS :*
◇                             ◇
`;

    for (const cat in coms) {
        menuMsg += `*╭────* *${cat}* *⊷*`;
        for (const cmd of coms[cat]) {
            menuMsg += `
 *|* ${cmd}`;
        }
        menuMsg += `
*╰═════════════⊷* \n`
    }

    menuMsg += `
◇            ◇
*————— ★ —————*

  *™Colince -L™²0²⁴*                                         
*╰═════════════⊷*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *lupin-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*📌Tonny 408*" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
