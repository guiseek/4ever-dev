interface AudioAnalyserOptions {
  audio: HTMLAudioElement
  canvas: HTMLCanvasElement
  color: string
}

export class AudioAnalyser {
  #canvasContext

  constructor(readonly options: AudioAnalyserOptions) {
    this.#canvasContext = options.canvas.getContext('2d')
  }

  #initialize() {
    const audioContext = new AudioContext()
    const sourceNode = audioContext.createMediaElementSource(this.options.audio)
    const analyserNode = audioContext.createAnalyser()
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    sourceNode.connect(analyserNode)
    analyserNode.connect(audioContext.destination)

    let bars: number
    let barX: number
    let barWidth: number
    let barHeight: number

    const drawAnalyser = () => {
      if (this.#canvasContext) {
        const {canvas} = this.#canvasContext
        this.#canvasContext.clearRect(0, 0, canvas.width, canvas.height)
        this.#canvasContext.fillStyle = this.options.color

        bars = canvas.width

        for (let i = 0; i < bars; i++) {
          barWidth = canvas.width / bars
          barX = i * (barWidth + 2)
          barHeight = -dataArray[i] / (canvas.height / 4)
          this.#canvasContext.fillRect(barX, canvas.height, barWidth, barHeight)
        }
      }
    }

    let animation: number

    const animationFn = () => {
      animation = requestAnimationFrame(animationFn)
      analyserNode.getByteFrequencyData(dataArray)
      drawAnalyser()

      return {
        animation,
        cancel() {
          cancelAnimationFrame(animation)
        },
      }
    }

    return animationFn()
  }

  initialize() {
    return this.#initialize()
  }
}
