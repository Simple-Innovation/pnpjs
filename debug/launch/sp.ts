import { ITestingSettings } from "../../test/settings";
import { Logger, LogLevel } from "@pnp/logging";
import { ISPConfiguration, sp } from "@pnp/sp";
import { sp } from "@pnp/sp";
import { spSetup } from "./setup";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { graph, IGraphConfiguration } from "@pnp/graph";


declare var process: { exit(code?: number): void };

export async function Example(settings: ITestingSettings) {

  // configure your node options
sp.setup({
  cacheExpirationIntervalMilliseconds: 1000,
  defaultCachingStore: "local",
  sp: {
    fetchClientFactory: () => {
      return new SPFetchClient("https://mytenant.sharepoint.com/", "id", "secret");
    },
    headers: {
      "X-MyRequiredHeader": "SomeValue",
      "X-MyRequiredHeader2": "SomeValue",
    },
  },
});

const isolatedSP = await sp.createIsolated<IGraphConfiguration>({
  config: {
    sp: {
      fetchClientFactory: () => {
        return new SPFetchClient("https://mytenant.sharepoint.com/site/dev", "id", "secret");
      },
    },
  },
});

  sp.setup({
    sp: {
      baseUrl: "https://mytenant.sharepoint.com/",
    },
  });
  spSetup(settings);


  isolatedSP.setup({
    sp: {
      baseUrl: "https://mytenant.sharepoint.com/sites/dev",
    },
  });

  Logger.log({
    data: w,
    level: LogLevel.Info,
    message: "List of Web Data",
  });

  process.exit(0);
}
