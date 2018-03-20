//TRY TYPING IN ONE OF THESE NUMBERS:
//
// 1234567890
// 0651985833
//


$('.number-dig').click(function(){
    //add animation
    addAnimationToButton(this);
    //add number
    var currentValue = $('.phoneString input').val();
    var valueToAppend = $(this).attr('name');
    $('.phoneString input').val(currentValue + valueToAppend);
});

var mob = "9876543210";

var timeoutTimer = true;
var timeCounter = 0;
var timeCounterCounting = true;

var state = 0;
var group = 0;
var pincode = '';
var speech = window.speechSynthesis;
console.log(speech.getVoices());

var strings= [
    "Press 1 to req",
    "Press 2 to update",
    "Settings saved"
];

$('.action-dig').click(function(){
    //add animation
    addAnimationToButton(this);
    var currentValue = $('.phoneString input').val();
    if($(this).hasClass('goBack')){
        // var currentValue = $('.phoneString input').val();
        var newValue = currentValue.substring(0, currentValue.length - 1);
        $('.phoneString input').val(newValue);
    }else if($(this).hasClass('call')){
        if($('.call-pad').hasClass('in-call')){
            setTimeout(function(){
                setToInCall();
            }, 500);
            
            timeCounterCounting = false;
            timeCounter = 0;
            hangUpCall();
            $('.pulsate').toggleClass('active-call');

            $('.phoneString input').val('');
        }else{
            $('.ca-name').html('e-Mitra')
            $('.ca-number').html(currentValue);
            $('.ca-status').text('Calling');
            setTimeout(function(){
                setToInCall();
                timeoutTimer = true;
                looper();
                setTimeout(function(){
                    timeoutTimer = false;
                    timeCounterCounting = true;
                    timeCounterLoop();

                    state = 1;
                    voice(strings[1]);

                    $('.pulsate').toggleClass('active-call');
                    $('.ca-status').animate({
                        opacity: 0,
                    }, 1000, function() {
                        $(this).text('00:00');
                        $('.ca-status').attr('data-dots', '');

                        $('.ca-status').animate({
                            opacity: 1,
                        }, 1000);
                    });
                },3000);
            },500);
        }
    }else{

    }
});

var timeCounterLoop = function(){

    if(timeCounterCounting){
        setTimeout(function(){
            var timeStringSeconds = '';
            var minutes = Math.floor(timeCounter/60.0);
            var seconds = timeCounter%60;
            if(minutes < 10){
                minutes = '0' + minutes;
            }
            if(seconds < 10){
                seconds = '0' + seconds;
            }
            $('.ca-status').text(minutes + ':' + seconds);

            timeCounter += 1;

            timeCounterLoop();
        }, 2000);
    }
};

var setToInCall = function(){
    $('.call-pad').toggleClass('in-call');
    $('.call-icon').toggleClass('in-call');
    $('.call-change').toggleClass('in-call');
    $('.ca-avatar').toggleClass('in-call');
};
var resetCall = function () {
    $('.dial-pad')[0].style.backgroundColor = 'black';
    $('.phoneString')[0].style.backgroundColor = "#2D2D2D";
    $('#callbtn')[0].style.backgroundColor = '#3DE066';
    $('.call-icon').css('transform','rotate(-135deg)');

}
var dots = 0;
var looper = function(){
    if(timeoutTimer){

        setTimeout(function(){
            if(dots > 3){
                dots = 0;
            }
            var dotsString = '';
            for(var i = 0; i < dots; i++){
                dotsString += '.';
            }
            $('.ca-status').attr('data-dots',dotsString);
            dots += 1;

            looper();
        }, 500);
    }
};

var hangUpCall = function(){
    timeoutTimer = false;
};

var addAnimationToButton = function(thisButton){
    //add animation
    $(thisButton).removeClass('clicked');
    var _this = thisButton;
    setTimeout(function(){
        $(_this).addClass('clicked');
    },1);
};


var voice = function (mess){
    speech.cancel();
    var msg ;
    setTimeout(function(){
        msg = new SpeechSynthesisUtterance();
        msg.text = mess;
        msg.lang = 'en-US';
        msg.rate = 0.7;
        msg.volume = 1;
        speech.speak(msg)
    },1000);
    // speech.speak(msg);
    return msg;
};

$('.ca-b-single').click(
    function(){
        console.log($(this))
    });


$('.callpad-dig').click(function(){
    //add animation
    addAnimationToButton(this);
    //add number
    var selected = $(this).attr('name');
    
    var currentValue = $('.ca-input input').val();
    var valueToAppend = selected;
    $('.ca-input input').val(currentValue + valueToAppend);
    audiocontrol(selected);
});

var audiocontrol = function(number) {
    
    switch(state) {
        case 1:

        console.log(number,"State = ",state);
            switch(number){
                case 1:state = 2;voice(strings[1]);break;
                case 2:state = 6;voice(strings[1]);break;
            }break;
        case 2:
            if(number>0 && number<9) {
                state = 3;
                voice(strings[1]);
            }else
                voice(strings[1]);
            break;
        case 3:
            if(pincode.length<6)
                pincode= pincode + str(number);
            if(pincode.length == 6) {
                state = 4;
                var temp = voice(strings[1]);
                temp.onend = endCall;
                break;
            }
            break;
        case 6:
            state = 7;
            update_status(mob,number);
            var temp = voice(strings[1]);
            temp.onend = endCall;
            break;
        
    }
}

var endCall = function() {
    timeCounterCounting = false;
    timeCounter = 0;
    hangUpCall();
    $('.pulsate').toggleClass('active-call');

    $('.phoneString input').val('');
}