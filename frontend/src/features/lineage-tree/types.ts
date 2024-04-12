export type WidthHistoryRecord = {
  amount: number;
  updaterId: string;
}

export type LineageNode = {
  title: string;
  image: string;
  _id: string;
  children: LineageNode[];
  width?: number;
  widthUpdateHistory?: WidthHistoryRecord[]
  father?: LineageNode;
};