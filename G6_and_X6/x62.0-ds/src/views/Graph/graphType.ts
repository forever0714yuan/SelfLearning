// 保存节点
export interface Edge {
  id?: string;
  source?: string | object;
  target?: string | object;
  attr?: object;
}
export interface Node {
  size(): object;
  position(): object;
  id?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  ports?: object;
}
