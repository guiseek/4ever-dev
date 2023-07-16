type TextureFile = `png` | `jpg` | `jpeg`
type TextureName = `${string}.${TextureFile}`

type GltfFile = `gltf` | `glb`
type GltfName = `${string}.${GltfFile}`

interface ModelOptions {
  size: number
  path: TextureName
}

export type {TextureFile, TextureName, GltfFile, GltfName, ModelOptions}
