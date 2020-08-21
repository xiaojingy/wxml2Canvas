/* global Component wx */

Component({
  properties: {
    painting: {
      type: Object,
      value: { view: [] },
      observer(newVal, oldVal) {
        if (!this.data.isPainting && newVal) {
          if (newVal.width && newVal.height) {
            this.setData({
              isPainting: true,
              canvasId: newVal.canvasId
            })
            this.readyPigment();
          } else {
            this.setData({
              canvasId: 'canvasDrawer'
            })
          }
        }
      }
    }
  },
  data: {
    width: 100,
    height: 100,
    index: 0,
    imageList: [],
    tempFileList: [],
    isPainting: false,
    canvasId: ''
  },
  ctx: null,
  ready() {
    this.ctx = wx.createCanvasContext(this.data.canvasId, this);
  },
  methods: {
    readyPigment() {
      const { width, height, views } = this.data.painting
      this.setData({
        width,
        height
      })
      const inter = setInterval(() => {
        if (this.ctx) {
          clearInterval(inter)
          this.ctx.clearActions()
          this.drawRect({
            background: 'white',
            top: 0,
            left: 0,
            width,
            height
          })
          this.getImageList(views)
          this.downLoadImages(0)
        }
      }, 100)
    },
    getImageList(views) {
      let imageList = []
      for (let i = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          imageList.push(views[i].url)
        }
      }
      this.setData({
        imageList
      })
    },
    downLoadImages(index) {
      const { imageList, tempFileList } = this.data
      if (index < imageList.length) {
        this.getImageInfo(imageList[index]).then(file => {
          tempFileList.push(file)
          this.setData({
            tempFileList
          })
          this.downLoadImages(index + 1)
        })
      } else {
        this.startPainting()
      }
    },
    startPainting() {
      const { tempFileList, painting: { views } } = this.data
      for (let i = 0, imageIndex = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          this.drawImage({
            ...views[i],
            url: tempFileList[imageIndex]
          })
          imageIndex++
        } else if (views[i].type === 'text') {
          this.drawText(views[i])
        } else if (views[i].type === 'rect') {
          this.drawRect(views[i])
        }
      }
      this.ctx.draw(true, () => {
        this.saveImageToLocal()
      })
    },
    drawImage(params) {
      const { url, top = 0, left = 0, width = 0, height = 0, isCircle = false } = params;
      if (isCircle) {
        this.circleImg(this.ctx, url, left, top, width / 2);
      } else {
        this.ctx.drawImage(url, left, top, width, height);
      }
    },
    circleImg(ctx, url, x, y, r) {
      ctx.save();
      let d = 2 * r, cx = x + r, cy = y + r;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI,false);
      ctx.clip();
      ctx.drawImage(url, x, y, d, d);
      ctx.restore();
    },
    drawText(params) {
      const {
        MaxLineNumber = 2,
        breakWord = false,
        color = 'black',
        content = '',
        fontSize = 16,
        top = 0,
        left = 0,
        lineHeight = 20,
        textAlign = 'left',
        width,
        bolder = false,
        textDecoration = 'none'
      } = params

      this.ctx.setTextBaseline('top')
      this.ctx.setTextAlign(textAlign)
      this.ctx.setFillStyle(color)
      this.ctx.setFontSize(fontSize)

      if (!breakWord) {
        this.ctx.fillText(content, left, top)
        this.drawTextLine(left, top, textDecoration, color, fontSize, content)
      } else {
        let fillText = ''
        let fillTop = top
        let lineNum = 1
        for (let i = 0; i < content.length; i++) {
          fillText += [content[i]]
          if (this.ctx.measureText(fillText).width > width) {
            if (lineNum === MaxLineNumber) {
              if (i !== content.length) {
                fillText = fillText.substring(0, fillText.length - 1) + '...'
                this.ctx.fillText(fillText, left, fillTop)
                this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
                fillText = ''
                break
              }
            }
            this.ctx.fillText(fillText, left, fillTop)
            this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
            fillText = ''
            fillTop += lineHeight
            lineNum++
          }
        }
        this.ctx.fillText(fillText, left, fillTop)
        this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
      }

      if (bolder) {
        this.drawText({
          ...params,
          left: left + 0.3,
          top: top + 0.3,
          bolder: false,
          textDecoration: 'none'
        })
      }
    },
    drawTextLine(left, top, textDecoration, color, fontSize, content,radius) {
      if (textDecoration === 'underline') {
        this.drawRect({
          background: color,
          top: top + fontSize * 1.2,
          left: left - 1,
          width: this.ctx.measureText(content).width + 2,
          height: 1
        })
      } else if (textDecoration === 'line-through') {
        this.drawRect({
          background: color,
          top: top + fontSize * 0.6,
          left: left - 1,
          width: this.ctx.measureText(content).width + 2,
          height: 1
        })
      }
    },
    drawRect(params) {
      const { background, top = 0, left = 0, width = 0, height = 0, radius = 0 } = params
      // this.ctx.setFillStyle(background)
      // this.ctx.fillRect(left, top, width, height)
      // 开始绘制
      this.ctx.beginPath()
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      // 这里是使用 fill 还是 stroke都可以，二选一即可
      this.ctx.setFillStyle(background)
      // ctx.setStrokeStyle('transparent')
      // 左上角
      this.ctx.arc(left + radius, top + radius, radius, Math.PI, Math.PI * 1.5)

      // border-top
      this.ctx.moveTo(left + radius, top)
      this.ctx.lineTo(left + width - radius, top)
      this.ctx.lineTo(left + width, top + radius)
      // 右上角
      this.ctx.arc(left + width - radius, top + radius, radius, Math.PI * 1.5, Math.PI * 2)

      // border-right
      this.ctx.lineTo(left + width, top + height - radius)
      this.ctx.lineTo(left + width - radius, top + height)
      // 右下角
      this.ctx.arc(left + width - radius, top + height - radius, radius, 0, Math.PI * 0.5)

      // border-bottom
      this.ctx.lineTo(left + radius, top + height)
      this.ctx.lineTo(left, top + height - radius)
      // 左下角
      this.ctx.arc(left + radius, top + height - radius, radius, Math.PI * 0.5, Math.PI)

      // border-left
      this.ctx.lineTo(left, top + radius)
      this.ctx.lineTo(left + radius, top)

      // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
      this.ctx.fill()
      // ctx.stroke()
      this.ctx.closePath()
    },
    getImageInfo(url) {
      return new Promise((resolve, reject) => {
        /* 获得要在画布上绘制的图片 */
        const objExp = new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)
        if (objExp.test(url)) {
          wx.getImageInfo({
            src: url,
            complete(res) {
              if (res.errMsg === 'getImageInfo:ok') {
                resolve(res.path)
              } else {
                reject(new Error('getImageInfo fail'));
                console.log('err');
              }
            }
          })
        } else {
          resolve(url)
        }
      })
    },
    saveImageToLocal() {
      const { width, height, canvasId } = this.data
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width,
        height,
        canvasId: canvasId,
        success: res => {
          if (res.errMsg === 'canvasToTempFilePath:ok') {
            this.setData({
              isPainting: false,
              imageList: [],
              tempFileList: []
            })
            this.triggerEvent('getImage', { tempFilePath: res.tempFilePath, canvasId: canvasId })
          }
        },
        fail: err => {
          console.log(err);
        }
      }, this)
    }
  }
})
