

class Game {

  constructor() {
    this.canvas = document.getElementById("bord")
    this.objects = []
    this.bord = new EasyC(this.canvas, this.objects)
    this.changeFigure = false
    this.interactiveBord = true
    this.wolfScore = 0
    this.wolfWinScore = 2
    this.sheepWinScore = 2
  }

  getPoint = (x, y) => {
    return {
      relative: { coord: true },
      type: "circle",
      x: x,
      y: y,
      radius: this.canvas.width / 14,
      fill: "#333",
      stroke: { fill: '#333' },
      z: 3,
      gameType: 'point'
    }
  }

  getPoints = () => {
    let xRow = 0.1
    let yRow = 0.1
    for (let i = 0; i < 25; i++) {

      if (i % 5 == 0 && i != 0) {
        yRow += 0.2, xRow = 0.1
      }

      if (i % 5 != 0 && i != 0) {
        xRow += 0.2
      }

      this.bord.objects.push(
        this.getPoint(
          Number(xRow.toFixed(1)),
          Number(yRow.toFixed(1))
        )
      )
    }
  }

  getSheepPaths = () => {
    this.bord.objects.push({
      relative: true,
      type: "line",
      lineWidth: 3,
      corners: [
        [0.1, 0.1, 0.9, 0.1],
        [0.1, 0.3, 0.9, 0.3],
        [0.1, 0.5, 0.9, 0.5],
        [0.1, 0.7, 0.9, 0.7],
        [0.1, 0.9, 0.9, 0.9],
        //
        [0.1, 0.1, 0.1, 0.9],
        [0.3, 0.1, 0.3, 0.9],
        [0.5, 0.1, 0.5, 0.9],
        [0.7, 0.1, 0.7, 0.9],
        [0.9, 0.1, 0.9, 0.9],
      ],
      stroke: { fill: '#f3f3f3', stroke: '#f3f3f3' }
    })
  }

  getSheep = (x, y) => {
    return {
      relative: { coord: true },
      type: "circle",
      x: x,
      y: y,
      radius: this.canvas.width / 20,
      fill: "#000",
      stroke: { fill: '#000' },
      z: 4
    }
  }

  getSheepImg = (x, y) => {
    let v = this.randomInteger(1, 2)

    if (v == 0) v = 1

    return {
      relative: { coord: true },
      type: "image",
      x: Number(x.toFixed(1)),
      y: Number(y.toFixed(1)),
      width: 40,
      src: `img/sheep${v}.png`,
      scale: [1, 1],
      z: 4,
      gameType: 'sheep'
    }
  }

  getSheeps = () => {
    let xRow = 0.1
    let yRow = 0.7
    for (let i = 0; i < 10; i++) {

      if (i % 5 == 0 && i != 0) {
        yRow += 0.2, xRow = 0.1
      }

      if (i % 5 != 0 && i != 0) {
        xRow += 0.2
      }

      this.bord.objects.push(this.getSheepImg(xRow, yRow))
    }
  }

  getWolfsPaths = () => {
    this.bord.objects.push({
      relative: true,
      type: "line",
      lineWidth: 3,
      corners: [
        [0.7, 0.1, 0.9, 0.3],
        [0.5, 0.1, 0.9, 0.5],
        [0.3, 0.1, 0.9, 0.7],
        [0.1, 0.1, 0.9, 0.9],
        [0.1, 0.3, 0.7, 0.9],
        [0.1, 0.5, 0.5, 0.9],
        [0.1, 0.7, 0.3, 0.9],
        //
        [0.3, 0.1, 0.1, 0.3],
        [0.5, 0.1, 0.1, 0.5],
        [0.7, 0.1, 0.1, 0.7],
        [0.9, 0.1, 0.1, 0.9],
        [0.9, 0.3, 0.3, 0.9],
        [0.9, 0.5, 0.5, 0.9],
        [0.9, 0.7, 0.7, 0.9],
      ],
      stroke: { fill: '#a2bdb9', stroke: '#a2bdb9' }
    })
  }

  getWolfs = () => {
    this.bord.objects.push({
      relative: { coord: true },
      type: "circle",
      x: 0.1,
      y: 0.1,
      radius: this.canvas.width / 20,
      fill: "#f0e",
      stroke: { fill: '#000' },
      z: 5
    })
    this.bord.objects.push({
      relative: { coord: true },
      type: "circle",
      x: 0.9,
      y: 0.1,
      radius: this.canvas.width / 20,
      fill: "#f0e",
      stroke: { fill: '#000' },
      z: 5
    })
  }

  getWolfsImage = () => {
    this.bord.objects.push({
      relative: { coord: true },
      type: "image",
      x: 0.1,
      y: 0.1,
      width: 40,
      src: "img/wolf.png",
      scale: [1, 1],
      z: 4,
      gameType: 'wolf'
    })
    this.bord.objects.push({
      relative: { coord: true },
      type: "image",
      x: 0.9,
      y: 0.1,
      width: 40,
      src: "img/wolf2.png",
      scale: [1, 1],
      z: 4,
      gameType: 'wolf'
    })
  }

  start = () => {
    this.bord.objects = []
    this.wolfScore = 0
    this.sheepScore = 0
    this.getPoints()
    this.getSheepPaths()
    this.getWolfsPaths()
    this.getSheeps()
    this.getWolfsImage()
    //
    this.canvas.onclick = this.onclick
    //
    this.bordEngine = setInterval(() => {

      this.bord.draw()

      if (this.wolfScore > this.wolfWinScore) {
        this.end('Вы потеряли слишком много овец!')
      }

      if (this.sheepScore > this.sheepWinScore) {
        this.end('Волки повержены!')
      }

    }, 100)
    //
    this.displayLog('Сохраните стадо и заблокируйте волков')
  }

  init = () => {
    this.start()
    document.getElementById('reset').onclick = this.reset
  }

  end = (mess) => {
    this.interactiveBord = false
    clearInterval(this.bordEngine)
    this.displayLog(mess)
  }

  reset = () => {
    this.end('')
    this.start()
  }

  displayLog = (mess) => {
    document.getElementById('display-log__text').innerHTML = `<span>${mess}</span>`
  }

  // Event Listener
  onclick = (event) => {
    let x = this.getPositionFromPX(event.pageX - this.canvas.offsetLeft)
    let y = this.getPositionFromPX(event.pageY - this.canvas.offsetTop)
    const figure = this.isFigurePosition(x, y)

    if (figure[0] == 'sheep') {
      this.setPointsProperty('fill', '#333')
      this.setPointProperty(x, y, 'fill', '#458d0f')
      this.changeFigure = figure[1]
    }

    if (!figure && this.changeFigure && this.canFigureMoveToPoint(this.changeFigure, x, y)) {
      this.playerMove(x, y)

    }

  }

  playerMove = (x, y) => {
    if (this.isClearPoint(x, y)) {
      this.setFigureProperty(this.changeFigure, 'x', x)
      this.setFigureProperty(this.changeFigure, 'y', y)
      this.setPointsProperty('fill', '#333')
      this.changeFigure = false
      this.BOT()
    }
  }

  // UTIL
  randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  float = (num) => {
    return Number(num.toFixed(1))
  }

  getPositionFromPX = (posAtPX) => {
    return Number((Math.floor(posAtPX / (this.canvas.width / 100)) / 100).toFixed(1))
  }

  isFigurePosition = (x, y) => {
    let res = false
    this.bord.objects.forEach((el, ind) => {
      if (el.x == x && el.y == y && el.gameType != 'point') {
        res = [el.gameType, ind]
      }
    })
    return res
  }

  isClearPoint = (x, y) => {
    if (x > 1 || x < 0 || y > 1 || y < 0 || x * 10 % 2 == 0 || y * 10 % 2 == 0) return false
    const res = this.isFigurePosition(x, y);
    return !res && res !== undefined ? true : false
  }

  setPointProperty = (x, y, key, val) => {
    const point = this.bord.objects.findIndex(obj => {
      return obj.gameType == 'point' && obj.x == x && obj.y == y
    })
    if (point > 0) {
      this.bord.objects[point][key] = val
    }
  }

  setPointsProperty = (key, val) => {
    this.bord.objects.forEach(obj => {
      if (obj.gameType == 'point') obj[key] = val
    })
  }

  setFigureProperty = (ind, key, val) => {
    this.bord.objects[ind][key] = val
  }

  canFigureMoveToPoint = (ind, x, y) => {
    const [figureX, figureY] = [
      this.bord.objects[ind].x,
      this.bord.objects[ind].y
    ]
    // назад нельзя
    if (y > figureY) return false
    // через клетку нельзя
    if (Math.abs(figureX - x) > 0.3 || Math.abs(figureY - y) > 0.3) return false
    // по диагонали нельзя
    if (figureX != x && figureY != y) return false

    return true
  }

  getNearPoints = (x, y) => {
    const step = 0.2
    const near_points = []

    if (x + step < 1)
      near_points.push({ 'x': x + step, 'y': y })
    if (x - step > 0)
      near_points.push({ 'x': x - step, 'y': y })
    if (y + step < 1)
      near_points.push({ 'x': x, 'y': y + step })
    if (y - step > 0)
      near_points.push({ 'x': x, 'y': y - step })
    if (x + step < 1 && y + step < 1)
      near_points.push({ 'x': x + step, 'y': y + step })
    if (x - step > 0 && y + step < 1)
      near_points.push({ 'x': x - step, 'y': y + step })
    if (x + step < 1 && y - step > 0)
      near_points.push({ 'x': x + step, 'y': y - step })
    if (x - step > 0 && y - step > 0)
      near_points.push({ 'x': x - step, 'y': y - step })

    near_points.forEach(point => {
      point['x'] = this.float(point['x'])
      point['y'] = this.float(point['y'])
    })

    return near_points
  }

  deleteFigureFromPosition = (positionX, positionY) => {
    const ind = this.bord.objects.findIndex(obj => {
      if (obj.x == positionX && obj.y == positionY && obj.gameType != 'point') return true
    })
    if (ind) {
      this.bord.objects.splice(ind, 1)
      console.log('OH, NICE LAMB!');
      this.wolfScore += 1
    }
  }

  moveFigure = (ind, from, to) => {
    // set animation
  }

  // !!!!!!!!!!!! BOT !!!!!!!!!!!!!!!
  BOT = () => {
    // Запрещаем действия
    this.interactiveBord = false

    // Собираем волков
    const wolfs = []
    this.bord.objects.forEach((el, ind) => {
      if (el.gameType == 'wolf') {
        el.ind = ind
        wolfs.push(el)
      }
    })

    // На тот случай, если волки всё таки убежали в лес )
    if (wolfs.length == 0) return

    // Вышли на охоту
    let activeWolf = {
      wolf: wolfs[this.randomInteger(0, 1)], // Случайный выбор по-умолчанию
      np: []
    }
    // Если один из волков видит жертву и может её съесть, выбираем его
    wolfs.forEach(wolf => {
      const targets = this.wolfSeeSheep(wolf.x, wolf.y)
      if (targets.targets.length > 0) {
        const prey = this.isTargetAPray(targets.targets, wolf)
        if (prey) {
          activeWolf = {
            wolf: wolf,
            prey: prey
          }
        }
      }
    })
    // Если есть жертва, инициируем удар
    if (activeWolf?.prey) {
      console.log('I SEE PREY');
      let newPos = activeWolf.prey[this.randomInteger(0, activeWolf.prey.length - 1)]
      this.setFigureProperty(activeWolf.wolf.ind, 'x', newPos.x)
      this.setFigureProperty(activeWolf.wolf.ind, 'y', newPos.y)
      this.deleteFigureFromPosition(newPos.t.x, newPos.t.y)
    }
    // Если нет, двигаемся по полю
    else {
      activeWolf.np = this.getClearPointsFromNear(this.getNearPoints(activeWolf.wolf.x, activeWolf.wolf.y))
      if (activeWolf.np.length > 0) {
        let moveTo = activeWolf.np[this.randomInteger(0, activeWolf.np.length - 1)]
        this.setFigureProperty(activeWolf.wolf.ind, 'x', moveTo.x)
        this.setFigureProperty(activeWolf.wolf.ind, 'y', moveTo.y)
      }
      else {
        console.log('OH NO! IM STACK!', activeWolf.np);
        this.sheepScore += 1
      }
    }

    // Разрешаем действия
    this.interactiveBord = true
  }

  getClearPointsFromNear = (nearPointsArray) => {
    const clearPoints = []
    nearPointsArray.forEach(point => {
      if (!this.isFigurePosition(point.x, point.y)) {
        clearPoints.push(point)
      }
    })

    return clearPoints
  }

  wolfSeeSheep = (x, y) => {
    // Волк осматривается
    const np = this.getNearPoints(x, y)
    // Ищем жертву
    const targets = []
    np.forEach(point => {
      if (this.isFigurePosition(point.x, point.y)[0] == 'sheep')
        targets.push(point)
    })
    // Если цели есть возвращаем их, если нет, то доступные точки для хода
    return {
      targets: targets,
      np: np
    }
  }

  isTargetAPray = (targets, wolf) => {
    const validAttackPositions = []

    targets.forEach(target => {

      if (wolf.x > target.x && wolf.y == target.y) {
        if (this.isClearPoint(
          this.float(target.x - 0.2),
          target.y
        )) {
          validAttackPositions.push({
            x: this.float(target.x - 0.2),
            y: target.y,
            t: target
          })
        }
      }

      if (wolf.x > target.x && wolf.y > target.y) {
        if (this.isClearPoint(
          this.float(target.x - 0.2),
          this.float(target.y - 0.2),
        )) {
          validAttackPositions.push({
            x: this.float(target.x - 0.2),
            y: this.float(target.y - 0.2),
            t: target
          })
        }
      }

      if (wolf.x == target.x && wolf.y > target.y) {
        if (this.isClearPoint(
          target.x,
          this.float(target.y - 0.2),
        )) {
          validAttackPositions.push({
            x: target.x,
            y: this.float(target.y - 0.2),
            t: target
          })
        }
      }

      if (wolf.x < target.x && wolf.y > target.y) {
        if (this.isClearPoint(
          this.float(target.x + 0.2),
          this.float(target.y - 0.2),
        )) {
          validAttackPositions.push({
            x: this.float(target.x + 0.2),
            y: this.float(target.y - 0.2),
            t: target
          })
        }
      }

      if (wolf.x < target.x && wolf.y == target.y) {
        if (this.isClearPoint(
          this.float(target.x + 0.2),
          target.y,
        )) {
          validAttackPositions.push({
            x: this.float(target.x + 0.2),
            y: target.y,
            t: target
          })
        }
      }

      if (wolf.x < target.x && wolf.y < target.y) {
        if (this.isClearPoint(
          this.float(target.x + 0.2),
          this.float(target.y + 0.2),
        )) {
          validAttackPositions.push({
            x: this.float(target.x + 0.2),
            y: this.float(target.y + 0.2),
            t: target
          })
        }
      }

      if (wolf.x == target.x && wolf.y < target.y) {
        if (this.isClearPoint(
          target.x,
          this.float(target.y + 0.2),
        )) {
          validAttackPositions.push({
            x: target.x,
            y: this.float(target.y + 0.2),
            t: target
          })
        }
      }

      if (wolf.x > target.x && wolf.y < target.y) {
        if (this.isClearPoint(
          this.float(target.x - 0.2),
          this.float(target.y + 0.2)
        )) {
          validAttackPositions.push({
            x: this.float(target.x - 0.2),
            y: this.float(target.y + 0.2),
            t: target
          })
        }
      }

    })
    return validAttackPositions.length > 0 ? validAttackPositions : false
  }
}