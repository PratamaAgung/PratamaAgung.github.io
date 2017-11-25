var command_key = [
    {
        key : '<b>search</b>',
        desc : 'help you to search what you want'
    },
    {
        key : '<b>sort</b>',
        desc : 'sort item based on price'
    },
    {
        key : '<b>my shop</b>',
        desc : 'show what items you currently sell'
    },
    {
        key : '<b>order</b>',
        desc : 'show the items that people are ordering from you'
    },
    {
        key : '<b>help</b>',
        desc : 'display available command'
    },,
    {
        key : '<b>sent + your payment id</b>',
        desc : 'send item confirmation (ex : received awh3j)'
    },
    {
        key : '<b>exit</b>',
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

var elect_1 = {
    id : 'elect-1',
    title : 'Asus ROG G751JY',
    price : 'Rp30.000.000,00',
    desc : 'Calling for gamers! Best gaming laptop so far...',
    img : 'assets/img/rog.png',
    available : 'yes'
};

var elect_2 = {
    id : 'elect-2',
    title : 'iPhone X',
    price : 'Rp14.000.000,00',
    desc : 'Newest generation of iPhone is available now, here in iPhone X',
    img : 'assets/img/iphoneX.jpg',
    available : 'yes'
}

var elect_3 = {
    id : 'elect-3',
    title : 'Sony A6000 Mirrorless Camera',
    price : 'Rp8.000.000,00',
    desc : 'Want to catch wonderful image in a handy camera? Never miss it!',
    img : 'assets/img/sonycamera.jpg',
    available : 'yes'
}

var fashion_1 = {
    id : 'fasion-1',
    title : 'Nike Air Max Modern Flyknit',
    price : 'Rp2.100.000,00',
    desc : 'Just wear it!',
    img : 'assets/img/fashion1.jpg',
    available : 'yes'
}

var fashion_2 = {
    id : 'fasion-2',
    title : 'Adidas Original Trefoil Hoodie',
    price : 'Rp1.300.000,00',
    desc : 'Very good hoodie',
    img : 'assets/img/fashion2.jpg',
    available : 'yes'
}

var fashion_3 = {
    id : 'fasion-3',
    title : 'Levi\'s Jeans Jacket',
    price : 'Rp800.000,00',
    desc : 'Well designed jacket for everyday use',
    img : 'assets/img/fashion3.jpg',
    available : 'no'
}

var people_1 = {
    title : 'John',
    desc : 'Glad I bought this !',
    img : 'assets/img/review1.jpg',
}

var people_2 = {
    title : 'Sasha',
    desc : 'Very good and friendly seller !',
    img : 'assets/img/review2.jpg',
}

var id1 = Math.random().toString(36).substring(7);
var id2 = Math.random().toString(36).substring(7);

var order_1 = {
    id : 'sport-1',
    title : 'Soccer Shoes',
    price : 'Rp700.000,00',
    desc : 'Great soccer shoes, can be used in any environment',
    img : 'assets/img/image1.jpg',
    paymentid : id1
}

var order_2 = {
    id : 'elect-3',
    title : 'Sony A6000 Mirrorless Camera',
    price : 'Rp8.000.000,00',
    desc : 'Want to catch wonderful image in a handy camera? Never miss it!',
    img : 'assets/img/sonycamera.jpg',
    paymentid : id2
}

var payment_id = [];

payment_id.push(id1);
payment_id.push(id2);

var resi = {
    img : 'assets/img/resi.jpg',
    desc : 'Click button below to download yout receipt'
}

var shopdisplay = [sport_1, sport_2, elect_3, fashion_2];

var order = [order_1, order_2];

var sport = [sport_1,sport_2,sport_3];

var elect = [elect_3, elect_1, elect_2];

var fashion = [fashion_1, fashion_2, fashion_3];

var all = [sport_1, sport_2, sport_3, fashion_3, fashion_2, fashion_1, elect_3, elect_2, elect_1];

var search_item = [];

var sort_item = [];

var review_item = [people_1, people_2];

var bracket = [];

var ongoing = [];

var have_paid = [];

var arrived_item = [];

var status_list = [];

var getMessageText, message_side, sendMessage, evaluateMessage;

function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

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
        var total_payment = 0;
        for(x in bracket){
            var price = '';
            for(var i = 0; i < bracket[x].price.length; i++){
                if(bracket[x].price[i] <='9' && bracket[x].price[i] >= '0') {
                    price += bracket[x].price[i];
                } else if (bracket[x].price[i] == ','){
                    break;
                }
            }
            total_payment += parseInt(price);
        }
        for(x in bracket){
            bracket[x].deletable = null;
            bracket[x].review = null;
        }
        var ongoing_item = {};
        ongoing_item['id'] = id;
        ongoing_item['total'] = total_payment;
        ongoing_item['item'] = JSON.parse(JSON.stringify(bracket));
        ongoing_item['status'] = 'not_paid';
        ongoing.push(ongoing_item);
        bracket = [];
        sendMessage('Your total shopping is Rp' + total_payment + ',00<br>This is your payment ID ' + id + '<br>We are waiting for your payment. See you :)', 'left');
    } else {
        sendMessage('Sorry we can\'t process that payment method', 'left');
    }
};

(function () {
    var createCarouselElmt = function(arg){
        var div = document.createElement('div');

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
        div_title.setAttribute('style', 'display:block; padding: 0px 5px; font-size : 18pt;');
        div.setAttribute('class', 'image_container');
        div.appendChild(div_title);

        if (arg.desc != null){
            var div_desc = document.createElement('div');
            div_desc.innerHTML = arg.desc;
            div_desc.setAttribute('style', 'display:block; padding: 0px 5px; font-size : 12pt;');
            div.appendChild(div_desc);
        }

        if (arg.price != null){
            var div_price = document.createElement('div');
            div_price.innerHTML = arg.price;
            div_price.setAttribute('style', 'float:right; padding: 0px 5px; font-size : 12pt; font-weight:bold');
            div.appendChild(div_price);
        }

        if (arg.review != null) {
            var div_review = document.createElement('span');
            div_review.innerHTML = '<i class="material-icons">people</i> Review';
            div_review.setAttribute('style', 'padding : 5px; color:gray;');
            div_review.setAttribute('onclick', 'review_bracket("' + arg.id + '")');
            div.appendChild(div_review);
        }

        if (arg.paymentid != null) {
            var div_id = document.createElement('span');
            div_id.innerHTML = "Order ID: " + arg.paymentid;
            div_id.setAttribute('style', 'display:block; color:gray; padding: 0px 5px; font-size : 15pt; font-weight:bold');
            div.appendChild(div_id);
        }

        if (arg.deletable != null){
            var div_delete = document.createElement('span');
            div_delete.innerHTML = '<i class="material-icons">delete_forever</i> Delete';
            div_delete.setAttribute('style', 'padding : 5px; color:red;');
            div_delete.setAttribute('onclick', 'delete_bracket("' + arg.id + '")');
            div.appendChild(div_delete);
        } else if (arg.id != null){
            div.setAttribute('id', (arg.id != null) ? arg.id : '');
            div.setAttribute('onclick', 'buy("' + arg.id + '", "'+ arg.available+'")');
        } else {
            div.setAttribute('onclick', 'pay("' + arg.title + '")');
        }
        return div;
    };
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
        };
        sendMessageStatus = function(title, list, list2, pos) {
            var body = title + "<br>";
            for(i = 0; i < list.length; i++){
                var y = Math.floor((Math.random() * 2) + 1);
                if (y == 1) {
                    body += list[i] + " : Your item is on the way :)" + '<br>';
                } else {
                    body += list[i] + " : Sorry, your item has not been delivered :(" + '<br>';
                }
            }
            for(i = 0; i < list2.length; i++){
                body += list2[i] + " : Your item has arrived :D !" + '<br>';
            }
            sendMessage(body, pos);
        };
        welcomeMessage = function(){
            sendMessage('Hello :)', 'left');
            var item_recommended = all[Math.floor(Math.random()*all.length)];
            if (item_recommended.available != 'yes') {
                item_recommended = null;
            }
            var y = Math.floor((Math.random() * 2) + 1);
            var text;
            if (y == 1){
                text = "We have some recommendation for you!";
            } else {
                text = "We have a good deal and promo :)";
            }
            var message = new MessageWithCarousel({
                text: text,
                message_side: 'left',
                carousel:  [item_recommended]
            });
            sendMessageList("Just type anything, I will help you what you want! But here is some key command to help you get in touch with me<br>", command_key, 'left');
            message.draw();
        };
        evaluateMessage = function(text){
            if((text.toLowerCase().indexOf('search') >= 0) || (text.toLowerCase().indexOf('find') >= 0)) {
                // if ((text.length - text.toLowerCase().indexOf('search')) == 6) {
                var view = null;
                if (text.toLowerCase().indexOf('sport') >= 0) {
                    view = sport;
                } else if (text.toLowerCase().indexOf('elect') >= 0) {
                    view = elect;
                } else if (text.toLowerCase().indexOf('fashion') >= 0) {
                    view = fashion;
                } else if (text.toLowerCase().indexOf('all') >= 0) {
                    view = all;
                }

                if (view != null) {
                    var message = new MessageWithCarousel({
                        text: 'Here is our top recommendation based on your search',
                        message_side: 'left',
                        carousel: view
                    });
                    message.draw();
                } else {
                    sendMessage("I can\'t get what you want", 'left');
                }
            } else if (text.toLowerCase().indexOf('sort') >= 0) {

                var maks = 999999999999;
                var prec_maks = -999999999999;
                var indeks;
                var temp_price;
                var int_temp_price;
                for (i = 0; i < all.length; i++) {
                    for (j = 0; j < all.length; j++) {
                        temp_price = (all[j].price).substring(2, (all[j].price.length - 3));
                        temp_price = temp_price.replace('.','');
                        int_temp_price = Number(temp_price);
                        if((int_temp_price < maks) && (int_temp_price > prec_maks)) {
                            maks = int_temp_price;
                            indeks = j;
                        }
                    }
                    prec_maks = maks;
                    sort_item.push(all[indeks]);
                    maks = 999999999999;
                    indeks = -1;
                    temp_price = "";
                    int_temp_price = 0;
                }

                var message = new MessageWithCarousel({
                    text: 'Done :D',
                    message_side: 'left',
                    carousel: sort_item
                });
                message.draw();
                sort_item = [];
            } else if (text.toLowerCase().indexOf('my shop') >= 0) {
                // if ((text.length - text.toLowerCase().indexOf('search')) == 6) {
                var view = null;
                view = shopdisplay;

                if(view != null){
                    var message = new MessageWithCarousel({
                        text: 'Here is the things you are currently selling',
                        message_side: 'left',
                        carousel: view
                    });
                    message.draw();
                } else {
                    sendMessage("I think you aren't selling any items :/", 'left');
                }
            }  else if (text.toLowerCase().indexOf('sent') >= 0) {
                var found = false;
                var i = 0;
                var temp_index_payment;
                if (i <= text.length - (text.toLowerCase().indexOf('sent') + 4) && !found) {
                    var item = text.substring(text.toLowerCase().indexOf('sent') + 5, text.length);
                    // item existence validation
                    for(j = 0; j < payment_id.length; j++){
                        if (item == payment_id[j]) {
                            temp_index_payment = j;
                            found = true;

                            delete payment_id[temp_index_payment];
                            payment_id = cleanArray(payment_id);
                            order.splice(j,1);
                            break;
                        }
                    }
                    //summon modal box! >:)
                }
                if(!found) {
                    sendMessage("Sorry payment ID is not defined!", 'left');
                }
            } else if (text.toLowerCase().indexOf('order') >= 0){
                var view = null;
                view = order;
                alert(order);
                if(view != ""){
                    var message = new MessageWithCarousel({
                        text: 'Here is the order people left on your shop',
                        message_side: 'left',
                        carousel: view
                    });
                    message.draw();
                } else {
                    sendMessage("Unfortunately, you have nobody ordering at your shop :(", 'left');
                }
            } else if (text.toLowerCase().indexOf('exit') >= 0){
                window.location.href = 'index.html';
            } else if (text.toLowerCase().indexOf('help') >= 0){
                sendMessageList("Just type anything, I will help you what you want! But here is some key command to help you get in touch with me<br>", command_key, 'left');
            } else if (text.toLowerCase().indexOf('hello') >= 0) {
                sendMessage("Hello! My name is C-Market, your personal assistant in your shopping needs! Don't be afraid to ask for <b>help</b> :)<br>", 'left');
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