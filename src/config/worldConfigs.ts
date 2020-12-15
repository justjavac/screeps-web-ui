import "@screeps/renderer-metadata/dist/renderer-metadata";

const woldConfigs = {
  ATTACK_PENETRATION: 10,
  CELL_SIZE: 100,
  RENDER_SIZE: {
    width: 2048,
    height: 2048,
  },
  VIEW_BOX: 5000,
  BADGE_URL: "https://screeps.devtips.cn/api/user/badge-svg?username=%1",
  metadata: window.RENDERER_METADATA,
  gameData: {
    player: "",
    showMyNames: {
      spawns: true,
      creeps: true,
    },
    showEnemyNames: {
      spawns: true,
      creeps: true,
    },
    showFlagsNames: true,
    showCreepSpeech: false,
    swampTexture: "animated",
  },
  lighting: "normal",
  forceCanvas: false,
};

export default woldConfigs;
