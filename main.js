(function () {
    "use strict";

    $(document).ready(function() {
        /**
         * Invokes ripples on the specified element with attribute [canripple].
         */
        $("[canripple]").on("mousedown", function(event) {  
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

        /**
         * If an element with [goto] is clicked it will check for these below
         */
        $("[goto]").on("click", function (event) {
            console.log($(this).attr("goto"))
            // link
            if ($(this).attr("goto").includes("//"))
                window.open($(this).attr("goto"), "_blank")
            else if ($(this).attr("goto").includes("/") && !$(this).attr("goto").includes("//"))
                window.location.href = `/wo-r${$(this).attr("goto")}`;
            else if ($(this).attr("goto").includes("#")) {
                event.preventDefault();
                let offset = $(`${$(this).attr("goto")}`).offset().top;
                $('html, body').animate({
                    scrollTop: offset
                }, 800)
            }
        })

        // Date
        $("#copyright-date").append(new Date().getFullYear())
    });
})();