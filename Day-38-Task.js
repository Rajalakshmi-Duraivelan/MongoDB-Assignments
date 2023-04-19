//Design database for Zen class programme
//Zen Database
//use ZenDB
//1.Insert data for Users Collection
db.Users.insertMany([
    {
      userid: 101,
      name: "Rajalakshmi",
      email: "raji@gmail.com",
      mentorid: 201,
    },
    {
      userid: 102,
      name: "Karthikeyan",
      email: "karthi@gmail.com",
      mentorid: 202,
    },
    {
      userid: 103,
      name: "Sivashini",
      email: "sivashini@gmail.com",
      mentorid: 203,
    },
    {
      userid: 104,
      name: "Vasanthi",
      email: "vasanthi@gmail.com",
      mentorid: 201,
    },
    {
      userid: 105,
      name: "Duraivelan",
      email: "durai@gmail.com",
      mentorid: 202,
    },
  ]);
//2.Insert data for codekata Collection
db.Codekata.insertMany([
    {
      userid: 101,
      problems: 10,
    },
    {
      userid: 102,
      problems: 15,
    },
    {
      userid: 103,
      problems: 20,
    },
    {
      userid: 104,
      problems: 25,
    },
    {
      userid: 105,
      problems: 35,
    },
  ]);
//3.Insert data for attendance Collection
db.attendance.insertMany([
    {
      userid: 101,
      topicid: 1,
      attended: true
    },
    {
      userid: 102,
      topicid: 2,
      attended: false
    },
    {
      userid: 103,
      topicid: 3,
      attended: true
    },
    {
      userid: 104,
      topicid: 4,
      attended: false
    },
    {
      userid: 105,
      topicid: 5,
      attended: true
    },
  ]);
  
//4.Insert data for topics Collection
db.Topics.insertMany([
    {
      topicid: 1,
      topic: "HTML",
      topic_date: new Date("2-feb-2023"),
    },
    {
      topicid: 2,
      topic: "CSS",
      topic_date: new Date("13-nov-2023"),
    },
    {
      topicid: 3,
      topic: "Javascript",
      topic_date: new Date("20-jul-2023"),
    },
    {
      topicid: 4,
      topic: "React",
      topic_date: new Date("20-oct-2020"),
    },
    {
      topicid: 5,
      topic: "NodeJs",
      topic_date: new Date("25-oct-2020"),
    },
  ]);
//5.Insert data for tasks Collection
db.tasks.insertMany([
    {
      taskid: 301,
      topicid: 1,
      userid: 101,
      task: "HTML",
      due_date: new Date("5-feb-2023"),
      submitted: false
    },
    {
      taskid: 302,
      topicid: 2,
      userid: 102,
      task: "CSS",
      due_date: new Date("15-nov-2023"),
      submitted: true
    },
    {
      taskid: 303,
      topicid: 3,
      userid: 103,
      task: "JavaScript",
      due_date: new Date("25-jul-2023"),
      submitted: false
    },
    {
      taskid: 304,
      topicid: 4,
      userid: 104,
      task: "React",
      due_date: new Date("25-oct-2020"),
      submitted: true
    },
    {
      taskid: 305,
      topicid: 5,
      userid: 105,
      task: "NodeJS",
      due_date: new Date("30-oct-2020"),
      submitted: false
    },
  ]);
//6.Insert data for company_drives Collection
db.comapnydrives.insertMany([
    {
      userid: 101,
      drive_date: new Date("28-feb-2023"),
      company: "Meta",
    },
    {
      userid: 101,
      drive_date: new Date("31-mar-2023"),
      company: "Amazon",
    },
    {
      userid: 102,
      drive_date: new Date("12-apr-2023"),
      company: "Apple",
    },
    {
      userid: 103,
      drive_date: new Date("25-jun-2020"),
      company: "Netflix",
    },
    {
      userid: 104,
      drive_date: new Date("20-jul-2020"),
      company: "Google",
    },
  ]);
//7.Insert data for mentors Collection
db.mentors.insertMany([
    {
      mentorid: 201,
      mentorname: "SriLakshmi",
      mentor_email: "sri@gmail.com",
    },
    {
      mentorid: 202,
      mentorname: "Mahesh",
      mentor_email: "mahesh@gmail.com",
    },
    {
      mentorid: 203,
      mentorname: "Lakshan",
      mentor_email: "lakshan@gmail.com",
    },
    {
      mentorid: 204,
      mentorname: "Gokul",
      mentor_email: "gokul@gmail.com",
    },
    {
      mentorid: 205,
      mentorname: "Dhanushya",
      mentor_email: "dhanushya@gmail.com",
    },
  ]);

  //Queries

//1.Find all the topics and tasks which are thought in the month of October

db.topics.aggregate([
  {
    $lookup: {
      from: "tasks",
      localField: "topicid",
      foreignField: "topicid",
      as: "Taskinfo",
    },
  },
  {
    $match: {
      $and: [
        {
          $or: [
            { "topic_date": { "$gt": ISODate("2020-09-30T10:03:46.000Z") } },
            { "topic_date": { "$lt": ISODate("2020-11-01T10:03:46.000Z") } },
          ],
        },

        {
          $or: [
            { "Taskinfo.due_date": { "$gt": ISODate("2020-09-30T10:03:46.000Z") } },
            { "Taskinfo.due_date": { "$lt": ISODate("2020-11-01T10:03:46.000Z") } },
          ],
        },
      ],
    },
  },
]);
//2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.comapnydrives.find({
  "drive_date" : {
    "$lte": ISODate("2020-10-15T10:03:46.000Z"),
    "$gte": ISODate("2020-10-31T10:03:46.000Z")
  }
});

//3.Find all the company drives and students who are appeared for the placement.
db.comapnydrives.aggregate([{
  $lookup: { from: 'Users', localField: 'userid', foreignField: 'userid', as: 'studentInfo' }
},
{
  $project: {
    _id: 0,
    "studentInfo.name": 1,
    company: 1,
    drive_date: 1,
    "studentInfo.email": 1,
    "studentInfo.userid": 1
  },
},
]);
//4.Find the number of problems solved by the user in codekata
db.Codekata.aggregate([
  {
    $lookup: {
      from: 'Users', localField: 'userid', foreignField: 'userid', as: 'studentInfo'
    }
  },
  {
    $project: {
      _id: 0,
      "studentInfo.name": 1,
      problems: 1,
      "studentInfo.email": 1,
      "studentInfo.userid": 1
    },
  },
]);
//5.Find all the mentors with who has the mentee's count more than 15
db.Users.aggregate([{
  $lookup: {
      from: "mentors",
      localField: "mentorid",
      foreignField: "mentorid",
      as: "MentorInfo",
  },
},
{
  $group: {
      _id: {
          mentorid: "$mentorInfo.mentorid",
          mentorname: "$mentorInfo.mentorname",
      },
      mentee_count: { $sum: 1 },
  },
},
{ $match: { mentee_count: { $gt: 15 } } },
]);
//6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.attendance.aggregate([{
  $lookup: {
      from: "Topics",
      localField: "topicid",
      foreignField: "topicid",
      as: "TopicInfo",
  },
},
{
  $lookup: {
      from: "tasks",
      localField: "topicid",
      foreignField: "topicid",
      as: "TaskInfo",
  },
},
{ $match: { $and: [{ attended: false }, { "tasks.submitted": false }] } },
{
  $match: {
      $and: [{
              $or: [
                  { "topics.topic_date": { "$gte": ISODate("2020-10-15T10:03:46.000Z") } },
                  { "topics.topic_date": { "$lte": ISODate("2020-10-31T10:03:46.000Z") } },
              ],
          },
          {
              $or: [
                  { "tasks.due_date": { "$gte:": ISODate("2020-10-15T10:03:46.000Z") } },
                  { "tasks.due_date": { "$lte:": ISODate("2020-10-31T10:03:46.000Z") } },
              ],
          },
      ],
  },
},
{
  $count: "No_of_students_absent",
},
]);