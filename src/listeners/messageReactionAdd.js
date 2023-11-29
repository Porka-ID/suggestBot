const { Events, Listener } = require('@sapphire/framework');
const { botID, suggestChannel } = require("../../config.json")
const { EmbedBuilder } = require('discord.js');
console.log("test")
module.exports = class messageReactionAdd extends Listener {
  constructor(context, options) {
    super(context, {
        ...options,
        event: 'messageReactionAdd'
    });
  }

    async run(reaction, user) { 
        if (reaction.partial) {
            reaction = await reaction.fetch().catch(console.error)
        }
        if (reaction.message.author.id === botID && reaction.message.channelId === suggestChannel) {
            const embedReactionned = EmbedBuilder.from(reaction.message.embeds[0])
            for (let i = 0; i < reaction.message.embeds[0].fields.length; i++) {
                if (reaction.message.embeds[0].fields[i].name === reaction.emoji.name) {
                    embedReactionned.data.fields[i].value = `${reaction.count - 1}`
                }
                
            }
            console.log(embedReactionned.data.fields)

            reaction.message.edit({embeds: [embedReactionned]}).catch(console.error)
        }
    } 
}
