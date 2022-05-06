Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<section class="products container">
                <h2 class="products__title">Featured Items</h2>
                <p class="products__subtitle">Shop for items based on what we featured this week</p>
                <div class="products__catalog">
                    <ul class="products__list">
                        <product v-for="item of filtered" 
                        :key="item.id_product" 
                        :img="item.product_image"
                        :product="item"
                    @add-product="$parent.$refs.cart.addProduct"></product>
                </ul>
                </div>
                </section>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <li class="products__item">
        <div class="products__item-wrp">
            <div class="products__cart-wrp">
                <div class="products__cart-overlay">
                    <button class="products__cart-button" @click="$root.$refs.cart.addProduct(product)">
                        <span class="products__cart-text"> Add to Cart
                        </span>
                    </button>
                </div>
                <img :src="img" :alt="product.product_name">
            </div>
            <div class="products__item-info">
                <h3 class="products__item-title">{{ product.product_name }}</h3>
                <p class="products__item-text">{{ product.product_description }}</p>
                <p class="products__item-price">$ {{ product.price }}</p>
            </div>
        </div>
    </li>
    `
})