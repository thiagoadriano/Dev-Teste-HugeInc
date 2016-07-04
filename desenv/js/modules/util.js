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
    

})(Huge);