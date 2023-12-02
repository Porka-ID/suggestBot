const { Listener } = require('@sapphire/framework');
const { selectTypeChannel } = require("../../config.json")
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
console.log("test")
module.exports = class ready extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            event: 'ready'
        });
    }

    async run(client) {
        const row = new ActionRowBuilder()
        const channel = client.channels.cache.get(selectTypeChannel)
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("createVoice")
            .setPlaceholder("Selectionnez l'option")
            .setOptions([
                new StringSelectMenuOptionBuilder()
                    .setLabel("Salon publique")
                    .setEmoji("📢")
                    .setDescription("Sociabiliser ! ça vous fera pas de mal ! ")
                    .setValue("public"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Salon privé")
                    .setEmoji("🔒")
                    .setDescription("Une envie de solitude ?")
                    .setValue("private")
            ])

        const embedCreate = new EmbedBuilder()
            .setTitle("Création d'un salon vocal")
            .setDescription("Vous souhaitez créer un nouveau salon vocal ? Pour discuter avec vos amis, pour faire des rencontres ? Eh bien, soit, vous pouvez désormais gérer votre propre activité vocale sur ce serveur ! Et comment ? Vous avez simplement a selectionner le type de salon vocal désiré ci dessous !")
            .addFields(
                {
                    name: "Privé",
                    value: "🔒",
                    inline: true
                },
                {
                    name: "Publique",
                    value: "📢",
                    inline: true
                },
            )
            .setTimestamp();

        row.addComponents(selectMenu)
        channel.send({
            embeds: [embedCreate],
            components: [row]

        })
    }
}
