const discord = require('discord.js')
const fs = require('fs')

const { dtoken } = require('./config.json')

const client = new discord.Client()

client.login(dtoken)
    .catch(err => console.log(err))

client.once('ready', () => {

    console.log(`Logged in as ${client.user.tag}`)

    //Create listeners for events in the "/events" folder
    allEvents = fs.readdirSync('./events/')
    for (e of allEvents) {

        const event = require(`./events/${e}`)
        const eventType = event.type || e.split('.')[0]

        client['on'](eventType, (...args) => event.run(...args))
    }
})