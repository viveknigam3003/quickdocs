#! /usr/bin/env node

import fs, { existsSync } from "fs";
import path from "path";
import {
  Application,
  DefaultTheme,
  DefaultThemeRenderContext,
  JSX,
  PageEvent,
  Reflection,
  ReflectionKind,
  TypeDocOptions,
} from "typedoc";

class CustomThemeContext extends DefaultThemeRenderContext {
  _originalNav: any;

  public constructor(theme: any, page: any, options: any) {
    super(theme, page, options);
    this._originalNav = this.navigation(page);
    this.navigation = (page) =>
      JSX.createElement("div", {}, [
        JSX.createElement(JSX.Raw, {
          html: `
              <div id="tsd-search" data-base="${this.relativeURL("./")}">
                  <input type="text" aria-label="Search" placeholder="Search within library"/>
                  <ul class="results">
                      <li class="state loading">Preparing search index...</li>
                      <li class="state failure">The search index is not available</li>
                  </ul>
              </div>
  `,
        }),
        this._originalNav,
      ]);
  }

  override toolbar = (context: any) => {
    return JSX.createElement(JSX.Raw, {
      html: ``,
    });
  };
}

export class CustomTheme extends DefaultTheme {
  private _contextCache?: CustomThemeContext;

  public override getRenderContext(
    page: PageEvent<Reflection>
  ): CustomThemeContext {
    this._contextCache ||= new CustomThemeContext(
      this,
      page,
      this.application.options
    );

    return new CustomThemeContext(this, page, this.application.options);
  }
}

const generateDocsDefaultOptions = (): Partial<TypeDocOptions> => {
  return {
    excludeNotDocumented: false,
    excludeExternals: false,
    externalPattern: ["**/node_modules/**"],
    excludeInternal: false,
    excludePrivate: false,
    excludeProtected: false,
    excludeReferences: false,
    excludeCategories: [],
    includeVersion: true,
    stripYamlFrontmatter: true,
    pretty: true,
    emit: "docs",
    githubPages: false,
    hideGenerator: true,
    hideParameterTypesInTitle: true,
    searchInComments: true,
    cleanOutputDir: true,
    skipErrorChecking: true,
    visibilityFilters: {
      protected: false,
      private: false,
      inherited: true,
      external: true,
    },
    customCss: path.join(__dirname, "./css-overrides.css"),
    groupOrder: [
      "Classes",
      "Functions",
      "Variables",
      "Type Aliases",
      "Interfaces",
      "Modules",
      "Namespaces",
      "Components",
    ],
    navigation: {
      includeCategories: true,
      includeGroups: true,
      includeFolders: true,
    },
    categorizeByGroup: true,
    theme: "quickdocs",
    lightHighlightTheme: "light-plus",
    darkHighlightTheme: "light-plus",
    useTsLinkResolution: true,
    logLevel: "Error",
  };
};

const iconColors = {
  [ReflectionKind.Class]: {
    background: "var(--color-ts-class-background)",
    foreground: "var(--color-ts-class)",
    path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
  },
  [ReflectionKind.Function]: {
    background: "var(--color-ts-function-background)",
    foreground: "var(--color-ts-function)",
    path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
  },
  [ReflectionKind.Enum]: {
    background: "var(--color-ts-enum-background)",
    foreground: "var(--color-ts-enum)",
    path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
  },
  [ReflectionKind.Interface]: {
    background: "var(--color-ts-interface-background)",
    foreground: "var(--color-ts-interface)",
    path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
  },
  [ReflectionKind.Namespace]: {
    background: "var(--color-ts-namespace-background)",
    foreground: "var(--color-ts-namespace)",
    path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
  },
  [ReflectionKind.TypeAlias]: {
    background: "var(--color-ts-type-alias-background)",
    foreground: "var(--color-ts-type-alias)",
    path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
  },
  [ReflectionKind.Variable]: {
    background: "var(--color-ts-variable-background)",
    foreground: "var(--color-ts-variable)",
    path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
  },
};

iconColors[ReflectionKind.CallSignature] = iconColors[ReflectionKind.Function];
iconColors[ReflectionKind.TypeLiteral] = iconColors[ReflectionKind.TypeAlias];
iconColors[ReflectionKind.TypeParameter] = iconColors[ReflectionKind.TypeAlias];
iconColors[ReflectionKind.Module] = iconColors[ReflectionKind.Namespace];
iconColors[ReflectionKind.Project] = iconColors[ReflectionKind.Namespace];
iconColors[ReflectionKind.Method] = iconColors[ReflectionKind.Function];

function setupApp(app: Application) {
  if (app["setupComplete"]) {
    return;
  }

  app["setupComplete"] = true;

  app.renderer.hooks.on("head.begin", () =>
    JSX.createElement(JSX.Raw, {
      html: `
           <link rel="stylesheet" href="./assets/style.css" fetchpriority="high" />
           <style>
             ${Object.entries(iconColors)
               .map(([id, { background, foreground, path }]) => {
                 return `
                   #icon-${id} rect {
                     fill: ${background};
                   }
             
                   #icon-${id} path {
                      fill: ${foreground};
                      stroke: ${foreground};
                   }
             `;
               })
               .join("\n")}
            </style>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link href="https://fonts.googleapis.com/css2?family=Fira+Code:ital@0;1&display=swap" rel="stylesheet">
        `,
    })
  );

  // Add "private" tag to all internal methods added by `typedoc-plugin-missing-exports`
  app.renderer.hooks.on("content.begin", (context: any) => {
    if (context.page.url.includes("_internal_")) {
      return JSX.createElement(JSX.Raw, {
        html: `
          <div class="tsd-internal-warning-banner">
            <b>⚠️ Internal:</b> This API is not publically exported by the
            package.
          </div>
        `,
      });
    }

    return JSX.createElement(JSX.Raw, { html: `` });
  });

  app.renderer.defineTheme("quickdocs", CustomTheme);
}

async function copyAndSymlinkAssets(assetsDir: string, assetFiles: string[]) {
  const sharedAssetsDir = path.join(__dirname, "docs-shared-assets");
  if (!existsSync(sharedAssetsDir)) {
    await fs.promises.mkdir(sharedAssetsDir, { recursive: true });
  }

  const promises = assetFiles
    .map((assetFile) => path.join(assetsDir, "assets", assetFile))
    .map(async (assetPath) => {
      if (!fs.existsSync(assetPath)) {
        return Promise.resolve();
      }
      const assetName = path.basename(assetPath);
      const sharedAssetPath = path.join(sharedAssetsDir, assetName);

      await fs.promises.copyFile(assetPath, sharedAssetPath);

      await fs.promises.unlink(assetPath);
      await fs.promises.symlink(sharedAssetPath, assetPath);
    });

  await Promise.all(promises);
}

const generateDocs = async (configJson: any) => {
  const { $schema, ...rest } = configJson;
  try {
    const app = await Application.bootstrapWithPlugins({
      ...generateDocsDefaultOptions(),
      plugin: ["typedoc-plugin-mdn-links", "typedoc-plugin-rename-defaults"],
      tsconfig: path.resolve(configJson.tsconfig),
      entryPoints: configJson.entryPoints.map((entryPoint: string) =>
        path.resolve(entryPoint)
      ),
      out: path.resolve(configJson.out),
      name: configJson.name,
      gitRemote: configJson.gitRemote,
      ...rest,
    });

    setupApp(app);

    const project = await app.convert();

    if (!project) {
      throw new Error("Failed to convert project");
    }

    app.generateDocs(project, app.options.getValue("out"));
    await copyAndSymlinkAssets(path.resolve(configJson.out), [
      "style.css",
      "custom.css",
      "highlight.css",
      "main.js",
    ]);

    app.logger.info("Docs generated successfully");
  } catch (error) {
    throw error;
  }
};

const getConfigAndGenerateDocs = async () => {
  const quickdocsConfigPath = path.resolve("quickdocs.config.json");

  if (!fs.existsSync(quickdocsConfigPath)) {
    console.error("No quickdocs config found at", quickdocsConfigPath);
    console.log(
      "Create a quickdocs.config.json file in the root of your project"
    );
    return;
  }

  try {
    const configFileContent = fs.readFileSync(quickdocsConfigPath, "utf8");
    const quickdocsConfig = JSON.parse(configFileContent);

    if (!quickdocsConfig) {
      throw new Error("No quickdocs config found or it's empty");
    }

    await generateDocs(quickdocsConfig);
  } catch (error) {
    console.error(
      "Error reading or parsing the quickdocs config file:",
      (error as any).message
    );
  }
};

getConfigAndGenerateDocs();
