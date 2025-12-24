import type { INode } from "../model/abstract/node"
import type { NodePath } from "./node_path"

export type NodeInfo = {
    node: INode
    path: NodePath
}