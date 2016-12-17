const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app

let template = [{
  label: '編集',
  submenu: [{
    role: 'undo'
  }, {
    role: 'redo'
  }, {
    role: 'cut'
  }, {
    role: 'copy'
  }, {
    role: 'paste'
  }, {
    role: 'pasteandmatchstyle'
  }, {
    role: 'selectall'
  }, {
    role: 'delete'
  }, {
    role: 'minimize'
  }, {
    role: 'close'
  }, {
    role: 'quit'
  }, {
    role: 'reload'
  }, {
    role: 'toggledevtools'
  }, {
    role: 'togglefullscreen'
  }, {
    role: 'resetzoom'
  }, {
    role: 'zoomin'
  }, {
    role: 'zoomout'
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