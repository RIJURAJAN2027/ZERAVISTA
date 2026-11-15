import { useEffect, useRef, useState } from 'react'
import gazeFrames from './gaze-frames.json'
import { BADGES, BRAND } from './data.js'

const BASE = import.meta.env.BASE_URL

// The film sweeps left and right; each row of the table is [gaze, videoTime],
// -1 looking left … +1 looking right, measured from the footage.
function poseToTime(pose) {
  const target = Math.max(-1, Math.min(1, pose))
  let nearestTime = gazeFrames[0][1]
  let nearestDistance = Infinity
  for (const [sampleOffset, time] of gazeFrames) {
    const distance = Math.abs(target - sampleOffset)
    if (distance < nearestDistance) { nearestDistance = distance; nearestTime = time }
  }
  return nearestTime + 1 / 240 // half a frame in, so the seek lands inside the frame
}
const FORWARD_TIME = poseToTime(0)

const Icon = {
  spark: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.500 2.500M15.500 15.500 18 18M18 6l-2.500 2.500M8.500 15.500 6 18" fill="none" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" /></svg>,
}

export default function Hero({ waLink, telLink }) {
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [badge, setBadge] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setBadge((b) => (b + 1) % BADGES.length), 2800)
    return () => clearInterval(id)
  }, [])

  // The dog film is seeked, never played: the pointer decides which frame shows.
  useEffect(() => {
    const video = videoRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let objectUrl = null
    let frame = 0
    let disposed = false
    let pose = 0
    let targetPose = 0
    let lastMove = -1e9

    const onLoadedData = () => { video.currentTime = FORWARD_TIME; setReady(true) }
    const onMove = (event) => {
      lastMove = performance.now()
      targetPose = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) / 0.35))
    }
    const tick = (now) => {
      // With no pointer (phones) or an idle one, the dog looks around on its own.
      if (!reduce && now - lastMove > 2600) targetPose = Math.sin(now / 1500) * 0.75
      const delta = targetPose - pose
      pose = Math.abs(delta) < 0.001 ? targetPose : pose + delta * 0.055
      if (window.scrollY < window.innerHeight * 1.3 && video.readyState >= 2 && !video.seeking) {
        const time = poseToTime(pose)
        if (Math.abs(video.currentTime - time) > 1 / 48) video.currentTime = time
      }
      if (!disposed) frame = requestAnimationFrame(tick)
    }

    video.addEventListener('loadeddata', onLoadedData)
    window.addEventListener('pointermove', onMove, { passive: true })
    // Held fully in memory and all-intra, so every seek lands immediately.
    fetch(`${BASE}dog-white.mp4`)
      .then((response) => response.blob())
      .then((blob) => { if (!disposed) { objectUrl = URL.createObjectURL(blob); video.src = objectUrl } })
      .catch(() => { /* the still image stays if the film cannot load */ })
    frame = requestAnimationFrame(tick)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      video.removeEventListener('loadeddata', onLoadedData)
      window.removeEventListener('pointermove', onMove)
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <div className="pill hero__badge" aria-live="polite">
          <span className="pill__ic">{Icon.spark}</span>
          <span key={badge} className="hero__badge-text">{BADGES[badge]}</span>
        </div>
        <h1 className="h1">Product Design &amp; Dev Agency For <br className="br-d" />B2B SaaS Companies</h1>
        <p className="hero__text">We design and build websites, software, automation and ERP for growing businesses. Tell us what you imagine, and we make it live.</p>
        <p className="hero__tag"><img src={`${BASE}logo.png`} alt="" width="30" height="30" /><span>{BRAND.tagline}</span></p>
        <div className="hero__btns">
          <a className="btn" href={telLink}>Book a Free Call</a>
          <a className="btn btn--light" href={waLink} target="_blank" rel="noopener">Chat on WhatsApp</a>
        </div>
      </div>
      <div className="hero__dog" aria-hidden="true">
        <img src={`${BASE}dog-white.jpg`} alt="" style={{ opacity: ready ? 0 : 1 }} />
        <video ref={videoRef} muted playsInline preload="auto" style={{ opacity: ready ? 1 : 0 }} />
      </div>
    </section>
  )
}
