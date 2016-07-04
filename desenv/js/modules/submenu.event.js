(function(Huge){
    var S = Huge.Submenu = {};

    S.itemsSubMenu = null

    S.init = function()
    {
        S.itemsSubMenu = document.querySelectorAll(".submenu");
        Huge.Util.each(S.itemsSubMenu, S.SubMenuEvent);
    }

    S.SubMenuEvent = function(el)
    {
        el.addEventListener('click', function(event){
            var el = event.currentTarget;
            if(el.className.indexOf('open-submenu') >= 0){
                Huge.Util.RemoveClass(el, 'open-submenu');
                S.DesktopShadow(false);
            }else{
                S.CloseSubMenus();
                S.DesktopShadow(true);
                Huge.Util.setClass(el,'open-submenu');
            }
        },false);
    }

    S.CloseSubMenus = function(){
        Huge.Util.each(S.itemsSubMenu, function(el){
            if(el.className.indexOf('open') >= 0){
                Huge.Util.RemoveClass(el, 'open-submenu');
            }
        });
    }

    S.getAllSubmenus = function()
    {
        return S.itemsSubMenu;
    }

    S.DesktopShadow = function (open) {
        Huge.Util.DesktopView(function() {
            var shadow = document.querySelector("#shadow-menu");
            var classe = "shadow-visible"; 
            if(open){
                if(shadow.className.indexOf(classe) < 1) Huge.Util.setClass(shadow, classe);
            }else{
                Huge.Util.RemoveClass(shadow, classe);
            }
        });
    }
})(Huge);