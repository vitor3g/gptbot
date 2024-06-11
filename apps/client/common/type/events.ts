import type { Client, Interaction, CacheType } from "discord.js";
import { Core } from "../../lib/core/Core"



export type InteractionEventProps = {
  handler: (client: Client, interaction: Interaction<CacheType>, g_core: Core,...args: any) => Promise<void>;
}

export abstract class InteractionEvent {
  public props: {
    name: string;
    description: string;
  };

  constructor (props: {
    name: string;
    description: string;
  }) {
    this.props = props;
  }
}

