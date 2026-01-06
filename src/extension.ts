import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('runCommands.showAndRun', async () => {
    // Get all available commands including internal ones
    const allCommands = await vscode.commands.getCommands();

    // Sort commands alphabetically
    allCommands.sort();

    // Create QuickPick items
    const items = allCommands.map((cmd) => ({
      label: cmd,
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

    // Handle cancellation
    quickPick.onDidHide(() => {
      quickPick.dispose();
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
