export default {
  //HOST: "localhost",
  HOST: 'azt-database-1.cea1xytxwlgp.us-west-2.rds.amazonaws.com',
  USER: 'root',
  //PASSWORD: "",
  PASSWORD: 'PAssW0rd!',
  DBNAME: 'student_administration',
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

//server=azt-database-1.cea1xytxwlgp.us-west-2.rds.amazonaws.com;port=3306;database=student_administration;uid=root;password=PAssW0rd!;

