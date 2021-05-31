const catalogItem = {
    render(goodCat) {
        return `<div id="catalog__block" class="good">
                    <img class="imgItem" id="${goodCat.id}" src=${goodCat.imagee}>
                    <div ><b>Наименование</b>: ${goodCat.product_name}</div>
                    <div><b>Стоимость</b>: ${goodCat.price}</div>
                    <button id="${goodCat.id}" class="testbutton">Купить</button>
                </div > `;
    }
}



const cart = {
    cartListBlock: null,
    catalogListBlock: null,
    cartButton: null,
    catalogItem,
    testButton: null,
    modalBlock: null,
    goods: [
        {
            id: 123,
            product_name: 'Ноутбук',
            price: 45600,
            quantity: 1,
            image: "min/1.jpg",

        },
        {
            id: 456,
            product_name: 'Мышка',
            price: 1000,
            quantity: 1,
            image: "min/2.jpg",


        },
        {
            id: 305,
            product_name: 'Клавиатура',
            price: 2000,
            quantity: 1,
            image: "min/3.jpg",

        },
    ],
    goodsCart: [],
    imgMas: [],

    init(catalogBlockClass, cart) {
        this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
        this.cart = cart
        this.cartListBlock = document.querySelector('.cart-list');
        this.cartButton = document.querySelector('.cart-btn');
        this.cartButton.addEventListener('click', this.clearCart.bind(this));

        this.catalogListBlock = document.querySelector(".catalog")
        this.modalBlock = document.querySelector("body")
        this.renderCatalog();

        document.getElementById("catalog_block")
            .addEventListener('click', event => {
                if (event.target.className === 'testbutton') {
                    this.addToCart()
                }
            });
        this.render()

        document.getElementById("catalog_block")
            .addEventListener('click', event => {
                if (event.target.className === 'imgItem') {
                    this.startGallery()
                }
            });

        this.t = 0
    },
    startGallery() {
        this.modalBlock.classList.remove("hidden");
        this.imgMas.push(Object.assign({}, this.goods.find(item => item.id === Number(event.target.id)).images));
        console.log(Object.values(this.imgMas[0]));
        this.imgMas = Object.values(this.imgMas[0])
        this.createModal()
    },
    createModal() {

        this.modalBlock.insertAdjacentHTML("beforeend", `<div class="image__block">
        <button class="left__button">Пред</button>
        <img src="${this.imgMas[this.t]}" class="img">
        <button class="right__button">След</button>
        <button class="close__button">X</button>
        </div> `)
        this.modalBlock = document.querySelector(".image__block")
        imgButtonLeft = document.querySelector(".left__button")
        imgButtonLeft.addEventListener("click", this.minus.bind(this))
        let imgButtonRight = document.querySelector(".right__button")
        imgButtonRight.addEventListener("click", this.plus.bind(this))
        let imgCloseButton = document.querySelector(".close__button")
        imgCloseButton.addEventListener("click", this.endGallery.bind(this))
    },
    plus() {
        this.t += 1
        console.log(this.t);
        if (this.t === this.imgMas.length) {
            this.t = 0
        }
        this.modalBlock.textContent = ""
        this.createModal()
    },
    minus() {
        console.log(this.t);
        this.t -= 1
        if (this.t < 0) {
            this.t = 3
        }
        this.modalBlock.textContent = ""
        this.createModal()
    },
    endGallery() {
        this.imgMas = []
        this.modalBlock.textContent = ""
        this.modalBlock.classList.toggle("hidden");
        this.t = 0
    },
    render() {
        this.cartListBlock.textContent = ''
        if (this.goodsCart.length === 0) {
            this.cartListBlock.textContent = 'Корзина пуста'
        } else {
            this.cartListBlock.insertAdjacentHTML("beforeend", `<div class="cart-list"></div>`)
            let cartBlockBox = document.querySelector(".cart-list")

            for (let key in this.goodsCart) {
                cartBlockBox.insertAdjacentHTML("beforeend", `<div class="items"></div>
                    <p id="${this.goodsCart[key].id}">Название товара: ${this.goodsCart[key].product_name}</p>
                    <p>Цена на товар: ${this.goodsCart[key].price}</p>
                    <p>Количество: ${this.goodsCart[key].quantity}</p>`)
            }
            let cartInfo = document.querySelector(".cart-list")
            cartInfo.insertAdjacentHTML("beforeend", `<p class="total__info">В вашей корзине ${this.goodsCart.length} позиций ${this.getCartQuantity()} товаров по цене <b>${this.getCartPrice()}</b></p>`)

        }
    },
    renderCatalog() {
        this.goods.forEach(goodCat => {
            this.catalogListBlock.insertAdjacentHTML('beforeend', this.catalogItem.render(goodCat))
        })
    },
    getCartPrice() {
        return this.goodsCart.reduce(function (price, good) {
            return price + good.price * good.quantity;
        }, 0);
    },
    getCartQuantity() {
        return this.goodsCart.reduce((totalPrice, cartItem) => totalPrice + cartItem.quantity, 0)
    },

    addToCart() {
        if (this.goodsCart.find(item => item.id === Number(event.target.id)) === undefined) {


            this.goodsCart.push(Object.assign({}, this.goods.find(item => item.id === Number(event.target.id))))
            console.log(this.goodsCart)
            this.render()
        } else {
            console.log(this.goodsCart.find(item => item.id === Number(event.target.id)))
            console.log(this.goods.find(item => item.id === Number(event.target.id)))
            this.goodsCart.find(item => item.id === Number(event.target.id)).quantity += 1
            this.render()
        }
    },
    clearCart() {

        this.goodsCart = []
        this.render()
    }

};

cart.init('catalog', cart);