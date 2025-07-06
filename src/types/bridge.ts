export interface TodoBridge {
  addTask: (text: string) => void;
  onCountChanged: (
    callback: (total: number, completed: number) => void
  ) => void;
  onExternalAdded: (callback: () => void) => void;
}
