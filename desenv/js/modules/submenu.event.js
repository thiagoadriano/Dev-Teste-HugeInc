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
            }else{
                S.CloseSubMenus();
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
})(Huge);