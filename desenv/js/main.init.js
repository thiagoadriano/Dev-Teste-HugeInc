Huge.Util.ready(function(){
    Huge.MenuDados.get(function(){
        Huge.MenuMobile.setElements("open-menu", "close-menu", "shadow-menu", "menu", "content", "content-all");
        Huge.Submenu.init();
        Huge.MenuMobile.init();
    });
});
