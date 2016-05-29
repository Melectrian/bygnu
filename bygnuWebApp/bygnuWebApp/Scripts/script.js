console.log("RENDER SCRIPT");

var cookieHandler = function () {

    var setCookie = function (name, data) {
        document.cookie = name + "=" + data + "; Path=/;";
    };

    var removeCookie = function (name) {
        document.cookie = name + '=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    var getCookie = function (name) {

        var result = null;
        var pairs = document.cookie.split('; ');

        $(pairs).each(function (index, element) {

            var pair = element.split('=');

            if (pair[0] === name) {
                result = pair[1];
            }

        });

        return result;

    };

    var hasCookie = function (name) {

        if (getCookie(name) === null)
            return false;
        else
            return true;

    };

    return {
        setCookie: setCookie,
        removeCookie: removeCookie,
        getCookie: getCookie,
        hasCookie: hasCookie
    }

}

var ProductHandler = function () {

    var container;

    var init = function (container) {
        this.container = container;
    }

    var productCount = function () {

        return $(this.container).children().length;

    }

    var createProduct = function (title, price, description) {

        var nodeElem = $('<div></div>');
        var articleElem = $('<article></article>');
        var titleElem = $('<h2></h2>');
        var mediaElem = $('<img src="http://localhost:53868/Content/img/offer.jpg"/>');
        var descriptionElem = $('<p></p>');
        var priceElem = $('<p></p>');
        var boxElem = $('<div></div>');
        var aboutElem = $('<a>Read more</a>');
        var cartElem = $('<button>Buy</button>');

        nodeElem
            .addClass('col-sm-6')
            .addClass('col-md-4')
            .addClass('col-lg-4');

        articleElem.addClass('offer');

        titleElem.addClass('offer__title');
        $(titleElem).text(title);

        mediaElem.addClass('offer__media');

        descriptionElem.addClass('offer__description');
        $(descriptionElem).text(description);

        priceElem.addClass('offer__price');
        $(priceElem).text(price);

        boxElem.addClass('offer__link-box');

        aboutElem
            .addClass('offer__about')
            .addClass('link')
            .addClass('pull-left');
        cartElem
            .addClass('offer__cart')
            .addClass('btn')
            .addClass('pull-right');

        $(boxElem)
            .append(aboutElem)
            .append(cartElem);

        $(articleElem)
            .append(titleElem)
            .append(mediaElem)
            .append(descriptionElem)
            .append(priceElem)
            .append(boxElem);

        $(nodeElem)
            .append(articleElem);

        $(this.container).append(nodeElem);

    }

    var getCategory = function () {
        return $(this.container).data('category');
    }

    return {
        init: init,
        productCount: productCount,
        getCategory: getCategory,
        createProduct: createProduct
    }
}

var ph = new ProductHandler();
ph.init('#product_container');

$("#product_load").click(function () {

    $.ajax({

        url: '/Home/Show',
        type: 'POST',
        datatype: 'jsonp',
        accept: 'application/json',
        data: {
            skip: ph.productCount(),
            category: ph.getCategory()
        },
        success: function (data) {

            $(data).each(function () {

                ph.createProduct(this.name, this.price, this.description);

            });

        },
        error: function () {

            alert('A terrible error has happened =(');

        }

    });

});

(function () {

    var eventTrigger = $('.offer__cart');
    var cartModalElem = $('#cart_modal');
    var idElem = $('#cart_modal__id');
    var nameElem = $('#cart_modal__product_name');
    var completeElem = $('#cart_modal__complete');
    var qtyElem = $('#cart_modal__quantity');

    eventTrigger.click(function () {

        idElem.text($(this)
            .closest('.offer')
            .find('.offer__id')
            .text());

        nameElem.text($(this)
            .closest('.offer')
            .find('.offer__title')
            .text());

        cartModalElem.show();

    });

    cartModalElem.find('.modal__close').click(function () {
        
        cartModalElem.hide();
        qtyElem.val(1);

    });

    completeElem.click(function (event) {

        var id = idElem.text();
        var name = nameElem.text();
        var qty = parseInt(qtyElem.val());

        var cart = cartHandler();
        cart.addToCart(id, name, qty);
        $('.m-cart__count').text( parseInt( $('.m-cart__count').text() ) + qty );

        cartModalElem.hide();
        qtyElem.val(1);

    });

})();

var cartHandler = function () {

    var cookies = new cookieHandler();

    var addToCart = function (id, name, qty) {

        if (!cookies.hasCookie('data')) {

            cookies.setCookie('data', JSON.stringify({

                cart: []

            }));

        }

        var data = JSON.parse(cookies.getCookie('data'));

        var flag = true;

        data.cart.forEach(function (element, index, array) {

            if (element.id === id) {

                element.qty += qty;
                flag = !flag;

            }

        });

        if (flag) {

            data.cart.push({
                id: id,
                name: name,
                qty: qty
            });

        }

        cookies.setCookie('data', JSON.stringify(data));

    }

    var removeFromCart = function (id) {

        if (cookies.hasCookie('data')) {

            var data = JSON.parse(cookies.getCookie('data'));

            data.cart.forEach(function (element, index, array) {

                if (element.id === id) {

                    data.cart.splice(index, 1);
                    cookies.setCookie('data', JSON.stringify(data));

                }
            });

        }

    }

    var setItemQty = function (id, qty) {

        if (cookies.hasCookie('data')) {

            var data = JSON.parse(cookies.getCookie('data'));

            data.cart.forEach(function (element, index, array) {

                if (element.id === id) {

                    element.qty = qty;
                    cookies.setCookie(JSON.stringify(data));

                }
            });

        }

    }

    var getTotalQty = function () {

        var totalQty = 0;

        if (cookies.hasCookie('data')) {

            var items = getCartItems();

            items.forEach(function (element, index, array) {

                totalQty = totalQty + element.qty;
                
            });

        }

        return totalQty;

    }

    var getCartItems = function () {

        if (cookies.hasCookie('data')) {

            return JSON.parse(cookies.getCookie('data')).cart;

        } else {
            return [];
        }

    }

    var emptyCart = function () {

        if (cookies.hasCookie('data')) {

            cookies.removeCookie('data');

        }

    }

    return {
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        setItemQty: setItemQty,
        getTotalQty: getTotalQty,
        getCartItems: getCartItems,
        emptyCart: emptyCart
    }

};

(function () {

    var cart = new cartHandler();
    var items = cart.getCartItems();

    $('.m-cart__count').text(cart.getTotalQty());

    $(items).each(function (index, elem) {

        var cartItemElem = $('<article></article>');
        var productName = $('<p></p>');
        var idInput = $('<input />');
        var qtyInput = $('<input />');
        var removeItemElem = $('<button></button>');

        cartItemElem
            .addClass('cart__item')
            .addClass('box');

        productName
            .addClass('cart__title')
            .addClass('dispaly-inline-block');

        idInput
            .prop('type', 'hidden')
            .prop('name', 'id');

        qtyInput
            .addClass('form__field')
            .addClass('form__field--select')
            .prop('type', 'number')
            .prop('name', 'qty');

        removeItemElem
            .addClass('btn');
        
        productName.text(elem.name);
        qtyInput.val(elem.qty);
        idInput.val(elem.id);
        removeItemElem.text('X');

        cartItemElem.append(productName);
        cartItemElem.append(idInput);
        cartItemElem.append(qtyInput);
        cartItemElem.append(removeItemElem);

        $(removeItemElem).click(function () {
            
            cart.removeFromCart(elem.id)
            cartItemElem.remove();
            $('.m-cart__count').text(cart.getTotalQty());

        });

        $('.cart form').append(cartItemElem);

    });

    $('#order_complete').click(function (e) {

        //cart.emptyCart();
        //$('.m-cart__count').text('0');

    });

})();

var Cookies = new cookieHandler();
var Cart = new cartHandler();