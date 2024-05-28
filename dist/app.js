document.addEventListener("DOMContentLoaded", function () {
  let products = []; // Array para armazenar os produtos
  let filteredProducts = []; // Array para armazenar os produtos filtrados
  const btnCarregarMais = document.getElementById('btn-carregar-mais');// carregar mais produtos
  const verTodasAsCoresBtn = document.getElementById("ver-todas-as-cores");
  const coresOcultas = document.querySelectorAll(".oculto");
  const openMenuButton = document.querySelector('.open-menu'); // abrir o menu mobile
  const closeMenuButton = document.querySelector('.close-menu');// fechar o menu mobile
  var botaoFiltrarProduto = document.querySelector('.filtrar-produto');
  const menu = document.querySelector('.filters-mobile');

  


    // Função para mostrar as cores ocultas e ocultar o botão "Ver todas as cores"
    function mostrarCoresOcultas() {
        coresOcultas.forEach(cor => {
            cor.style.display = "flex";
        });
        verTodasAsCoresBtn.style.display = "none";
    }

    verTodasAsCoresBtn.addEventListener("click", mostrarCoresOcultas);


  
    document.addEventListener('DOMContentLoaded', function() {
      var selects = document.querySelectorAll('select');
      for (var i = 0; i < selects.length; i++) {
        selects[i].style.width = '100px';
      }
    });
 
  

 

  // Função para exibir os produtos na página
  function exibirProdutos(produtos) {
    const cardsContainer = document.getElementById("cards");
    if (cardsContainer) {
      cardsContainer.innerHTML = "";
      produtos.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card-products");
        card.innerHTML = `
          <div class="img-produto">
            <img src="${product.image}">
          </div>
          <div class="img-props">
            <p class="name-product">${product.name}</p>
            <p class="price-product">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            <p class="parcelamento-product">ate ${product.parcelamento[0]}x de R$${product.parcelamento[1].toFixed(2).replace('.', ',')} </p>
            <p class="size-product">${`Tamanho: ${product.size}`}</p>
            <p class="color-product">${`Cor: ${product.color}`}</p>
            <button class="btn-comprar">COMPRAR</button>
          </div>
        `;
        cardsContainer.appendChild(card);
      });
    }

     // Verifica se há menos de 9 produtos
     const botaoCarregarMais = document.getElementById("btn-carregar-mais");
     if (produtos.length < 9) {
       // Se houver menos de 9 produtos, esconde o botão de carregar mais
       if (botaoCarregarMais) {
         botaoCarregarMais.style.display = "none";
       }
     } else {
       // Se houver 9 ou mais produtos, exibe o botão de carregar mais
       if (botaoCarregarMais) {
         botaoCarregarMais.style.display = "inline-block";
       }
     }
   



    // Adiciona evento de clique ao botão "Carregar Mais"
   btnCarregarMais.addEventListener('click', function() {
    document.querySelectorAll('.card-products:nth-child(n + 10)').forEach(function(card) {
        card.style.display = 'block';
    });
    
    btnCarregarMais.style.display = 'none';
  });  

  



    // Função para adicionar o produto ao carrinho e atualizar o contador
    function adicionarAoCarrinho() {
      const carrinhoCount = document.getElementById("count");
      if (carrinhoCount) {
        let contador = parseInt(carrinhoCount.textContent);
        contador++;
        carrinhoCount.textContent = contador;

        // Salvar no localStorage
        localStorage.setItem('carrinhoCount', contador);
      }
    }

    // Adiciona evento de clique aos botões "Comprar"
    document.querySelectorAll('.btn-comprar').forEach(button => {
      button.addEventListener('click', adicionarAoCarrinho);
    });

  }

   
  // Função para inicializar o contador de produtos no carrinho
  function inicializarCarrinho() {
    const carrinhoCount = document.getElementById("count");
    if (carrinhoCount) {
      let contador = localStorage.getItem('carrinhoCount');
      if (contador === null) {
        contador = 0;
      } else {
        contador = parseInt(contador);
      }
      carrinhoCount.textContent = contador;
    }
  }

  document.addEventListener('DOMContentLoaded', inicializarCarrinho);
  inicializarCarrinho()



// Função para filtrar os produtos
function filtrarProdutos() {
  const corSelecionada = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(checkbox => checkbox.value);


  const tamanhoSelecionado = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(checkbox => checkbox.value);
  // console.log(tamanhoSelecionado);
  
  const precoSelecionado = Array.from(document.querySelectorAll('input[name="price-filter"]:checked')).map(checkbox => checkbox.value);
  const ordenacaoSelecionada = document.getElementById("sort-filter").value;


  filteredProducts = products.filter((product) => {
      if (corSelecionada.length > 0 && !corSelecionada.includes(product.color)) return false;
      if (tamanhoSelecionado.length > 0 && !tamanhoSelecionado.every(size => product.size.includes(size))) {
        return false;
      }
      

      if (precoSelecionado.length > 0) {
          return precoSelecionado.some(priceRange => {
              const [minPrice, maxPrice] = priceRange.split("-").map(parseFloat);
              return (minPrice <= product.price && product.price <= maxPrice);
          });
      }
      return true;
  });

   // ORDENADOR DE PRODUTOS
   if (ordenacaoSelecionada === "recente" || ordenacaoSelecionada === "1") {
    filteredProducts.sort((a) => a.price); // Mantem os produtos de acordo com a ordem que iniciou
  } else if (ordenacaoSelecionada === "preco-crescente") { // Ordena do menor para o maior preço
    filteredProducts.sort((a, b) => a.price - b.price)
  } else {
    filteredProducts.sort((a, b) => b.price - a.price); // Ordena do maior para o menor preço
  }


  exibirProdutos(filteredProducts);
}

// Adiciona evento de alteração aos filtros
document.querySelectorAll('input[name="color"]').forEach(checkbox => checkbox.addEventListener("change", filtrarProdutos));
document.querySelectorAll('input[name="size"]').forEach(checkbox => checkbox.addEventListener("change", filtrarProdutos));
document.querySelectorAll('input[name="price-filter"]').forEach(checkbox => checkbox.addEventListener("change", filtrarProdutos));
document.getElementById("sort-filter").addEventListener("change", filtrarProdutos);



// função de abrir e fechar o menu de filtros
openMenuButton.addEventListener('click', function() {
  menu.classList.toggle('open');
});

closeMenuButton.addEventListener('click', function() {
  menu.classList.remove('open');
});


botaoFiltrarProduto.addEventListener('click', function() {
  menu.classList.remove('open');
});



// Seleciona o botão "Filtrar produto"
const filterButton = document.getElementById("limpar-filtro");

// Define um ouvinte de evento de clique para o botão
filterButton.addEventListener("click", function() {
    // Seleciona todos os inputs checkbox dentro do menu lateral
    const checkboxes = document.querySelectorAll("#filters input[type='checkbox']");
    
    // Percorre todos os checkboxes e remove a seleção marcada
    checkboxes.forEach(checkbox => {
        checkbox.checked = false; // Desmarca o checkbox
    });
});





// accordion dos menus de cores, tamanhos e preços
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "inline-grid") {
      panel.style.display = "none";
    } else {
      panel.style.display = "inline-grid";
    }
  });
}


// Selecione o botão de retorno ao topo
const backToTopButton = document.getElementById("back-to-top");

// Função para rolar a página para o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Adicione um evento de clique ao botão para chamar a função de rolar ao topo
backToTopButton.addEventListener("click", scrollToTop);

// Função para verificar a posição de rolagem e mostrar/esconder o botão de retorno ao topo
function checkScrollPosition() {
    if (window.scrollY > window.innerHeight) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

// Adicione um evento de rolagem à janela para verificar a posição de rolagem
window.addEventListener("scroll", checkScrollPosition);



// Mostra os produtos na página
fetch('http://localhost:5000/products')
  .then(req => req.json())
  .then(data => {
      products = data;
      filteredProducts = data;
      exibirProdutos(filteredProducts);
  });



});