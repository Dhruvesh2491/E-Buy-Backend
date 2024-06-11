const calculateDiscount = async (req, res) => {
  const { totalPrice, couponCode } = req.body;

  let discount = 0;

  switch (couponCode) {
    case "BASE15":
      if (totalPrice >= 1500 && totalPrice < 5000) {
        discount = 0.15;
      }
      break;
    case "BUY30":
      if (totalPrice >= 5000 && totalPrice < 30000) {
        discount = 0.3;
      }
      break;
    case "FANTASTIC40":
      if (totalPrice >= 30000 && totalPrice < 50000) {
        discount = 0.4;
      }
      break;
    case "GREAT50":
      if (totalPrice >= 50000) {
        discount = 0.5;
      }
      break;
    default:
      return res.status(400).json({ message: "Invalid coupon code" });
  }

  if (discount === 0) {
    return res.status(400).json({
      message: `Coupon code ${couponCode} is not applicable for the given total price`,
    });
  }

  const discountedPrice = totalPrice * (1 - discount);

  res.status(200).json({
    originalPrice: totalPrice,
    discount: discount * 100,
    discountedPrice: discountedPrice.toFixed(2),
  });
};

module.exports = { calculateDiscount };
