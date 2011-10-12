var daysleft = 
  new Transform(
    new Text()
    .setText('79')
    .setX(533.25)
    .setY(483.25)
    .setHAlign('left')
    .setAutoSize(false)
    .setWidth(172.75)
    .setFont('126.58pt OFLGoudyStMTT')
      .setStrokeWidth(1.0)
      .setStroke('rgba(0,0,0,255)')
      .setFill('rgba(75,48,0,255)')
      )
  .setTranslateX(-350.0).setTranslateY(53.0)
;
var sceneRoot = new Group()
.add(
  new ImageView('cache_img_9720.png').setX(50)
)
.add(daysleft
)
