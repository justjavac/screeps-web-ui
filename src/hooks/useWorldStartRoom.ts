import api from "../api";

type Response = {
  ok: number;
  room: [string];
};

function useWorldStartRoom(): Promise<Response> {
  return api.raw.user.worldStartRoom();
}

export default useWorldStartRoom;
