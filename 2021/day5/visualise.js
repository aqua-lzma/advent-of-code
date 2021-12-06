function hslToRgb(h, s, l){
  let r, g, b
  if (s == 0) {
    r = g = b = l
  } else {
    function hue2rgb (p, q, t) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

(async () => {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  let input = await (await fetch('input.txt')).text()

  input = input.split('\n').map(line => line.split(' -> ').map(xy => xy.split(',').map(i => parseInt(i))))
  let size = Math.max(...input.flat(2)) + 1
  let grid = new Uint32Array(size * size)
  for (let [[x1, y1], [x2, y2]] of input) {
    if (x1 === x2) {
      if (y2 < y1) [y1, y2] = [y2, y1]
      for (let i = y1; i <= y2; i++) {
        let pos = (i * size) + x1
        grid[pos]++
      }
    } else if (y1 === y2) {
      if (x2 < x1) [x1, x2] = [x2, x1]
      for (let i = x1; i <= x2; i++) {
        let pos = (y1 * size) + i
        grid[pos]++
      }
    } else {
      let len = x1 < x2 ? x2 - x1 : x1 - x2
      for (let i = 0; i <= len; i++) {
        let x = x1 < x2 ? x1 + i : x1 - i
        let y = y1 < y2 ? y1 + i : y1 - i
        let pos = (y * size) + x
        grid[pos]++
      }
    }
  }

  let max = grid.reduce((acc, cur) => Math.max(acc, cur))
  console.log(max)
  canvas.width = canvas.height = size
  ctx.fillRect(0, 0, size, size)
  let imageData = ctx.getImageData(0, 0, size, size)
  for (let i = 0; i < imageData.data.length; i += 4) {
    let j = i / 4
    // let hue = Math.floor((grid[j] / max) * 255)
    let hue = ((grid[j] / max) / 1.33)
    let [r, g, b] = hslToRgb(hue, 0.8, 0.7)
    imageData.data[i + 0] = r
    imageData.data[i + 1] = g
    imageData.data[i + 2] = b
  }
  ctx.putImageData(imageData, 0, 0)
  console.log('Done . . .')
})()
