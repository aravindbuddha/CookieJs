/*
name:cookie.js
desc:Dealing with javascript cookies.
*/
var cookie = (function () {
  //public
  return {
    set: function (cookieName, strValue, lngDays) {
      try {
        var d = new Date();
        if (lngDays) {
          d.setTime(d.getTime() + (lngDays * 24 * 60 * 60 * 1000));
          var strExpires = "; expires=" + d.toGMTString();
        } else {
          var strExpires = "";
        }
        document.cookie = cookieName + "=" + strValue + strExpires + "; path=/";

        return true;
      } catch (e) {
        //console.log(e.stack);
        return false;
      }
    },
    setByKey: function (cookieName, keyName, value, lngDays) {
      var self = this;
      try {
        var thisCookies = unescape(self.get(cookieName));
        if (thisCookies) {
          thisCookies = thisCookies.split("&");
          thisCookies.forEach(function (cookie, index, array) {
            cookie = cookie.split("=");
            if (cookie[0] == keyName) {
              return;
            }
          });
          var newcookie = self.get(cookieName) + "&" + keyName + "=" + value + "";
          self.set(cookieName, newcookie, lngDays);
        } else {
          self.set(cookieName, "" + keyName + "=" + value + "", 360);
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    get: function (cookieName) {
      try {
        var cookieNameEqual = cookieName + "=";
        var arrCookies = document.cookie.split(';');

        for (var i = 0; i < arrCookies.length; i++) {
          var strValueCookie = arrCookies[i];
          while (strValueCookie.charAt(0) == ' ') {
            strValueCookie = strValueCookie.substring(1, strValueCookie.length);
          }
          if (strValueCookie.indexOf(cookieNameEqual) == 0) {
            return unescape(strValueCookie.substring(cookieNameEqual.length, strValueCookie.length).replace(/\+/gi, " "));
          }
        }
        return false;
      } catch (e) {
        return false;
      }
    },
    getByKey: function (cookiename, cookiekey) {
      var self = this;
      try {
        var cookievalue = self.get(cookiename);
        if (cookievalue == "")
          return false;
        try {
          cookievaluesep = cookievalue.split("&");
        } catch (e) {
          return false;
        }

        for (c = 0; c < cookievaluesep.length; c++) {
          cookienamevalue = cookievaluesep[c].split("=");
          if (cookienamevalue.length > 1) //it has multi valued cookie
          {
            if (cookienamevalue[0] == cookiekey)
              return unescape(cookienamevalue[1].toString().replace(/\+/gi, " "));
          } else
            return false;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
  }
});
