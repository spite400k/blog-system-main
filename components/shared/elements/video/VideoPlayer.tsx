import React, { useState, useEffect } from 'react'
import videojs from 'video.js'

import 'video.js/dist/video-js.css'

function VideoPlayer(props: videojs.PlayerOptions) {
  const [player, setPlayer] = useState<videojs.Player>()
  const videoNodeId = 'videojs-player'

  useEffect(() => {
    setPlayer(
      videojs(videoNodeId, props).ready(function () {
        // console.log('Player is Ready', this)
      })
    )
  }, [props])

  useEffect(() => {
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
      }
    }
  })

  return (
    <div className="c-player" >
      <div className="c-player__screen" data-vjs-player="true" data-setup='{}'>
        <video
          id={videoNodeId}
          className="video-js"
        />
      </div>
    </div>
  )
}

export default React.memo(VideoPlayer)
