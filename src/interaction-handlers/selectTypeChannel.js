const { InteractionHandler, InteractionHandlerTypes } = require('@sapphire/framework');
const { ChannelType, PermissionsBitField } = require('discord.js');


module.exports = class selectChannel extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.SelectMenu
        });
    }

    parse(interaction) {
        if (interaction.customId !== 'createVoice') return this.none();
        return this.some();
    }

    async run(interaction) {
        const newVoice = {
            type: ChannelType.GuildVoice,
            parent: "808091844817846384"
        }
        switch (interaction.values[0]) {

            case 'private':
                newVoice["name"] = `🔒 Salon de ${interaction.user.displayName}`
                newVoice["permissionOverwrites"] = [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel]
                    }]
                let role = await interaction.guild.roles.cache.find(role => role.name === "Private")
                if (!role) {
                    role = await interaction.guild.roles.create({ name: "Private" })
                }


                if (!interaction.member.roles.cache.has(role.id)) {
                    await interaction.member.roles.add(role)
                    const privateVoice = await interaction.member.guild.channels.create(newVoice)
                    interaction.reply({
                        content: `Votre salon privé ( ${privateVoice.url} ) \nJe t'ai envoyé un MP avec les infos pratiques ;) `,
                        ephemeral: true
                    })
                    interaction.member.send("Hello !\nTu viens de créer un salon privé !.\nPour ajouter une personne à ton salon, et qu'il puisse le voir tu peux faire clic droit sur cette personne dans le serveur et faire 'Ajouter au S.P'\nMais si souhaite l'inverse tu peux faire 'Enlever du S.P'")
                    setTimeout(() => {
                        const usrIdInVoice = []
                        privateVoice.members.map(user => {
                            usrIdInVoice.push(user.id)
                        })
                        if (!usrIdInVoice[0]) {
                            privateVoice.delete() // Usr not in voice
                            interaction.member.roles.remove(role)
                        }
                    }, 7500)
                } else {
                    interaction.reply({
                        content: "Vous avez déja un salon privé !",
                        ephemeral: true,
                    })
                }


                break;
            case 'public':
                newVoice["name"] = `📢 Salon de ${interaction.user.displayName}`
                const publicVoice = await interaction.member.guild.channels.create(newVoice)

                interaction.reply({
                    content: `Votre salon publique ( ${publicVoice.url} )`,
                    ephemeral: true
                })

                setTimeout(() => {
                    const usrIdInVoice = []
                    publicVoice.members.map(user => {
                        usrIdInVoice.push(user.id)
                    })
                    if (!usrIdInVoice[0]) {
                        publicVoice.delete() // Usr not in voice
                    }
                }, 7500)
                break;

        }
    }
}
