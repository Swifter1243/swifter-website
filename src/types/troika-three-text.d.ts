declare module 'troika-three-text' {
  import * as THREE from 'three';

  export class Text extends THREE.Mesh {
    text: string;
    font: string;
    fontSize: number;
    anchorX?: number | string;
    anchorY?: number | string;
    color?: THREE.ColorRepresentation;
    maxWidth?: number;
    textAlign?: 'left' | 'right' | 'center' | 'justify';
    outlineWidth: number;
    outlineColor: THREE.ColorRepresentation;
    outlineBlur: number;
    sync(): void;
    dispose():

      void;
  }

  export interface PreloadFontOptions {
    /**
     * URL to a font file, or an ArrayBuffer containing font data
     */
    font: string | ArrayBuffer

    /**
     * Characters to preload glyphs for.
     * If omitted, no glyphs will be generated until needed.
     */
    characters?: string

    /**
     * Size of the SDF glyph texture.
     * Defaults internally if not provided.
     */
    sdfGlyphSize?: number
  }

  /**
   * Preloads a font and optionally generates glyphs for the given characters.
   *
   * @param options Font preload options
   * @param callback Optional callback fired once the font is ready
   */
  export function preloadFont(
    options: PreloadFontOptions,
    callback?: () => void
  ): void
}