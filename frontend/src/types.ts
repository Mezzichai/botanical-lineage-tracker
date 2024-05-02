export type WidthHistoryRecord = {
  amount: number;
  updaterId: string;
}

export type LineageNode = {
  name: string;
  images: string[];
  id: string;
  children: LineageNode[];
  width?: number;
  widthUpdateHistory?: WidthHistoryRecord[]
  descriptionHTML: string
  descriptionDelta: string
  father?: LineageNode;
  mother?: LineageNode;
  water_schedule: number[];
  substrate: number[]
};

export type Species = {
  name: string;
  images: string[];
  id: string;
}

export type Parent = {
 image: string;
 name: string;
 id: string;
}

export type SubstrateEntry = {
  substrate: string;
  percentage: number
}

export type WaterEntry = {
  month: string;
  waterings: number
}

export type Group =  {
  id: string;
  name: string;
}