$(document).ready(function(){

    var hour;
    var timeInterval;
    timeInterval = setInterval(function(){
       $('#day-display').text(moment().format('dddd'));
    $('#time-digits').text(moment().format('h:mm'));
    $('#time-period').text(moment().format('a'));

    hour = parseInt(moment().format('H'));
    var minutes = parseInt(moment().format('mm'));

    if (hour < 9){
        $('.time-block').removeClass("present past").addClass("future");
    }
    if (hour > 16){
        $('.time-block').removeClass("present future").addClass("past");
    }
    $( "div.time-block" ).each(function() {
        var timeblockNum = parseInt($( this ).data("value"));
        if (hour < timeblockNum){
            $( this ).removeClass("past present").addClass("future");
        }
        if (hour == timeblockNum){
            $( this ).removeClass("past future").addClass("present");
        }
        if (hour > timeblockNum){
            $( this ).removeClass("present future").addClass("past");
        }
        
    });

    if (hour > 17 || hour < 9){
        $('#current-time').css("display", "none");
    } else {
        $('#current-time').css("display", "grid");
    }
    var position = ((hour * 100) - 802) + (minutes * 1.65);
    $('#current-time').css('top', position+'px');

}, 100);
var blocks = {
    block9: {
        time: "9AM - 10AM",
        title: "",
        description: ""
    },
    block10: {
        time: "10AM - 11AM",
        title: "",
        description: ""
    },
    block11: {
        time: "11AM - 12PM",
        title: "",
        description: ""
    },
    block12: {
        time: "12PM - 1PM",
        title: "",
        description: ""
    },
    block13: {
        time: "1PM - 2PM",
        title: "",
        description: ""
    },
    block14: {
        time: "2PM - 3PM",
        title: "",
        description: ""
    },
    block15: {
        time: "3PM - 4PM",
        title: "",
        description: ""
    },
    block16: {
        time: "4PM - 5PM",
        title: "",
        description: ""
    }
};



function init() {
    if(storageKey===null){
        console.log("nothing in storage");
    } else {
        blocks = JSON.parse(localStorage.getItem("storageKey"));
    }
    renderBlocks();
};


$('.time-block').on("click", function(){
    $('#text-form').css('display', 'block');
    addText(this);
});
$('#close').on("click", function(){
    $('#text-form').css('display', 'none');
});
$('#save').on("click", function(event){
    event.preventDefault();
    
    blocks["block"+blockNum].title = $('#title').val();
    blocks["block"+blockNum].description = $('#description').val();
    
    storeBlocks();
    renderBlocks();
    $('#text-form').css('display', 'none');
});
var storageKey = localStorage.getItem("storageKey");
init();

function storeBlocks() {
    localStorage.setItem("storageKey", JSON.stringify(blocks));
};
var blockNum;
function addText(timeblockdiv){
    blockNum = ( $( timeblockdiv ).attr("data-value")).toString();
    $('#form-time').text(blocks["block"+blockNum].time);
    $('#title').val(blocks["block"+blockNum].title);
    $('#description').val(blocks["block"+blockNum].description) ;       
};

function renderBlocks(){
    $( "div.time-block" ).each(function() {
        var timeblockNum = $( this ).attr("data-value");
        console.log(timeblockNum);
        console.log(this);
        $( this ).empty();
        $( this ).append($("<h4 class='title'>"+blocks["block"+timeblockNum].title+"</h4>"));
        $( this ).append($("<p class='description'>"+blocks["block"+timeblockNum].description+"</p>"));
        if (blocks["block"+timeblockNum].title!==""||blocks["block"+timeblockNum].description!==""){
            $( this ).removeClass("empty");
        }
    });
};
});