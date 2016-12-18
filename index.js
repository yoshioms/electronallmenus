const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app

let template = [{
  label: '編集',
  submenu: [{
    role: 'undo',
    sublabel: 'sublabel'
  }, {
    role: 'redo'
  }, {
    role: 'cut'
  }, {
    role: 'copy'
  }, {
    role: 'paste'
  }, {
    label: 'やり直し',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo',
    id: 'redoitem'
  }, {
    type: 'separator'
  }, {
    label: '切り取り',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut',
    position: 'endof=numbers'
  }, {
    label: 'コピー',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy',
    position: 'before=redoitema'
  }, {
    role: 'pasteandmatchstyle'
  }, {
    role: 'selectall',
    id: 'abc',
    position: 'endof=numbers'
  }, {
    role: 'delete',
    id: '1'
  }, {
    role: 'minimize'
  }, {
    role: 'close',
    id: '2'
  }, {
    role: 'quit',
    position: 'after=abc'
  }, {
    role: 'reload',
    id: '1',
    position: 'endof=numbers'
  }, {
    role: 'toggledevtools'
  }, {
    role: 'togglefullscreen',
    visible: false
  }, {
    role: 'resetzoom'
  }, {
    role: 'zoomin',
    enabled: false
  }, {
    role: 'zoomout'
  }, {
    label: 'normal',
    type: 'normal'
  }, {
    label: 'separator',
    type: 'separator'
  }, {
    label: 'checkbox1',
    type: 'checkbox'
  }, {
    label: 'checkbox2',
    type: 'checkbox'
  }, {
    label: 'radio',
    type: 'radio'
  }, {
    label: 'radio1',
    type: 'radio'
  }]
}]

if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({      
    label: name,
    submenu: [{
        role: 'about'
    }, {
        role: 'hide'
    }, {
        role: 'hideothers'
    }, {
        role: 'unhide'
    }, {
        role: 'startspeaking'
    }, {
        role: 'stopspeaking'
    }, {
        role: 'front'
    }, {
        role: 'zoom'
    }, {
        role: 'window'
    }, {
        role: 'help'
    }, {
        role: 'services'
    }]
  })

  addUpdateMenuItems(template[0].submenu, 1)
}
function addUpdateMenuItems (items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    label: `Version ${version}`,
    enabled: false
  }, {
    label: 'Checking for Update',
    enabled: false,
    key: 'checkingForUpdate'
  }, {
    label: 'Check for Update',
    visible: false,
    key: 'checkForUpdate',
    click: function () {
      require('electron').autoUpdater.checkForUpdates()
    }
  }, {
    label: 'Restart and Install Update',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: function () {
      require('electron').autoUpdater.quitAndInstall()
    }
  }]
    items.splice.apply(items, [position, 0].concat(updateItems))
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}

app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  const winPath = path.join('file://', __dirname, 'index.html')
  let win = new BrowserWindow({ width: 400, height: 320 })
  win.on('close', function () { win = null })
  win.loadURL(winPath)
  win.show()
})

app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})