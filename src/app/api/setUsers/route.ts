import { NextResponse } from "next/server";
import {
  ref,
  set as setFirebaseData,
  DatabaseReference,
} from "firebase/database";
import { database } from "../../../../firebase";

export async function POST(request: Request) {
  try {
    const usersRef: DatabaseReference = ref(database, "users");
    const body = await request.json();

    await setFirebaseData(usersRef, JSON.stringify(body.users));
    return NextResponse.json({
      data: {
        users: body.users,
      },
    });
  } catch (error: any) {
    return NextResponse.error();
  }
}
