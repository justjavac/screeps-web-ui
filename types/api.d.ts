declare namespace API {
  type Terrain = Array<{
    room: string;
    x: number;
    y: number;
    type: string;
  }>;

  type TerrainEncoded = Array<{
    _id: string;
    room: string;
    terrain: string;
  }>;

  interface RoomEvent {
    data: {
      gameTime: number;
      info: Record<string, string>;
      visual: string;
      objects: Record<string, ObjectState>[];
      users?: {
        _id: string;
        username: string;
        badge?: {
          color1: string;
color2: string;
color3: string;
flip: boolean;
param: number;
type: number;
        }
      }
    }
  }
}
