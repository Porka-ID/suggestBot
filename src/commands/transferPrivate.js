const { Command } = require('@sapphire/framework')
const { ApplicationCommandType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { suggestChannel } = require("../../config.json")

module.exports = class transferPrivate extends Command {
    constructor(ctx, options) {
        super(ctx, {
            ...options,
            description: "Tranferer la propriété d'un S.P",
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName(this.name)
                .setDescription(this.description)
                .addUserOption((option) =>
                    option
                        .setName('user')
                        .setDescription('Utilisateur à qui doit être transferer la propriété')
                        .setRequired(true)
                )

        );
        registry.registerContextMenuCommand((builder) =>
            builder
                .setName("Transférer propriété")
                .setType(ApplicationCommandType.User)
        )
    }

    async chatInputRun(interaction) {

        const member = interaction.member
        const userToAdd = await interaction.options.getUser('user', true)
        const memberToAdd = await member.guild.members.fetch(userToAdd.id)
        const rolePrivate = await member.guild.roles.fetch("1180802256237498369")
        const memberIsOnVoiceChannel = member.voice.channel
        const userToAddIsOnVoiceChannel = memberToAdd.voice.channel

        if (member !== memberToAdd && member.roles.cache.has(rolePrivate.id) && memberIsOnVoiceChannel && userToAddIsOnVoiceChannel && memberIsOnVoiceChannel.id === userToAddIsOnVoiceChannel.id) {
            member.roles.remove(rolePrivate)
            memberToAdd.roles.add(rolePrivate)
            await memberIsOnVoiceChannel.permissionOverwrites.edit(member.user.id, { ViewChannel: true })
            await interaction.reply({
                content: `Le transfert de propriété à <@${memberToAdd.user.id}> . Cette personne est donc le nouveau hôte du salon.`
            })
        } else {
            if (member === memberToAdd) {
                interaction.reply({
                    content: "Vous ne pouvez pas vous selectionner",
                    ephemeral: true
                })
            } else if (!member.roles.cache.has(rolePrivate.id)) {
                interaction.reply({
                    content: "Vous n'êtes pas l'hôte du salon",
                    ephemeral: true
                })
            } else if (memberIsOnVoiceChannel || userToAddIsOnVoiceChannel) {
                interaction.reply({
                    content: "Vous ou la personne choisie n'êtes pas dans le même salon vocal",
                    ephemeral: true
                })
            }
        }

    }

    async contextMenuRun(interaction) {
        const member = interaction.member
        const userToAdd = await interaction.options.getUser('user', true)
        const memberToAdd = await member.guild.members.fetch(userToAdd.id)
        const rolePrivate = await member.guild.roles.fetch("1180802256237498369")
        const memberIsOnVoiceChannel = member.voice.channel
        const userToAddIsOnVoiceChannel = memberToAdd.voice.channel

        if (member !== memberToAdd && member.roles.cache.has(rolePrivate.id) && memberIsOnVoiceChannel && userToAddIsOnVoiceChannel && memberIsOnVoiceChannel.id === userToAddIsOnVoiceChannel.id) {
            member.roles.remove(rolePrivate)
            memberToAdd.roles.add(rolePrivate)
            await memberIsOnVoiceChannel.permissionOverwrites.edit(member.user.id, { ViewChannel: true }).then(console.error)
            interaction.reply({
                content: `Le transfert de propriété à <@${memberToAdd.user.id}> . Cette personne est donc le nouveau hôte du salon.`
            })
        } else {
            if (member === memberToAdd) {
                interaction.reply({
                    content: "Vous ne pouvez pas vous selectionner",
                    ephemeral: true
                })
            } else if (!member.roles.cache.has(rolePrivate.id)) {
                interaction.reply({
                    content: "Vous n'êtes pas l'hôte du salon",
                    ephemeral: true
                })
            } else if (memberIsOnVoiceChannel || userToAddIsOnVoiceChannel) {
                interaction.reply({
                    content: "Vous ou la personne choisie n'êtes pas dans le même salon vocal",
                    ephemeral: true
                })
            }
        }
    }
}