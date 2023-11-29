const { Command } = require('@sapphire/framework')
const {suggestChannel, botName} = require("../../config.json");
const { EmbedBuilder } = require('discord.js');

module.exports = class SuggestCommand extends Command {
    constructor(ctx, options) {
        super(ctx, {
            ...options, 
            description: "Faire une suggestion"
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => 
            builder
                .setName(this.name)
                .setDescription(this.description)
                .addStringOption((option) =>
                    option 
                        .setName("suggestion")
                        .setDescription("La suggestion que tu souhaites faire")
                )
        );
    }

    async chatInputRun(interaction) {
        const suggestion = interaction.options.getString("suggestion")
        const suggestionChannel = await interaction.guild.channels.fetch(suggestChannel).catch(console.error)
        if (!suggestionChannel) {
            interaction.reply("Salut michel, enft moi mardi je vais faire mais je trouve pas le channel en ce moment.")
            return
        }
        const embed = new EmbedBuilder()
            .setAuthor({
                name: interaction.user.displayName,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle("Une nouvelle suggestion est arrivée")
            .addFields(
                {
                name: "✅",
                value: "0",
                inline: true
                },
                {
                name: "❌",
                value: "0",
                inline: true
                },
            )
            .setDescription(suggestion)
            .setColor("#afa800")
            .setFooter({
                text:  interaction.client.user.displayName,
                iconURL: interaction.client.user.displayAvatarURL(),
            })
            .setTimestamp();
        const msgSent = await suggestionChannel.send({
            embeds: [embed]
        }).catch(console.error)
        if (msgSent) {
            await msgSent.react("✅")
            await msgSent.react("❌")
        }
        interaction.reply({
            content: "Oui c'est michel, c'est encore moi, enft j'ai bien envoyé la suggestion !!!!! QUOICOUBEH",
            ephemeral: true
        }).catch(console.error)
    }
}