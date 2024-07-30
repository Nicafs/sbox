export const ACTION_TYPES = {
  TOGGLE_VISIBILIDADE: 'TOGGLE_VISIBILIDADE',
  SAVE_BLIP_CHAT: 'SAVE_BLIP_CHAT',
};

export const reducer = (state, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_VISIBILIDADE:
      const { payload = {} } = action;
      const { visivel } = payload;

      if (state.blipChat) {
        if (state.blipChat.widget.isOpen !== visivel) {
          state.blipChat.toogleChat();
        }
      }

      return {
        ...state,
        visivel: !!visivel,
      };

    case ACTION_TYPES.SAVE_BLIP_CHAT:
      const { payload: payLoadBlip = {} } = action;
      const { blipChat } = payLoadBlip;
      return {
        ...state,
        blipChat,
      };

    default:
      console.warn(`(ChatBotProvider) Action type desconhecida: ${action}`);
      return state;
  }
};
