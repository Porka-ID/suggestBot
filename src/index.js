const { SapphireClient, ApplicationCommandRegistries, RegisterBehavior } = require('@sapphire/framework')
const { GatewayIntentBits, Partials } = require("discord.js")
const { token } = require("../config.json")

const client = new SapphireClient({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates],
    partials: [Partials.Message, Partials.Reaction]
})
//pplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite)
ApplicationCommandRegistries.setDefaultGuildIds(["808091844260134914"])
client.login(token).catch(console.error)