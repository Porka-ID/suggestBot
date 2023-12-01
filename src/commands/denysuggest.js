const { Command } = require('@sapphire/framework')
const { ApplicationCommandType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { suggestChannel } = require("../../config.json")

module.exports = class DenySuggest extends Command {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            description: "Refuser une suggestion",
            requiredUserPermissions: [PermissionFlagsBits.Administrator]
        });
    }

    registerApplicationCommands(registry) {
        registry.registerContextMenuCommand((builder) =>
            builder
                .setName("Refuser la suggestion")
                .setType(ApplicationCommandType.Message)
        );
    }

    contextMenuRun(interaction) {
        console.log(interaction.options.data[0].message.embeds[0])
        const messageSuggest = interaction.options.data[0].message
        const oldEmbed = messageSuggest.embeds[0]
        if (oldEmbed && interaction.channelId === suggestChannel) {
            const newEmbedToSend = new EmbedBuilder()
                .setAuthor({
                    name: oldEmbed.data.author.name,
                    iconURL: oldEmbed.data.author.icon_url,
                })
                .setTitle("La suggestion a été refusée")
                .setDescription(oldEmbed.data.description)
                .addFields(
                    {
                        name: "✅",
                        value: oldEmbed.data.fields[0].value,
                        inline: true
                    },
                    {
                        name: "❌",
                        value: oldEmbed.data.fields[1].value,
                        inline: true
                    },
                )
                .setColor("#941e1e")
                .setFooter({
                    text: interaction.client.user.displayName,
                    iconURL: interaction.client.user.displayAvatarURL(),
                })
                .setTimestamp();
            messageSuggest.edit({ embeds: [newEmbedToSend] })
            if (messageSuggest.hasThread) {
                messageSuggest.thread.send({
                    content: "La suggestion a été refusée !"
                })
                messageSuggest.thread.setLocked(true)
            }

            interaction.reply({
                content: "La suggestion a été refusée avec succès",
                ephemeral: true
            }).catch(console.error)

        } else {
            interaction.reply({
                content: "Ce n'est pas une suggestion ça...",
                ephemeral: true
            }).catch(console.error)
        }
    }
}