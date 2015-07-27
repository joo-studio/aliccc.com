/* ========================================================
	FOUNDATION INCLUDED
==========================================================*/
jQuery(document).ready(function ($) {

  /* Use this js doc for all application specific JS */

  /* TABS --------------------------------- */
  /* Remove if you don't need :) */

  function activateTab($tab) {
    var $activeTab = $tab.closest('dl').find('dd.active'),
        contentLocation = $tab.children('a').attr("href") + 'Tab';

    // Strip off the current url that IE adds
    contentLocation = contentLocation.replace(/^.+#/, '#');

    //Make Tab Active
    $activeTab.removeClass('active');
    $tab.addClass('active');

    //Show Tab Content
    $(contentLocation).closest('.tabs-content').children('li').removeClass('active').hide();
    $(contentLocation).css('display', 'block').addClass('active');
  }

  $('dl.tabs dd a').on('click.fndtn', function (event) {
    activateTab($(this).parent('dd'));
  });

  if (window.location.hash) {
    activateTab($('a[href="' + window.location.hash + '"]').parent('dd'));
    $.foundation.customForms.appendCustomMarkup();
  }

  /* ALERT BOXES ------------ */
  $(".alert-box").delegate("a.close", "click", function(event) {
    event.preventDefault();
    $(this).closest(".alert-box").fadeOut(function(event){
      $(this).remove();
    });
  });

  /* PLACEHOLDER FOR FORMS ------------- */
  /* Remove this and jquery.placeholder.min.js if you don't need :) */
  $('input, textarea').placeholder();

  /* TOOLTIPS ------------ */
  $(this).tooltips();

  /* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
  //  $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
  //  $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
  //  $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
  //  $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});


  /* DROPDOWN NAV ------------- */

  var lockNavBar = false;
  /* Windows Phone, sadly, does not register touch events :( */
  if (Modernizr.touch || navigator.userAgent.match(/Windows Phone/i)) {
    $('.nav-bar a.flyout-toggle').on('click.fndtn touchstart.fndtn', function(e) {
      e.preventDefault();
      var flyout = $(this).siblings('.flyout').first();
      if (lockNavBar === false) {
        $('.nav-bar .flyout').not(flyout).slideUp(500);
        flyout.slideToggle(500, function(){
          lockNavBar = false;
        });
      }
      lockNavBar = true;
    });
    $('.nav-bar>li.has-flyout').addClass('is-touch');
  } else {
    $('.nav-bar>li.has-flyout').hover(function() {
      $(this).children('.flyout').show();
    }, function() {
      $(this).children('.flyout').hide();
    });
  }

  /* DISABLED BUTTONS ------------- */
  /* Gives elements with a class of 'disabled' a return: false; */
  $('.button.disabled').on('click.fndtn', function (event) {
    event.preventDefault();
  });
  

  /* SPLIT BUTTONS/DROPDOWNS */
  $('.button.dropdown > ul').addClass('no-hover');

  $('.button.dropdown').on('click.fndtn touchstart.fndtn', function (e) {
    e.stopPropagation();
  });
  $('.button.dropdown.split span').on('click.fndtn touchstart.fndtn', function (e) {
    e.preventDefault();
    $('.button.dropdown').not($(this).parent()).children('ul').removeClass('show-dropdown');
    $(this).siblings('ul').toggleClass('show-dropdown');
  });
  $('.button.dropdown').not('.split').on('click.fndtn touchstart.fndtn', function (e) {
    $('.button.dropdown').not(this).children('ul').removeClass('show-dropdown');
    $(this).children('ul').toggleClass('show-dropdown');
  });
  $('body, html').on('click.fndtn touchstart.fndtn', function () {
    $('.button.dropdown ul').removeClass('show-dropdown');
  });

  // Positioning the Flyout List
  var normalButtonHeight  = $('.button.dropdown:not(.large):not(.small):not(.tiny)').outerHeight() - 1,
      largeButtonHeight   = $('.button.large.dropdown').outerHeight() - 1,
      smallButtonHeight   = $('.button.small.dropdown').outerHeight() - 1,
      tinyButtonHeight    = $('.button.tiny.dropdown').outerHeight() - 1;

  $('.button.dropdown:not(.large):not(.small):not(.tiny) > ul').css('top', normalButtonHeight);
  $('.button.dropdown.large > ul').css('top', largeButtonHeight);
  $('.button.dropdown.small > ul').css('top', smallButtonHeight);
  $('.button.dropdown.tiny > ul').css('top', tinyButtonHeight);
  
  $('.button.dropdown.up:not(.large):not(.small):not(.tiny) > ul').css('top', 'auto').css('bottom', normalButtonHeight - 2);
  $('.button.dropdown.up.large > ul').css('top', 'auto').css('bottom', largeButtonHeight - 2);
  $('.button.dropdown.up.small > ul').css('top', 'auto').css('bottom', smallButtonHeight - 2);
  $('.button.dropdown.up.tiny > ul').css('top', 'auto').css('bottom', tinyButtonHeight - 2);

  /* CUSTOM FORMS */
  $.foundation.customForms.appendCustomMarkup();

});








/* ========================================================
	NAV DROPDOWN ON SMALL SCREENS css-tricks.com
==========================================================*/

// Create the dropdown base
$("<select ONCHANGE='location = this.options[this.selectedIndex].value;' />").appendTo(".left");

// Create default option "Go to..."
$("<option />", {
   "selected": "selected",
   "value"   : "",
   "text"    : "选择区域"
}).appendTo(".left select");

// Populate dropdown with menu items
$(".left a").each(function() {
 var el = $(this);
 $("<option />", {
     "value"   : el.attr("href"),
     "text"    : el.text()
 }).appendTo(".left select");
});

$(".nav select").change(function() {
  window.location = $(this).find("option:selected").val();
});











/* ========================================================
	SCROLL-SPY 
==========================================================*/

/* =============================================================
 * bootstrap-scrollspy.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */

$(document).ready(function(){
!function ($) {

  "use strict"; // jshint ;_;


  /* SCROLLSPY CLASS DEFINITION
   * ========================== */

  function ScrollSpy( element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && href.length
              && [[ $href.position().top, href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu'))  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 50
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      var $spy = $(this).scrollspy('refresh')
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);



/*execute*/
$('#navbar').scrollspy()

});



/*$('[data-spy="scroll"]').each(function () {
  var $spy = $(this).scrollspy('refresh')
});*/






/* ========================================================
	SMOOTH SCROLL css-tricks.com
==========================================================*/

$(function(){

    $('a[href*=#]').click(function() {
    
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        && location.hostname == this.hostname) {
        
            var $target = $(this.hash);
            
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
            
            if ($target.length) {
            
                var targetOffset = $target.offset().top - -130;
                
                $('html,body').animate({scrollTop: targetOffset}, 800);
                    
                return false;
                
            }
            
        }
        
    });
    
});










/* ========================================================
	TOGGLE 
==========================================================*/

$(document).ready(function(){
 $('.togglebox').hide();
 $('h3').click(function(){
  $(this).toggleClass("active"); //return false;
  var t = $(this);
  // toggle hidden div
  t.next().next().toggle('fast', function(){
   // determine which image to use if hidden div is hidden after the toggling is done
   //var imgsrc = ($(this).is(':hidden')) ? 'images/checkmark1.jpg' : 'images/checkmark2.jpg';
   // update image src
   //t.attr('src', imgsrc );
  });
 })
})











/* ========================================================
	WUFOO 
==========================================================*/

addEvent(window, 'load', initForm);

var highlight_array = new Array();

function initForm(){
	initializeFocus();
	var activeForm = document.getElementsByTagName('form')[0];
	addEvent(activeForm, 'submit', disableSubmitButton);
	ifInstructs();
	showRangeCounters();
}

function disableSubmitButton() {
	document.getElementById('saveForm').disabled = true;
}

// for radio and checkboxes, they have to be cleared manually, so they are added to the
// global array highlight_array so we dont have to loop through the dom every time.
function initializeFocus(){
	var fields = getElementsByClassName(document, "*", "field");
	
	for(i = 0; i < fields.length; i++) {
		if(fields[i].type == 'radio' || fields[i].type == 'checkbox') {
			fields[i].onclick = function() {highlight(this, 4);};
			fields[i].onfocus = function() {highlight(this, 4);};
		}
		else if(fields[i].className.match('addr') || fields[i].className.match('other')) {
			fields[i].onfocus = function(){highlight(this, 3);};
		}
		else {
			fields[i].onfocus = function(){highlight(this, 2); };
		}
	}
}

function highlight(el, depth){
	if(depth == 2){var fieldContainer = el.parentNode.parentNode;}
	if(depth == 3){var fieldContainer = el.parentNode.parentNode.parentNode;}
	if(depth == 4){var fieldContainer = el.parentNode.parentNode.parentNode.parentNode;}
	
	addClassName(fieldContainer, 'focused', true);
	var focusedFields = getElementsByClassName(document, "*", "focused");
	
	for(i = 0; i < focusedFields.length; i++) {
		if(focusedFields[i] != fieldContainer){
			removeClassName(focusedFields[i], 'focused');
		}
	}
}

function ifInstructs(){
	var container = document.getElementById('public');
	if(container){
		removeClassName(container,'noI');
		var instructs = getElementsByClassName(document,"*","instruct");
		if(instructs == ''){
			addClassName(container,'noI',true);
		}
		if(container.offsetWidth <= 450){
			addClassName(container,'altInstruct',true);
		}
	}
}

function showRangeCounters(){
	counters = getElementsByClassName(document, "em", "currently");
	for(i = 0; i < counters.length; i++) {
		counters[i].style.display = 'inline';
	}
}

function validateRange(ColumnId, RangeType) {
	if(document.getElementById('rangeUsedMsg'+ColumnId)) {
		var field = document.getElementById('Field'+ColumnId);
		var msg = document.getElementById('rangeUsedMsg'+ColumnId);

		switch(RangeType) {
			case 'character':
				msg.innerHTML = field.value.length;
				break;
				
			case 'word':
				var val = field.value;
				val = val.replace(/\n/g, " ");
				var words = val.split(" ");
				var used = 0;
				for(i =0; i < words.length; i++) {
					if(words[i].replace(/\s+$/,"") != "") used++;
				}
				msg.innerHTML = used;
				break;
				
			case 'digit':
				msg.innerHTML = field.value.length;
				break;
		}
	}
}

/*--------------------------------------------------------------------------*/

//http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];		
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}	
	}
	return (arrReturnElements)
}

//http://www.bigbold.com/snippets/posts/show/2630
function addClassName(objElement, strClass, blnMayAlreadyExist){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      if ( blnMayAlreadyExist ){
         var strClassUpper = strClass.toUpperCase();
         for ( var i = 0; i < arrList.length; i++ ){
            if ( arrList[i].toUpperCase() == strClassUpper ){
               arrList.splice(i, 1);
               i--;
             }
           }
      }
      arrList[arrList.length] = strClass;
      objElement.className = arrList.join(' ');
   }
   else{  
      objElement.className = strClass;
      }
}

//http://www.bigbold.com/snippets/posts/show/2630
function removeClassName(objElement, strClass){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      var strClassUpper = strClass.toUpperCase();
      for ( var i = 0; i < arrList.length; i++ ){
         if ( arrList[i].toUpperCase() == strClassUpper ){
            arrList.splice(i, 1);
            i--;
         }
      }
      objElement.className = arrList.join(' ');
   }
}

//http://ejohn.org/projects/flexible-javascript-events/
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj["e"+type+fn] = fn;
    obj[type+fn] = function() { obj["e"+type+fn]( window.event ) };
    obj.attachEvent( "on"+type, obj[type+fn] );
  } 
  else{
    obj.addEventListener( type, fn, false );	
  }
}











/* ========================================================
	ORIENTATION FIX 
==========================================================*/
/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT / GPLv2 License.
*/
(function(w){
	
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent;
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}

    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
		// If portrait orientation and in one of the danger zones
        if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );




/* ========================================================
	STICKY AD
==========================================================*/

/* Appears after scrolling past header */
$(window).bind('scroll', function(){
    if($(this).scrollTop() > 1000) {
        $("#ad").fadeIn('slow');
    }
});
$(document).ready(function(){        
    $("#ad").hide();
});



/* Slide toggle for the actual endorsement */
$(document).ready(function(){
    $(".endorsement").hide();
	$(".ad_toggle").click(function(){
		$(".endorsement").slideToggle(500);
		$(this).toggleClass("active"); return false;
	});
});


/* Close button */
$(function() {
    $('a.close').click(function() {
        $("#ad").css('bottom',"-9999px");
        $(this).toggleClass("active"); return false;
    });
});

