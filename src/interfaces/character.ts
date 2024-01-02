export type Origin = {
  name: string;
  url: string;
};

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Origin;
  image: string;
  episode: string[];
  url: string;
  created: string;
  deleted: boolean;
}

export interface Comment {
  id: string;
  body: string;
  createdAt: string;
  character: any;
}

export interface Interaction {
  id: string;
  createdAt: string;
  character: any;
  type: string;
}
