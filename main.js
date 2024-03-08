(function () {
    "use strict";

    $(document).ready(function() {
        $("[canripple]").on("click", function(event) {  
            const item = $(this);
          
            const circle = $("<span></span>");
            const diameter = Math.max(item.width(), item.height());
            const radius = diameter / 2;
          
            circle.css({
                width: diameter,
                height: diameter,
                left: event.clientX - item.offset().left - radius,
                top: event.clientY - item.offset().top - radius
            });
          
            circle.addClass("ripple");
          
            const ripple = item.find(".ripple");
          
            if (ripple.length > 0) {
                ripple.remove();
            }
          
            item.append(circle);
        });
    });
      




})();