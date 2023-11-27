//Contentful
var client = contentful.createClient({
  accessToken: '8c5Xf5iTeNDwSXNZTlTLFER4FuwvhyAhQaCQpY-YuAY',
  space: 'ybkvnl96zwpj'
})
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token
client
  .getEntry('3aD8BObK2dVyeRI7u5gmr')
  .then((entry) => {
    console.log(entry.fields)
    let title = entry.fields.title
    let subTitle = entry.fields.subtitle
    document.getElementById('page-title').innerHTML = title
    document.getElementById('page-subTitle').innerHTML = subTitle
  })
  .catch((err) => console.log(err))

//get all products
client
  .getEntries({
    content_type: 'products'
  })
  .then((res) => {
    console.log(res)
    //get items loop those two items and put in the product section
    res.items.map(item => {
      renderProductToHtml(item.fields)
    })
  })
  .catch((err) => console.log(err))


function renderProductToHtml(product) {
  console.log("-----start to render html")
  console.log(product);

  let template = `
<div class="col-lg-4 col-sm-6 mb-4">
<!-- Portfolio item 1-->
<div class="portfolio-item">
    <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal1">
        <div class="portfolio-hover">
            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
        </div>
        <img class="img-fluid" src="${product.image.fields.file.url}" alt="...">
        </a>
        <div class="portfolio-caption">
            <div class="portfolio-caption-heading">${product.title}</div>
            <div class="portfolio-caption-subheading text-muted">${product.subtitle}</div>
        </div>
</div>
</div>
  `
  document.getElementById('product-container').insertAdjacentHTML('beforeend', template);
}