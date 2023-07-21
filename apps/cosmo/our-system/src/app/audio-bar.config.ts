import src from '../../../../../assets/audio/time-hans_zimmer.mp3'
import cover60x60 from '../../../../../assets/media/session/time-hans_zimmer-60x60.jpeg'
import cover120x120 from '../../../../../assets/media/session/time-hans_zimmer-120x120.jpeg'
import cover226x226 from '../../../../../assets/media/session/time-hans_zimmer-226x226.jpeg'
import cover544x544 from '../../../../../assets/media/session/time-hans_zimmer-544x544.jpeg'

export const audioBarConfig = {
  src,
  paused: true,
  meta: new MediaMetadata({
    title: 'Time',
    album: 'Inception',
    artist: 'Hans Zimmer',
    artwork: [
      {
        src: cover60x60,
        sizes: '60x60',
      },
      {
        src: cover120x120,
        sizes: '120x120',
      },
      {
        src: cover226x226,
        sizes: '226x226',
      },
      {
        src: cover544x544,
        sizes: '544x544',
      },
    ],
  }),
}


