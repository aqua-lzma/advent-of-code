const fs = require('fs')
let text = fs.readFileSync('input.txt', 'utf8')
console.time('Parse data')
let data = text.split('\n').map(line => [new Date(line.split('] ')[0].slice(1)), line.split('] ')[1]]).slice(0, -1)
console.timeEnd('Parse data')
console.time('Sort data')
data = data.sort((a, b) => a[0] - b[0])
console.timeEnd('Sort data')

function f (data) {
  console.time('Populate map')
  let guards = {}
  let guardId
  for (let [date, text] of data) {
    if (text[0] === 'G') guardId = text.split(' ')[1].slice(1)
    else {
      let datekey = date.toDateString()
      guards[guardId] = guards[guardId] == null ? {} : guards[guardId]
      guards[guardId][datekey] = guards[guardId][datekey] == null ? new Uint8Array(60) : guards[guardId][datekey]
      if (text[0] === 'f') guards[guardId][datekey] = guards[guardId][datekey].fill(1, date.getMinutes())
      else guards[guardId][datekey] = guards[guardId][datekey].fill(0, date.getMinutes())
    }
  }
  console.timeEnd('Populate map')
  console.time('Sum totals')
  let maxMin = 0
  let maxMinKey
  let maxGuardId
  for (let guardId in guards) {
    let times = new Uint8Array(60).fill(0)
    for (let dateKey in guards[guardId]) {
      for (let i = 0; i < 60; i++) {
        times[i] += guards[guardId][dateKey][i]
      }
    }
    guards[guardId]['total'] = times
    let highest = Math.max(...times)
    if (highest > maxMin) {
      maxMin = highest
      maxMinKey = times.indexOf(maxMin)
      maxGuardId = guardId
    }
  }
  console.timeEnd('Sum totals')
  console.log(maxMin, maxMinKey, maxGuardId)
  console.time('Build HTML')
  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"></head><body><style>th {width: 20px}th:first-of-type {width: initial;}td:first-of-type {font-family: monospace;}table, th, td {border: 1px solid black;border-collapse: collapse;color: white;background: #333;}</style><table><tr><th>Guard</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th><th>21</th><th>22</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th><th>28</th><th>29</th><th>30</th><th>31</th><th>32</th><th>33</th><th>34</th><th>35</th><th>36</th><th>37</th><th>38</th><th>39</th><th>40</th><th>41</th><th>42</th><th>43</th><th>44</th><th>45</th><th>46</th><th>47</th><th>48</th><th>49</th><th>50</th><th>51</th><th>52</th><th>53</th><th>54</th><th>55</th><th>56</th><th>57</th><th>58</th><th>59</th></tr>'
  for (let guardId in guards) {
    html += `<tr><td>${guardId}</td>`
    for (let i = 0; i < 60; i++) {
      let value = guards[guardId]['total'][i]
      html += `<td style="background-color:hsl(${((value / maxMin) * 295) + 64}, 80%, 60%)">${value}</td>`
    }
    html += '</tr>'
  }
  html += `</table></body><script>let canvas = document.createElement('canvas');canvas.width=60;canvas.height=${Object.keys(guards).length};let ctx = canvas.getContext('2d');let table = document.querySelector('tbody');for (let g = 1; g < ${Object.keys(guards).length + 1}; g++) {for (let t = 1; t < 61; t++) {console.log(g);let i = table.children[g].children[t];ctx.fillStyle = i.style['background-color'];ctx.fillRect((t-1), g-1, 1, 1);}};document.body.appendChild(canvas)</script></html>`
  fs.writeFileSync('big boy.html', html, 'utf8')
  console.timeEnd('Build HTML')
  return Number(maxGuardId) * maxMinKey
}

console.log(f(data))
