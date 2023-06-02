// Load environment variables from .env file
require('dotenv').config();

// Initialize a new Notion client with my integration's API key
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Set the database ID of my calendar database
const databaseId = process.env.NOTION_DATABASE_ID;

// Define the properties of the new page
async function createNotionPage(day, title, tag, family_members) {
  try {
    const newPage = {
      parent: {
        database_id: databaseId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
        Date: {
          date: {
            start: `${month}-${("0" + day.toString()).slice(-2)}`,
          },
        },
        Tags: {
          select: {
            name: tag,
          },
        },
        'Family member': {
          multi_select: family_members,
        },
      },
    };

    // Use the Notion API client to create the new page in your database
    const response = await notion.pages.create(newPage);
    console.log(response);
  } catch (error) {
    console.error(`Error creating page for day ${day}:`, error);
  }
}

// Define the repeated days
const month = '2023-05';
const days = [6, 10, 18, 21];
const title = 'Need to bring lunchbox';
const tag = 'kindergarten';
const family_members = [
  //  { name: 'Dad' },
  { name: 'Mom' },
  { name: 'Riley' },
  { name: 'Jordan' },
];

// Call createNotionPage for each day
async function processDays() {
  for (const day of days) {
    await createNotionPage(day, title, tag, family_members);
  }
}

processDays().catch((error) => {
  console.error('Error processing days:', error);
});
