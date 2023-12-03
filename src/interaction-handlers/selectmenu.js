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
                    console.log("heho")
                }


                if (!interaction.member.roles.cache.has(role.id)) {
                    await interaction.member.roles.add(role)
                    const privateVoice = await interaction.member.guild.channels.create(newVoice)
                    interaction.reply({
                        content: `Votre salon privé ( ${privateVoice.url} )`,
                        ephemeral: true
                    })
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

                break;

        }
    }
}
