backTop=function (btnId){
    var btn=document.getElementById(btnId);
    var d=document.documentElement;
    var b=document.body;
    window.onscroll=set;
    btn.onclick=function (){
        btn.style.display="none";
        window.onscroll=null;
        this.timer=setInterval(function(){
            d.scrollTop-=Math.ceil((d.scrollTop+b.scrollTop)*0.1);
            b.scrollTop-=Math.ceil((d.scrollTop+b.scrollTop)*0.1);
            if((d.scrollTop+b.scrollTop)==0) clearInterval(btn.timer,window.onscroll=set);
        },10);
    };
    function set(){btn.style.display=(d.scrollTop+b.scrollTop>100)?'block':"none"}
};
backTop('gotop');

// Tip: avoid this ton of code using AniJS ;)

var element = $('.wobble');

// when mouseover execute the animation
element.mouseover(function(){
  
  // the animation starts
  element.toggleClass('wobble animated');
  
  // do something when animation ends
  element.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
   
   // trick to execute the animation again
    $(e.target).removeClass('wobble animated');
  
  });
  
});
