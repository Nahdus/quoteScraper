const express = require('express')
const axios = require('axios')

var cors = require('cors');
const cheerio  = require('cheerio');
const app = express()
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(cors())


app.post('/quote/author', (req, res, next) =>{

    
        axios({
            method: 'get',
            url: `https://www.goodreads.com/search?utf8=%E2%9C%93&q=${req.body.author}&search_type=quotes&search%5Bfield%5D=author`,
          })
        .then(data=>{

            var doc=cheerio.load(data.data)
            var noOfquote=doc('.quoteText').toArray().length
            var quoteIndex=Math.floor(Math.random() * noOfquote)
            // console.log(cheerio.load(doc('.quoteText').toArray()[quoteIndex]).text())
                 
            res.send(cheerio.load(doc('.quoteText').toArray()[quoteIndex]).text())
        }
        )
        .catch(err=>{

            console.log(err)
            res.send(err)
        }
        )
    
    })
    app.listen(80, function () {
        console.log('CORS-enabled web server listening on port 80')
      })
   
  