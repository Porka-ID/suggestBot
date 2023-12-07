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
        const rolePrivate = await oldState.guild.roles.fetch("1180802256237498369")
        if (newState.channelId === null && oldState.member.roles.cache.has('1180802256237498369')) {
            const channelLeaved = await oldState.guild.channels.fetch(oldState.channelId)
            if (channelLeaved.members.size > 0) {
                const idsUser = channelLeaved.members.keys()
                const firstId = idsUser.next().value
                const userToAddPrivate = await oldState.guild.members.fetch(firstId)
                userToAddPrivate.roles.add(rolePrivate)
                userToAddPrivate.send(`Vous êtes le nouveau hôte du salon privé : ${channelLeaved.url} \nCependant, l'ancien hôte peut toujours avoir accès à ce salon. Si tu ne le souhaites pas, tu peux faire clic droit sur son profile dans le serveur et appyer sur "Enlever du S.P"`)
            } else {
                channelLeaved.delete()
            }


            const test = await oldState.member.roles.remove(rolePrivate)

        }
    }
}
