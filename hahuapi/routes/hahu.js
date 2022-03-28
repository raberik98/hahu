const express = require('express');
const hirdetes = require('../models/hirdetes');
const router = express.Router();
const Hirdetes = require('../models/hirdetes')
const Kategoria = require('../models/kategoria')


router.post('/', function(req,res,next) {
    const _id = req.body._id
    const kategoria = req.body.kategoria
    const cim = req.body.cim
    const leiras = req.body.leiras
    const hirdetesDatuma = req.body.hirdetesDatuma
    const serulesmentes = req.body.serulesmentes
    const arFt = req.body.arFt
    const kepUrl = req.body.kepUrl

    try {
        if (arFt % 1000 != 0) {
            throw Error("Ár nem osztahtó 1000-rel!")
        }
        const hirdetes = new Hirdetes({
            _id,
            kategoria,
            cim,
            leiras,
            hirdetesDatuma,
            serulesmentes,
            arFt,
            kepUrl
        })
    
        hirdetes.save()
        .then(res.status(200).json({'message': 'Létrejött'}))
        .catch(err => console.log(err))

    } catch (error) {
        res.status(400).json({
            "Error": error.message
        })
    }

    
})


router.get('/', function(req,res,next){
    Hirdetes.find()
    .then(hirdetesek => {
        res.json(hirdetesek)
    })
})


router.delete('/:id', function(req,res,next) {
    const id = req.params.id

    hirdetes.findById(id).then(response => {
        if (response === null) {
            return res.json({'error': `A hirdetés ${id} azonosítóval nem létezik`})
        }
        else {
        hirdetes.findByIdAndDelete(id)
        .then(res.status(200).json({"Message":`A hirdetés ${id} kilett törölve`}))
        .catch(err => console.log(err))
        }
    })

})



// router.get('/:mezo', function(req,res,next) {
//     const mezo = req.params.mezo
//     Hirdetes.find()
//     .populate

// })


// router.delete("/:id", function(req,res,next) {
//     const id = req.params.id
//     Hirdetes
//     .findByIdAndDelete(id)
//     .then(res.json({'status':'Deleted'}))
//     .catch(err => console.log(err))
// })


module.exports = router;