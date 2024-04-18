// Imports
// ========================================================
import { QUERY_HOLDERS } from "../../../server/db/queries/holders";
import { config } from "dotenv";
import { type NextRequest } from "next/server";

// Config
// ========================================================
config();

// Endpoints
// ========================================================
/**
 * @dev LIST all holders
 * @param request 
 */
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const walletAddress = searchParams.get('walletAddress');
  const holders = await QUERY_HOLDERS.LIST(walletAddress
    ? {
      filterKey: 'walletAddress',
      filterValue: walletAddress
    }
    : undefined
  );

  return Response.json({
    data: holders
  });
};