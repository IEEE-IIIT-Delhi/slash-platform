import express from "express";

import addQuestion from "../api/add-question";
import checkAnswer from "../api/check-answer";
import clearCache from "../api/clear-cache";
import getConfig from "../api/get-config";
import getLeaderboard from "../api/get-leaderboard";
import getPlayerDetails from "../api/get-player-details";
import getPlayerRank from "../api/get-player-rank";
import getQuestion from "../api/get-question";
import getLogs from "../api/get-logs";
import getStats from "../api/get-stats";
import updateConfig from "../api/update-config";
import updatePlayerLevel from "../api/update-player-level";
import updatePlayerType from "../api/update-player-type";
import updateQuestion from "../api/update-question";

const router = express.Router();

router.get("/get-config", getConfig);
router.get("/get-leaderboard", getLeaderboard);
router.get("/get-player-rank", getPlayerRank);
router.get("/get-question", getQuestion);
router.get("/get-logs", getLogs);
router.get("/get-stats", getStats);
router.post("/add-question", addQuestion);
router.post("/check-answer", checkAnswer);
router.post("/clear-cache", clearCache);
router.post("/get-player-details", getPlayerDetails);
router.post("/get-question", getQuestion);
router.post("/update-config", updateConfig);
router.post("/update-player-level", updatePlayerLevel);
router.post("/update-player-type", updatePlayerType);
router.post("/update-question", updateQuestion);

export default router;
