const api =
  "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=";
let actualPage = 1;

const button = document.getElementById("more");
const productsList = document.getElementById("products-grid");

const convertToMoney = (val) =>
  val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

async function createProducts() {
  let results = await fetch(`${api}${actualPage}`).then((response) => {
    if (response.ok == false) {
      throw new Error("Internal Server Error.");
    }
    return response.json();
  });

  let item;
  results.products.map((product) => {
    item = `
      <li>
      <img src=${
        product.image
          ? `http://${product.image}`
          : "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"
      } alt="Product" >
        
        <span>${product.name ? product.name : "Produto sem nome"}</span>
        <p>${
          product.description
            ? product.description
            : "Este produto não tem descrição"
        }</p>
        <p>De R$ ${product.oldPrice ? convertToMoney(product.oldPrice) : ""}</p>
        <strong>Por R$ ${
          product.price ? convertToMoney(product.price) : "Valor indisponível"
        }</strong>
        ${
          product.installments
            ? `<p>ou ${
                product.installments.count ? product.installments.count : ""
              }x de R$ ${
                product.installments.value
                  ? convertToMoney(product.installments.value)
                  : ""
              } </p>`
            : ""
        }
        <button class="add-cart" onclick="alert('Produto adicionado ao seu carinho!')">Comprar</button>
      </li>
      `;
    productsList.innerHTML += item;
  });
}
button.addEventListener("click", function () {
  actualPage++;
  createProducts();
});

createProducts();
