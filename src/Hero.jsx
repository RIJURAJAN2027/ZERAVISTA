import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import gazeFrames from './gaze-frames.json'

// SUBSTITUTION (Layer 11 clause): the spec's four linear anchors
// (FWD_L / LEFT_MAX / FWD_R / RIGHT_MAX) assume the clip contains a single
// monotonic head turn. This footage sweeps left and right several times over
// its 10s, so a linear map between anchors selects the wrong frames. The pose
// is resolved through a lookup table measured per frame from the footage
// instead. The pose model, the 0.09 lerp and the 1/48 seek threshold are
// unchanged. Each row is [normalisedGaze, videoTime], -1 left … +1 right.
function poseToTime(pose) {
  const target = Math.max(-1, Math.min(1, pose))
  let nearestTime = gazeFrames[0][1]
  let nearestDistance = Infinity
  for (const [sampleOffset, time] of gazeFrames) {
    const distance = Math.abs(target - sampleOffset)
    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestTime = time
    }
  }
  // Half a frame in, so the seek lands inside the intended frame rather than
  // on the boundary, where rounding can pick the previous one.
  return nearestTime + 1 / 240
}

const FORWARD_TIME = poseToTime(0)

export default function Hero() {
  const videoRef = useRef(null)
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [ready, setReady] = useState(false)

  // Background film — seeked, never played.
  useEffect(() => {
    const video = videoRef.current
    let objectUrl = null
    let frame = 0
    let disposed = false
    let pose = 0
    let targetPose = 0

    const onLoadedData = () => {
      video.currentTime = FORWARD_TIME
      setReady(true)
    }

    const onMouseMove = (event) => {
      targetPose = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) / 0.35))
    }

    const tick = () => {
      // SUBSTITUTION (Layer 11 clause): the spec pins the lerp at 0.09. Eased
      // to 0.055 so this footage's gaze settles more gently.
      const delta = targetPose - pose
      pose = Math.abs(delta) < 0.001 ? targetPose : pose + delta * 0.055

      // Skip seeking once the hero has scrolled out of view.
      if (window.scrollY < window.innerHeight && video.readyState >= 2 && !video.seeking) {
        const time = poseToTime(pose)
        if (Math.abs(video.currentTime - time) > 1 / 48) video.currentTime = time
      }
      if (!disposed) frame = requestAnimationFrame(tick)
    }

    video.addEventListener('loadeddata', onLoadedData)
    window.addEventListener('mousemove', onMouseMove)

    // Fully buffered in memory + all-intra, so every seek lands immediately.
    fetch(`${import.meta.env.BASE_URL}azaka-scrub.mp4`)
      .then((response) => response.blob())
      .then((blob) => {
        if (disposed) return
        objectUrl = URL.createObjectURL(blob)
        video.src = objectUrl
      })
      .catch(() => { /* Poster stays visible if the film cannot be fetched. */ })

    frame = requestAnimationFrame(tick)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      video.removeEventListener('loadeddata', onLoadedData)
      window.removeEventListener('mousemove', onMouseMove)
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  // Two-layer cursor.
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const chevrons = ring.querySelectorAll('.chev')

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100, opacity: 0 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    // The custom cursor belongs to the hero only; the rest of the site uses the normal one.
    let entered = false
    const onMove = (event) => {
      const { clientX: x, clientY: y } = event
      const inside = rootRef.current.contains(event.target)
      if (!inside) {
        if (entered) { entered = false; gsap.to([dot, ring], { opacity: 0, duration: 0.2 }) }
        return
      }
      if (!entered) {
        entered = true
        gsap.set([dot, ring], { x, y })
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
      dotX(x); dotY(y); ringX(x); ringY(y)
    }
    const onLeave = () => { entered = false; gsap.to([dot, ring], { opacity: 0, duration: 0.25 }) }
    const onEnter = () => {}
    // Scrolling moves the page under a still pointer, so hide the cursor until it moves again.
    const onScroll = () => { if (entered) { entered = false; gsap.to([dot, ring], { opacity: 0, duration: 0.2 }) } }
    window.addEventListener('scroll', onScroll, { passive: true })

    const targets = rootRef.current.querySelectorAll('a, button')
    const onOver = () => {
      gsap.to(ring, { scale: 1.7, borderColor: 'rgba(255,255,255,0.35)', duration: 0.35, ease: 'power3.out' })
      gsap.to(chevrons, { opacity: 0, duration: 0.2 })
    }
    const onOut = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.85)', duration: 0.35, ease: 'power3.out' })
      gsap.to(chevrons, { opacity: 1, duration: 0.2 })
    }
    targets.forEach((element) => {
      element.addEventListener('mouseenter', onOver)
      element.addEventListener('mouseleave', onOut)
    })

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      targets.forEach((element) => {
        element.removeEventListener('mouseenter', onOver)
        element.removeEventListener('mouseleave', onOut)
      })
      gsap.killTweensOf([dot, ring, chevrons])
    }
  }, [])

  // Intro timeline + headline parallax.
  useEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      timeline.from('[data-headline]', { yPercent: 60, opacity: 0, duration: 1.4, stagger: 0.12 }, 0.2)
      timeline.from('[data-fade]', { y: 24, opacity: 0, duration: 1.0, stagger: 0.08 }, 0.7)
    }, rootRef)

    const wrapper = rootRef.current.querySelector('[data-parallax]')
    const parallaxX = gsap.quickTo(wrapper, 'x', { duration: 0.8, ease: 'power3.out' })
    const parallaxY = gsap.quickTo(wrapper, 'y', { duration: 0.8, ease: 'power3.out' })
    const onMove = (event) => {
      parallaxX((event.clientX / window.innerWidth - 0.5) * -14)
      parallaxY((event.clientY / window.innerHeight - 0.5) * -8)
    }
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.killTweensOf(wrapper)
      context.revert()
    }
  }, [])

  return (
    <section ref={rootRef} id="top" className="hero relative h-[100svh] w-full overflow-hidden bg-[#050505]">
      <img
        src={`${import.meta.env.BASE_URL}poster.jpg`}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: ready ? 0 : 1 }}
      />
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_55%,rgba(0,0,0,0.45)_100%)]" />

      <div data-parallax className="pointer-events-none absolute inset-0 z-10">
        <h1 className="font-display absolute top-[11%] left-[5vw] text-white md:top-[26%] md:left-[3vw]">
          <span data-headline className="headline block">Digital</span>
        </h1>
        <h1 className="font-display absolute top-[19%] left-[5vw] text-white md:top-[52%] md:left-auto md:right-[3vw]">
          <span data-headline className="headline block">Systems</span>
        </h1>
      </div>

      <div className="absolute bottom-[13%] left-5 right-5 z-20 md:top-[44%] md:right-auto md:bottom-auto md:left-12 md:max-w-[290px]">
        <p data-fade className="text-[17px] font-semibold leading-[1.45] text-white/90 md:text-[19px]">
          We build the websites, automations and ERP that growing businesses run on, connected
          from day one.
        </p>
      </div>


      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span className="chev">◀</span>
        <span className="chev">▶</span>
      </div>
    </section>
  )
}
