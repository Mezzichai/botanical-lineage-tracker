export type WidthHistoryRecord = {
  amount: number;
  updaterId: string;
}

export type LineageNode = {
  name: string;
  images: string[];
  id: string;
  descriptionHTML: string
  descriptionDelta: string
  mates: Mate[]
  water_values: number[];
  substrate_values: number[]
};

export type Mate = {
  name: string;
  images: string[];
  id: string;
  children: LineageNode[]
}

export type LeanLineageNode = {
  name: string;
  image: string;
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