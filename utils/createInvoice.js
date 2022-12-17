const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const blobStream = require("blob-stream");
const { uploadOrder } = require("./S3");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  const stream = doc.pipe(blobStream());
  doc.end();

  stream.on("finish",async function () {
   
    const blob = stream.toBlob("application/pdf");
   await uploadOrder(blob, path);
  });
  //   doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image(path.join(__dirname, "..", "images", "logo.png"), 50, 45, {
      width: 50,
    })
    .fillColor("#444444")
    .fontSize(20)
    .text("E Commerce", 110, 57)
    .fontSize(10)
    .text("E Commerce", 200, 50, { align: "right" })
    .text("Sr no. 658  H no 6", 200, 65, { align: "right" })
    .text("Bibvewadi Upper Pune", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice._id, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Sub Total:", 50, customerInformationTop + 30)
    .text(
      invoice.orderItems.reduce((prev, next) => prev + next.price, 0),
      150,
      customerInformationTop + 30
    )
    .text("Tax:", 50, customerInformationTop + 45)
    .text(invoice.taxPrice, 150, customerInformationTop + 45)
    .text("Shipping Price:", 50, customerInformationTop + 60)
    .text(invoice.shippingPrice, 150, customerInformationTop + 60)
    .text("Total:", 50, customerInformationTop + 75)
    .text(invoice.totalPrice, 150, customerInformationTop + 75)

    .font("Helvetica-Bold")
    .text(invoice.user.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shippingInfo.address +
        ", " +
        invoice.shippingInfo.city +
        ", " +
        invoice.shippingInfo.state +
        ", " +
        invoice.shippingInfo.country, 300, customerInformationTop + 15)
    .moveDown();

  generateHr(doc, 300);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 350;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.orderItems.length; i++) {
    const item = invoice.orderItems[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.name,
      item.description,
      item.price / item.quantity,
      item.quantity,
      item.price * item.quantity
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    invoice.totalPrice
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    invoice.totalPrice
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    invoice.totalPrice
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice,
};
