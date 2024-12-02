export const revalidate = 60;

export async function POST(req: Request) {
  const GET_PROJECT_CATEGORIES = `
    {
      ProjectCategories {
        docs {
          name
          id
        }
      }
    }
  `;

  const res = await fetch(`${process.env.CMS_URL}/api/graphql`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: GET_PROJECT_CATEGORIES,
    }),
  });

  return res;
}
