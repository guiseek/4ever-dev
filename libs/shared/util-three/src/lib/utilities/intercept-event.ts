export function interceptEvent<E extends keyof WindowEventMap>(
  event: E,
  fn: (ev: WindowEventMap[E]) => void,
  options?: boolean | AddEventListenerOptions
) {
  window.addEventListener(event, fn, options)
}
