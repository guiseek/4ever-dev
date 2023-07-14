interface GameUiMenuOption {
  label: string
  value: string
}

interface GameUiMenuData {
  message?: string
  options: GameUiMenuOption[]
}

export type {GameUiMenuOption, GameUiMenuData}
