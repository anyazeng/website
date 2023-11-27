//Contentful
var client = contentful.createClient({
    accessToken: '8c5Xf5iTeNDwSXNZTlTLFER4FuwvhyAhQaCQpY-YuAY',
    space: 'ybkvnl96zwpj'
  })
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token
  client
    .getEntry('3aD8BObK2dVyeRI7u5gmr')
    .then((entry) => console.log(entry))
    .catch((err) => console.log(err))