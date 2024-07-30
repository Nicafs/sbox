export function useChatBotWeb() {
  function init() {
    try {
      window.websdk.init(process.env.REACT_APP_HYPERFLOW_API_KEY);
    } catch (err) {
      console.error('Não foi possível inicializar o chatbot', err);
    }
  }

  function toggle() {
    if (window.websdk) {
      window.websdk.toggle();
    }
  }

  function hidden() {
    const websdk = document.getElementById('webSdkToggle');
    if (websdk) {
      websdk.style.visibility = 'hidden';
    }
  }

  return { init, toggle, hidden };
}
