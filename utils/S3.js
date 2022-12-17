const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "..", "config", "config.env") });
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

exports.upload = async (file) => {
  try {
    const imageName = Date.now() + "-" + file.originalname;
    const params = {
      Bucket: bucketName,
      Body: file.buffer,
      Key: imageName,
      ContentType: file.minetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);
    return imageName;
  } catch (error) {
    return error;
  }
};

exports.download = async (imageName) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: imageName,
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command);

    return url;
  } catch (error) {
    return error;
  }
};

exports.deleteImage = async (imageName) => {
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);
};

exports.uploadImages = async (images) => {
  const imagesName = [];
  images.forEach(async (img) => {
    try {
      const imageName = Date.now() + "-" + img.originalname;
      imagesName.push(imageName);
      const params = {
        Bucket: bucketName,
        Body: img.buffer,
        Key: imageName,
        ContentType: img.minetype,
      };

      const command = new PutObjectCommand(params);

      await s3.send(command);
    } catch (error) {
      return error;
    }
  });
  return imagesName;
};

exports.deleteImages = async (images) => {
  images.forEach(async (img) => {
    try {
      const params = {
        Bucket: bucketName,
        Key: img,
      };

      const command = new DeleteObjectCommand(params);

      await s3.send(command);
    } catch (error) {
      return error;
    }
  });
};

exports.getImages = async (images) => {
  const imageUrls = [];
  for (const img of images) {
    const params = {
      Bucket: bucketName,
      Key: img,
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command);

    imageUrls.push(url);
  }

  return imageUrls;
};

exports.uploadOrder = async (file, key) => {
  try {
    const orderName = "orders/" + key;
    const params = {
      Bucket: bucketName,
      Body: file,
      Key: orderName,
      ContentType: "text/pdf",
    };

    const command = new PutObjectCommand(params);

    const result = await s3.send(command);
    return { result, orderName };
  } catch (error) {
    console.log(error);
  }
};
