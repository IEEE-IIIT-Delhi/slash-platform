import * as constants from "../src/constants";
import Player from "../models/player";
import Log from "../models/log";

export default async (req, res) => {
  if (!req.user || !req.user.admin) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH,
    });
  }

  const { username } = req.body;
  const player = await Player.findOne({ username }).lean();

  if (!player) {
    return res.json({
      success: false,
      message: constants.ERR_NO_PLAYER,
    });
  }

  const { time } = await Log.findOne({ key: "Registered", value: username });
  player.registrationDate = time;

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: { player },
  });
};
