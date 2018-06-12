function GetIni( name ){        
    if( IsSet(localStorage[name]) ){
      return localStorage[name];
    }else{
      return GetDefIni(name);
    } 
}

function GetDefIni( name ){    
}
  
function IsSet(varname){
	return typeof varname != "undefined";
}


function getHoursImageData(date) {
  function create(size) {
    var canvas = document.createElement('canvas');

    var context = canvas.getContext('2d');
 	
	//idea for am, pm background changes color
	//context.fillStyle = "#000000";
	//context.fillRect(0,0,38,38);
	
	//idea for adding a or p for am pm in icon
	//var h = date.getHours();
	//var dd = "a";
    //if (h >= 12) {
    //    dd = "p";
    //}
	
	var h = (((date.getHours() + 11) % 12) + 1);

	var ho = -3;
	var mo = 0;
	if (h > 9) {
		ho = -2;
		mo = 0;
	}

	
	context.font = ' ' + (size * 0.45) + 'pt Lucida Sans Unicode';
    context.textAlign = 'center';

	color = GetIni("font_color");
	
	//idea for am, pm background change font color
	context.fillStyle=color;
	//context.fillStyle ="#ffffff";
	
    context.fillText(h + ':' ,size/2 + ho , size/3+2);
	context.fillText(getMinutesText(date),size/2 + mo,size);
    
	
	return context.getImageData(0, 0, size, size);
  }
  return {19: create(19), 38: create(38)};
}

function getMinutesText(date) {
  var minutes = String(date.getMinutes());
  if (minutes.length == 1)
    minutes = '0' + minutes;
  return minutes;
}

function quantizeMinutes(date) {
  var msSinceEpoch = date.getTime();
  var seconds = date.getSeconds();
  var floor = new Date(msSinceEpoch - seconds * 1000);
  var ceil = new Date(msSinceEpoch + (60 - seconds) * 1000);
  return {
    floor: floor,
    round: seconds < 30 ? floor : ceil,
    ceil: ceil
  };
}

function update() {
	
  var now = new Date();
  var nearestMinute = quantizeMinutes(now).round;
  chrome.browserAction.setIcon({imageData: getHoursImageData(nearestMinute)});
  //chrome.browserAction.setBadgeText({text: getMinutesText(nearestMinute)});
  chrome.browserAction.setTitle({title: String(now)});
}

chrome.runtime.onInstalled.addListener(function() {
  //chrome.browserAction.setBadgeBackgroundColor({color: '#000'});
  update();

  // Set up an alarm to fire on the soonest minute mark > 60 seconds in the
  // future (that's the finest granulatity that the alarms API supports), then
  // every minute after that.
  chrome.alarms.create({
    when: quantizeMinutes(new Date()).ceil.getTime() + (60 * 1000),
    periodInMinutes: 1
  });
});

chrome.runtime.onStartup.addListener(update);
chrome.alarms.onAlarm.addListener(update);
