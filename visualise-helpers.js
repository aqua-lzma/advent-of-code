/*
if (!window.requestPostAnimationFrame) {
  window.requestPostAnimationFrame = function monkey(fn) {
    const channel = new MessageChannel()
    channel.port2.onmessage = evt => fn(evt.data)
    requestAnimationFrame((t) => channel.port1.postMessage(t))
  }
}
*/

function download (url, filename = "file.ext") {
  a = document.createElement('a')
  a.textContent = a.download = filename
  a.href = url
  document.body.append(a)
  return a
}

export class FrameByFrameCanvasRecorder {
  constructor (sourceCanvas, FPS = 30) {
    this.FPS = FPS
    this.source = sourceCanvas
    const canvas = this.canvas = sourceCanvas.cloneNode()
    const ctx = this.drawingContext = canvas.getContext('2d')
    ctx.drawImage(sourceCanvas, 0, 0)
    const stream = this.stream = canvas.captureStream(0)
    const track = this.track = stream.getVideoTracks()[0]
    if (!track.requestFrame) {
      track.requestFrame = () => stream.requestFrame()
    }
    const rec = this.recorder = new MediaRecorder(stream)
    const chunks = this.chunks = []
    rec.ondataavailable = evt => chunks.push(evt.data)
    rec.start()
    this.waitForEvent(rec, 'start').then(() => rec.pause())
    this._init = this.waitForEvent(rec, 'pause')
  }

  waitForEvent (target, type) {
    return new Promise((resolve) => target.addEventListener(type, resolve, {
      once: true
    }))
  }

  async recordFrame () {
    const rec = this.recorder
    const canvas = this.canvas
    const source = this.source
    const ctx = this.drawingContext
    if (canvas.width !== source.width ||
      canvas.height !== source.height) {
      canvas.width = source.width
      canvas.height = source.height
    }
    const timer = wait(1000 / this.FPS)
    rec.resume()
    await this.waitForEvent(rec, 'resume')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(source, 0, 0)
    this.track.requestFrame()
    await timer
    rec.pause()
    await this.waitForEvent(rec, 'pause')
  }

  async export () {
    this.recorder.stop()
    this.stream.getTracks().forEach((track) => track.stop())
    await this.waitForEvent(this.recorder, 'stop')
    return new Blob(this.chunks)
  }
}
