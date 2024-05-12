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
  mates: LeanLineageNode[]
  water_values: number[];
  substrate_values: number[]
};

export type LeanLineageNode = {
  name: string;
  images: string[];
  id: string;
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