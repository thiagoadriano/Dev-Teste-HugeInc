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