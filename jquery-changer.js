function checkURL(){
    
    var array =document.URL.split(/[?//]+/); //match /'s and ?'s
        var page = array[array.length-1];
        if(page==="index.html" || page==="") {
            $.get("home.txt", function(data) {
                $("#content-area").html(data);
            });
            $('#home').parent().addClass('active');
        } else {
            $.get(page+".txt", function(data) {
                $("#content-area").html(data);

                checkSubTabs(page);
            
                $('.nav-tabs li').click(function(e) {
                    console.log(e.target.id);
                    $.get(e.target.id+".txt", function(data) {
                        $("#tabcontent-area").html(data);
                    });
                });
                changeActive();
                addActiveTabs();
                noteTrigger();

                renderMathInElement(document.body)
            });
        }
        $('#' + page).parent().addClass('active');
}

function checkSubTabs(page) {
    var tabOptions  = ["programming", "notes"]
    var tabDefaults = ["bash", "cnotes"];

    if(page==tabOptions[0]) {
        $.get(tabDefaults[0]+".txt", function(data) {
        $("#tabcontent-area").html(data);
        $("#bash").parent().addClass('active');
        });
    } else if(page==tabOptions[1]) {
        $.get(tabDefaults[1]+".txt", function(data) {
        $("#tabcontent-area").html(data);
        $("#cnotes").parent().addClass('active');
        });
    }
}

function changeActive() {
//Change active state. Needs to be done to parent li of a
    $('.navbar ul li a').click(function(e) {
      $('.navbar ul li a').parent().removeClass('active');
      var $this = $(this).parent();
        if (!$this.hasClass('active')) {
                    $this.addClass('active');
                      }
          e.preventDefault();
    });
}

function noteTrigger() {
    $('#notetrigger').click( function(e) {
        $('#notes').trigger("click");
    });
}

function addActiveTabs() {
    $('.nav-tabs li a').click(function(e) {
      $('.nav-tabs li a').parent().removeClass('active');
      var $this = $(this).parent();
        if (!$this.hasClass('active')) {
                    $this.addClass('active');
                      }
          e.preventDefault();
    });

}

//function renderAbstract() {
//  $('.collapse.abstract').on('shown.bs.collapse', function(e) {
//      renderMathInElement(e.target);
//  });
//}

$(document).ready(function() {
    //Determine which of the navbar links has been hit. Push it onto the history stack,
    //load the page
    $("nav").click(function(e) {
        var stateObj = {myURL: e.target.id+".txt"};
        history.pushState(stateObj, '',"index.html?"+ e.target.id);
        $.get(e.target.id+".txt", function(data) {
            //Load into the content area
            $("#content-area").html(data);

            checkSubTabs(e.target.id);
            
            //Add event listeners if there are tabs
            $('.nav-tabs li').click(function(e) {
                $.get(e.target.id+".txt", function(data) {
                    $("#tabcontent-area").html(data);
                    //addActiveTabs();
                    //changeActive();
                });
            });
            addActiveTabs();
            changeActive();
            renderMathInElement(document.body);
//          renderAbstract();

            //Add listener to noteTrigger if it exists
            noteTrigger();

        });
    });
    changeActive();
    noteTrigger();

    $(window).on("popstate", function(e) {
        var state = e.originalEvent.state;
        if(state === null) {
//          alert("State is null");
            $.get("home.txt", function(data) {
                $("#content-area").html(data);
            }); 
        } else {
//          alert(state.myURL);
            $.get(state.myURL, function(data) {
                $("#content-area").html(data);
            });
        }
    });
});

$(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') ) {
                    $(this).collapse('hide');
                        }
});

