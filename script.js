const cats = [
  { name: "cat1", price:"100$"},
  { name: "cat2", price:"200$"},
  { name: "cat3", price:"300$"},
  { name: "cat4", price:"400$"},

]

const $goodsList = document.querySelector('.listing');


const renderItem = ({name = "cat", price ="Call to learn the price"}) => {
  return `<div class="list_item">
            <img class="item_image" src="images/cat_image1.jpg">
            <div>
              <p class="item_name">${name}</p>
              <p class="item_price">${price}</p>
              <button class="add_button">Add</button>
            </div>
          </div>`;
};

const renderItemList = (list) => {
  let goodsList = list.map(item => renderItem(item));
  $goodsList.insertAdjacentHTML('beforeend', goodsList);
}

renderItemList(cats);