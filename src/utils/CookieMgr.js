

class CookieMgr{

  static set(name,value,days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  static get(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return undefined;
  }
  
  static erase(name) {
      //document.cookie = name+'=; Max-Age=-99999999;';
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
  }

}

// Constant key values for cookies
CookieMgr.keys = {
    LAN: 'lan',
    TOKEN_ACCESS: 'token_access',
    TOKEN_REFRESH: 'token_refresh'
}

export default CookieMgr

