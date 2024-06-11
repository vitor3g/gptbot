import { get } from "env-var";


export class ENV {
  public static readonly TOKEN: string = get("TOKEN").required().asString();
  public static readonly CLIENT_ID: string = get("CLIENT_ID").required().asString();
}