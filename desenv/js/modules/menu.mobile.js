(function(Huge){
    var M = Huge.MenuMobile = {};

    M.elBtnOpen  = null;
    M.elBtnClose = null;
    M.elBoxMenu  = null;
    M.elMenuList = null;
    M.elContent  = null;
    M.elBoxall   = null;
    M.submenu    = null;

    M.setElements = function(btnOpen, btnClose, boxMenu, MenuList, content, boxall)
    {
        M.elBtnOpen  = document.querySelector("#" + btnOpen);
        M.elBtnClose = document.querySelector("#" + btnClose);
        M.elBoxMenu  = document.querySelector("#" + boxMenu);
        M.elMenuList = document.querySelector("#" + MenuList);
        M.elContent  = document.querySelector("#" + content);
        M.elBoxall   = document.querySelector("#" + boxall);
    }
    M.OpenMenu = function()
    {
        Huge.Util.setClass(M.elBtnOpen, 'hidden');
        Huge.Util.setClass(M.elBtnClose, 'visible');
        Huge.Util.setClass(M.elBoxMenu, 'slider-menu');
        Huge.Util.setClass(M.elMenuList, 'fade-menu');
        Huge.Util.setClass(M.elContent, 'slider-content');
        Huge.Util.setClass(M.elBoxall, 'no-scroll');
    } 

    M.CloseModal = function() 
    {
        Huge.Util.RemoveClass(M.elBtnOpen, 'hidden');
        Huge.Util.RemoveClass(M.elBtnClose, 'visible');
        Huge.Util.RemoveClass(M.elBoxMenu, 'slider-menu');
        Huge.Util.RemoveClass(M.elMenuList, 'fade-menu');
        Huge.Util.RemoveClass(M.elContent, 'slider-content');
        Huge.Util.RemoveClass(M.elBoxall, 'no-scroll');
        M.CloseAllSubmenus();
    }
    
    M.CloseAllSubmenus = function()
    {
        Huge.Util.each(M.submenu, function(el){
            if(el.className.indexOf('open') >= 0){
                Huge.Util.RemoveClass(el, 'open-submenu');
            }
        });
    }

    M.closeOut = function(event)
    {
        var click = event.target;
        if(click.nodeName.toLowerCase() === 'div' && click.id === "shadow-menu"){
            M.CloseModal();
        }            
    }
    M.init = function()
    {
        M.elBtnOpen.addEventListener('click', M.OpenMenu, false);
        M.elBtnClose.addEventListener('click', M.CloseModal, false);
        M.elBoxMenu.addEventListener('click', M.closeOut, false)
        M.submenu = Huge.Submenu.getAllSubmenus();
    }

})(Huge); 
