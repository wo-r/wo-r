(function () {
    /** This gets the current date and adds it to #copyright **/
    {
        $("#copyright").append(new Date().getFullYear())
    }

    /** Looks for any instance of [canripple] and animates it with
     * amazing ripple effects. **/
    {
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
    }

    /** Check for any instance of [goto] attributes and on the fly
     * determine the functionality of that [goto] when they click it **/
    {
        $("[goto]").addClass("cursor-pointer");
        $("[goto]").on("click", function (event) {
            if ($(this).attr("goto").includes("//"))
                window.open($(this).attr("goto"), "_blank")
            else if ($(this).attr("goto").includes("/") && !$(this).attr("goto").includes("//"))
                window.location.href = window.location.href.includes("localhost") ? `${$(this).attr("goto")}` : `/wo-r${$(this).attr("goto")}`;
            else if ($(this).attr("goto").includes("#")) {
                event.preventDefault();
                let offset = $(`${$(this).attr("goto")}`).offset().top;
                $('html, body').animate({
                    scrollTop: offset
                }, 800)
            }
        })
    }
})();