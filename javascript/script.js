var sections = ['index','services','portfolio','about','contact'];
var selected = 'index';
var Item;
var fade = false;

window.onload = function(){
	window.onscroll = onScroll;
	window.onresize = onResize;
	onResize();
	if(window.pageYOffset > getPos('services').y)
	{
		$('#navigation').css( "background-color", "rgba(0, 0, 0, 1)" );
	}
	sections.forEach(function (element, index, array) {
		$('div[data-title="'+element+'_btn"]').click(function (){
			goto(element);
		});
	});
	$('div[data-title="item"]').each(function(index, element) {
		$( '#description' , this ).fadeOut(5);
		if($( 'img' , this).length > 1)	$( 'img[data-title="2"]' , this).fadeOut(10);
        $( this ).hover(function (){

			$( '#description', this ).stop().fadeIn(200);
			$( '#description', this ).animate({paddingTop: '1em'},400);
			$( '#client', this ).stop().animate({paddingTop: '1em'},400);
			$( 'h3', this ).stop().animate({marginTop: '-0.5em'},400);

			if($( 'img' , this).length > 1)
			{
				$( 'img[data-title="1"]', this).stop(true,true).animate({width: '120%',left: '-10%',top: '-=10%'},400);
				$( 'img[data-title="2"]', this).stop(true,true).animate({width: '120%',left: '-10%',top: '-=10%'},400);
			}
			else	$( '#image img', this).stop(true,true).animate({width: '120%',left: '-10%',top: '-=10%'},400);

		},function (){

			$( '#description', this ).stop().fadeOut(200);
			$( '#description', this ).animate({paddingTop: '1.5em'},400);
			$( '#client', this ).stop().animate({paddingTop: '1.5em'},400);
			$( 'h3', this ).stop().animate({marginTop: '0px'},400);

			if($( 'img' , this).length > 1)
			{
				$( 'img[data-title="1"]', this).stop(true,true).animate({width: '100%',left: '0%',top: '+=10%'},400);
				$( 'img[data-title="2"]', this).stop(true,true).animate({width: '100%',left: '0%',top: '+=10%'},400);
			}
			else	$( '#image img', this).stop(true,true).animate({width: '100%',left: '0%',top: '+=10%'},400);
		});
    });
	setTimeout('setImageOne();',2000);

	if(getCookie("hasClickedNotification") == "true"){
		$('#pop-up').remove();
	} else {
		$('#pop-up').css({visibility: 'visible',});
		$('#read, #close').click(function(e) {
			document.cookie = "hasClickedNotification=true";
			$('#pop-up').remove();
		});
	}
}

function setImageOne() {
  	if(fade) $('div[data-title="item"] img[data-title="2"]').fadeIn(500);
  	else $('div[data-title="item"] img[data-title="2"]').fadeOut(500);
  	fade = !fade;
  	setTimeout('setImageOne();',4000);
}

function onScroll()
{
	sections.forEach(function (element, index, array) {
		if(window.pageYOffset > getPos(element).y-85 && selected != element)
		{
			$('div[data-title="'+selected+'_btn"]').removeClass('selected');
			$('div[data-title="'+element+'_btn"]').addClass('selected');
			selected = element;
		}
	});

	if(window.pageYOffset < getPos('services').y)
	{
		var value = (window.pageYOffset/getPos('services').y*(0.93));
		$('#navigation').css( "background-color", "rgba(0, 0, 0, "+value+")" );
	}
	else
	{
		$('#navigation').css( "background-color", "rgba(0, 0, 0, 0.93)" );
	}
}

function onResize()
{
	$('div[data-title="about"] #image div').css('border-top','500px solid transparent');
	$('div[data-title="about"] #image div').css('border-top',$('div[data-title="about"]').height()+'px solid transparent');
}

function getPos(id) {
	el = $('div[data-title="'+id+'"]').get(0);
   	for (var lx=0, ly=0;
       	el != null;
       	lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
   	return {x: lx,y: ly};
}

function goto(id) {
	if(id == 'portfolio') $('html, body').animate({scrollTop: getPos(id).y-67}, 500);
	else $('html, body').animate({scrollTop: getPos(id).y-75}, 500);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
