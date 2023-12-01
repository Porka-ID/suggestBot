const { Command } = require('@sapphire/framework')
const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = class AcceptSuggest extends Command {
    constructor(ctx, options) {
        super(ctx, {
            ...options, 
            description: "Accepter une suggestion"
        });
    }

    registerApplicationCommands(registry) {
        registry.registerContextMenuCommand((builder) => 
            builder
                .setName("Accepter la suggestion")
                .setDescription(this.description)
                .setType(ApplicationCommandType.Message)
        );
    }

    contextMenuRun(interaction) {
        if (interaction.message.embeds[0] ) {
            const actualSuggest = interaction.message.embeds[0]
            const newEmbedToSend = new EmbedBuilder()
            .setAuthor({
                name: interaction.message.user.displayName,
                iconURL: interaction.message.user.displayAvatarURL(),
            })
            .setTitle("La suggestion a été validée")
            .setDescription(actualSuggest.getDescription())
            .setColor("#079400")
            .setFooter({
                text:  interaction.client.user.displayName,
                iconURL: interaction.client.user.displayAvatarURL(),
            })
            .setTimestamp();

        }
    }
}