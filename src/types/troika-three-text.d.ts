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
    sync(): void;
    dispose(): void;
  }
}