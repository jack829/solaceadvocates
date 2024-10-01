import { NextRequest, NextResponse } from "next/server";
import { ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = await req.nextUrl;

  const searchTerm = searchParams.get('searchTerm')?.toLowerCase();

  const data = await db
    .select()
    .from(advocates)
    .where(
      searchTerm ?
      or (
        ilike(advocates.firstName, getParamiLikeParam(searchTerm)),
        ilike(advocates.lastName, getParamiLikeParam(searchTerm)),
        ilike(advocates.city, getParamiLikeParam(searchTerm)),
        ilike(advocates.degree, getParamiLikeParam(searchTerm)),
        // TODO: make this search more secure/accurate. Right now the user could, for example, search `[` and get all results
        sql`cast(${advocates.specialties} as TEXT) ilike ${getParamiLikeParam(searchTerm)}`,
        sql`cast(${advocates.phoneNumber} as TEXT) ilike ${getParamiLikeParam(searchTerm)}`
      )
      : undefined
    );
    // TODO add .limit().offset() for pagination when searching larger data set

  return NextResponse.json({ data });
}

// Helpers
function getParamiLikeParam(searchTerm: string) {
  return `%${searchTerm}%`;
}
