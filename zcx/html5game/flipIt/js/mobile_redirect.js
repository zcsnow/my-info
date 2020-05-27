// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}

var getVars = getUrlVars();
	
	/*globals window,document, navigator, SA */
	if (!window.SA) {window.SA = {};}

	/*
	* @param config object containing three properties:
	*			- param : parameter to be passed to avoid mobile redirection
	*			- mobile_prefix : prefix appended to the hostname (such as "m" to redirect to "m.domain.com")
	*			- mobile_url : mobile url to use for the redirection (such as "whatever.com" to redirect to "whatever.com" )
	*			- mobile_scheme : url scheme (http/https) of the mobile site domain
	*			- cookie_hours : number of hours the cookie needs to exist after redirection to desktop site
	*/
	SA.redirection_mobile = function(config) {
		
		// Helper function
		var addTimeToDate = function(msec) {

			// Get the current date
			var exdate = new Date();

			// Add time to the date
			exdate.setTime(exdate.getTime() + msec);

			//Return the new Date
			return exdate;

		};
					
		// Retrieve the User Agent of the browser
		var agent = navigator.userAgent.toLowerCase(),
		
			// Constants
			TRUE = "true",
		
			// parameter to be passed to avoid mobile redirection
			param = config.param || "isStandardSite",
			
			// prefix appended to the hostname
			mobile_prefix = config.mobile_prefix || "m",
			
			// new url for the mobile site domain 
			mobile_url = config.mobile_url,
			
			// protocol for the mobile site domain 
			mobile_protocol = config.mobile_scheme ?
								config.mobile_scheme + ":" :
									document.location.protocol,
			
			// URL host of incoming request
		    host = document.location.host,
		
			// Compose the mobile hostname considering "mobile_url" or "mobile_prefix"+hostname
			mobile_host = mobile_url ||
							(mobile_prefix + "." + 
								(!!host.match(/^www\./i) ?
									host.substring(4) : 
										host)),
			
			// Expiry hours for cookie
			cookie_hours = config.cookie_hours || 1,
		
			// Check if the UA is a mobile one (iphone, ipod, ipad, android, blackberry)
			isUAMobile =!!(agent.match(/(iPhone|iPod|iPad|blackberry|android|htc|kindle|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone)/i));
		
		// Check if the referrer was a mobile page of the site
		// (in that case we need to set a variable in the sessionStorage or in the cookie)
		if (document.referrer.indexOf(mobile_host) >= 0) {
			if (window.sessionStorage) {
				window.sessionStorage.setItem(param, TRUE);
			} else {
				document.cookie = param + "=" + TRUE + ";expires="+
													addTimeToDate(3600*1000*cookie_hours).toUTCString();
			}
		}
		
		// Check if the sessionStorage contain the parameter
		var isSessionStorage = (window.sessionStorage) ? 
								(window.sessionStorage.getItem(param) === TRUE) :
									false,
			
			// Check if the Cookie has been set up
			isCookieSet = document.cookie ? 
							(document.cookie.indexOf(param) >= 0) :
								false;
								
		// Check that User Agent is mobile, cookie is not set or value in the sessionStorage not present
		if (isUAMobile && !(isCookieSet || isSessionStorage)) {
		   document.location.href = mobile_protocol + "//" + mobile_host;
		} 
	};	
	
	
	if(getVars.redirect != 0){
	
		 SA.redirection_mobile ({
			mobile_url : "actionmousegames.com/flipIt/ipad.html",
			mobile_prefix : "http"
		});
		
	}