const { Command } = require('@sapphire/framework')
const { ApplicationCommandType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { suggestChannel } = require("../../config.json")

module.exports = class AcceptSuggest extends Command {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            description: "Accepter une suggestion",
            requiredUserPermissions: [PermissionFlagsBits.Administrator]
        });
    }

    registerApplicationCommands(registry) {
        registry.registerContextMenuCommand((builder) =>
            builder
                .setName("Accepter la suggestion")
                .setType(ApplicationCommandType.Message)
        );
    }

    async contextMenuRun(interaction) {
        console.log(interaction.options.data[0].message.embeds[0])
        let messageSuggest = interaction.options.data[0].message
        if (messageSuggest.partial) {
            messageSuggest = await messageSuggest.fetch().catch(console.error)
        }
        const oldEmbed = messageSuggest.embeds[0]
        if (oldEmbed && interaction.channelId === suggestChannel) {
            const newEmbedToSend = new EmbedBuilder()
                .setAuthor({
                    name: oldEmbed.data.author.name,
                    iconURL: oldEmbed.data.author.icon_url,
                })
                .setTitle("La suggestion a été validée")
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
                .setColor("#079400")
                .setFooter({
                    text: interaction.client.user.displayName,
                    iconURL: interaction.client.user.displayAvatarURL(),
                })
                .setTimestamp();
            messageSuggest.edit({ embeds: [newEmbedToSend] })
            if (messageSuggest.hasThread) {
                messageSuggest.thread.setLocked(true)
                messageSuggest.thread.send({
                    content: "La suggestion a été refusée !"
                })
            }
            messageSuggest.thread
            interaction.reply({
                content: "La suggestion a été acceptée avec succès",
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