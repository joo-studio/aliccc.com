var working = false;
$('.login').on('submit', function(e) {
  e.preventDefault();
  if (working) return;
  working = true;
  var $this = $(this),
    $state = $this.find('button > .state');
  $this.addClass('loading');
  $state.html('身份验证');
  setTimeout(function() {
    $this.addClass('ok');
    $state.html('登录成功!');
    setTimeout(function() {
      $state.html('登录');
      $this.removeClass('ok loading');
      working = false;
    }, 4000);
  }, 3000);
});