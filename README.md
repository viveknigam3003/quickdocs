## Quickdocs ⚡️📄

The fastest way to generate good documentation for your JavaScript and Typescript projects. Super simple to use, just run `npx quickdocs` in your project's root directory and you're done! 🚀

## Features
- Generates documentation for your entire project in seconds
- Supports JavaScript and Typescript
- Minimal configuration required (just a `quickdocs.config.json` file)
- Returns a folder with HTML files which can be hosted on any static file server

The generated documentation is based on the [TypeDoc](https://typedoc.org/) project.

## Installation & Usage
```bash
npx quickdocs
```

## Configuration
Create a `quickdocs.config.json` file in your project's root directory. Configuration options are the same as those for [TypeDoc](https://typedoc.org/guides/options/).

Here's an example configuration:
```json
{
	"$schema": "https://typedoc.org/schema.json",
	"tsconfig": "./tsconfig.json",
	"entryPoints": ["./src/modules/index.ts"],
	"out": "./docs",
	"name": "My project docs",
}
```

## License
MIT

## Author
[Vivek Nigam](https://x.com/viveknigam_)

## Contributing
Contributions are welcome! Feel free to open an issue or a pull request.

## References
Theme inspired by [tsdocs.dev](https://tsdocs.dev/)

## Changelog
- 1.0.0: Initial release