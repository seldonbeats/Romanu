

const song = require("../models/song");

const router = require("express").Router();

router.get("/getAll", async (req, res) => {
    const options = {
        // sort returned documents in ascending order
        sort: { createdAt: 1 },
        // Include only the following
        // projection : {}
    };

    const cursor = await song.find(options);
    if (cursor) {
        res.status(200).send({ success: true, data: cursor });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    }
});


router.get("/getOne/:id", async (req, res) => {
    const { id } = req.params;

    const product = await song.findById(id);
    if (!product) {
        res.json({ message: "product not found", status: 0 });
        return;
      }
    
      res.json(product);
    });
    

router.post("/save", async (req, res) => {
    const newSong = song({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
        price: req.body.price,
        BPM: req.body.BPM,
        reviews: req.body.reviews,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        
        
        
    });
    try {
        const savedSong = await newSong.save();
        res.status(200).send({ song: savedSong });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});

router.put("/update/:updateId", async (req, res) => {
    const filter = { _id: req.params.updateId };
    const options = {
        upsert: true,
        new: true,
    };
    try {
        const result = await song.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                songUrl: req.body.songUrl,
                album: req.body.album,
                artist: req.body.artist,
                language: req.body.language,
                category: req.body.category,
                price: req.body.price,
                BPM: req.body.BPM,
            },
            options
        );
        res.status(200).send({ artist: result });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});

router.delete("/delete/:deleteId", async (req, res) => {
    const filter = { _id: req.params.deleteId };

    const result = await song.deleteOne(filter);
    if (result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
        res.status(200).send({ success: false, msg: "Data Not Found" });
    }
});

router.get("/getFavouritesSongs", async (req, res) => {
    const query = req.query.songId;
    res.send(query);
});

router.post('/:id/reviews', async (req, res) => {

    const { rating, comment } = req.body
  
    const product = await song.findById(req.params.id)
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }});

module.exports = router;