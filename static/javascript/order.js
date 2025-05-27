//Quantity selector
    // document.addEventListener('DOMContentLoaded', function() {
    //     document.querySelectorAll('.quantity-selector').forEach(function(selector) {
    //         const minus = selector.querySelector('.minus');
    //         const plus = selector.querySelector('.plus');
    //         const quantity = selector.querySelector('.quantity');
    //         minus.addEventListener('click', function() {
    //             let val = parseInt(quantity.textContent, 10);
    //             if (val > 1) quantity.textContent = val - 1;
    //         });
    //         plus.addEventListener('click', function() {
    //             let val = parseInt(quantity.textContent, 10);
    //             quantity.textContent = val + 1;
    //         });
    //     });
    // });
// Add to cart
document.addEventListener('DOMContentLoaded', function() {
    // ...existing quantity selector code...
        document.querySelectorAll('.quantity-selector').forEach(function(selector) {
            const minus = selector.querySelector('.minus');
            const plus = selector.querySelector('.plus');
            const quantity = selector.querySelector('.quantity');
            minus.addEventListener('click', function() {
                let val = parseInt(quantity.textContent, 10);
                if (val > 1) quantity.textContent = val - 1;
            });
            plus.addEventListener('click', function() {
                let val = parseInt(quantity.textContent, 10);
                quantity.textContent = val + 1;
            });
        });
    // Cart logic
    const cart = {};
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');

    document.querySelectorAll('.card-1').forEach(function(card, idx) {
        const addToCartBtn = card.querySelector('.add-to-cart');
        const itemName = card.querySelector('h3').textContent.trim();
        const priceText = card.querySelector('p:nth-of-type(2)').textContent;
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        const quantitySpan = card.querySelector('.quantity');

        addToCartBtn.addEventListener('click', function() {
            const qty = parseInt(quantitySpan.textContent, 10);
            if (qty > 0) {
                cart[itemName] = cart[itemName] || { qty: 0, price: price };
                cart[itemName].qty += qty;
                updateCart();
                quantitySpan.textContent = 0; // Reset quantity after adding
            }
        });
    });

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        for (const [name, data] of Object.entries(cart)) {
            if (data.qty > 0) {
                const li = document.createElement('li');
                li.textContent = `${name} x ${data.qty} = $${(data.qty * data.price).toFixed(2)}`;
                cartItemsList.appendChild(li);
                total += data.qty * data.price;
            }
        }
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }
});