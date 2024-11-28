export const revalidate = 60;

export async function GET() {
  const GET_PROJECTS = `
    {
      Projects(limit: 50, sort: "-startDate") {
        docs {
          id
        }
      }
    }
  `;

  const projectsRes = await fetch(`${process.env.CMS_URL}/api/graphql`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: GET_PROJECTS,
    }),
  });

  return projectsRes;
}
