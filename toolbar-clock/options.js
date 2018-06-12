function GetIni( name ){        
    if( IsSet(localStorage[name]) ){
      return localStorage[name];
    }else{
      return GetDefIni(name);
    } 
}
  
function IsSet(varname){
    return typeof varname != "undefined";
}

function GetDefIni( name ){    
}

function save() {
  localStorage["font_color"] = document.getElementById("font_color").value;
  window.close();
  chrome.runtime.reload();
}

document.getElementById("font_color").value = GetIni("font_color");

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('OK').addEventListener('click', save);
});