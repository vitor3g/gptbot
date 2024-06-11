import { InteractionEvent, type InteractionEventProps } from "@/common/type/events"
import type { Client, Interaction, CacheType } from "discord.js"
import type { Core } from "../core/Core"

export class TextEvent extends InteractionEvent implements InteractionEventProps {
  constructor () {
   super({
    name: 'prompt',
    description: 'text prompt',
   })
  }

  public async handler(client: Client<boolean>, interaction: Interaction<CacheType>, g_core: Core, ...args: any): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    await interaction.reply(this.props.name);
  }
}