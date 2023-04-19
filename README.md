# Import Repeating Schedules to Notion Calendar

This script allows you to easily add repeating schedules to your Notion calendar.
As you may know, there has already been a [built-in function](https://www.notion.so/help/guides/automate-work-repeating-database-templates) to set up recurring tasks using templates.

Though it is a great function, there are some limitations to this function now (2023/04/20).
The most notable point is:
> The built-in function only generates tasks on the day they are due, making it difficult to look ahead in the calendar.

This script offers a solution by providing two functions that let you easily add repeating schedules to your Notion calendar.

- **monthly-repeating-schedules**(*1) :
   This function allows you to add monthly repeating schedules to your Notion calendar. For example, if you need to bring a lunchbox on some days of the month, you can use this function to add those events to your calendar automatically without having to do it manually each time.

- **repeating-schedules-with-duration**(*2) :
    This function allows you to add repeating schedules with a duration to your Notion calendar. For example, if you have a weekly swim session that lasts for 1 hour, you can use this function to add it to your calendar with just a few clicks.

The image below shows a sample.

`Need to bring lunchbox` entries were imported by (*1)

`🏊Swimming` entries were imported by (*2)
![Notion-repeating-schedule-sample](https://user-images.githubusercontent.com/95740190/233186709-885bf5eb-2ee8-4854-a16a-97e679940146.png)


## Getting Started

### Prerequisites

Before using this script, make sure you have the following prerequisites installed:

- Node.js

### Installation

1. Clone or download the repository.
1. Install dependencies by running `npm install`.
1. Create a new Notion integration by following the instructions on the [official Notion API documentation](https://developers.notion.com/docs/getting-started#step-2-share-a-database-with-your-integration).
1. Copy your integration token and the URL of your Notion calendar page to `.envsample`, and rename the file to `.env`.
1. Modify the properties of the new page in the createNotionPage function to fit your needs.

    | Property Name | Property Type | Sample |
    | ------------- | ------------- | ------ |
    | Name          | title         | "Need to bring lunch box" |
    | Date          | date          | "2023-04-10" |
    | Tags          | select        | "Elementary School" |
    | Family member | multi-select  | "Riley", "Jordan" |

1. Define the repeated days and other required item.

    1. monthly-repeating-schedules

    | Variable Name  | Sample |
    | -------------  | ------ |
    | month          | 2023-04 |
    | days          | [6, 10, 18, 21] |
    | title          | "Need to bring lunchbox" |
    | tag          | "elementary school" |
    | family_members | "Mom", "Riley", "Jordan" |

    2. repeating-schedules-with-duration

    | Variable Name | Sample             |
    |---------------|--------------------|
    | startDate     | 2023-04-01         |
    | endDate       | 2023-08-31         |
    | startTime     | "16:00:00+0900"    |
    | endTime       | "17:00:00+0900"    |
    | tagName       | "personal"          |
    | title         | "Swimming"         |
    | family_members | "Riley" |
    | setDayOfWeek | 0 |


1. Run `node import-japanese-holidays.js` or `node repeating-schedules-with-duration`to import repeating schedules into your Notion calendar.


### Optimization

Consider the following optimizations to improve the script:

- Use of Notion templates 
> Currently, the script creates new pages in Notion using a blank template. If I have time to improve this script, I would explore using pre-existing Notion templates, such as a task list or project management template, to create more structured and organized pages. 
- User-friendly version
> This script requires Node.js to be installed on your computer. 
If you're not familiar with Node.js, you may find it difficult to use this script. 
To make it more accessible, you could consider creating a user-friendly version that does not require Node.js.

## Related project

- [Notion_import-japanese-holidays](https://github.com/mai-ogiso/Notion_import-japanese-holidays)
