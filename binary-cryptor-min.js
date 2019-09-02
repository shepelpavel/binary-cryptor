function missZero(r){for(var t=r.charCodeAt().toString(2),n=16-t.length;0<n;)t="0"+t,n--;return t}function toBinStr(r){for(var t="",n=0;n<r.length;n++)t+=missZero(r[n]);return t}function toBinArr(r){for(var t=[],n=0;n<r.length;n++)t[n]=missZero(r[n]);return t}function binToStr(r){var t=(r=(r=r.replace(/\s+/g,"")).match(/.{1,16}/g).join(" ")).split(" "),n=[];for(i=0;i<t.length;i++)n.push(String.fromCharCode(parseInt(t[i],2)));return n.join("")}function randomBinStr(){return Math.round(Math.random()*Math.pow(10,16)).toString(2)}function inShiftVal(r,t){var n=toBinStr(r).replace(/0/gi,"").length;t.length<n?n%t.length!=0?n%=t.length:16<=(n=toBinStr(r.charAt(0)).replace(/0/gi,"").length)&&(n=13):t.length==n&&16<=(n=toBinStr(r.charAt(0)).replace(/0/gi,"").length)&&(n=13);var e=t.substr(0,t.length-n);return t.substr(-n)+e}function outShiftVal(r,t){var n=toBinStr(r).replace(/0/gi,"").length;t.length<n?n%t.length!=0?n%=t.length:16<=(n=toBinStr(r.charAt(0)).replace(/0/gi,"").length)&&(n=13):t.length==n&&16<=(n=toBinStr(r.charAt(0)).replace(/0/gi,"").length)&&(n=13);var e=t.substr(0,n);return t.substr(n,t.length)+e}function injectTrash(r,t){for(var n=toBinArr(r),h=t,e=n[0].replace(/0/gi,"").length,l="";h.length>e;)$(n).each(function(r,t){var n=h.length,e=t.replace(/0/gi,"").length;if(!(e<n))return!1;var i=h.substr(0,e),a=h.substring(e,n),o=randomBinStr().substr(0,e);l+=i+o,h=a});return l+=h}function deleteTrash(r,t){for(var n=toBinArr(r),o=t,e=n[0].replace(/0/gi,"").length,h="";o.length>e;)$(n).each(function(r,t){var n=o.length,e=t.replace(/0/gi,"").length;if(!(2*e<n))return!1;var i=o.substr(0,2*e),a=o.substring(2*e,n);h+=i.substr(0,e),o=a});return h+=o}function reverseBits(r,t){for(var n=toBinArr(r),h=t,e=n[0].replace(/0/gi,"").length,l="";h.length>e;)$(n).each(function(r,t){var n=h.length,e=t.replace(/0/gi,"").length;if(!(e<n))return!1;var i=h.substr(0,e-1),a=h.substring(e,n);if("0"==h.charAt(e-1))var o="1";else o="0";l+=i+o,h=a});return l+=h}function binaryCode(r,t){for(var n=toBinStr(r).split(""),a=t,o="";0<a.length;)$(n).each(function(r,t){if(!(0<a.length))return!1;var n=a.charAt(0),e=a.substr(1,a.length);if(n==t)var i="1";else i="0";o+=i,a=e});return o}function coding(r,t){return binaryCode(r,reverseBits(r,injectTrash(r,inShiftVal(r,toBinStr(t)))))}function decoding(r,t){return binToStr(outShiftVal(r,deleteTrash(r,reverseBits(r,binaryCode(r,t)))))}