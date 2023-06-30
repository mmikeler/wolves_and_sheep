

class Game {

  constructor() {
    this.canvas = document.getElementById("bord")
    this.objects = []
    this.bord = new EasyC(this.canvas, this.objects)
    this.changeFigure = false
    this.interactiveBord = true
    this.wolfScore = 0
    this.wolfWinScore = 3
    this.sheepScore = 0
    // options
    this.pointUrl = './img/point.png'
    this.activePointUrl = './img/active_point.png'
    // text
    this.playerTargetMessage = 'Верните овец в загон. Берегитесь волков!'
    this.playerLoseMess = 'Вы потеряли слишком много овец!'
    this.playerWinMess = 'Вы молодец! Отара спасена.'
  }

  getPoint = (x, y) => {
    return {
      relative: { coord: true },
      type: "circle",
      x: x,
      y: y,
      radius: this.canvas.width / 14,
      fill: "#fff",
      stroke: { fill: '#333' },
      z: 3,
      gameType: 'point'
    }
  }

  getPointImg = (x, y) => {
    let v = this.randomInteger(0, 36)

    return {
      relative: { coord: true },
      type: "image",
      x: Number(x.toFixed(1)),
      y: Number(y.toFixed(1)),
      width: 50,
      src: `img/point.png`,
      scale: [1, 1],
      z: 3,
      rotate: this.bord.degreeToRadian(v * 10),
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
        this.getPointImg(
          Number(xRow.toFixed(1)),
          Number(yRow.toFixed(1))
        )
      )
    }
  }

  resetPoints = () => {
    this.setPointsProperty('src', this.pointUrl)
  }

  resetFigures = () => {
    this.bord.objects.forEach(obj => {
      if (obj.gameType == 'sheep' && obj?.scale !== [1, 1]) {
        obj.scale = [1, 1]
      }
    })
  }

  getFences = () => {
    const f = [
      [2, 2], [4, 2], [6, 2], [8, 2],
    ]
    f.forEach(fence => {
      this.bord.objects.push({
        relative: { coord: true },
        type: "image",
        x: this.float(fence[0] / 10),
        y: this.float(fence[1] / 10),
        width: 25,
        src: `img/fence3.png`,
        scale: [1, 1],
        z: 4,
      })
    })
  }

  getTrees = () => {
    const f = [
      [2, 4], [4, 4], [6, 4], [8, 4],
      [2, 6], [4, 6], [6, 6], [8, 6],
      [2, 8], [4, 8], [6, 8], [8, 8]
    ]
    f.forEach(fence => {
      this.bord.objects.push({
        relative: { coord: true },
        type: "image",
        x: this.float(fence[0] / 10),
        y: this.float(fence[1] / 10),
        width: 25,
        src: `img/tree2.png`,
        scale: [1, 1],
        z: 4,
      })
    })
  }

  getSheepPaths = () => {
    this.bord.objects.push({
      relative: true,
      type: "line",
      lineWidth: 0,
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
      stroke: { fill: '#ddd' },
      opacity: 0.1
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
    let v = this.randomInteger(5, 6)

    if (v == 0) v = 1

    return {
      relative: { coord: true },
      type: "image",
      x: Number(x.toFixed(1)),
      y: Number(y.toFixed(1)),
      width: 35,
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
      lineWidth: 2,
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
      stroke: { fill: '#a2bdb9', stroke: '#a2bdb9' },
      z: 2,
      opacity: 0.5
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
      width: 30,
      src: "img/wolf5.png",
      scale: [1, 1],
      z: 4,
      gameType: 'wolf'
    })
    this.bord.objects.push({
      relative: { coord: true },
      type: "image",
      x: 0.9,
      y: 0.1,
      width: 30,
      src: "img/wolf6.png",
      scale: [1, 1],
      z: 4,
      gameType: 'wolf'
    })
  }

  start = () => {
    clearInterval(this.bordEngine)
    this.bord.clean()
    this.bord.objects = []
    this.wolfScore = 0
    this.sheepScore = 0
    this.getPoints()
    this.getFences()
    this.getTrees()
    this.getSheepPaths()
    this.getWolfsPaths()
    this.getSheeps()
    this.getWolfsImage()
    //
    this.canvas.onclick = this.onclick
    //
    this.bordEngine = setInterval(() => {
      this.bord.draw()

      if (this.wolfScore >= this.wolfWinScore) {
        this.end(this.playerLoseMess)
      }

      if (this.sheepScore >= this.sheepWinScore) {
        this.end(this.playerWinMess)
      }

    }, 200)
    //
    this.displayLog(this.playerTargetMessage)
  }

  init = () => {
    this.start()
    document.getElementById('reset').onclick = this.reset
  }

  end = (mess) => {
    this.interactiveBord = false
    this.bord.objects = []
    this.bord.clean()

    if (this.wolfScore >= this.wolfWinScore) {
      this.bord.objects.push({
        relative: true,
        type: "text",
        x: 0.5,
        y: 0.5,
        value: "Волки сыты!",
        font: "Pangolin",
        size: 0.1,
        align: "center",
        fill: "#333",
      })
    }

    if (this.wolfScore < this.wolfWinScore && this.getAllFiguresByType('sheep').length == 0) {
      this.bord.objects.push({
        relative: true,
        type: "text",
        x: 0.5,
        y: 0.5,
        value: "Овцы целы!",
        font: "Pangolin",
        size: 0.1,
        align: "center",
        fill: "#333",
      })
    }
    this.bord.draw()
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
      this.resetFigures()
      this.setFigureProperty(figure[1], 'scale', [1.5, 1.5])
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
      this.resetFigures()

      if (y == 0.1) {
        this.deleteFigureFromIndex(this.changeFigure)
        this.upSheepScore()
        console.log('Sheeps has point!');
      }
      this.changeFigure = false

      this.BOT()
    }
  }

  // UTIL
  getAllFiguresByType = (type) => {
    const res = []
    this.bord.objects.forEach((obj, ind) => {
      if (obj.gameType == type) res.push(ind)
    })

    return res
  }

  upSheepScore = () => {
    this.sheepScore += 1
    document.getElementById('sheepScore').innerText = this.sheepScore
  }

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
      document.getElementById('wolfScore').innerText = this.wolfScore
    }
  }

  deleteFigureFromIndex = (ind) => {
    this.bord.objects.splice(ind, 1)
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