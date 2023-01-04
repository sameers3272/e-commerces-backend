const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../model/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const fs = require("fs");


//Getting all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const productsCount = await Product.countDocuments();

  const resultPerPage = 7;
  const apiFeatures1 = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures1.query;

  let filteredProductsCount = products.length;

  const apiFeatures2 = new ApiFeatures(Product, req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  products = await apiFeatures2.query;

  // for (const product of products) {
  //   const imagesUrls = await getImages(product.images);
  //   product.images = imagesUrls
  // }

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get One Product
exports.getOneProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("No product found", 404));
  }

  // const imagesUrls = await getImages(product.images);
  // product.images = imagesUrls

  return res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(201).json({
    success: true,
    products,
  });
});

//creating Product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  // req.files && console.log(req.files);

  req.body.user = req.user._id;

  if (JSON.stringify(req.files) === JSON.stringify({})) {
    return next(new ErrorHandler("please upload atleast one image", 400));
  }

  // console.log(req.files)

  // req.body.images = await uploadImages(images);

  req.body.images = req.files &&
   req.files.images.map((obj) => {
    return obj.path;
  });

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// updating product

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("No product found", 404));
  }

  if (JSON.stringify(req.files) !== JSON.stringify({})) {
    product.images.forEach((img) => {
    if (fs.existsSync(img)) {
      fs.unlinkSync(img);
    }
    // await deleteImages(product.images);
    });
    console.log(req.files);
    req.body.images = req.files.images.map(img=>img.path);
    // req.body.images = await uploadImages(images);
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

//deleting product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("No product found", 404));
  }

  // await deleteImages(product.images)
  product.images.forEach((img) => {
    if (fs.existsSync(img)) {
      fs.unlinkSync(img);
    }
  });

  await product.remove();
  res.status(201).json({
    success: true,
    message: "Product Deleted",
  });
});

//Create New Review or Update the review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler(`Product not found with ID: ${productId}`));
  }
  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.rating = Number(rating);
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((review) => {
    avg += review.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get All Reviews of a Produt
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews;

  return res.status(200).json({
    success: true,
    reviews,
  });
});

exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  let ratings = 0;

  if (reviews.length <= 0) {
    ratings = 0;
  } else {
    reviews.forEach((review) => {
      avg += review.rating;
    });
    ratings = avg / reviews.length;
  }

  const noOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      noOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModidy: false,
    }
  );

  return res.status(200).json({
    success: true,
  });
});
