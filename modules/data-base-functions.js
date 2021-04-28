module.exports = {
	createDBServerRow: function(mysqlConn, guild, guildId){
		mysqlConn.query(`INSERT INTO global_config (guild_name, gulid_id)
			VALUES('${guild}', '${guildId}')`, function(err, results, fields){});
		console.log('create new server row: ' + guildId + ` - ${guild}`)
	},
	deleteDBServerRow: function(mysqlConn, guild, guildId){
		mysqlConn.query(`DELETE FROM global_config WHERE gulid_id = '${guildId}'`, function(err, results, fields){});
		console.log('delete server row: ' + guildId + ` - ${guild}`)
	},
	createDBServerTable: function(mysqlConn, guild, guildId){
		mysqlConn.query(`CREATE TABLE burr${guildId} (id int(10) AUTO_INCREMENT PRIMARY KEY, burry_users varchar(18))`, function(err, results, fields){});

		mysqlConn.query(`CREATE TABLE bull${guildId} (id int(10) AUTO_INCREMENT PRIMARY KEY, bully_users varchar(18))`, function(err, results, fields){});

		//mysqlConn.query(`CREATE TABLE lock${guildId} (id int(10) AUTO_INCREMENT PRIMARY KEY, locked_users varchar(18))`, function(err, results, fields){});

		console.log('create new server tables: ' + guildId + ` - ${guild}`)
	},
	deleteDBServerTable: function(mysqlConn, guild, guildId){
		mysqlConn.query(`DROP TABLE burr${guildId}`, function(err, results, fields){});
		mysqlConn.query(`DROP TABLE bull${guildId}`, function(err, results, fields){});
		mysqlConn.query(`DROP TABLE lock${guildId}`, function(err, results, fields){});
		
		console.log('delete server tables: ' + guildId + ` - ${guild}`)
	},
};