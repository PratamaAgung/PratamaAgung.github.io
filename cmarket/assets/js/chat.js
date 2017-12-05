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
        key : '<b>ongoing</b>',
        desc : 'show ongoing transaction'
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

var people_1 = {
        title : 'John',
        desc : 'Glad I bought this !',
        img : 'assets/img/review1.jpg'
}

var people_2 = {
        title : 'Sasha',
        desc : 'Very good and friendly seller !',
        img : 'assets/img/review2.jpg'
}

var sport_1 = {
        id : 'sport-1',
        title : 'Soccer Shoes',
        price : 'Rp700.000,00',
        desc : 'Great soccer shoes, can be used in any environment',
        img : 'assets/img/image1.jpg',
        available : 'yes',
        review_item : [people_1, people_2]
    }; 
var sport_2 = {
        id : 'sport-2',
        title : 'Football Jersey',
        price : 'Rp500.000,00',
        desc : 'Great football jersey, comfortable to wear',
        img : 'assets/img/image3.jpg',
        available : 'yes',
        review_item : [people_1, people_2]
    };
var sport_3 = {
        id : 'sport-3',
        title : 'Ball',
        price : 'Rp300.000,00',
        desc : 'Great soccer ball, can be used in any environment',
        img : 'assets/img/image2.jpg',
        available : 'no',
        review_item : [people_1, people_2]
    };

var elect_1 = {
	id : 'elect-1',
    title : 'Asus ROG G751JY',
    price : 'Rp30.000.000,00',
    desc : 'Calling for gamers! Best gaming laptop so far...',
    img : 'assets/img/rog.png',
    available : 'yes',
    review_item : [people_1, people_2]
};

var elect_2 = {
	id : 'elect-2',
    title : 'iPhone X',
    price : 'Rp14.000.000,00',
    desc : 'Newest generation of iPhone is available now, here in iPhone X',
    img : 'assets/img/iphoneX.jpg',
    available : 'yes',
    review_item : [people_1, people_2]
}

var elect_3 = {
	id : 'elect-3',
    title : 'Sony A6000 Mirrorless Camera',
    price : 'Rp8.000.000,00',
    desc : 'Want to catch wonderful image in a handy camera? Never miss it!',
    img : 'assets/img/sonycamera.jpg',
    available : 'yes',
    review_item : [people_1, people_2]
}

var fashion_1 = {
	id : 'fasion-1',
    title : 'Nike Air Max Modern Flyknit',
    price : 'Rp2.100.000,00',
    desc : 'Just wear it!',
    img : 'assets/img/fashion1.jpg',
    available : 'yes',
    review_item : [people_1, people_2]
}

var fashion_2 = {
	id : 'fasion-2',
    title : 'Adidas Original Trefoil Hoodie',
    price : 'Rp1.300.000,00',
    desc : 'Very good hoodie',
    img : 'assets/img/fashion2.jpg',
    available : 'yes',
    review_item : [people_1, people_2]
}

var fashion_3 = {
	id : 'fasion-3',
    title : 'Levi\'s Jeans Jacket',
    price : 'Rp800.000,00',
    desc : 'Well designed jacket for everyday use',
    img : 'assets/img/fashion3.jpg',
    available : 'no',
    review_item : [people_1, people_2]
}

var resi = {
	img : 'assets/img/resi.jpg',
	desc : 'Click button below to download yout receipt'
}

var add_review = {
    img : 'assets/img/addreview.png',
    desc : 'Click the icon below to <b>give feedback</b> :)'
}

var sport = [sport_1,sport_2,sport_3];

var elect = [elect_3, elect_1, elect_2];

var fashion = [fashion_1, fashion_2, fashion_3];

var all = [sport_1, sport_2, sport_3, fashion_3, fashion_2, fashion_1, elect_3, elect_2, elect_1];

var search_item = [];

var sort_item = [];

var bracket = [];

var buyed_item = [];

var payment_id = []

var ongoing = [];

var have_paid = [];

var arrived_item = [];

var status_list = [];

var view = [];

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

function addReview() {
    var x = document.getElementById("modal_input_text").value;
    var people = {
        title : 'Adit',
        desc : x,
        img : 'assets/img/Adit.png'        
    };

    for (var i = 0; i < buyed_item.length; i++) {
        for (var j = 0; j < all.length; j++) {
            if (buyed_item[i].id == all[j].id) {
                (all[j].review_item).push(people);
            }
        }       
        delete buyed_item[i];
    }

    document.getElementById("modal_input_text").value = '';
    buyed_item = cleanArray(buyed_item);
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
    sendMessage('review ' + id, 'right');
    var x;
    for(j = 0; j < all.length; j++){
        if (all[j].id == id) {
            x = all[j].review_item;
            break;
        }                      
    }
                      
    if (bracket.length > 0){
        var message = new MessageShowReview({
            text: 'Here you go',
            message_side: 'left',
            showreview: x
        });
        message.draw();
    } else {
        sendMessage('There is nothing inside your cart', 'left');
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
    };
    var createDownloadableElement = function(arg){
    	var div = document.createElement('div');

        var div_image = document.createElement('div');
        var img = document.createElement('img');
        div_image.setAttribute('style', 'float : left;');
        img.setAttribute('src', arg.img); 
        img.setAttribute('class', 'image_carousel');
        div_image.appendChild(img);
        div.appendChild(div_image);

        if (arg.desc != null){    
            var div_desc = document.createElement('div');
            div_desc.innerHTML = arg.desc;
            div_desc.setAttribute('style', 'display:inline-block; padding: 0px 3px; font-size : 12pt;');
            div.appendChild(div_desc);
        }

        div_download = document.createElement('div');
        div_download.innerHTML = '<a href="' + arg.img + '" class="buttonDownload" style="margin: 5px;" download="receipt-c-market.jpg">Download</a>';
        div.appendChild(div_download);

       return div;
    };
    var createReviewElement = function(arg){
        var div = document.createElement('div');
            
        var div_desc = document.createElement('div');
        div_desc.innerHTML = arg.desc;
        div_desc.setAttribute('style', 'text-align: center; font-size: 12pt; margin-bottom: 1%;');
        div.appendChild(div_desc);

        var div_image = document.createElement('div');
        var img = document.createElement('input');
        img.setAttribute('style', 'display: block; width: 16%; margin: 0 auto; cursor: pointer;');
        img.setAttribute('type', 'image'); 
        img.setAttribute('src', arg.img); 
        img.setAttribute('class', 'image_review_carousel');
        img.setAttribute('data-toggle', 'modal');
        img.setAttribute('data-target', '#myModal'); 
        div_image.appendChild(img);
        //div_image.setAttribute('onclick', '');
        div.appendChild(div_image);

       return div;
    };
    var createShowReviewElement = function(arg){
        var div = document.createElement('div');
        var br = document.createElement('br');
        div.setAttribute('style', 'display: block; margin-bottom: 9%;');

        var div_image = document.createElement('div');
        var img = document.createElement('img');
        div_image.setAttribute('style', 'float : left;');
        img.setAttribute('src', arg.img); 
        img.setAttribute('class', 'image_carousel');
        div_image.appendChild(img);
        div.appendChild(div_image);

        var div_title = document.createElement('div');
        var p_div_title = document.createElement('p');
        div_title.innerHTML = arg.title;
        div_title.setAttribute('style', 'display:inline-block; padding: 0px 15px; font-size : 18pt;')
        //div_title.setAttribute('class', 'image_container');
        div.appendChild(div_title);
        div.appendChild(br);

        var div_desc = document.createElement('div');
        var p_div_desc = document.createElement('p');
        div_desc.innerHTML = arg.desc;
        div_desc.setAttribute('style', 'display:inline-block; padding: 0px 15px; font-size : 12pt;');
        div.appendChild(div_desc);

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
    var MessageDownloadable;
    MessageDownloadable = function(arg){
    	this.text = arg.text, this.message_side = arg.message_side, this.downloadable = arg.downloadable;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_downloadable').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
				$message.find('.carousel').append(createDownloadableElement(this.downloadable));
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    var MessageReview;
    MessageReview = function(arg){
        this.text = arg.text, this.message_side = arg.message_side, this.review = arg.review;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_review').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $message.find('.carousel').append(createReviewElement(this.review));
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    MessageShowReview = function(arg){
        this.text = arg.text, this.message_side = arg.message_side, this.showreview = arg.showreview;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_show_review').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                for(x in this.showreview){ 
                    $message.find('.carousel').append(createShowReviewElement(this.showreview[x]));
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
                            buyed_item.push(selected_item);
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
                	var view = null;
                    search_item = [];	
						
                    if(text.toLowerCase().indexOf('sport') >= 0){
                        view = null;
                		view = sport;
                	} else if(text.toLowerCase().indexOf('elect') >= 0){
                        view = null;
                		view = elect;
                	} else if (text.toLowerCase().indexOf('fashion') >= 0){
                        view = null;
                		view = fashion;
                	} else if (text.toLowerCase().indexOf('all') >= 0){
                        view = null;
                		view = all;
                	} else if  ((text.length - text.toLowerCase().indexOf('search')) > 6) {
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
                        view = search_item;
						if (search_item.length == 0) {
							view = null;
						}
					}	

                	if(view != null){
                        search_item = [];
                        for (i = 0; i < view.length; i++) {
                            search_item.push(view[i]);
                        }
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
                for (i = 0; i < search_item.length; i++) {
                    for (j = 0; j < search_item.length; j++) {
                        temp_price = (search_item[j].price).substring(2, (search_item[j].price.length - 3));
                        temp_price = temp_price.replace(/\./g,'');
                        int_temp_price = Number(temp_price);

                        if((int_temp_price < maks) && (int_temp_price > prec_maks)) {
                            maks = int_temp_price;
                            indeks = j;
                        }                            
                    }
                    prec_maks = maks;
                    sort_item.push(search_item[indeks]);
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
            } else if (text.toLowerCase().indexOf('review') >= 0) {

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
	                    		ongoing[j].status = 'paid';
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
                    var msg = new MessageReview({
                        text : "Your order has been delivered, stay calm and wait for it :)",
                        message_side : 'left',
                        review : add_review
                    });
                    msg.draw();                    
                    /*
                    var message_review = new MessageReview({
                    text: "Thank you for buying with us! Hope you enjoy your best experience with me :)",
                    message_side: 'left',
                    app_review: add_review
                    });
                    message_review.draw();
                    */
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
                        	var msg = new MessageDownloadable({
                        		text : "Your order has been delivered, stay calm and wait for it :)",
                        		message_side : 'left',
                        		downloadable : resi
                        	});
                        	msg.draw();
                        }
                    }
                    var y = Math.floor((Math.random() * ongoing.length));
                    if(ongoing[y].status == 'paid'){
                    	ongoing[y].status = 'deliver';
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