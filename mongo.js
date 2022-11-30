// Clear and Restart DB
db.dropDatabase()
use slash

// CLear and Reset Slash config
db.config.drop()
db.config.insert({
  started: false,
  showLeaderboard: false,
  ended: false,
  startDate: new Date(2022, 12, 2).setHours(17, 30)
})

//Set Admin and super admin details
db.players.update({"username" : "superadmin"}, {$set: {"superadmin" : true,"admin": true}})
