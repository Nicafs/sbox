import React, { useEffect } from 'react';

import { BlipChat } from 'blip-chat-widget';

import { useAppGlobal } from '~/providers/AppGlobal';
import {
  actionSaveBlipChat,
  actionToggleVisibilidadeChatBot,
} from '~/providers/ChatBot/actions';

import { useChatBot } from '../../providers/ChatBot';

const BotaoChatBlip = ({ exibeChat }) => {
  const { visivel, blipChat, dispatch } = useChatBot();
  const {
    organizacao: { id: idOrganizacao },
    tema,
  } = useAppGlobal();

  useEffect(() => {
    const gerarblipChat = async color => {
      const blipChatScript = await new BlipChat()
        .withAppKey(`${process.env.REACT_APP_BLIP_KEY}`)
        .withButton({
          color: color || '#2CC3D5',
          icon: '',
        })
        .withCustomCommonUrl('https://chat.blip.ai/')
        .withEventHandler(BlipChat.ENTER_EVENT, () => {
          if (!visivel) {
            const action = actionToggleVisibilidadeChatBot(true);
            dispatch(action);
          }
        })
        .withEventHandler(BlipChat.LEAVE_EVENT, () => {
          if (visivel) {
            const action = actionToggleVisibilidadeChatBot(false);
            dispatch(action);
          }
        });

      blipChatScript.build();

      const action = actionSaveBlipChat(blipChatScript);
      dispatch(action);
    };

    // if (blipChat) {
    //   blipChat.destroy();
    // }

    if (!blipChat) {
      gerarblipChat(tema.muiTheme.palette.primary.dark);
    }
  }, [idOrganizacao]); //eslint-disable-line 

  useEffect(() => {
    if (blipChat) {
      const blipButton = document.getElementById('blip-chat-open-iframe');
      if (blipButton) {
        // blipButton.style.right = '15px';
        // blipButton.style.bottom = '15px';

        const checkSizeDisplay = size => {
          if (size < tema.muiTheme.breakpoints.values.md) {
            blipButton.style.display = 'none';
          } else {
            blipButton.style.display = 'block';
          }
        };

        if (exibeChat) {
          checkSizeDisplay(window.innerWidth);
          window.onresize = () => {
            checkSizeDisplay(window.innerWidth);
          };
        } else {
          blipButton.style.display = 'none';
        }
      }
    }
  }, [blipChat]); //eslint-disable-line

  return <></>;
};

export default BotaoChatBlip;
