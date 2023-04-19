// Load environment variables from .env file
require('dotenv').config();

// Initialize a new Notion client with my integration's API key
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Set the database ID of my calendar database
const databaseId = process.env.NOTION_DATABASE_ID;

// Define the properties of the new page
async function createNotionPage(setday, title, tagName, family_members, startTime, endTime) {
  // Define the properties of the new Notion page
  const newPage = {
    parent: {
      database_id: databaseId,
    },
    properties: {
      // Set the title of the page
      Name: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      // Set the date range of the page
      Date: {
        date: {
          start: `${setday}T${startTime}`,
          end: `${setday}T${endTime}`
        },
      },
      // Set the tag of the page
      Tags: {
        select: {
          name: tagName,
        },
      },
      // Set the family members associated with the task
      'Family member': {
        multi_select: family_members,
      },
    },
  };

  // Use the Notion API client to create the new page in your database
  const response = await notion.pages.create(newPage);
  console.log(response);
}

// Define the details of the repeated schedule
const startDate = new Date('2023-04-01');
const endDate = new Date('2023-08-31');
const startTime = "16:00:00+0900"
const endTime = "17:00:00+0900"
const tagName = "personal"
const title = "\u{1F3CA} Swimming"
const family_members = [
  //  { name: 'Dad' },
  //  { name: 'Mom' },
    { name: 'Riley' },
  //  { name: 'Jordan' },
  ];
// Sunday:0,  Monday:1, Tuesday:2, Wednesday:3, Thursday:4, Friday:5, Saturday:6
const setDayOfWeek = 0;

// Loop through all the dates within the start and end dates
async function createRepeatedSchedule() {
  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    // Check if the date falls on the specified day of the week
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    if (dayOfWeek === setDayOfWeek) {
      // Use the Notion API client to create the new page in your database
      const setday = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
      const response = await createNotionPage(setday, title, tagName, family_members, startTime, endTime);
      // Log the response from the API
      console.log(response);
    }
  }
}

// Call the function to create the repeated schedule
createRepeatedSchedule();
