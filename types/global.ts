declare global {

  interface EJS_State {
    screenshot: Uint8Array
    state: Uint8Array
  }

  interface Window {
    EJS_player: string
    EJS_gameName: string | undefined
    EJS_biosUrl: string
    EJS_gameUrl: string | undefined
    EJS_core: string | undefined
    EJS_pathtodata: string
    EJS_startOnLoaded: boolean
    EJS_saveStateDir: string
    EJS_language: string
    EJS_backgroundImage: string
    EJS_backgroundColor: string
    EJS_Buttons: Record<string, boolean>
    EJS_onSaveState: (e: EJS_State) => void
    EJS_onLoadState: (e: EJS_State) => void
  }
}
