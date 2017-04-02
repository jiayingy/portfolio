$(document).ready(function() {
  
  $(".projects-showcase ul li button").click(function() {
  $(".projects-showcase ul li button").removeClass("active");
  $(this).addClass("active");
  });
});