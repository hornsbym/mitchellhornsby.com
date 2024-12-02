export const revalidate = 60;

export async function POST(req: Request) {
  const body = await req.json();
  let { page, sortAscending, category } = body;

  const GET_PROJECTS = `
    {
      Projects(
        limit: 3, 
        sort: "${sortAscending  ? "startDate" : "-startDate"}", 
        page: ${page}
        ${category ? `, where: {projectCategory: {equals: ${category}}} `: ''}
        ) {
        docs {
          id
        }
        totalPages
        hasNextPage
        hasPrevPage
        page
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
