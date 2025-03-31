import { create } from 'zustand';

interface WebSocketStore {
  websocket: WebSocket | null;
  setWebSocket: (ws: WebSocket | null) => void;
  closeWebSocket: () => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  websocket: null,
  setWebSocket: (ws) => set({ websocket: ws }),
  closeWebSocket: () => {
    const ws = get().websocket;
    if (ws) ws.close();
    set({ websocket: null });
  },
}));
