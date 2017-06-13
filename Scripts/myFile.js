$(document).ready(function () {
    var i = 0;
    var total = 0;

    $("#btn1, #btn2, #btn3, #btn4").click(function (e) {
        i = ($(this).text() - 1) * 3;

        if (total > i) {
            myfunc();
        }

        $("li").removeClass("active");
        $(this).parent().addClass("active");
        
        e.preventDefault();
    });
    $("#btn5").click(function (e) {
        if (!$("#btn5").hasClass("disabled")) {
            var x = $("#btn4").text();
            i = (x) * 3;

            $("#btn1").text(++x);
            $("#btn2").text(++x);
            $("#btn3").text(++x);
            $("#btn4").text(++x);

            gotoButtonHandler();

            $("#btn0").removeClass("disabled");            
            myfunc();
            $("li").removeClass("active");
            $("#btn1").parent().addClass("active");            
        }
        e.preventDefault();
    });
    $("#btn0").click(function (e) {
        if (!$("#btn0").hasClass("disabled")) {
            var x = $("#btn1").text();
            if (x > 1) {
                $("#btn4").text(--x);                
                $("#btn3").text(--x);
                i = (x) * 3;
                $("#btn2").text(--x);
                $("#btn1").text(--x);
                
                gotoButtonHandler();
                $("#btn5").removeClass("disabled");
            
                myfunc();
                $("li").removeClass("active");
                $("#btn4").parent().addClass("active");
            }
        }
        e.preventDefault();
    });


    function myfunc(para1) {

        $.ajax({
            type: 'GET',
            url: "/api/MEMoApi",
            dataType: 'json',
            success: function (response) {                
                total = response.length;

                if (total > i) {
                    $("#id1").val(response[i].Id);
                    $("#Textarea1").val(response[i++].memo1);                    
                }
                else {
                    $("#id1").val("");
                    $("#Textarea1").parent().children().hide();
                }

                if (total > i) {
                    $("#id2").val(response[i].Id);
                    $("#Textarea2").val(response[i++].memo1);
                    $("#Textarea2").parent().children().show();
                }
                else {
                    $("#id2").val("");
                    $("#Textarea2").parent().children().hide();
                }

                if (total > i) {
                    $("#id3").val(response[i].Id);
                    $("#Textarea3").val(response[i++].memo1);
                    $("#Textarea3").parent().children().show();

                }
                else {
                    $("#id3").val("");
                    $("#Textarea3").parent().children().hide();
                }

                if (para1 == 1) {
                    gotoButtonHandler();
                }
            },
            error: function (msg) { console.log(msg); alert("Error"); }

        });
    }

    function gotoButtonHandler() {
        var x = parseInt($("#btn1").text());
        if (x == 1)
        {
            $("#btn0").addClass("disabled");
        }

        $("#btn2").show();
        $("#btn3").show();
        $("#btn4").show();
        x = (x * 3)+1;

        if (x > total) {
            
            $("#btn2").hide();
            $("#btn3").hide();
            $("#btn4").hide();
            $("#btn5").addClass("disabled");
        }        
        else if ((x + 3) > total) {
            
            $("#btn3").hide();
            $("#btn4").hide();
            $("#btn5").addClass("disabled");
        }
        else if ((x + 6) > total) {
            
            $("#btn4").hide();
            $("#btn5").addClass("disabled");
        }
    }

    $('#update1, #update2, #update3').click(function (e) {
        var btn = e.target.id;        
        var Text = $("#Textarea1").val();
        var id = $("#id1").val();
        if (btn == 'update2') {
            id = $("#id2").val();
            Text = $("#Textarea2").val();
        }
        if (btn == 'update3') {
            id = $("#id3").val();
            Text = $("#Textarea3").val();
        }
        if (id != "") {
            $.ajax({
                url: "/api/MEMoapi/" + id,
                type: "Put",
                data: JSON.stringify({ memo1: Text }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var x = $(".active").children().text();
                    i = ((x) - 1) * 3;
                    myfunc();
                },
                error: function () { alert('error'); }
            });
        }
        else {
            alert("pgl hai ?");
        }
        e.preventDefault();

    });

    $('#delete1, #delete2, #delete3').click(function (e) {
        var btn = e.target.id;
        var id = $("#id1").val();
        if (btn == 'delete2') {
            id = $("#id2").val();
        }
        if (btn == 'delete3') {
            id = $("#id3").val();
        }
        if (id != "") {
            $.ajax({


                url: "/api/MEMoapi/" + id,
                type: "Delete",
                //data: JSON.stringify({ memo1: Text }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var x = $(".active").children().text();
                    i = ((x) - 1) * 3;
                    myfunc();
                },
                error: function () { alert('error'); }
            });
        }
        else {
            alert("pgl hai ?");
        }
        e.preventDefault();
    });

    myfunc(1);

});