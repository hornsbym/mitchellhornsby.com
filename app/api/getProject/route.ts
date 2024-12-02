export const revalidate = 60;

export async function POST(req: Request) {
  const body = await req.json();
  let { projectId } = body;

  const GET_PROJECT = `
{
    Project(id: ${projectId.toString()}) {
        title
        organization {
          name
        }
        skills {
          id
          name
          tagColor
          tagFontColor
        }
        projectCategory {
          id
          name
          tagColor
          tagFontColor
        }
        startDate
        endDate
        description_html
        liveUrl
        githubRepo
    } 
}
`;

  const projectRes = await fetch(`${process.env.CMS_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: GET_PROJECT,
    }),
  });

  return projectRes;
}
