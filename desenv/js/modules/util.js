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