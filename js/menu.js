function menuLoader(menuPage,catid)
{
	setTimeout(function() {
	    var navibar = document.querySelector(".navibar_wrapper");
		navibar.classList.remove('navibar_wrapper--active');
		navibar.classList.add('navibar_wrapper--hidden');	
    },1);
	
	setTimeout(function() {

		if (menuPage == "homepage") {
			var navibar = document.getElementById("navibar");
				navibar.classList.remove('navibar_clear');
				navibar.classList.add('navibar_base');

			var icon_close = document.querySelector(".navibar_icon_close");
				icon_close.classList.remove('navibar_icon');
				icon_close.classList.add('navibar_icon--hidden');
			
			var icon_back = document.querySelector(".navibar_icon_back");
				icon_back.classList.remove('navibar_icon');
				icon_back.classList.add('navibar_icon--hidden');

			var icon_search = document.querySelector(".navibar_icon_search--right");
			if (icon_search) {
				icon_search.classList.remove('navibar_icon_search--right');
				icon_search.classList.add('navibar_icon_search');
			}
		}

		if (menuPage == "categories") {
			var navibar = document.getElementById("navibar");
				navibar.classList.remove('navibar_clear');
				navibar.classList.add('navibar_base');

			var icon_close = document.querySelector(".navibar_icon_close");
				icon_close.classList.remove('navibar_icon');
				icon_close.classList.add('navibar_icon--hidden');
			
			var icon_back = document.querySelector(".navibar_icon_back");
				icon_back.classList.remove('navibar_icon--hidden');
				icon_back.classList.add('navibar_icon');
			
			var icon_search = document.querySelector(".navibar_icon_search");
			if (icon_search) {
				icon_search.classList.remove('navibar_icon_search');
				icon_search.classList.add('navibar_icon_search--right');
			}	

			document.querySelector(".navibar_icon_back").onclick = function() {
				backPage("categories");
				prepHomepage();
			}	
		}

		if (menuPage == "items") {
			var navibar = document.getElementById("navibar");
				navibar.classList.remove('navibar_clear');
				navibar.classList.add('navibar_base');

			var icon_close = document.querySelector(".navibar_icon_close");
				icon_close.classList.remove('navibar_icon');
				icon_close.classList.add('navibar_icon--hidden');
			
			var icon_back = document.querySelector(".navibar_icon_back");
				icon_back.classList.remove('navibar_icon--hidden');
				icon_back.classList.add('navibar_icon');
			
			var icon_search = document.querySelector(".navibar_icon_search");
			if (icon_search) {
				icon_search.classList.remove('navibar_icon_search');
				icon_search.classList.add('navibar_icon_search--right');
			}

			document.querySelector(".navibar_icon_back").onclick = function() {
				backPage("items");
				prepCategories();
			}	
		}

		if (menuPage == "product") {
			var navibar = document.getElementById("navibar");
				navibar.classList.remove('navibar_base');
				navibar.classList.add('navibar_clear');

			var icon_close = document.querySelector(".navibar_icon_close");
				icon_close.classList.remove('navibar_icon--hidden');
				icon_close.classList.add('navibar_icon');

			var icon_back = document.querySelector(".navibar_icon_back");
				icon_back.classList.remove('navibar_icon');
				icon_back.classList.add('navibar_icon--hidden');

			var icon_search = document.querySelector(".navibar_icon_search");
			if (icon_search) {
				icon_search.classList.remove('navibar_icon_search');
				icon_search.classList.add('navibar_icon_search--right');
			}

			document.querySelector(".navibar_icon_close").onclick = function() {
				backPage("product");
				prepItems(catid);
			}
		}

		if (menuPage == "blank") {
			var navibar = document.getElementById("navibar");
				navibar.classList.remove('navibar_base');
				navibar.classList.add('navibar_clear');

			var icon_close = document.querySelector(".navibar_icon_close");
				icon_close.classList.remove('navibar_icon--hidden');
				icon_close.classList.add('navibar_icon');

			var icon_back = document.querySelector(".navibar_icon_back");
			if (icon_back) {
				icon_back.classList.remove('navibar_icon');
				icon_back.classList.add('navibar_icon--hidden');
			}
					
			var icon_search = document.querySelector(".navibar_icon_search");
			if (icon_search) {
				icon_search.classList.remove('navibar_icon');
				icon_search.classList.add('navibar_icon--hidden');	
			}
		
			var icon_account = document.querySelector(".navibar_icon_account");
			if (icon_account) {
				icon_account.classList.remove('navibar_icon');
				icon_account.classList.add('navibar_icon--hidden');
			}

			var icon_cart = document.querySelector(".navibar_icon_cart");
			if (icon_cart) {
				icon_cart.classList.remove('navibar_icon');
				icon_cart.classList.add('navibar_icon--hidden');
			}

			var cart_count = document.querySelector(".cart_count");
			if (cart_count) {
				cart_count.classList.remove('cart_count--active');
				cart_count.classList.add('cart_count--hidden');
			}

			document.querySelector(".navibar_icon_close").onclick = function() {
				backPage("blank");
				prepHomepage();
				setTimeout(function() {
					var navibar = document.getElementById("navibar");
						navibar.classList.remove('navibar_clear');
						navibar.classList.add('navibar_base');

					var icon_search = document.querySelector(".navibar_icon_search");
					if (icon_search) {
						icon_search.classList.remove('navibar_icon--hidden');
						icon_search.classList.add('navibar_icon');	
					}

					var icon_account = document.querySelector(".navibar_icon_account");
						icon_account.classList.remove('navibar_icon--hidden');
						icon_account.classList.add('navibar_icon');

					var icon_cart = document.querySelector(".navibar_icon_cart");
						icon_cart.classList.remove('navibar_icon--hidden');
						icon_cart.classList.add('navibar_icon');

					var cart_count = document.querySelector(".cart_count");
					if (cart_count.innerHTML !== "0") {
						cart_count.classList.remove('cart_count--hidden');
						cart_count.classList.add('cart_count--active');
					}
				},500);	
			}
		}

		if (menuPage == "mycart") {
			var navibar = document.getElementById("navibar");
				navibar.classList.remove('navibar_base');
				navibar.classList.add('navibar_clear');

			var icon_close = document.querySelector(".navibar_icon_close");
				icon_close.classList.remove('navibar_icon--hidden');
				icon_close.classList.add('navibar_icon');

			var icon_back = document.querySelector(".navibar_icon_back");
				icon_back.classList.remove('navibar_icon');
				icon_back.classList.add('navibar_icon--hidden');

			var icon_search = document.querySelector(".navibar_icon_search");
				if (icon_search) {
					icon_search.classList.remove('navibar_icon');
					icon_search.classList.add('navibar_icon--hidden');
				}

			var icon_search = document.querySelector(".navibar_icon_search--right");
				if (icon_search) {
					icon_search.classList.remove('navibar_icon');
					icon_search.classList.add('navibar_icon--hidden');	
				}

			var icon_account = document.querySelector(".navibar_icon_account");
				icon_account.classList.remove('navibar_icon');
				icon_account.classList.add('navibar_icon--hidden');

			var icon_cart = document.querySelector(".navibar_icon_cart");
				icon_cart.classList.remove('navibar_icon');
				icon_cart.classList.add('navibar_icon--hidden');

			var cart_count = document.querySelector(".cart_count");
				cart_count.classList.remove('cart_count--active');
				cart_count.classList.add('cart_count--hidden');

			document.querySelector(".navibar_icon_close").onclick = function() {
				backPage("mycart");
				var cart_count = document.querySelector(".cart_count");
					if (cart_count.innerHTML !== "0") {
						prepItems(catid);
					} else {
						prepCategories();
					}
				

				setTimeout(function() {
					var navibar = document.getElementById("navibar");
						navibar.classList.remove('navibar_clear');
						navibar.classList.add('navibar_base');

					var icon_search = document.querySelector(".navibar_icon_search");
					if (icon_search) {
						icon_search.classList.remove('navibar_icon--hidden');
						icon_search.classList.add('navibar_icon');
					}

					var icon_search = document.querySelector(".navibar_icon_search--right");
					if (icon_search) {
						icon_search.classList.remove('navibar_icon--hidden');
						icon_search.classList.add('navibar_icon');	
					}
							
					var icon_account = document.querySelector(".navibar_icon_account");
						icon_account.classList.remove('navibar_icon--hidden');
						icon_account.classList.add('navibar_icon');

					var icon_cart = document.querySelector(".navibar_icon_cart");
						icon_cart.classList.remove('navibar_icon--hidden');
						icon_cart.classList.add('navibar_icon');

					var cart_count = document.querySelector(".cart_count");
					if (cart_count.innerHTML !== "0") {
						cart_count.classList.remove('cart_count--hidden');
						cart_count.classList.add('cart_count--active');
					}
				},500);	
			}
		}

		if (menuPage == "profile" || menuPage == "login") {
			var navibar = document.getElementById("navibar");
				navibar.classList.remove('navibar_base');
				navibar.classList.add('navibar_clear');

			var icon_close = document.querySelector(".navibar_icon_close");
				icon_close.classList.remove('navibar_icon');
				icon_close.classList.add('navibar_icon--hidden');
			
			var icon_back = document.querySelector(".navibar_icon_back");
				icon_back.classList.remove('navibar_icon--hidden');
				icon_back.classList.add('navibar_icon');
			
			var icon_search = document.querySelector(".navibar_icon_search");
				if (icon_search) {
					icon_search.classList.remove('navibar_icon');
					icon_search.classList.add('navibar_icon--hidden');
				}

			var icon_search = document.querySelector(".navibar_icon_search--right");
				if (icon_search) {
					icon_search.classList.remove('navibar_icon');
					icon_search.classList.add('navibar_icon--hidden');
				}

			var icon_account = document.querySelector(".navibar_icon_account");
				if (icon_account) {
					icon_account.classList.remove('navibar_icon');
					icon_account.classList.add('navibar_icon--hidden');
				}

			var icon_cart = document.querySelector(".navibar_icon_cart");
				icon_cart.classList.remove('navibar_icon');
				icon_cart.classList.add('navibar_icon--hidden');

			var cart_count = document.querySelector(".cart_count");
				cart_count.classList.remove('cart_count--active');
				cart_count.classList.add('cart_count--hidden');

			document.querySelector(".navibar_icon_back").onclick = function() {
				if (menuPage == "profile") {backPage("profile");}
				if (menuPage == "login") {backPage("login");}
				prepHomepage();
				setTimeout(function() {
					var navibar = document.getElementById("navibar");
						navibar.classList.remove('navibar_clear');
						navibar.classList.add('navibar_base');

					var icon_search = document.querySelector(".navibar_icon_search");
						if (icon_search) {
							icon_search.classList.remove('navibar_icon--hidden');
							icon_search.classList.add('navibar_icon');
						}

					var icon_search = document.querySelector(".navibar_icon_search--right");
						if (icon_search) {
							icon_search.classList.remove('navibar_icon--hidden');
							icon_search.classList.add('navibar_icon');
						}

					var icon_account = document.querySelector(".navibar_icon_account");
						icon_account.classList.remove('navibar_icon--hidden');
						icon_account.classList.add('navibar_icon');

					var icon_cart = document.querySelector(".navibar_icon_cart");
						icon_cart.classList.remove('navibar_icon--hidden');
						icon_cart.classList.add('navibar_icon');

					var cart_count = document.querySelector(".cart_count");
					if (cart_count.innerHTML !== "0") {
						cart_count.classList.remove('cart_count--hidden');
						cart_count.classList.add('cart_count--active');
					}
				},500);	
			}
		}

		if (menuPage == "customer") {
			var navibar = document.getElementById("navibar");
				navibar.classList.remove('navibar_base');
				navibar.classList.add('navibar_clear');

			var icon_close = document.querySelector(".navibar_icon_close");
				icon_close.classList.remove('navibar_icon');
				icon_close.classList.add('navibar_icon--hidden');
			
			var icon_back = document.querySelector(".navibar_icon_back");
				icon_back.classList.remove('navibar_icon--hidden');
				icon_back.classList.add('navibar_icon');
			
			var icon_search = document.querySelector(".navibar_icon_search");
			if (icon_search) {
				icon_search.classList.remove('navibar_icon_search');
				icon_search.classList.add('navibar_icon_search--hidden');
			}

			document.querySelector(".navibar_icon_back").onclick = function() {
				backPage("customer");
				Cart();
			}
		}

		if (menuPage == "payment") {
			var navibar = document.getElementById("navibar");
				navibar.classList.remove('navibar_base');
				navibar.classList.add('navibar_clear');

			var icon_close = document.querySelector(".navibar_icon_close");
				icon_close.classList.remove('navibar_icon');
				icon_close.classList.add('navibar_icon--hidden');
			
			var icon_back = document.querySelector(".navibar_icon_back");
				icon_back.classList.remove('navibar_icon--hidden');
				icon_back.classList.add('navibar_icon');
			
			var icon_search = document.querySelector(".navibar_icon_search");
			if (icon_search) {
				icon_search.classList.remove('navibar_icon_search');
				icon_search.classList.add('navibar_icon_search--hidden');
			}

			document.querySelector(".navibar_icon_back").onclick = function() {
				backPage("payment");
				Customer();
			}
		}

		if (menuPage == "checkout") {
			var navibar = document.getElementById("navibar");
				navibar.classList.remove('navibar_base');
				navibar.classList.add('navibar_clear');

			var icon_close = document.querySelector(".navibar_icon_close");
				icon_close.classList.remove('navibar_icon');
				icon_close.classList.add('navibar_icon--hidden');
			
			var icon_back = document.querySelector(".navibar_icon_back");
				icon_back.classList.remove('navibar_icon--hidden');
				icon_back.classList.add('navibar_icon');
			
			var icon_search = document.querySelector(".navibar_icon_search");
			if (icon_search) {
				icon_search.classList.remove('navibar_icon_search');
				icon_search.classList.add('navibar_icon_search--hidden');
			}

			document.querySelector(".navibar_icon_back").onclick = function() {
				backPage("checkout");
				Payment();
			}
		}

		if (menuPage == "successful") {
			var navibar = document.getElementById("navibar");
				navibar.classList.remove('navibar_wrapper--active');
				navibar.classList.add('navibar_wrapper--hidden');

			document.querySelector(".navibar_icon_back").onclick = function() {
				console.log('OK');
			}
		}

	},500);

	setTimeout(function() {
	    var navibar = document.querySelector(".navibar_wrapper");
		navibar.classList.remove('navibar_wrapper--hidden');
		navibar.classList.add('navibar_wrapper--active');	
    },500);

	var icon_search = document.querySelector(".navibar_icon_search");
		if (icon_search) {
			icon_search.onclick = function() {Search();} 
		}

	var icon_search = document.querySelector(".navibar_icon_search--right");
		if (icon_search) {
			icon_search.onclick = function() {Search();} 
		}		

	document.querySelector(".navibar_icon_cart").onclick = function() {Cart(catid);} 

	var auth = document.getElementById("auth");
	var auth = auth.innerHTML;
	if (auth == 0) {
		document.querySelector(".navibar_icon_account").onclick = function() {Login();} 
		}
		else {
		document.querySelector(".navibar_icon_account").onclick = function() {Profile(auth);}
	}
	 
}