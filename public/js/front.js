

let selectItems = [];
let totalAmount = 0;

function calculate(name, price) {
    selectItems.push({name, price});
    totalAmount += price;
    let itemList = '';
    selectItems.forEach(item => {
        itemList += `<li>${item.name} - ${item.price} Ks</li>`
    });
    document.getElementById('select').innerHTML = `<ul>${itemList}</ul>`;
    updateAmount();

}
function updateAmount() {
    document.getElementById('totalAmount').innerText = 'Total: ' + totalAmount + "Ks";
  };

  function deleteUser(id) {
    fetch(`/deleteUser/${id}`,{
      method:'DELETE',
    })
    location.reload();
  }
  function suspend(id) {
    fetch(`/suspend/${id}`,{
      method:'POST',
    })
    location.reload();
  }
  function unsuspend(id) {
    fetch(`/unsuspend/${id}`,{
      method:'POST',
    })
    location.reload();
  }

  function deleteItem(id) {
    fetch(`/deleteItem/${id}`,{
      method:'DELETE',
    } )
    location.reload();
  };

function voucherData() {
  let items = [];
  let totalAmount = 0;

  selectItems.forEach((value)=>{
    items.push({name:value.name, price:value.price});
    totalAmount += parseInt(value.price);
  });

  fetch('/voucher-data', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({ items, totalAmount}),
  })
  .then(response => response.json());
}

  

  
  

 