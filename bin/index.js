#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTheme = void 0;
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const typedoc_1 = require("typedoc");
class CustomThemeContext extends typedoc_1.DefaultThemeRenderContext {
    constructor(theme, page, options) {
        super(theme, page, options);
        this.toolbar = (context) => {
            return typedoc_1.JSX.createElement(typedoc_1.JSX.Raw, {
                html: ``,
            });
        };
        this._originalNav = this.navigation(page);
        this.navigation = (page) => typedoc_1.JSX.createElement("div", {}, [
            typedoc_1.JSX.createElement(typedoc_1.JSX.Raw, {
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
}
class CustomTheme extends typedoc_1.DefaultTheme {
    getRenderContext(page) {
        this._contextCache || (this._contextCache = new CustomThemeContext(this, page, this.application.options));
        return new CustomThemeContext(this, page, this.application.options);
    }
}
exports.CustomTheme = CustomTheme;
const generateDocsDefaultOptions = () => {
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
        customCss: path_1.default.join(__dirname, "./css-overrides.css"),
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
    [typedoc_1.ReflectionKind.Class]: {
        background: "var(--color-ts-class-background)",
        foreground: "var(--color-ts-class)",
        path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
    },
    [typedoc_1.ReflectionKind.Function]: {
        background: "var(--color-ts-function-background)",
        foreground: "var(--color-ts-function)",
        path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
    },
    [typedoc_1.ReflectionKind.Enum]: {
        background: "var(--color-ts-enum-background)",
        foreground: "var(--color-ts-enum)",
        path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
    },
    [typedoc_1.ReflectionKind.Interface]: {
        background: "var(--color-ts-interface-background)",
        foreground: "var(--color-ts-interface)",
        path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
    },
    [typedoc_1.ReflectionKind.Namespace]: {
        background: "var(--color-ts-namespace-background)",
        foreground: "var(--color-ts-namespace)",
        path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
    },
    [typedoc_1.ReflectionKind.TypeAlias]: {
        background: "var(--color-ts-type-alias-background)",
        foreground: "var(--color-ts-type-alias)",
        path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
    },
    [typedoc_1.ReflectionKind.Variable]: {
        background: "var(--color-ts-variable-background)",
        foreground: "var(--color-ts-variable)",
        path: "M22.153 16.1V9.107h1.271l.125 1.043h.069c.184-.338.47-.625.856-.86.387-.235.834-.352 1.34-.352.839 0 1.47.258 1.893.775.424.517.636 1.278.636 2.284V16.1h-1.465v-3.92c0-.582-.12-1.034-.359-1.353-.24-.32-.617-.48-1.133-.48-.506 0-.93.174-1.27.522-.332.348-.498.85-.498 1.509V16.1h-1.465Zm-5.825.17c-.829 0-1.46-.258-1.893-.775-.423-.527-.635-1.288-.635-2.284V9.107h1.464v3.92c0 .574.12 1.025.36 1.354.248.32.626.48 1.132.48.507 0 .93-.175 1.271-.523.341-.347.511-.85.511-1.508V9.107h1.465v6.994h-1.271l-.124-1.043h-.07c-.184.338-.47.625-.856.86-.387.235-.838.352-1.354.352ZM5.46 19.203v-1.311h1.12c.322 0 .553-.07.69-.212.148-.131.222-.357.222-.676v-6.627h-1.74v-1.27h1.74v-.972c0-.78.189-1.34.566-1.678.378-.339.917-.508 1.617-.508h1.671v1.312H9.854c-.322 0-.552.065-.69.197-.139.132-.208.362-.208.69v.96h2.39v1.269h-2.39v6.64c0 .78-.189 1.34-.566 1.679-.378.338-.921.507-1.63.507h-1.3Z",
    },
};
iconColors[typedoc_1.ReflectionKind.CallSignature] = iconColors[typedoc_1.ReflectionKind.Function];
iconColors[typedoc_1.ReflectionKind.TypeLiteral] = iconColors[typedoc_1.ReflectionKind.TypeAlias];
iconColors[typedoc_1.ReflectionKind.TypeParameter] = iconColors[typedoc_1.ReflectionKind.TypeAlias];
iconColors[typedoc_1.ReflectionKind.Module] = iconColors[typedoc_1.ReflectionKind.Namespace];
iconColors[typedoc_1.ReflectionKind.Project] = iconColors[typedoc_1.ReflectionKind.Namespace];
iconColors[typedoc_1.ReflectionKind.Method] = iconColors[typedoc_1.ReflectionKind.Function];
function setupApp(app) {
    if (app["setupComplete"]) {
        return;
    }
    app["setupComplete"] = true;
    app.renderer.hooks.on("head.begin", () => typedoc_1.JSX.createElement(typedoc_1.JSX.Raw, {
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
    }));
    // Add "private" tag to all internal methods added by `typedoc-plugin-missing-exports`
    app.renderer.hooks.on("content.begin", (context) => {
        if (context.page.url.includes("_internal_")) {
            return typedoc_1.JSX.createElement(typedoc_1.JSX.Raw, {
                html: `
          <div class="tsd-internal-warning-banner">
            <b>⚠️ Internal:</b> This API is not publically exported by the
            package.
          </div>
        `,
            });
        }
        return typedoc_1.JSX.createElement(typedoc_1.JSX.Raw, { html: `` });
    });
    app.renderer.defineTheme("quickdocs", CustomTheme);
}
async function copyAndSymlinkAssets(assetsDir, assetFiles) {
    const sharedAssetsDir = path_1.default.join(__dirname, "docs-shared-assets");
    if (!(0, fs_1.existsSync)(sharedAssetsDir)) {
        await fs_1.default.promises.mkdir(sharedAssetsDir, { recursive: true });
    }
    const promises = assetFiles
        .map((assetFile) => path_1.default.join(assetsDir, "assets", assetFile))
        .map(async (assetPath) => {
        if (!fs_1.default.existsSync(assetPath)) {
            return Promise.resolve();
        }
        const assetName = path_1.default.basename(assetPath);
        const sharedAssetPath = path_1.default.join(sharedAssetsDir, assetName);
        await fs_1.default.promises.copyFile(assetPath, sharedAssetPath);
        await fs_1.default.promises.unlink(assetPath);
        await fs_1.default.promises.symlink(sharedAssetPath, assetPath);
    });
    await Promise.all(promises);
}
const generateDocs = async (configJson) => {
    const { $schema } = configJson, rest = __rest(configJson, ["$schema"]);
    try {
        const app = await typedoc_1.Application.bootstrapWithPlugins(Object.assign(Object.assign(Object.assign({}, generateDocsDefaultOptions()), { plugin: ["typedoc-plugin-mdn-links", "typedoc-plugin-rename-defaults"], tsconfig: path_1.default.resolve(configJson.tsconfig), entryPoints: configJson.entryPoints.map((entryPoint) => path_1.default.resolve(entryPoint)), out: path_1.default.resolve(configJson.out), name: configJson.name, gitRemote: configJson.gitRemote }), rest));
        setupApp(app);
        const project = await app.convert();
        if (!project) {
            throw new Error("Failed to convert project");
        }
        app.generateDocs(project, app.options.getValue("out"));
        await copyAndSymlinkAssets(path_1.default.resolve(configJson.out), [
            "style.css",
            "custom.css",
            "highlight.css",
            "main.js",
        ]);
        app.logger.info("Docs generated successfully");
    }
    catch (error) {
        throw error;
    }
};
const getConfigAndGenerateDocs = async () => {
    const quickdocsConfigPath = path_1.default.resolve("quickdocs.config.json");
    if (!fs_1.default.existsSync(quickdocsConfigPath)) {
        console.error("No quickdocs config found at", quickdocsConfigPath);
        console.log("Create a quickdocs.config.json file in the root of your project");
        return;
    }
    try {
        const configFileContent = fs_1.default.readFileSync(quickdocsConfigPath, "utf8");
        const quickdocsConfig = JSON.parse(configFileContent);
        if (!quickdocsConfig) {
            throw new Error("No quickdocs config found or it's empty");
        }
        await generateDocs(quickdocsConfig);
    }
    catch (error) {
        console.error("Error reading or parsing the quickdocs config file:", error.message);
    }
};
getConfigAndGenerateDocs();
