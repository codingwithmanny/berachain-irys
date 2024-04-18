// Imports
// ========================================================

// Endpoints
// ========================================================
/**
 * READ a specific holder information based on nftId
 * @param request
 */
export const GET = async (_request: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const response = await fetch(`https://gateway.irys.xyz/mutable/${id}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    const json = await response.json();

    if (!response.ok || !json?.image) {
      throw Error('Could not retrieve nft image.');
    }

    return Response.json({ data: json });
  } catch (error: any) {
    return Response.json({ erorr: error?.message ?? 'Unknown error.' }, { status: 404 });
  }
};