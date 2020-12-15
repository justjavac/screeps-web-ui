import React, { Component, MouseEvent, RefObject } from "react";
import _ from "lodash";

import GameRenderer, { ObjectState } from "@screeps/renderer";

import { rescaleResources, resourceMap } from "../config/resourceMap";
import worldConfigs from "../config/worldConfigs";

import api from "../api";
import { applyDiff, decodeTerrain } from "../utils";

const TICK_DURATION = 0.3;

type Position = {
  x: number;
  y: number;
};

type CanvasProps = {
  zoomLevel: number;
  room: string;
};

export default class Canvas extends Component<CanvasProps> {
  private gameApp!: GameRenderer;
  private pan?: Position | null;
  private gameCanvas: RefObject<HTMLDivElement>;

  constructor(props: CanvasProps) {
    super(props);

    this.gameCanvas = React.createRef<HTMLDivElement>();

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.subscribeRoom = this.subscribeRoom.bind(this);
  }

  /**
     * In this case, componentDidMount is used to grab the canvas container ref, and
     * and hook up the PixiJS renderer
     */
  async componentDidMount() {
    GameRenderer.compileMetadata(worldConfigs.metadata);

    this.gameApp = new GameRenderer({
      size: {
        width: this.gameCanvas.current!.clientWidth,
        height: this.gameCanvas.current!.clientHeight,
      },
      resourceMap,
      worldConfigs,
      rescaleResources,
      countMetrics: false,
      useDefaultLogger: false,
      backgroundColor: 0x050505,
    });

    await this.gameApp.init(this.gameCanvas.current!);
    this.gameApp.resize();
    this.gameApp.zoomLevel = 0.2;

    Promise.resolve()
      .then(() => api.raw.game.roomTerrain(this.props.room))
      .then((terrain) => {
        const _terrain = decodeTerrain(terrain.terrain);
        this.gameApp.setTerrain(_terrain as ObjectState[]);
        this.subscribeRoom();
      })
      .catch((err) => {
        console.error("err", err);
      });
  }

  subscribeRoom() {
    const objects: ObjectState[] = [];
    const users: Record<string, { _id: string; username: string }> = {};

    api.socket.subscribe(`room:${this.props.room}`, (event: API.RoomEvent) => {
      applyDiff(objects, event.data.objects);
      if (event.data.users) {
        _.merge(users, event.data.users);
      }
      const sample = {
        gameTime: event.data.gameTime,
        info: event.data.info,
        flags: [],
        visual: event.data.visual,
        users,
        objects: _.cloneDeep(objects),
      };

      this.gameApp.applyState(sample, TICK_DURATION);
    });
  }

  render() {
    return (
      // eslint-disable-next-line react/no-string-refs
      <div
        className="game-canvas-container"
        ref={this.gameCanvas}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      />
    );
  }

  onMouseDown(e: MouseEvent<HTMLDivElement>) {
    this.pan = { x: e.pageX, y: e.pageY };
  }

  onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (this.pan) {
      this.gameApp.pan(e.pageX - this.pan.x, e.pageY - this.pan.y);
      this.pan = { x: e.pageX, y: e.pageY };
    }
  }

  onMouseUp(e: MouseEvent<HTMLDivElement>) {
    this.pan = null;
  }
}
