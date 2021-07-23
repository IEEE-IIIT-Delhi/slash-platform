import * as constants from "../src/constants";
import Log from "../models/log";

export default async (req, res) => {
  if (!req.user || !req.user.admin) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH,
    });
  }

  const logs = await Log.find({}, { _id: 0, __v: 0 })
    .sort({ time: -1 })
    .limit(100);

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: { logs },
  });
};
