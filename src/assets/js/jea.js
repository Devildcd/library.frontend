String.prototype.preg_quote=function(){
  p= /([:.\+*?[^\]$(){}=!<>|:)])/g;
  return this.replace(p,"\\$1");
}
function buscar(cadena){
     resetear();
  if(!cadena.length)return;
  var info3;
  cadena=cadena.preg_quote();
  var patron=new RegExp(cadena+'(?!\}\})','gim');
  var espacio=/^\s$/;
  var el=document.getElementById('tabla').getElementsByTagName('*');
 for(var ii=0;ii<el.length;ii++){
      if(el[ii].hasChildNodes && el[ii].nodeName.toLowerCase()!='title' && el[ii].nodeName.toLowerCase()!='script' && el[ii].nodeName.toLowerCase()!='meta' && el[ii].nodeName.toLowerCase()!='link' && el[ii].nodeName.toLowerCase()!='style'){
          var tt=el[ii].childNodes;
          for(var jj in tt){
              if(tt[jj].nodeType==3 && !espacio.test(tt[jj].nodeValue)){
                  patron.lastIndex = 0;
                  if(info3=patron.exec(tt[jj].nodeValue)){
                      tt[jj].nodeValue=tt[jj].nodeValue.replace(patron,'{{'+tt[jj].nodeValue.substr(info3['index'],cadena.length)+'}}');
              
                  }
              }

          }        
      }
  }
 document.getElementById('tabla').innerHTML=document.getElementById('tabla').innerHTML.split('}}').join('</span>').split('{{').join('<span style="background-color: yellow">');
  
}
function resetear(){
  document.getElementById('tabla').innerHTML=original;
}
window.onload=function(){
  original=document.getElementById('tabla').innerHTML;
}