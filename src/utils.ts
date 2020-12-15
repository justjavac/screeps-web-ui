import _ from "lodash";

function decode(
  room: string,
  terrain: string,
): Array<{ room: string; x: number; y: number; type: string }> {
  const decoded = [];
  for (let i = 0; i < terrain.length; i++) {
    decoded.push({
      room,
      x: i % 50,
      y: Math.floor(i / 50),
      type: ["plain", "wall", "swamp", "wall"][terrain[i] as unknown as number],
    });
  }
  return decoded;
}

export function decodeTerrain(terrain: API.TerrainEncoded): API.Terrain {
  return terrain.flatMap((t) => decode(t.room, t.terrain));
}

export function arraysToObject(obj: Record<string, any>) {
  for (var key in obj) {
    if (_.isArray(obj[key])) {
      var result: Record<number, unknown> = {};
      for (var i = 0; i < obj[key].length; i++) {
        result[i] = obj[key][i];
      }
      obj[key] = result;
    }
  }
}

export function applyDiff(objects: object[], diff: object[]) {
  for (var id in diff) {
    var objDiff = diff[id];
    var obj = _.find(objects, { _id: id });
    if (obj) {
      if (objDiff !== null) {
        arraysToObject(obj);
        arraysToObject(objDiff);
        obj = _.merge(obj, objDiff, (a: unknown, b: unknown) => {
          if (_.isArray(a) && _.isArray(b)) {
            return b;
          }
        });
      } else {
        _.remove(objects, { _id: id });
      }
    } else if (objDiff) {
      obj = _.cloneDeep(objDiff);
      objects.push(obj);
    }
  }
}
