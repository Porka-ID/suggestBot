const { Listener } = require('@sapphire/framework');
const { selectTypeChannel } = require("../../config.json")
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
console.log("test")
module.exports = class ready extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            event: 'voiceStateUpdate'
        });
    }

    async run(oldState, newState) {
        if (newState.channelId === null && oldState.member.roles.cache.has('1180802256237498369')) {
            const channelLeaved = await oldState.guild.channels.fetch(oldState.channelId)
            if (channelLeaved.members) {
                
            }
            const roleToDelete = await oldState.guild.roles.fetch("1180802256237498369")

            const test = await oldState.member.roles.remove(roleToDelete)

        }
    }
}
