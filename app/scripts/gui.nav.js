var gui       = require('nw.gui');
var menu      = new gui.Menu({ type: 'menubar' });
var menuItems = new gui.Menu();
var actionKey = ( process.platform === 'darwin' ) ? 'cmd' : 'ctrl';

// Open project
menuItems.append(new gui.MenuItem({
  label: 'Open...',
  click: function () {
    document.getElementById('dir-selector').click();
  },
  key: 'o',
  modifiers: actionKey
}));

//TODO: Open recent (= submenu)

// Save project
menuItems.append(new gui.MenuItem({
  label: 'Save',
  click: function () {
    document.getElementById('save-button').click();
  },
  key: 's',
  modifiers: actionKey
}));

//TODO: Separator
//TODO: Undo/redo/select-all
//TODO: Separator
//TODO: Settings?

// create MacBuiltin
menu.createMacBuiltin('I18n Translator',{
  hideEdit: true,
  hideWindow: true
});

// Append MenuItem as a Submenu
menu.append(
  new gui.MenuItem({
    label: 'File',
    submenu: menuItems // menu elements from menuItems object
  })
);

// Append Menu to Window
gui.Window.get().menu = menu;
