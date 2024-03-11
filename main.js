$(function () {
    "use strict";


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

    if ($("#list_articles").length) {
        $.ajax({
            url: `https://api.github.com/repos/wo-r/wo-r/contents/articles?ref=website`,
            type: 'GET',
            success: function(data) {
                $("#list_articles").append(`
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    </div>
                `)

                $.each(data, function(i, item) {
                    $.ajax({
                        url: item.download_url,
                        method: "GET",
                        success: function (markdown) {
                            var markdown_details = markdown.match(/<!--\[(.*?)\]-\[(.*?)\]-\[(.*?)\]-->/);
                            let identifier = markdown_details[1].toLowerCase().replace(/ /g, "-");
                            
                            let converter = new showdown.Converter();
                            let converted_markdown = converter.makeHtml(markdown);
                            converted_markdown = converted_markdown.replace(/h1/g, `h1 class="text-5xl font-black"`); // h1
                            
                            $("#list_articles > div").append(`
                                <a class="cursor-pointer rounded no-underline" id="${identifier}">
                                    <div class="flex flex-col py-5 px-5">
                                        <small>${markdown_details[3]}</small>
                                        <h2 class="text-3xl font-black mt-2">${markdown_details[1]}</h2>
                                        <span>${markdown_details[2]}</span>
                                    </div>
                                </a>
                            `).find(`#${identifier}`).on("click", function () {
                                $("#list_articles > div:first-child").addClass("invisible").addClass("h-0")
                                $("#list_articles").append(`
                                    <div>
                                        <div class="flex flex-col gap-10">
                                            <div class="flex flex-start">
                                                <a class="cursor-pointer" id="back">Back</a>
                                            </div>
                                            <div>
                                                ${converted_markdown}
                                            </div>
                                        </div>
                                    </div>
                                `).find("a#back").on("click", function () {
                                    $("#list_articles > div:first-child").removeClass("invisible").removeClass("h-0");
                                    $("#list_articles > div:last-child").remove();
                                })
                            });
                        }
                    })
                });
            },
            error: function() {
                $("#list_articles").append(`
                    <div class="flex flex-col justify-center items-center gap-10">
                            <div class="text-9xl">:(</div>
                            <div>Could not load/find articles</div>
                    </div>
                `)
            }
        });
    }
})();