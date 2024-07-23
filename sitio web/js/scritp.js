document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const products = document.querySelectorAll('.product');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const invoiceDetails = document.getElementById('invoice-details');
    const checkoutButton = document.querySelector('.checkout');

    products.forEach(product => {
        product.querySelector('.add-to-cart').addEventListener('click', () => {
            const productId = product.dataset.id;
            const productName = product.dataset.name;
            const productPrice = parseFloat(product.dataset.price);
            addToCart(productId, productName, productPrice);
        });
    });

    checkoutButton.addEventListener('click', generateInvoice);

    function addToCart(id, name, price) {
        const item = cart.find(product => product.id === id);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <span>${item.name} - $${item.price} x ${item.quantity}</span>
                <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
            `;
            cartItems.appendChild(li);

            li.querySelector('.remove-from-cart').addEventListener('click', () => {
                removeFromCart(item.id);
            });
        });

        cartTotal.textContent = total.toFixed(2);
    }

    function removeFromCart(id) {
        const itemIndex = cart.findIndex(product => product.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
        }
        renderCart();
    }

    function generateInvoice() {
        let invoiceHTML = '<h3>Detalles de la Factura</h3>';
        invoiceHTML += '<ul>';

        cart.forEach(item => {
            invoiceHTML += `<li>${item.name} - $${item.price} x ${item.quantity}</li>`;
        });

        invoiceHTML += '</ul>';
        invoiceHTML += `<p>Total: $${cartTotal.textContent}</p>`;

        invoiceDetails.innerHTML = invoiceHTML;
        alert('Compra realizada con éxito. Factura generada.');
    }
});