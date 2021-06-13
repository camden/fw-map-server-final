import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });

const dbId = process.env.NOTION_DATABASE_ID;

const getNotionPage = async (req, res) => {
  const title = req.params.title;

  const filterForTitle = {
    property: "title",
    text: {
      equals: title
    }
  };

  // const results = await notion.request(payload);
  const results = await notion.databases.query({
    database_id: dbId,
    filter: filterForTitle
  });
  if (results.results.length === 0) {
    console.error("NOT FOUND: " + title);
  }

  const singlePage = results.results[0];

  res.send(singlePage);
};

export default getNotionPage;
