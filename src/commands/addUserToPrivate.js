const { Command } = require('@sapphire/framework')
const { ApplicationCommandType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { suggestChannel } = require("../../config.json")

module.exports = class addUserToPrivate extends Command {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            description: "Ajouter au S.P",
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
        if (voiceChannel && interaction.member.roles.cache.has("1180802256237498369")) {
            console.log(interaction.options.data[0].user.id)
            voiceChannel.permissionOverwrites.edit(interaction.options.data[0].user.id, { ViewChannel: true })
            interaction.reply({
                content: `<@${interaction.options.data[0].user.id}> voit désormais le salon !`,
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