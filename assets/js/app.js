const api =
  "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=";
let actualPage = 1;

const button = document.getElementById("more");
const productsList = document.getElementById("products-grid");

const convertNumberToMoney = (val) =>
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
      <figure>
      <img src=${
        product.image
          ? `http://${product.image}`
          : "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"
      } alt="Product" >
      </figure>
        
        <h3>${product.name ? product.name : "Produto sem nome"}</h3>
        <p>${
          product.description
            ? product.description
            : "Este produto não tem descrição"
        }</p>
        <span>R$ ${
          product.oldPrice ? convertNumberToMoney(product.oldPrice) : ""
        }</span>
        <strong>R$ ${
          product.price
            ? convertNumberToMoney(product.price)
            : "Valor indisponível"
        }</strong>
        ${
          product.installments
            ? `<h4>ou ${
                product.installments.count ? product.installments.count : ""
              }x de R$ ${
                product.installments.value
                  ? convertNumberToMoney(product.installments.value)
                  : ""
              } </h4>`
            : ""
        }
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
