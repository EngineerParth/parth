$(function () {
    //Navigation
    $('.navigation-div li a').click(function () {
        if ($(document).width() <= 360) {
            $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 'medium');
        }
        else {
            $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 180 }, 'medium');
        }
        return false;
    });
    //To validate and process the input data of user
    $('#btnSubmit').click(function () {
        var txtName = $("#txtName").val();
        var txtEmail = $("#txtEmail").val();
        var txtMsg = $("#txtMsg").val();
        var ret = 0;

        //Validation
        if (!(validate(txtEmail))) { $("#txtEmail").addClass("red-border"); ret = 1; }
        if (txtMsg == "") { $("#txtMsg").addClass("red-border"); ret = 1; }

        if (ret == 1) return;
        else{
            //Use ajax to send data to another page and display return message on this page
            $.post("DataProcessor.aspx", { paramEmail: txtEmail, paramMsg: txtMsg }, function (data, status) {
                if (status="success"){
                    $("#statusMsg").text(data);
                }
            });
            $("#statusMsg").removeClass("hidden-div");
            $("#txtEmail").removeClass("red-border");
            $("#txtMsg").removeClass("red-border");
            $("#txtEmail").val("");
            $("#txtName").val("");
            $("#txtMsg").val("");
            setTimeout(function () {$("#statusMsg").addClass("hidden-div") },5000);
        }
    });
    //Scroll event handler for header animation & div title displays
    $(window).scroll(function () {
        console.log("In scroll event handler:" + $(document).scrollTop() + " Width : " + $(document).width());
        
        if ($(document).width() > 590) {
           
            if ($(document).scrollTop() >= 600) {
                $("#header").addClass("fixed-div");
                $(".title").removeClass("title-big");
                //$(".title").removeClass("center-align");
                $("#main-content").addClass("pad-top");
                $(".backkground-image-container").addClass("fixed-div");
                console.log("adding fixed-div classes to header elements");
            }
            else if ($(document).scrollTop() < 600) {
                $("#header").removeClass("fixed-div");
                $(".title").addClass("title-big");
                //$(".title").addClass("center-align");
                $("#main-content").removeClass("pad-top");
                $(".backkground-image-container").removeClass("fixed-div");
                //var backImage = $(".backkground-image-container").find("img");
                //backImage.attr("src", "../images/Background/ParthMobile.jpg");
            }

            if ($(document).scrollTop() >= reachScrollParam) {
                console.log("Showing reachMeDivLabel");
                //$("#reachMeDivLabel").children().animate({opacity: '1'},300);
                $("#reachMeDivLabel").removeClass("opacity0");
                console.log("Showing reachMeDivLabel over");
            }
            else {
                console.log("hiding reachMeDivLabel");
                //$("#reachMeDivLabel").children().animate({ opacity: '0' }, 300);
                $("#reachMeDivLabel").addClass("opacity0");
                console.log("Hiding reachMeDivLabel over");
            }

            if ($(document).scrollTop() >= hobbiesScrollParam) {
                console.log("Showing hobbiesDivLabel");
                $("#hobbiesDivLabel").removeClass("opacity0");
            }
            else {
                console.log("hiding hobbiesDivLabel");
                $("#hobbiesDivLabel").addClass("opacity0");
            }

            if ($(document).scrollTop() >= eduScrollParam) {
                console.log("showing eduDivLabel");
                $("#eduDivLabel").removeClass("opacity0");
            }
            else {
                console.log("hiding eduDivLabel");
                $("#eduDivLabel").addClass("opacity0");
            }
            
             if ($(document).scrollTop() >= expScrollParam) {
                console.log("showing expDivLabel");
                $("#expDivLabel").removeClass("opacity0");
            }
            else {
                console.log("hiding expDivLabel");
                $("#expDivLabel").addClass("opacity0");
            }
        }
        else {
            $("#backkground-image-container").removeClass("backkground-image-container");
            $("#backkground-image-container").addClass("fixed-bg");
        }
    });
    //Email validation
    function validate(email)
    {
        if (email == "") return false;
        var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var regex = new RegExp(pattern);
        return (regex.test(email));

    }
     
     var expScrollParam=1280,eduScrollParam=1880, hobbiesScrollParam=2200, reachScrollParam=2500;
    
});
