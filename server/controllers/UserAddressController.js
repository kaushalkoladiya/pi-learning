import UserAddress from "../models/UserAddressModel.js";

export const getUserAddressById = async (req, res) => {
    try {
      const userId = req.params.id;
      const userAddress = await UserAddress.findOne({ where: { user_id: userId } });
      if (userAddress) {
        res.json(userAddress);
      }
   
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  