export function runWhenActive(
  activityType: keyof typeof navigator.userActivation,
  callbackFn: VoidFunction
) {
  const events = [
    'keydown',
    'mousedown',
    'pointerdown',
    'pointerup',
    'touchend',
  ]

  const runOnEvent = () => {
    if (navigator.userActivation[activityType]) {
      callbackFn()
      for (const ev of events) {
        removeEventListener(ev, runOnEvent)
      }
    }
  }

  for (const ev of events) {
    addEventListener(ev, runOnEvent)
  }
}
