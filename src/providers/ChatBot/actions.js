import { ACTION_TYPES } from './reducer';

export const actionToggleVisibilidadeChatBot = visivel => {
  return {
    type: ACTION_TYPES.TOGGLE_VISIBILIDADE,
    payload: { visivel },
  };
};
export const actionSaveBlipChat = blipChat => {
  return {
    type: ACTION_TYPES.SAVE_BLIP_CHAT,
    payload: { blipChat },
  };
};
