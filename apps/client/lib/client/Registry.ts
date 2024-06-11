import { REST, Routes } from "discord.js";
import { ENV } from "@/config/env";
import { InteractionEvent, type InteractionEventProps } from "@/common/type/events"
import type { Core } from "../core/Core";

type InteractionRaw = InteractionEvent & (InteractionEventProps | undefined);

export class Registry {
  private readonly rest: REST;
  private readonly events: InteractionRaw[] = [];
  
  constructor (private readonly g_core: Core) {
    this.rest = new REST({ version: '10' }).setToken(ENV.TOKEN);

    this.g_core.getClient().on('interactionCreate', async interaction => {
     if (!interaction.isChatInputCommand()) return;
     const event = this.events.find(e => e.props?.name === interaction.commandName);
     if (!event) return;
     return event.handler(this.g_core.getClient(), interaction, this.g_core);
    });
  }


  public async applyHook(hook: {
    new (): InteractionEvent & InteractionEventProps;
  }) {
    const event = new hook();
    this.events.push(event as InteractionRaw);
  }

  public start = async () => {
    try {
      await this.rest.put(Routes.applicationCommands(ENV.CLIENT_ID), { body: this.events.map(e => e.props) });
    } catch (error) {
      console.error(error);
    }

    console.log("Registry.start");
  }

  public getRest () {
    return this.rest;
  }
}