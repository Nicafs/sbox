export default function useScript(script) {
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.innerHTML = script;
  document.body.appendChild(s);
}
