const FILE_NAME = Script.name() + ".jpg"
const FILE = FileManager.local()
const PATH = FILE.joinPath(FILE.documentsDirectory(), FILE_NAME)

if (config.runsInWidget) {
    let widget = new ListWidget()
    widget.backgroundImage = FILE.readImage(PATH)
    
    Script.setWidget(widget)
    Script.complete()
    
} else {
  // 스크린샷 가져오기
  let img = await Photos.fromLibrary()
  message = "크롭된 이미지와 위젯의 사이즈가 다를 경우 오류가 날 수 있습니다."
  await generateAlert(message,["OK"])
  FILE.writeImage(PATH,img)
  Script.complete()
}

// source from @mzeryck
// Generate an alert with the provided array of options.
async function generateAlert(message,options) {
  
  let alert = new Alert()
  alert.message = message
  
  for (const option of options) {
    alert.addAction(option)
  }
  
  let response = await alert.presentAlert()
  return response
}