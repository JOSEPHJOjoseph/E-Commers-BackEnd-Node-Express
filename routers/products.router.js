const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/products.ctrl');
const productValidator= require('../validators/product.validator');
const userTokenValidator=require('../middlewares/user-token.middleware');

router.get('/pagination', productCtrl.getByPagination);


router.get('/', productCtrl.getAll);


router.get('/:productId', productCtrl.getById);


router.post('/',productValidator,productCtrl.add);


router.put('/:productId',userTokenValidator, productCtrl.update);


router.patch('/:productId',userTokenValidator, productCtrl.patch);


router.delete('/:productId',userTokenValidator, productCtrl.delete);

module.exports = router;
