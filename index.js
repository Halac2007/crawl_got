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
        // const title = $(this).text().trim()
        const title = $(this).find('a').attr('title')
        const link = $(this).find('a').attr('href')
        const image = $(this).find('a').find('img').attr('src')
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
