import { Client } from "@/lib/client/Client";
import { Registry } from "../client/Registry";
import { TextEvent } from "../events/Text";

export class Core {
  private readonly client: Client
  private readonly registry: Registry

  constructor() {
    this.client = new Client(this);
    this.registry = new Registry(this);
  }


  public applyHooks = async () =>  {
    await this.registry.applyHook(TextEvent); 
  }

  public init = async () => {
    await this.applyHooks();

    await this.client.start();
    await this.registry.start();
  
    console.log("Core.async");
  }


  public getClient () {
    return this.client.getClient();
  }
}
