## Quickdocs ⚡️📄

The fastest way to generate good documentation for your JavaScript and Typescript projects. Super simple to use, just run `npx quickdocs` in your project's root directory and you're done! 🚀

<img width="1644" alt="Quickdocs by @viveknigam3003" src="https://github.com/viveknigam3003/quickdocs/assets/30192068/7627a6ab-38b2-41c9-b6a1-8c2d3d563779">

## Features
- Generates documentation for your entire project in seconds
- Supports JavaScript and Typescript
- Minimal configuration required (just a `quickdocs.config.json` file)
- Returns a folder with HTML files which can be hosted on any static file server

The generated documentation is based on the [TypeDoc](https://typedoc.org/) project.

## Installation
```bash
npm i -D @viveknigam3003/quickdocs
```

## Usage
Run the following command in your project's root directory. It will generate a `docs` folder with the documentation for your project.
```bash
npx quickdocs
```

## Configuration
Create a `quickdocs.config.json` file in your project's root directory. Configuration options are the same as those for [TypeDoc](https://typedoc.org/guides/options/).

Here's an example configuration. You can use the `$schema` property to get intellisense support in your editor, but it's not mandatory.
```json
{
	"$schema": "https://typedoc.org/schema.json",
	"tsconfig": "./tsconfig.json",
	"entryPoints": ["./src/modules/index.ts"],
	"out": "./docs",
	"name": "My project docs",
}
```

## How it works?
Quickdocs extracts out the documentation of your project starting from the `entryPoints` specified in the `quickdocs.config.json` file. It then generates a `docs` folder with the documentation for your project.

This `docs` folder contains static HTML files for each of the functions, classes, types, etc. in your project. You can host this folder on any static file server to make the documentation available to others. You can customize the `out` property in the `quickdocs.config.json` file to change the output directory.

## License
MIT

## Author
[Vivek Nigam](https://x.com/viveknigam_)

## Contributing
Contributions are welcome! Feel free to open an issue or a pull request.

## References
Theme inspired by [tsdocs.dev](https://tsdocs.dev/)
