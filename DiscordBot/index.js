import { Client, Events, GatewayIntentBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';
import mongoose from 'mongoose';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.on(Events.MessageCreate, (message) => {
    console.log(`Received message: ${message.content}`);
    if (message.content === 'Hiii') {
        message.channel.send('Hello there! How can I assist you today?');
    }
});
client.login('');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/discordUsers', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
// User schema
const userSchema = new mongoose.Schema({
    
    name: String,
    email: String,
    mobile: String,
    role: String,
    discordId: String
});
const User = mongoose.model('User', userSchema);

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'register') {
        const name = interaction.options.getString('name');
        const email = interaction.options.getString('email');
        const mobile = interaction.options.getString('mobile');
        const role = interaction.options.getString('role');
        // Show a modal form to the user for additional details

        const modal = new ModalBuilder()
            .setCustomId('registerModal')
            .setTitle('Register User');

        const nameInput = new TextInputBuilder()
            .setCustomId('nameInput')
            .setLabel('Name')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const emailInput = new TextInputBuilder()
            .setCustomId('emailInput')
            .setLabel('Email')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const mobileInput = new TextInputBuilder()
            .setCustomId('mobileInput')
            .setLabel('Mobile')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const roleInput = new TextInputBuilder()
            .setCustomId('roleInput')
            .setLabel('Role')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder().addComponents(nameInput),
            new ActionRowBuilder().addComponents(emailInput),
            new ActionRowBuilder().addComponents(mobileInput),
            new ActionRowBuilder().addComponents(roleInput)
        );

        await interaction.showModal(modal);

        client.on('interactionCreate', async (modalInteraction) => {
            if (!modalInteraction.isModalSubmit()) return;
            if (modalInteraction.customId === 'registerModal') {
            const name = modalInteraction.fields.getTextInputValue('nameInput');
            const email = modalInteraction.fields.getTextInputValue('emailInput');
            const mobile = modalInteraction.fields.getTextInputValue('mobileInput');
            const role = modalInteraction.fields.getTextInputValue('roleInput');
            try {
                const user = new User({
                name,
                email,
                mobile,
                role,
                discordId: modalInteraction.user.id
                });
                await user.save();
                await modalInteraction.reply('Account created successfully!');
            } catch (error) {
                console.error(error);
                await modalInteraction.reply('Failed to create account.');
            }
            }
        });
        try {
            const user = new User({
                name,
                email,
                mobile,
                role,
                discordId: interaction.user.id
            });
            await user.save();
            await interaction.reply('Account created successfully!');
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to create account.');
        }
    }
});
client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});