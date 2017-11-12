var command_key = [
    {
        key : 'search',
        desc : 'help you to search ehat you want'
    },
    {
        key : 'checkout',
        desc : 'checkout what is inside your bracket now'
    },
    {
        key : 'bracket',
        desc : 'show what is inside your bracket now'
    },
    {
        key : 'pay',
        desc : 'pay what you have bought'
    },
    {
        key : 'help',
        desc : 'display available command'
    },
    {
        key : 'exit',
        desc : 'exit chat room'
    }
];

var payment_method = [
    {
        title : 'Visa',
        img : 'assets/img/pay1.jpg'
    }, 
    {
        title : 'PayPal',
        img : 'assets/img/pay2.jpg'
    },
    {
        title : 'MasterCard',
        img : 'assets/img/pay3.jpg'
    },
    {
        title : 'Bank Transfer',
        img : 'assets/img/pay4.jpg'
    }
];
var sport_1 = {
        id : 'sport-1',
        title : 'Soccer Shoes',
        price : 'Rp700.000,00',
        desc : 'Great soccer shoes, can be used in any environment',
        img : 'assets/img/image1.jpg',
        available : 'yes'
    }; 
var sport_2 = {
        id : 'sport-2',
        title : 'Football Jersey',
        price : 'Rp500.000,00',
        desc : 'Great football jersey, comfortable to wear',
        img : 'assets/img/image3.jpg',
        available : 'yes'
    };
var sport_3 = {
        id : 'sport-3',
        title : 'Ball',
        price : 'Rp300.000,00',
        desc : 'Great soccer ball, can be used in any environment',
        img : 'assets/img/image2.jpg',
        available : 'no'
    };
var sport = [sport_1,sport_2,sport_3];

var all = [sport_1, sport_2, sport_3];

var bracket = [];

var payment_id = []

var getMessageText, message_side, sendMessage, evaluateMessage;

var buy = function(thing, avail){
    if(avail == 'yes'){
        sendMessage('\\buy ' + thing, 'right');
    } else {
        sendMessage('Sorry, it\'s not available right now. Please check it another time :)', 'left');
    }
};

var pay = function(target){
    var found = false;
    for(var i = 0; i < payment_method.length; i++){
        if (payment_method[i].title == target){
            found = true;
            break;
        }
    }
    if(found){
        var id = Math.random().toString(36).substring(7);
        payment_id.push(id);
        sendMessage('This is your payment ID ' + id + '<br>We are waiting for your payment. See you :)', 'left');
    } else {
        sendMessage('Sorry we can\'t process that payment method', 'left');
    }
};

(function () {
    var createCarouselElmt = function(arg){
        var div = document.createElement('div');
        if (arg.id != null){
            div.setAttribute('id', (arg.id != null) ? arg.id : '');
            div.setAttribute('onclick', 'buy("' + arg.id + '", "'+ arg.available+'")');
        } else {
            div.setAttribute('onclick', 'pay("' + arg.title + '")');
        }

        var div_image = document.createElement('div');
        var img = document.createElement('img');
        div_image.setAttribute('style', 'float : left;');
        img.setAttribute('src', arg.img); 
        img.setAttribute('class', 'image_carousel');
        div_image.appendChild(img);
        div.appendChild(div_image);
        
        if (arg.available){   
            var div_avail = document.createElement('div');
            if(arg.available == 'yes'){
                div_avail.innerHTML = '<i class="material-icons">check_circle</i> Available';
                div_avail.setAttribute('style', 'color:green; float:right;');
            } else {
                div_avail.innerHTML = '<i class="material-icons">not_interested</i> Not Available';
                div_avail.setAttribute('style', 'color:red; float:right');
            }
            div.appendChild(div_avail);
        }
        
        var div_title = document.createElement('div');
        div_title.innerHTML = arg.title;
        div_title.setAttribute('style', 'display:block; padding: 0px 5px; font-size : 18pt;')
        div.setAttribute('class', 'image_container');
        div.appendChild(div_title);


        if (arg.desc != null){    
            var div_desc = document.createElement('div');
            div_desc.innerHTML = arg.desc;
            div_desc.setAttribute('style', 'display:block; padding: 0px 5px; font-size : 12pt;')
            div.appendChild(div_desc);
        }

        if (arg.price != null){
            var div_price = document.createElement('div');
            div_price.innerHTML = arg.price;
            div_price.setAttribute('style', 'float:right; padding: 0px 5px; font-size : 12pt; font-weight:bold');
            div.appendChild(div_price);
        }
        return div;
    }
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    var MessageWithCarousel;
    MessageWithCarousel = function(arg) {
        this.text = arg.text, this.message_side = arg.message_side, this.carousel = arg.carousel;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_carousel_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                for(x in this.carousel){ 
                    $message.find('.carousel').append(createCarouselElmt(this.carousel[x]));
                }
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text, pos) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = pos;
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            if(pos == 'right'){
                evaluateMessage(text);
            }
            $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        sendMessageList = function(title, list, pos) {
            var body = title + "<br>";
            for(x in list){
                body += list[x].key + ': ' + list[x].desc + '<br>';
            }
            sendMessage(body, pos);
        }
        welcomeMessage = function(){
            sendMessage('Hello :)', 'left');
            var item_recommended = all[Math.floor(Math.random()*all.length)]; 
            if (item_recommended.available != 'yes') {
                item_recommended = null;
            }
            var message = new MessageWithCarousel({
                text: 'We have some recommendation for you!',
                message_side: 'left',
                carousel:  [item_recommended]
            });
            message.draw();
        };
        evaluateMessage = function(text){
            if(text.toLowerCase().indexOf('\\buy') >= 0) {
                var found = false;
                var i = 0;
                while(i <= text.length - (text.toLowerCase().indexOf('\\buy') + 4) && !found){
                    var item = text.substring(text.toLowerCase().indexOf('\\buy') + 5, text.toLowerCase().indexOf('\\buy') + 5 + i);
                    for(j = 0; j < all.length; j++){
                        if (item == all[j].id) {
                            bracket.push(all[j]);
                            found = true;
                            break;
                        }
                    } 
                    i++;
                }
                if(found) {
                    sendMessage("Okay, it's in your bracket now!", 'left');
                } else {
                    sendMessage("Sorry items not available!", 'left');
                }
            } else if(text.toLowerCase().indexOf('search') >= 0) {
                var message = new MessageWithCarousel({
                    text: 'Here is our top recommendation based on your search',
                    message_side: 'left',
                    carousel: sport 
                });
                message.draw();
            } else if (text.toLowerCase().indexOf('bracket') >= 0){
                if (bracket.length > 0){
                    var message = new MessageWithCarousel({
                        text: 'These is the things inside your bracket',
                        message_side: 'left',
                        carousel: bracket 
                    });
                    message.draw();
                } else {
                    sendMessage('There is nothing inside your bracket', 'right');
                }
            } else if (text.toLowerCase().indexOf('checkout') >= 0) {
                if(bracket.length > 0){
                    var paymentList = new MessageWithCarousel({
                        text : "Please choose your payment method:",
                        message_side : 'left',
                        carousel : payment_method
                    })
                    paymentList.draw();
                } else {
                    sendMessage('You can\'t pay for nothing' , 'left');
                }
            } else if (text.toLowerCase().indexOf('pay') >= 0){
                var found = false;
                var i = 0;
                while(i <= text.length - (text.toLowerCase().indexOf('pay') + 3) && !found){
                    var k = i;
                    while (k <= text.length - (text.toLowerCase().indexOf('pay') + 3) && !found){
                        var item = text.substring(text.toLowerCase().indexOf('pay') + 4 + i, text.toLowerCase().indexOf('pay') + 4 + i + k);
                        for(j = 0; j < payment_id.length; j++){
                            if (item == payment_id[j]) {
                                found = true;
                                break;
                            }
                        }
                        k++;
                    }
                    i++;
                }
                if(found) {
                    sendMessage("Thank you for your transactions! Hope you enjoy your best experience with me :)", 'left');
                } else {
                    sendMessage("Sorry payment ID is not defined!", 'left');
                }
            } else if (text.toLowerCase().indexOf('exit') >= 0){
                window.location.href = 'index.html';
            } else if (text.toLowerCase().indexOf('help') >= 0){
                sendMessageList("Just type anything, I will help you what you want! But here is some key command to help you get in touch with me", command_key, 'left');
            } else {
                sendMessage('I don\'t understand it :((', 'left');
            }
        };
        $('.send_message').click(function (e) {
            return sendMessage(getMessageText(), 'right');
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText(), 'right');
            }
        });
        welcomeMessage();
    });
}.call(this));