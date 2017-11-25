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
        key : '<b>cart</b>',
        desc : 'show what is inside your cart now'
    },
    {
        key : '<b>pay</b>',
        desc : 'pay what you have bought'
    },
    {
        key : '<b>help</b>',
        desc : 'display available command'
    },
    {
    	key : '<b>status</b>',
    	desc : 'show your item status'
    },
    {
    	key : '<b>received + your payment id</b>',
    	desc : 'received confirmation (ex : received awh3j)'
    },    
    {
        key : '<b>confirm + your payment id</b>',
        desc : 'payment confirmation (ex : confirm f32hf)'
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

var sport = [sport_1,sport_2,sport_3];

var all = [sport_1, sport_2, sport_3];

var search_item = [];

var sort_item = [];

var review_item = [people_1, people_2];

var bracket = [];

var payment_id = []

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

var delete_bracket = function(id){
    sendMessage('delete ' + id, 'right');
};

var review_bracket = function(id){
    sendMessage('review', 'right');
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

        if (arg.review != null) {
            var div_review = document.createElement('span');
            div_review.innerHTML = '<i class="material-icons">people</i> Review';
            div_review.setAttribute('style', 'padding : 5px; color:gray;');
            div_review.setAttribute('onclick', 'review_bracket("' + arg.id + '")');
            div.appendChild(div_review);
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
            var message = new MessageWithCarousel({
                text: 'We have some recommendation for you!',
                message_side: 'left',
                carousel:  [item_recommended]
            });
            sendMessageList("Just type anything, I will help you what you want! But here is some key command to help you get in touch with me<br>", command_key, 'left');
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
                            var selected_item = JSON.parse(JSON.stringify(all[j]));
                            selected_item['deletable'] = true;
                            selected_item['review'] = true;
                            bracket.push(selected_item);
                            found = true;
                            break;
                        }
                    } 
                    i++;
                }
                if(found) {
                    sendMessage("Okay, it's in your cart now!", 'left');
                } else {
                    sendMessage("Sorry items not available!", 'left');
                }
            } else if((text.toLowerCase().indexOf('search') >= 0) || (text.toLowerCase().indexOf('find') >= 0)) {                
                if ((text.length - text.toLowerCase().indexOf('search')) == 6) {
                    var message = new MessageWithCarousel({
                    text: 'Here is our top recommendation based on your search',
                    message_side: 'left',
                    carousel: sport 
                    });
                    message.draw();
                } else {
                    var found = false;
                    var i = 0;
                    if(i <= text.length - (text.toLowerCase().indexOf('search') + 6) && !found) {
                        var item = text.substring((text.toLowerCase().indexOf('search') + 7), text.length);
                        for(j = 0; j < all.length; j++){
                            if (all[j].title.toLowerCase().indexOf(item) >= 0) {
                                search_item.push(all[j]);
                            }                      
                        }                          
                    }
                    if (search_item.length > 0) {
                        var message = new MessageWithCarousel({
                        text: 'Done :D',
                        message_side: 'left',
                        carousel: search_item 
                        });
                        message.draw();
                    } else {
                        sendMessage("Our seller don't sell that item in here :(","left");
                    }
                    search_item = [];
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
            } else if (text.toLowerCase().indexOf('cart') >= 0){
                if (bracket.length > 0){
                    var message = new MessageWithCarousel({
                        text: 'These is the things inside your cart',
                        message_side: 'left',
                        carousel: bracket 
                    });
                    message.draw();
                } else {
                    sendMessage('There is nothing inside your cart', 'left');
                }
            } else if (text.toLowerCase().indexOf('review') >= 0){
                if (bracket.length > 0){
                    var message = new MessageWithCarousel({
                        text: 'Here you go',
                        message_side: 'left',
                        carousel: review_item
                    });
                    message.draw();
                } else {
                    sendMessage('There is nothing inside your cart', 'left');
                }
            } else if (text.toLowerCase().indexOf('pay') >= 0) {
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
            } else if (text.toLowerCase().indexOf('confirm') >= 0){
                var found = false;
                var foundOngoingItem = false;
                var i = 0;
                if (i <= text.length - (text.toLowerCase().indexOf('confirm') + 7) && !found) {
                    var item = text.substring(text.toLowerCase().indexOf('confirm') + 8, text.length);
                    for (l = 0; l < have_paid.length; l++) {
                		if (item == have_paid[l]) {
                			foundOngoingItem = true;
                			break;
                		}
                	}

                	//if have not paid item
                	if (!foundOngoingItem) {
	                    for(j = 0; j < payment_id.length; j++){
	                        if (item == payment_id[j]) {
	                            found = true;
	        					have_paid.push(payment_id[j]);
	                            break;
	                        }                      
	                    }
	                    for(j = 0; j < ongoing.length; j++){
	                    	if(item == ongoing[j].id) {
	                    		var y = Math.floor((Math.random() * 2) + 1);
	                    		if (y == 1) {
	                    			ongoing[j].status = 'paid';
	                    		} else {
	                    			ongoing[j].status = 'deliver';
	                    		}
	                    	}
	                    }                			
                	}
                }

                if(found) {
                    sendMessage("Thank you for your payment! Your transaction has been completed (y) :)", 'left');
                } else if (foundOngoingItem) {
                	sendMessage("I'm happy you want to pay more than once, but unfortunately this is not allowed :(", 'left');
                } else {
                    sendMessage("Sorry payment ID is not defined!", 'left');
                }
            } else if (text.toLowerCase().indexOf('received') >= 0) {
                var found = false;
                var foundPaid = false;
                var i = 0;
                var temp_indeks_payment;
                if (i <= text.length - (text.toLowerCase().indexOf('received') + 8) && !found) {
                    var item = text.substring(text.toLowerCase().indexOf('received') + 9, text.length);
	                // item existence validation
	                for(j = 0; j < payment_id.length; j++){
	                    if (item == payment_id[j]) {
	                        temp_indeks_payment = j;
	                        found = true;
	                        break;
	                    }                      
	                }                        

	                //item payment validation	
                    for (l = 0; l < have_paid.length; l++) {
                        if (item == have_paid[l]) {
                			foundPaid = true;
                			delete have_paid[l];
                			have_paid = cleanArray(have_paid);
            				break;
            			}
            		}

                	//delete all unnecessary element
                    if (found && foundPaid) {
	                    for(j = 0; j < ongoing.length; j++) {
	                        if (item == ongoing[j].id) {
	                            ongoing.splice(j,1);
	                                break;
	                        }                            
	                    }
	                    arrived_item.push(payment_id[temp_indeks_payment]);
	                    delete payment_id[temp_indeks_payment];              
	                    payment_id = cleanArray(payment_id);
	                    have_paid = cleanArray(have_paid); 	
                    }                       
                }
                if(found && (!foundPaid)) {
                    sendMessage("You haven't pay :(", 'left');
                } else if (found && foundPaid) {
                	sendMessage("Thank you for buying with us! Hope you enjoy your best experience with me :)", 'left');
                } else {
                    sendMessage("Sorry payment ID is not defined!", 'left');
                }
            } else if (text.toLowerCase().indexOf('status') >= 0) {
            	if ((have_paid.length != 0) || (arrived_item != 0)) {
            		sendMessageStatus("Your item based on ID : <br>", have_paid, arrived_item, "left");
            	} else {
            		sendMessage("You haven't paid or buy any item :(","left");
            	}

            } else if(text.toLowerCase().indexOf('delete') >= 0) {
                var found = false;
                var i = 0;
                while(i <= text.length - (text.toLowerCase().indexOf('delete') + 6) && !found){
                    var item = text.substring(text.toLowerCase().indexOf('delete') + 7, text.toLowerCase().indexOf('delete') + 7 + i);
                    for(j = 0; j < bracket.length; j++){
                        if (item == bracket[j].id) {
                            bracket[j].deletable = null;
                            bracket[j].review = null;
                            bracket.splice(j, 1);
                            found = true;
                            break;
                        }
                    } 
                    i++;
                }
                if(found) {
                    sendMessage("Alright, it has been removed!", 'left');
                } else {
                    sendMessage("Sorry the item is not in your cart!", 'left');
                }
            } else if (text.toLowerCase().indexOf('exit') >= 0){
                window.location.href = 'index.html';
            } else if (text.toLowerCase().indexOf('ongoing') >= 0){
            	console.log(ongoing.length);
                if(ongoing.length > 0){
                    for(x in ongoing){
                        console.log(ongoing[x].item);
                        var message = new MessageWithCarousel({
                            text : "Transaction ID: " + ongoing[x].id + "<br>Total payment: Rp" + ongoing[x].total + ",00<br>Item:",
                            message_side : 'left',
                            carousel : ongoing[x].item
                        });
                        message.draw();
                        if(ongoing[x].status == 'not_paid'){
                        	sendMessage("You haven't paid for this order, please confirm us right after you pay it.", "left");
                        } else if (ongoing[x].status == 'paid') {
                        	sendMessage("You have paid for this order, we are processing your payment", 'left');
                        } else if (ongoing[x].status == 'deliver') {
                        	sendMessage("The items has been delivered", 'left');
                        }
                    }
                } else {
                    sendMessage("You haven't ordered anything", 'left');
                }
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