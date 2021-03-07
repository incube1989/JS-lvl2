const cats = [
  { name: "cat1", price:"100$"},
  { name: "cat2", price:"200$"},
  { name: "cat3", price:"300$"},
  { name: "cat4"},
];


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
    let i = this.items.findIndex(element => return element.id == item.id);
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

  updatePrice (){
    //TODO: update price on web page
  }

  removeFromBasket(item, quantity = -1){
    let i = this.items.findIndex(element => return element.id == item.id);
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


  recalculatePrice()={
    var result = 0;
    this.items.forEach(item => result += item.price * item.quantity);
    return result;
  }
  
}

const $goodsList = document.querySelector('.listing');


const renderItemList = (list) => {
  var item_list = '';
  list.forEach(item => item_list+=renderItem(item));
  console.log (item_list);
  $goodsList.insertAdjacentHTML('beforeend', item_list);
}

renderItemList(cats);