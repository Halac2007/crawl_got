import * as cheerio from 'cheerio'
import express from 'express'
import cors from 'cors'
import { got } from 'got'

const app = express()
app.use(cors())

app.get('/', async (req, res) => {
  got('https://plo.vn/an-sach-song-khoe/')
    .then((response) => {
      const html = response.body
      const $ = cheerio.load(html)
      const articles = []
      $('.story', html).each(function () {
        const title = $(this).text().trim()
        const link = $(this).find('a').attr('href')
        const image =
          $(this).find('img').attr('data-src') ||
          'https://photo-cms-plo.zadn.vn/600x360/Uploaded/2022/pwvotwiv/2022_05_30/4-dad4-451.jpg'
        articles.push({
          title,
          link,
          image,
        })
      })
      res.json(articles)
    })
    .catch((err) => {
      console.log('Error: ', err.message)
    })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`server ${port}`)
})
