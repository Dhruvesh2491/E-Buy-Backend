const razorKey = async (req, res) => {
  try {
    res.status(200).json({ key: process.env.RAZOR_KEY_ID });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error getting Razorpay key", details: error.message });
  }
};
module.exports = { razorKey };
