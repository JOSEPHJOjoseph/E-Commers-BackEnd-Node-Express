const productService = require('../services/products.svc');

const productCtrl = {
    getByPagination: async (req, res) => {
        try {
            const pageCount = parseInt(req.query.pageCount, 10) || 10;
            const pageNo = parseInt(req.query.pageNo, 10) || 1;

            if (pageNo < 1 || pageCount < 1) {
                return res.status(400).send({ error: 'Invalid pagination parameters' });
            }

            const count = await productService.getCount();
            const totalPages = Math.ceil(count / pageCount);
            const products = await productService.pagination(pageNo, pageCount);

            const metadata = {
                isPrevious: pageNo > 1,
                isNext: pageNo < totalPages,
                totalPages,
                totalCount: count
            };

            res.status(200).send({
                metadata,
                products
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send({ error: 'Error fetching products', errorDescription: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const products = await productService.getAllProducts(); // Corrected service method name
            res.status(200).send({ data: products });
        } catch (error) {
            res.status(500).send({ error: 'Server error', errorDescription: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const product = await productService.getById(req.params.productId);
            if (!product) {
                return res.status(404).send({ error: 'Product not found' });
            }
            res.status(200).send({ data: product });
        } catch (error) {
            res.status(500).send({ error: 'Server error', errorDescription: error.message });
        }
    },

    add: async (req, res) => {
        try {
            const newProduct = await productService.add(req.body); // Pass 'req.body'
            res.status(201).send({ data: newProduct });
        } catch (error) {
            res.status(500).send({ error: 'Server error', errorDescription: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const updatedProduct = await productService.update(req.params.productId, req.body);
            if (!updatedProduct) {
                return res.status(404).send({ error: 'Product not found' });
            }
            res.status(200).send({ data: updatedProduct });
        } catch (error) {
            res.status(500).send({ error: 'Server error', errorDescription: error.message });
        }
    },

    patch: async (req, res) => {
        try {
            const patchedProduct = await productService.patch(req.params.productId, req.body);
            if (!patchedProduct) {
                return res.status(404).send({ error: 'Product not found' });
            }
            res.status(200).send({ data: patchedProduct });
        } catch (error) {
            res.status(500).send({ error: 'Server error', errorDescription: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const deletedProduct = await productService.delete(req.params.productId);
            if (!deletedProduct) {
                return res.status(404).send({ error: 'Product not found' });
            }
            res.status(200).send({ data: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Server error', errorDescription: error.message });
        }
    }
};

module.exports = productCtrl;
