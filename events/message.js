const { prefix, modrole } = require('../config.json')
const fs = require('fs')
const allFiles = fs.readdirSync('./commands/')
const commands = new Map()

//Map all commands in the "/commands" folder
for (const f of allFiles) {
    cmd = require(`../commands/${f}`)
    commands.set(cmd.name, {
        run: cmd.run,
        mod: cmd.mod ? true : false,
    })
}

module.exports = {
    run(message) {

        if (message.content.startsWith(prefix)) {
            command = message.content.split(' ')[0].substr(prefix.length)
            //Check if the command is in the map
            if (commands.has(command)) {
                cmd = commands.get(command)
                //Check if it's a mod only command
                if(cmd.mod && !message.member.roles.cache.has(modrole)) {
                    return
                }
                cmd.run(message)
            }
        }

    },
    type: 'message'
}