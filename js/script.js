/* page rotator */
function hidePage(page) {
	var page_wrapper = document.querySelector('.'+page+'_wrapper');
	page_wrapper.classList.remove(page+'_wrapper--active');
	page_wrapper.classList.add(page+'_wrapper--hidden');	
}

function showPage(page) {
	var page_wrapper = document.querySelector('.'+page+'_wrapper');
	page_wrapper.classList.remove(page+'_wrapper--hidden');
	page_wrapper.classList.add(page+'_wrapper--active');	
}

function backPage(page) {
	var page_wrapper = document.querySelector('.'+page+'_wrapper');
	page_wrapper.classList.remove(page+'_wrapper--active');
	page_wrapper.classList.add(page+'_wrapper--visit');	
}

/* home page */
function prepHomepage() {
	pageLoader("homepage");
	menuLoader("homepage");
	setTimeout(function() {
    	pageDisplay("homepage");
    },500);
	setTimeout(function() {
		showPage("homepage");
    },700);
	setTimeout(function() {
		pageLoader("categories");
    },500);
    setTimeout(function() {
		document.querySelector(".homepage_categories-m").onclick = function(){Categories("m")};
		/* dummy */
		document.querySelector(".homepage_categories-w").onclick = function(){Blank()};
		document.querySelector(".homepage_collections_item").onclick = function(){Blank()};
		document.querySelector(".homepage_trending_item").onclick = function(){Blank()};
    },500);
}

function Homepage() {
	hidePage("welcome");
	prepHomepage();
}

document.querySelector(".welcome_logo").onclick = Homepage;

/* categories page */
function prepCategories() {
	pageLoader("categories");
	menuLoader("categories");
	setTimeout(function() {
	   	pageDisplay("categories");
	},500);
	setTimeout(function() {
	   	showPage("categories");
	},700);
	setTimeout(function() {
		pageLoader("items");
    },500);
    setTimeout(function() {
	    var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function() {
				if (xhr.readyState==4 && xhr.status==200) {
					var categories = JSON.parse(xhr.responseText);
					for (i=1;i<categories.length;i++) {
						var catid = categories[i].categories_id;
						var catname = categories[i].categories_name;
						catItems(catid,catname);
	    			}
				}
			}
		xhr.open("GET","db/categories.json",true);
		xhr.send();		
	},500);
}

function catItems(catid,catname) {
	var categories_item_wrapper = document.querySelector(".categories_item_wrapper");
	var categories_item = document.createElement("div");
	categories_item.className = 'categories_item categories_item_'+catid;
	categories_item_wrapper.appendChild(categories_item);
	categories_item.innerHTML = catname;
	var catitems = document.querySelector(".categories_item_"+catid);
	catitems.onclick = function(){Items(catid,catname)};
}

function Categories() {
	hidePage("homepage");
	prepCategories();
}

/* items page */
function makeItems(catid) {
var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4 && xhr.status==200) {
				var product = JSON.parse(xhr.responseText);
				infoItems(catid,product);
			}
		}
	xhr.open("GET","db/product.json",true);
	xhr.send();	
}	

function infoItems(catid,product) {
		var products_wrapper = document.querySelector('.items_products_wrapper');
		var product_count = 0;
		for (i=1;i<product.length;i++) {
			if (product[i].product_categories == catid) {
				product_count++;
				var id = product[i].product_id;
				var product_name = product[i].product_name;
				var product_price = product[i].product_price;
				var product_categories = product[i].product_categories;
				var product_image = product[i].product_image;
				/*product*/
				var items_product_wrapper = document.createElement("div");
				items_product_wrapper.className = 'items_product_wrapper';
				products_wrapper.appendChild(items_product_wrapper);
				/*product_like*/
				var items_product_like = document.createElement("div");
				items_product_like.className = 'items_product_like';
				items_product_wrapper.appendChild(items_product_like);	
				/*image wrap*/
				var items_image_wrapper = document.createElement("div");
				items_image_wrapper.className = 'items_image_wrapper items_product_img_'+id;
				items_product_wrapper.appendChild(items_image_wrapper);
				/* image pic */
				var items_image = document.createElement("img");
				items_image.className = 'items_image';
				items_image.setAttribute("src","img/"+product_image);
				items_image_wrapper.appendChild(items_image);
				/*product_name*/
				var items_product_name = document.createElement("div");
				items_product_name.className = 'items_product_name';
				items_product_wrapper.appendChild(items_product_name);
				items_product_name.innerHTML = product_name;
				/*product_price*/
				var items_product_price = document.createElement("div");
				items_product_price.className = 'items_product_price';
				items_product_wrapper.appendChild(items_product_price);
				items_product_price.innerHTML = '$ '+product_price;
				/**/
				imgItems(id,catid);
				}
		}
		if (product_count == 0) {
			var items_empty = document.createElement("div");
			items_empty.className = 'items_empty';
			products_wrapper.appendChild(items_empty);
			
			var items_empty_info = document.createElement("div");
			items_empty_info.className = 'items_empty_info';
			products_wrapper.appendChild(items_empty_info);
			items_empty_info.innerHTML = "This categories is currently empty";
		}
}

function imgItems(id,catid) {
	document.querySelector(".items_product_img_"+id).onclick = function(){Product(id,catid)};
}

function prepItems(catid) {
	pageLoader("items");
    makeItems(catid);
	menuLoader("items",catid);
	setTimeout(function() {
		pageDisplay("items");
    },500);
    setTimeout(function() {
		showPage("items");
    },700);
    var xhr=new XMLHttpRequest();
	    setTimeout(function() {
		    var xhr=new XMLHttpRequest();
				xhr.onreadystatechange=function() {
					if (xhr.readyState==4 && xhr.status==200) {
						var categories = JSON.parse(xhr.responseText);
						for (i=1;i<categories.length;i++) {
							if (categories[i].categories_id == catid) {
								var catname = categories[i].categories_name;
								setTimeout(function() {
									document.querySelector(".items_title").innerHTML=catname;
								},500);
								break;
							}
		    			}
					}
				}
			xhr.open("GET","db/categories.json",true);
			xhr.send();		
		},500);
	xhr.open("GET","db/categories.json",true);
	xhr.send();	
}

function Items(catid,catname) {
	backPage("categories");
	prepItems(catid);
	setTimeout(function() {
		document.querySelector(".items_title").innerHTML=catname;
	},500);
}

/* product page */
function makeProduct(productID) {
var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4 && xhr.status==200) {
				var product = JSON.parse(xhr.responseText);
					setTimeout(function() {
						var product_name = product[productID].product_name;
						var product_price = product[productID].product_price;
						var product_image = product[productID].product_image;
						var product_categories = product[productID].product_categories;
						var product_description = product[productID].product_description;
						var product_more_info = product[productID].product_more_info;
						infoProduct(product_name,product_price,product_image,product_categories,product_description,product_more_info);
				    },500);
			}
		}
	xhr.open("GET","db/product.json",true);
	xhr.send();	
}

function infoProduct(product_name,product_price,product_image,product_categories,product_description,product_more_info) {
	document.querySelector(".product_name").innerHTML=product_name;
	document.querySelector(".product_price").innerHTML='$ '+product_price;
	document.querySelector(".product_description").innerHTML=product_description;
	document.querySelector(".product_more_info").innerHTML=product_more_info;
	document.querySelector(".product_image_wrapper").innerHTML='<img src="img/'+product_image+'" class="product_image">';
}

function prepProduct(productID,catid) {
	pageLoader("product");
	makeProduct(productID);
	menuLoader("product",catid);
	setTimeout(function() {
		pageDisplay("product");
    },500);
    setTimeout(function() {
    	infoProduct(productID);
    },500); 
    setTimeout(function() {
		showPage("product");
    },700);
}

function cartProduct(productID) {
	document.querySelector(".product_cart").onclick = function(){addCart(productID)};
}

function Product(productID,catid) {
	backPage("items");
	prepProduct(productID,catid);
	setTimeout(function() {
		cartProduct(productID);
    },500);
}

function addCart(productID) {
	var cart_count = document.querySelector('.cart_count');
	cart_count.classList.remove('cart_count--hidden');
	cart_count.classList.add('cart_count--active');
	var count = cart_count.innerHTML;
	count++; 	
	cart_count.innerHTML = count;
	var in_cart = document.getElementById("cart");
	var my_cart = in_cart.innerHTML;
	in_cart.innerHTML = my_cart + ',' + productID;
}

/* mycart page */
function makeCart(myid) {
var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4 && xhr.status==200) {
				var products = JSON.parse(xhr.responseText);
				if (myid.length>1) {
					var price_total = Number(0);
					for (i=1;i<products.length;i++) {
						var product_id = products[i].product_id;
						for (j=1;j<myid.length;j++) {
							if (product_id == myid[j]) {
							var product_name = products[i].product_name;
							var product_image = products[i].product_image;
							var product_price = products[i].product_price;
							var product_color = products[i].product_color;
							var product_size = products[i].product_size;
							price_total = Number(price_total) + Number(product_price);
							infoCart(product_id,product_name,product_image,product_price,product_color,product_size,price_total);	
							}
						}
					}
				}
				else {
				infoCart(0,0,0,0,0);	
				}
			}
		}
	xhr.open("GET","db/product.json",true);
	xhr.send();	
}

function infoCart(product_id,product_name,product_image,product_price,product_color,product_size,price_total) {
	var mycart_product_wrapper = document.querySelector('.mycart_product_wrapper');
	if (product_id === 0) {
		var mycart_empty = document.createElement("div");
		mycart_empty.className = 'mycart_empty';
		mycart_product_wrapper.appendChild(mycart_empty);
		
		var mycart_empty_info = document.createElement("div");
		mycart_empty_info.className = 'mycart_empty_info';
		mycart_product_wrapper.appendChild(mycart_empty_info);
		mycart_empty_info.innerHTML = "Your shopping cart is currently empty";

		var mycart_buy_wrapper = document.querySelector(".mycart_buy_wrapper--active");
		mycart_buy_wrapper.classList.remove('mycart_buy_wrapper--active');
		mycart_buy_wrapper.classList.add('mycart_buy_wrapper--hidden');
	}
	else {
	var mycart_product_id = document.createElement("div");
	mycart_product_id.className = 'mycart_product_'+product_id;
	mycart_product_wrapper.appendChild(mycart_product_id);	
	/*greyline*/	
	var mycart_greyline = document.createElement("div");
	mycart_greyline.className = 'mycart_greyline';
	mycart_product_id.appendChild(mycart_greyline);
	/*product_wrap*/
	var mycart_product_item = document.querySelector('.mycart_product_item');
	var mycart_product_item = document.createElement("div");
	mycart_product_item.className = 'mycart_product_item';
	mycart_product_id.appendChild(mycart_product_item);
	/*image wrap*/
	var mycart_image_wrapper = document.createElement("div");
	mycart_image_wrapper.className = 'mycart_image_wrapper product_image_'+product_id;
	mycart_product_item.appendChild(mycart_image_wrapper);
	/* image pic */
	var mycart_image = document.createElement("img");
	mycart_image.className = 'mycart_image';
	mycart_image.setAttribute("src","img/"+product_image);
	mycart_image_wrapper.appendChild(mycart_image);
	/*product_name*/
	var mycart_product_name = document.createElement("div");
	mycart_product_name.className = 'mycart_product_name';
	mycart_product_item.appendChild(mycart_product_name);
	mycart_product_name.innerHTML = product_name;
	/*product_price*/
	var mycart_product_price = document.createElement("div");
	mycart_product_price.className = 'mycart_product_price';
	mycart_product_item.appendChild(mycart_product_price);
	mycart_product_price.innerHTML = '$ '+product_price;
	/*product_option*/	
	var mycart_product_option = document.createElement("div");
	mycart_product_option.className = 'mycart_product_option';
	mycart_product_item.appendChild(mycart_product_option);
	mycart_product_option.innerHTML = 'Size:<div class="mycart_product_size">'+product_size+'</div>Color:<div class="mycart_product_color product_color_'+product_id+'"></div>';
	/*product_color*/
    var mycart_product_color = document.querySelector(".product_color_"+product_id);
    mycart_product_color.style.backgroundColor = product_color;
	/*product_delete*/
	var mycart_product_del = document.createElement("div");
	mycart_product_del.className = 'mycart_product_del product_del_'+product_id;
	mycart_product_item.appendChild(mycart_product_del);
	setTimeout(function() {
    	document.querySelector('.product_del_'+product_id).onclick = function(){delCart(product_id,product_price)};
    },500);
	/*subtotal*/
	var mycart_subtotal = document.querySelector(".mycart_subtotal--hidden");
		if (mycart_subtotal) {
			mycart_subtotal.classList.remove('mycart_subtotal--hidden');
			mycart_subtotal.classList.add('mycart_subtotal--active');
		}
	}
	var mycart_totalsum = document.querySelector(".mycart_totalsum");
	mycart_totalsum.innerHTML = '$ '+price_total+'.00';	
}

function Cart(catid) {
	var incart = document.getElementById("cart");
	var id_arr = incart.innerHTML;
	var myid = id_arr.split(",");
	pageLoader("mycart");
	makeCart(myid);
	menuLoader("mycart",catid);
	setTimeout(function() {
    	pageDisplay("mycart");
    },500);
	setTimeout(function() {
    	showPage("mycart");
    },700);
    setTimeout(function() {
    	var auth = document.getElementById("auth");
		var auth = auth.innerHTML;
		/* if the user is not authorized */
		if (auth == 0) {
			document.querySelector(".mycart_product_buy").onclick = function(){Customer()};	
			}
			else 
			/* if user is authorized */	
	    	{
	    	document.querySelector(".mycart_product_buy").onclick = function(){
	    		var xhr=new XMLHttpRequest();
				xhr.onreadystatechange=function() {
					if (xhr.readyState==4 && xhr.status==200) {
						var users = JSON.parse(xhr.responseText);
						var is_auth = 0;
						for (i=1;i<users.length;i++) {
							/* validation hash from auth */
							if (CryptoJS.MD5(users[i].email+users[i].password).toString() === auth) {
								var user_id = users[i].id;
								is_auth = 1;
								Payment(user_id);
								break;
							}
						}
						if (is_auth == 0) {
							alert("Authorization failed!\nE-MAIL or PASSWORD is incorrect!\nTry again!");
						}
					}
				}
				xhr.open("GET","db/profile.json",true);
				xhr.send();	
	    		};	
	    	}
    },500);
}

function delCart(product_id,product_price) {
	var delID = ','+product_id;
	var incart = document.getElementById("cart");
	var id_arr = incart.innerHTML;
	new_id_arr = id_arr.replace(delID,"");
	incart.innerHTML = new_id_arr;
	/**/
	var cart_count = document.querySelector('.cart_count');
	var count = cart_count.innerHTML;
	count = count - 1;
	cart_count.innerHTML = count;
	if (count < 1) {
		cart_count.classList.remove('cart_count--active');
		cart_count.classList.add('cart_count--hidden');

		var mycart_subtotal = document.querySelector('.mycart_subtotal--active');
		mycart_subtotal.classList.remove('mycart_subtotal--active');
		mycart_subtotal.classList.add('mycart_subtotal--hidden');

		var mycart_buy_wrapper = document.querySelector('.mycart_buy_wrapper--active');
		mycart_buy_wrapper.classList.remove('mycart_buy_wrapper--active');
		mycart_buy_wrapper.classList.add('mycart_buy_wrapper--hidden');

		var mycart_product_wrapper = document.querySelector('.mycart_product_wrapper');
		var mycart_empty = document.createElement("div");
		mycart_empty.className = 'mycart_empty';
		mycart_product_wrapper.appendChild(mycart_empty);
		
		var mycart_empty_info = document.createElement("div");
		mycart_empty_info.className = 'mycart_empty_info';
		mycart_product_wrapper.appendChild(mycart_empty_info);
		mycart_empty_info.innerHTML = "Your shopping cart is currently empty";
	}
	
	var mycart_product_id = document.querySelector('.mycart_product_'+product_id);
	mycart_product_id.innerHTML = "";
	/*totalsum*/
	var mycart_totalsum = document.querySelector('.mycart_totalsum');
	var totalsum = mycart_totalsum.innerHTML;
	new_totalsum = totalsum.replace("$ ","");
	totalsum = new_totalsum - product_price;
	mycart_totalsum.innerHTML = "$ "+totalsum+".00";
}

/* customer page*/
function infoCustomer() {
    document.querySelector('.customer_btn_login').onclick = function(){
    	var input_customer_email = document.querySelector('.customer_email').value;
    	var input_customer_password = document.querySelector('.customer_password').value;
    	loginCustomer(input_customer_email,input_customer_password);
    };
    /* new user registration*/
    document.querySelector('.customer_btn_new').onclick = function(){Blank()};
}

function Customer() {
	pageLoader("customer");
	menuLoader("customer");
	setTimeout(function() {
    	pageDisplay("customer");
    },500);
	setTimeout(function() {
    	showPage("customer");
    },700);	
    setTimeout(function() {
    	infoCustomer();
    },500);
}

function loginCustomer(input_customer_email,input_customer_password) {
	var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4 && xhr.status==200) {
				var users = JSON.parse(xhr.responseText);
				var is_auth = 0;
				for (i=1;i<users.length;i++) {
					if (input_customer_email === users[i].email && input_customer_password === users[i].password) {
						var user_id = users[i].id;
						Payment(user_id);
						is_auth = 1;
						var auth = document.getElementById("auth");
						/* https://code.google.com/archive/p/crypto-js */
						var user_id_hash = CryptoJS.MD5(user_id).toString();
						auth.innerHTML = user_id_hash;
						break;
					}
				}
				if (is_auth == 0) {
					alert("Authorization failed!\nE-MAIL or PASSWORD is incorrect!\nTry again!");
				}
			}
		}
	xhr.open("GET","db/profile.json",true);
	xhr.send();	
}

/* payment page*/
/* from https://www.encodedna.com/2012/12/javaScript-accept-only-numbers-textbox.htm */
function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
        if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
            return false;
        return true;
    }   

function Payment(user_id) {
	pageLoader("payment");
	menuLoader("payment");
	setTimeout(function() {
    	pageDisplay("payment");
    },500);
	setTimeout(function() {
    	showPage("payment");
    },700);

    window.onkeyup = function() {
		var inputcard_num = document.querySelector('.payment_card_num_number');
		if (inputcard_num.value.length == 4 || inputcard_num.value.length == 11 || inputcard_num.value.length == 18) {
			inputcard_num.value = inputcard_num.value + '   ';
			}
		}

    setTimeout(function() {
    	document.querySelector(".payment_btn_next").onclick = function(){
    	/* validation of payment card data */
    	var inputcard_num = document.querySelector('.payment_card_num_number');
    	var inputcard_dd = document.querySelector('.payment_card_num_dd');
    	var inputcard_mm = document.querySelector('.payment_card_num_mm');
    	var inputcard_yy = document.querySelector('.payment_card_num_yy');
    	var inputcard_cvv = document.querySelector('.payment_card_num_cvv');
    	var error_out = 'Error in payment card input format!\n\n';
    	if (inputcard_num.value.length !== 25) {error_out = error_out + 'Card NUMBER is invalid!\n'}
    	if (inputcard_dd.value.length !== 2) {error_out = error_out + 'Card expiration DAY is invalid!\n'}
    	if (inputcard_mm.value.length !== 2) {error_out = error_out + 'Card expiration MONTH is invalid!\n'}
    	if (inputcard_yy.value.length !== 4) {error_out = error_out + 'Card expiration YEAR is invalid!\n'}
    	if (inputcard_cvv.value.length !== 3) {error_out = error_out + 'Card CVV security code is invalid!\n'}	
    		var error_out = error_out + '\nCheck the input data!';
    	if (inputcard_num.value.length == 25 &&
    		inputcard_dd.value.length == 2 &&
    		inputcard_mm.value.length == 2 &&
    		inputcard_yy.value.length == 4 &&
    		inputcard_cvv.value.length == 3
    		){ 
    		/* if format payment card is correct */
    		var card = inputcard_num.value;
    		Checkout(user_id,card);
    	}
    		else {alert(error_out);}
    		}
    },500);
}

/* checkout page */
function infoCheckout(user_id,card) {
	/* products in my cart */
	var incart = document.getElementById("cart");
	var id_arr = incart.innerHTML;
	var myid = id_arr.split(",");
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function() {
		if (xhr.readyState==4 && xhr.status==200) {
			var products = JSON.parse(xhr.responseText);
				if (myid.length>1) {
					var price_total = Number(0);
					for (i=1;i<products.length;i++) {
						var product_id = products[i].product_id;
						for (j=1;j<myid.length;j++) {
							if (product_id == myid[j]) {
							var product_image = products[i].product_image;
							var checkout_product_wrapper = document.querySelector('.checkout_product_wrapper');
							/*image wrap*/
							var checkout_image_wrapper = document.createElement("div");
							checkout_image_wrapper.className = 'checkout_image_wrapper checkout_image_'+product_id;
							checkout_product_wrapper.appendChild(checkout_image_wrapper);
							/* image pic */
							var checkout_image = document.createElement("img");
							checkout_image.className = 'checkout_image';
							checkout_image.setAttribute("src","img/"+product_image);
							checkout_image_wrapper.appendChild(checkout_image);

							var product_price = products[i].product_price;
							price_total = Number(price_total) + Number(product_price);
							break;
							}
						}
					}
				}
			}
		/* count products in my cart */
		var checkout_txt_prod = document.querySelector('.checkout_txt_prod');	
		var my_products = myid.length - 1;
		checkout_txt_prod.innerHTML = my_products+' Products';
		/* print my card number*/
		var checkout_txt_card = document.querySelector('.checkout_txt_card');	
		checkout_txt_card.innerHTML = '# '+card;
		/* total sum in order */
		var checkout_total_sum = document.querySelector('.checkout_total_sum');	
		checkout_total_sum.innerHTML = '$ '+price_total+'.00';
		}
	xhr.open("GET","db/product.json",true);
	xhr.send();
	/* customer name and address */
	var xhr_user=new XMLHttpRequest();
	xhr_user.onreadystatechange=function() {
		if (xhr_user.readyState==4 && xhr_user.status==200) {
			var users = JSON.parse(xhr_user.responseText);
			for (i=1;i<users.length;i++) {
				if (user_id === users[i].id) {
					var fullname = users[i].fullname;
					var state = users[i].state;
					var city = users[i].city;
					var postalcode = users[i].postalcode;						
					var address = users[i].address;
					break;
				}
			}
		}
		var checkout_customer_info = document.querySelector('.checkout_customer_info');	
		checkout_customer_info.innerHTML = fullname+'<br>'+state+', '+city+', '+postalcode+'<br>'+address;
	}
	xhr_user.open("GET","db/profile.json",true);
	xhr_user.send();	
} 

function Checkout(user_id,card) {
	pageLoader("checkout");
	menuLoader("checkout");
	setTimeout(function() {
    	pageDisplay("checkout");
    },500);
    setTimeout(function() {
    	showPage("checkout");
    },700);
    setTimeout(function() {
    	infoCheckout(user_id,card);
    },500);
    setTimeout(function() {
    	document.querySelector(".checkout_btn_pay").onclick = function(){Successful()};
    },500);
}

/* successful page */

function Successful() {
	pageLoader("successful");
	menuLoader("successful");
	setTimeout(function() {
    	pageDisplay("successful");
    },500);
    setTimeout(function() {
		var successful_order = document.querySelector('.successful_order');
		var min=1001; 
	    var max=1999;  
	    var random = Math.floor(Math.random() * (+max - +min)) + +min; 
		successful_order.innerHTML = 'Your Order Number: '+random;
    },500);
    setTimeout(function() {
    	showPage("successful");
    },700);
}

/* login page */
function Login() {
	pageLoader("login");
	menuLoader("login");
	setTimeout(function() {
	   	pageDisplay("login");
	},500);
	setTimeout(function() {
		showPage("login");
	},700);
	
	setTimeout(function() {
		var auth = document.getElementById("auth");
		var auth = auth.innerHTML;
		document.querySelector('.login_btn_login').onclick = function(){
			var input_login_email = document.querySelector('.login_email').value;
	    	var input_login_password = document.querySelector('.login_password').value;

	    	var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function() {
				if (xhr.readyState==4 && xhr.status==200) {
					var users = JSON.parse(xhr.responseText);
					var is_auth = 0;
					for (i=1;i<users.length;i++) {
						if (input_login_email === users[i].email && input_login_password === users[i].password) {
							is_auth = 1;
							var auth = document.getElementById("auth");
							/* https://code.google.com/archive/p/crypto-js */
							var user_hash = CryptoJS.MD5(users[i].email+users[i].password).toString();
							auth.innerHTML = user_hash;
							Profile(user_hash);
							break;
						}
					}
					if (is_auth == 0) {
						alert("Authorization failed!\nE-MAIL or PASSWORD is incorrect!\nTry again!");
					}
				}
			}
		xhr.open("GET","db/profile.json",true);
		xhr.send();
		};
		/* new user registration*/
		document.querySelector('.login_btn_new').onclick = function(){Blank()};
	},500);
}

/* profile page */
function Accordion(n) {
	var profile_info_item = document.querySelector('.profile_info_item--active');
	if (profile_info_item) {
		profile_info_item.classList.remove('profile_info_item--active');
		profile_info_item.classList.add('profile_info_item');	
	}
	
	var profile_info = document.querySelectorAll('.profile_info');
	for (i=1;i<profile_info.length;i++) {
		var profile_info_n = document.querySelector('.profile_info_'+i);
		if (i == n) {
			profile_info_n.classList.remove('profile_info_item');
			profile_info_n.classList.add('profile_info_item--active');
		}
	}
}

function myProfile(auth) {
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function() {
		if (xhr.readyState==4 && xhr.status==200) {
			var users = JSON.parse(xhr.responseText);
			var auth = document.getElementById("auth");
			var auth = auth.innerHTML;
			for (i=1;i<users.length;i++) {
				var user_hash = CryptoJS.MD5(users[i].email+users[i].password).toString();
				if (auth === user_hash) {
					/* title */
					var profile_txt_info = document.querySelector('.profile_txt_info');
					profile_txt_info.innerHTML = users[i].fullname;
					
					/* personal */
					var profile_info_personal_fullname = document.querySelector('.profile_info_personal_fullname');
					profile_info_personal_fullname.innerHTML = users[i].fullname;
					var profile_info_personal_email = document.querySelector('.profile_info_personal_email');
					profile_info_personal_email.innerHTML = users[i].email;
					var profile_info_personal_phone = document.querySelector('.profile_info_personal_phone');
					profile_info_personal_phone.innerHTML = users[i].phone;

					document.querySelector('.profile_title_personal').onclick = function() {
						var profile_info_personal = document.querySelector(".profile_info_personal");
						Accordion("1");
					}

					/* favourite */
					document.querySelector('.profile_title_favourite').onclick = function() {
						var profile_info_favourite = document.querySelector(".profile_info_favourite");
						Accordion("2");
					}

					/* card */
					var xhr2 = new XMLHttpRequest();
						xhr2.onreadystatechange = function() {
							var profile_info_card = document.querySelector('.profile_info_card');
							if (this.readyState == 4 && this.status == 200) {
								profile_info_card.innerHTML = xhr2.response;
								setTimeout(function() {
									var paycard = ''; 
	   								var payment_card_num_number = document.querySelector('.payment_card_num_number');
	   								var paycard_num = users[i].paycard;
		   								for (j=0;j<paycard_num.length;j++) {
		   									paycard = paycard + paycard_num[j];
		   									if (j == 3 || j == 7 || j == 11) {paycard = paycard+'&nbsp;&nbsp;&nbsp;&nbsp;';}
		   								}
										payment_card_num_number.innerHTML = paycard;

									var paycard_dmy = users[i].paydate;
										paycard_date = paycard_dmy.split('.');
									var payment_card_num_dd = document.querySelector('.payment_card_num_dd');
										payment_card_num_dd.innerHTML = paycard_date[0];
									var payment_card_num_mm = document.querySelector('.payment_card_num_mm');
										payment_card_num_mm.innerHTML = paycard_date[1];
									var payment_card_num_yy = document.querySelector('.payment_card_num_yy');
										payment_card_num_yy.innerHTML = paycard_date[2];
									var payment_card_num_cvv = document.querySelector('.payment_card_num_cvv');
										payment_card_num_cvv.innerHTML = '...';	
								},1);
							}
						}
						xhr2.open('GET','tpl/card.html',true);
						xhr2.send();

					document.querySelector('.profile_title_card').onclick = function() {
						var profile_info_card = document.querySelector(".profile_info_card");
						Accordion("3");
					}

					/* shipping */
					var profile_info_shipping_address = document.querySelector('.profile_info_shipping_address');
					profile_info_shipping_address.innerHTML = users[i].address;
					var profile_info_shipping_city = document.querySelector('.profile_info_shipping_city');
					profile_info_shipping_city.innerHTML = users[i].city;
					var profile_info_shipping_postalcode = document.querySelector('.profile_info_shipping_postalcode');
					profile_info_shipping_postalcode.innerHTML = users[i].postalcode;
					var profile_info_shipping_state = document.querySelector('.profile_info_shipping_state');
					profile_info_shipping_state.innerHTML = users[i].state;

					document.querySelector('.profile_title_shipping').onclick = function() {
						var profile_info_shipping = document.querySelector(".profile_info_shipping");
						Accordion("4");
					}

					/* account */
					document.querySelector('.profile_title_account').onclick = function() {
						var profile_info_account = document.querySelector(".profile_info_account");
						Accordion("5");
					}
					/**/
					break;
				}
			}
		}
	}
	xhr.open("GET","db/profile.json",true);
	xhr.send();
	document.querySelector('.profile_logout').onclick = function() {
		var auth = document.getElementById("auth");
		auth.innerHTML = '';
		Login();
	}
}

function Profile(auth) {
	pageLoader("profile");
	menuLoader("profile");
	setTimeout(function() {
	   	pageDisplay("profile");
	},500);
	setTimeout(function() {
	   	showPage("profile");
	},700);
	setTimeout(function() {
	   	myProfile(auth);
	},500);
}

/* search */
function Search() {
	prompt('Enter search query');
}

/* blank page */
function Blank() {
	pageLoader("blank");
	menuLoader("blank");
	setTimeout(function() {
    	pageDisplay("blank");
    },700);
	setTimeout(function() {
    	showPage("blank");
    },700);
}

/* developed by Alexey Povzun */