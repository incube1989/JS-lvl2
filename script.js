const cats = [
  { name: "cat1", price:"100$"},
  { name: "cat2", price:"200$"},
  { name: "cat3", price:"300$"},
  { name: "cat4"},
];

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class Cat{
  constructor(name, price, img ="images/cat_image1.jpg", info = "lorem", quantity = 0) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.info = info;
    this.quantity = 0;
    this.id = name; //TODO: add standard uuid generator here
  }

  renderItem = () => {
    return `<div class="list_item">
              <img class="item_image" src=${this.img}>
              <div>
                <p class="item_name">${this.name}</p>
                <p class="item_price">${this.price}$</p>
                <button class="add_button">Add</button>
              </div>
            </div>`;
  };

}

class Api {

}

class Basket { 
  constructor() {
    this.items = [];
    this.totalPrice = 0;
    updatePrice();
  }

  length(){
    return this.items.length;
  }

  addToBasket(item, quantity = 1){
    let i = this.items.findIndex(element => element.id == item.id);
    if (i) {
      this.items[i].quantity += quantity;
    } 
    else{
      let j = this.items.push(item);
      this.items[j].quantity = quantity
    }
    this.totalPrice += item.price * quantity;
    this.updatePrice();
  }

  updatePrice(){
    //TODO: update price on web page
  }

  removeFromBasket(item, quantity = -1){
    let i = this.items.findIndex(element => element.id == item.id);
    let resultRemoval = quantity;
    let oldQuantity = this.items[i].quantity;
    let oldPrice = this.items[i].price;
    this.items[i] -= quantity;

    if (quantity == -1 || this.items[i]<=0) {
      resultRemoval = oldQuantity;
      this.item.splice(i,1);

    } 
    this.totalPrice -= oldPrice * resultRemoval;
    this.updatePrice()
  }



  recalculatePrice(){
    var result = 0;
    this.items.forEach(item => result += item.price * item.quantity);
    return result;
  }

}

class GoodsList{
  constructor() {
    this.list = [];
    this.url = API_URL;
    this.fetchPromise()
      .then((data) => {this.onFetchSuccess(data)})
      .catch((err) => {this.onFetchError(err)});
  }

  onFetchSuccess(data) {
    this.list = data.map(({product_name, price}) => new Cat(product_name, price));
    this.render();
  }

  onFetchError(err) {
    console.error(err);
  }

  render(){
    const $goodsListNode = document.querySelector('.listing');
    var item_list = '';
    this.list.forEach(item => {
      item.name = item.product_name;
      let currentCat = new Cat(item)
      item_list+=currentCat.renderItem();
    });
    console.log (item_list);
    $goodsListNode.insertAdjacentHTML('beforeend', item_list);
  }

  fetch(error, success) {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status == 200){
          success(JSON.parse(xhr.responceText));
        } else if (xhr.status >= 400){
          error();
        }
      }
    }
    console.log(this.url);
    xhr.open('GET', this.url, true);
    xhr.send();
  }
  
  fetchPromise (){
    return new Promise((resolve, reject) => {this.fetch(reject, resolve)});
  }
}







let goodsList = new GoodsList();
