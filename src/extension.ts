import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('runCommands.showAndRun', async () => {
    // Get all available commands including internal ones
    const allCommands = await vscode.commands.getCommands();

    // Sort commands alphabetically
    allCommands.sort();

    // Create QuickPick items with buttons
    const items = allCommands.map((cmd) => ({
      label: cmd,
      buttons: [{ iconPath: new vscode.ThemeIcon('copy'), tooltip: 'Copy command name' }],
    }));

    // Create and configure QuickPick
    const quickPick = vscode.window.createQuickPick();
    quickPick.items = items;
    quickPick.placeholder = 'Select a command to execute';
    quickPick.matchOnDescription = false;
    quickPick.matchOnDetail = false;

    quickPick.show();

    // Handle user selection
    quickPick.onDidAccept(async () => {
      const selected = quickPick.selectedItems[0];
      quickPick.hide();

      if (!selected) {
        return;
      }

      try {
        const result = await vscode.commands.executeCommand(selected.label);
        result && vscode.window.showInformationMessage(`Command executed: ${result}`);
      } catch (error) {
        vscode.window.showErrorMessage(`Failed to execute command: ${error}`);
      }
    });

    // Handle button clicks (copy)
    quickPick.onDidTriggerItemButton(async (event) => {
      await vscode.env.clipboard.writeText(event.item.label);
      vscode.window.showInformationMessage(`Copied: ${event.item.label}`);
    });

    // Handle cancellation
    quickPick.onDidHide(() => {
      quickPick.dispose();
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
