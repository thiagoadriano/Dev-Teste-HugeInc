var Huge = Huge || {};
(function(Huge) {
    var G = Huge.MenuDados = {};

    G.get = function(callback)
    {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function()
        {
            if(xhr.readyState === 4 && xhr.status === 200)
            {
                var resp = JSON.parse( xhr.responseText );
                G.PrepareMenu(resp, callback);
            }
        }

        xhr.open("GET", "api/nav.json");
        xhr.send();

    } 

    G.PrepareMenu = function(res, callback)
    {
        var array = res.items;
        var menu  = document.querySelector("#menu");
        for(var i = 0, total = array.length; i < total; i++)
        {
            var li  = document.createElement("li");
            if(array[i].items.length){
                G.childrenMenu(array[i], li)
            }else{
                array[i].url = array[i].url.replace("#", '');
                G.ItemMenu(array[i], li);
            }

            menu.appendChild(li);
        } 
        
        if (callback) callback();
    }

    G.childrenMenu = function(arr, liatual)
    {
        G.ItemMenu(arr, liatual);
        var items = arr.items;
        var ul = document.createElement("ul");
        for(var i = 0, total = items.length; i < total; i++)
        {
            var li = document.createElement("li");
            items[i].url = items[i].url.replace("#", '');
            G.ItemMenu(items[i], li);
            ul.appendChild(li);
        }
        liatual.className = "submenu";
        liatual.appendChild(ul);
    }

    G.ItemMenu = function(dados, liatual)
    {
        var link = document.createElement("a");
        var texto = document.createTextNode(dados.label);
        link.setAttribute("href", dados.url);
        link.appendChild(texto);
        liatual.appendChild(link);
    }

    
})(Huge); 
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
(function (Huge) {
    var U = Huge.Util = {}

    U.ready = function(fn){
        document.addEventListener('DOMContentLoaded', fn, false);
    }

    U.each = function(list, fn){
        for(var i = 0, total = list.length; i < total; i++){
            fn(list[i], i); 
        }
    }

     U.setClass = function(el, classe)
    {
        var list = el.className.split(" ");
        list.push(classe);
        el.className = list.join(" ");
    }

    U.RemoveClass = function(el, classe)
    {
        var list = el.className.split(" ");
        list.splice(list.indexOf(classe), 1);
        el.className = list.join(" ");
    }

    U.DesktopView = function(callback)
    {
        if(screen.width > 767){
            callback();
        }
    }

    U.scrollBg = function()
    {
        U.DesktopView(function(){
            var el = document.querySelector("#menu");
            var classe = "menu-opacity";
            document.addEventListener('scroll', function(event) {
                if(event.target.scrollingElement.scrollTop > 250){
                    if(el.className.indexOf(classe) < 1) U.setClass(el,classe);
                }else{
                    U.RemoveClass(el,classe);
                }
            }, false);
        });
    }
    

})(Huge);
Huge.Util.ready(function(){
    Huge.MenuDados.get(function(){
        Huge.MenuMobile.setElements("open-menu", "close-menu", "shadow-menu", "menu", "content", "content-all");
        Huge.Submenu.init();
        Huge.MenuMobile.init();
        Huge.Util.scrollBg();
    });
});
