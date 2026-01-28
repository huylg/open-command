# Command Runner

A VS Code/Cursor extension that lists all available commands and allows you to execute them via a quick picker.

## Features

- List all available VS Code commands (including internal ones)
- Single-select picker for quick command execution
- Keyboard shortcut support
- Alphabetically sorted command list

## Installation

### From VSIX

```bash
bunx @vscode/vsce package
cursor --install-extension open-command-*.vsix
```

### Manual

1. Download the latest `.vsix` file from [Releases](https://github.com/huylg/open-command/releases)
2. Open VS Code/Cursor
3. Go to Extensions
4. Click "..." and select "Install from VSIX..."
5. Select the downloaded file

## Usage

- **Command Palette**: Open with `Cmd+Shift+P` / `Ctrl+Shift+P` and run "Run Commands..."

### How it works

1. Open the picker using the shortcut or command palette
2. Type to filter commands
3. Select a command and press Enter to execute

## Development

```bash
# Install dependencies
bun install

# Compile
bun run compile

# Package extension
bunx @vscode/vsce package

# Install in Cursor for testing
cursor --install-extension open-command-*.vsix
```

## License

MIT
