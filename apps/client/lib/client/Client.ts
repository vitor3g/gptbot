import type { Core } from "../core/Core";
import { Client as Discord, GatewayIntentBits } from 'discord.js';
import { ENV } from "@/config/env"


export class Client {
  private readonly client: Discord;

  constructor(private readonly g_core: Core) {
    this.client = new Discord({ intents: [GatewayIntentBits.Guilds] });
  }

  public start = async () => {
    this.client.login(ENV.TOKEN);

    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;
    
      if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
      }
    });

    console.log("Client.start");
  }

  public getClient () {
    return this.client;
  }
}