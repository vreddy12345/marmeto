const menButton = document.getElementById("Men");
const womenButton = document.getElementById("Women");
const kidsButton = document.getElementById("Kids");

const url = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

function calculateDiscountPercent(price, compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discount);
}

function showresult(products) {
    console.log(products);

    const allProducts = document.querySelectorAll('.product-container');
    allProducts.forEach(productContainer => {
        productContainer.style.display = 'none';
    });

    document.getElementById(`${products.categoryName}Products`).style.display = 'block';

    const productContainer = document.getElementById(`${products.categoryName}Products`);
    productContainer.innerHTML = '';

    const productContainer1 = document.createElement('div');
    productContainer1.classList.add('product-container');

    products.categoryProducts.map(product => {
        const discountPercent = calculateDiscountPercent(product.price, product.compareAtPrice);

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        const badge = product.badgeText === null ? "" : product.badgeText;
        productCard.innerHTML = `

        <div style="background-image:url(${product.image});" class="badge">
        <button class="badge-button">${badge}</button>
        </div>
        <div class="title-vendor">
        <h3 class="title">${product.title}</h3>
        <p class="vendor">. ${product.vendor}</p>
        </div>
        <div class="price-discount">
        <p >RS${product.price}</p>
        <p class="com-price">Rs${product.compareAtPrice}</p>
        <p class="discount">${discountPercent}% off</p>
        </div>
        <button class="shine-button-1">Add to Cart</button>
      `;

        productContainer1.appendChild(productCard);
    });

    productContainer.appendChild(productContainer1);

    if (products.categoryName === "Men") {
        menButton.classList.add('shine-button');
        womenButton.classList.remove('shine-button');
        kidsButton.classList.remove('shine-button');
    } else if (products.categoryName === "Women") {
        menButton.classList.remove('shine-button');
        womenButton.classList.add('shine-button');
        kidsButton.classList.remove('shine-button');
    } else if (products.categoryName === "Kids") {
        menButton.classList.remove('shine-button');
        womenButton.classList.remove('shine-button');
        kidsButton.classList.add('shine-button');
    }
}

const doNetworkCall = async (category) => {
    const response = await fetch(url);
    const jsonData = await response.json();
    //console.log(jsonData)
    const data = jsonData.categories.map(eachCategory => ({
        categoryName: eachCategory.category_name,
        categoryProducts: eachCategory.category_products.map(eachItem => ({
            badgeText: eachItem.badge_text,
            compareAtPrice: eachItem.compare_at_price,
            id: eachItem.id,
            image: eachItem.image,
            price: eachItem.price,
            secondImage: eachItem.second_image,
            title: eachItem.title,
            vendor: eachItem.vendor
        }))
    }))
    //console.log(data)
    const updateData = data.filter(eachObject => eachObject.categoryName === category)
    showresult(updateData[0], category)


};



function displayingProducts(category) {
    doNetworkCall(category);
}

doNetworkCall("Men");