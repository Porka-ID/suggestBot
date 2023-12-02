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

    contextMenuRun(interaction) {
        if () {

        }
    }
}