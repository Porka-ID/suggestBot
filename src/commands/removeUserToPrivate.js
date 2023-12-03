const { Command } = require('@sapphire/framework')
const { ApplicationCommandType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { suggestChannel } = require("../../config.json")

module.exports = class addUserToPrivate extends Command {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            description: "Enlever au S.P",
        });
    }

    registerApplicationCommands(registry) {
        registry.registerContextMenuCommand((builder) =>
            builder
                .setName(this.description)
                .setType(ApplicationCommandType.User)
        );
    }

    async contextMenuRun(interaction) {
        const voiceChannel = await interaction.member.voice.channel
        const userPicked = interaction.options.data[0].member
        const userPickedId = interaction.options.data[0].user.id
        if (voiceChannel && interaction.member.roles.cache.has("1180802256237498369")) {
            voiceChannel.permissionOverwrites.edit(userPickedId, { ViewChannel: false })
            if (userPicked.voice.channel && userPicked.voice.channel === voiceChannel) {
                userPicked.voice.disconnect()
            }
            interaction.reply({
                content: `<@${userPickedId}> ne voit désormais plus le salon !`,
                ephemeral: true
            })
        } else {
            interaction.reply({
                content: "Vous devez être dans votre salon privé pour pouvoir faire celà.",
                ephemeral: true
            })
        }
    }
}