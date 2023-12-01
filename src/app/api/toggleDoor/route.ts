import { NextResponse } from "next/server";
import {
  ref,
  set as setFirebaseData,
  DatabaseReference,
} from "firebase/database";
import { database } from "../../../../firebase";

export async function POST(request: Request) {
  try {
    const usersRef: DatabaseReference = ref(database, "isOpen");
    const body = await request.json();

    await setFirebaseData(usersRef, body.state ? 1 : 0);
    return NextResponse.json({
      data: {
        isOpen: body.state,
      },
    });
  } catch (error: any) {
    return NextResponse.error();
  }
}
