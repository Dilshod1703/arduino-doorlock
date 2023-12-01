import { NextResponse } from "next/server";
import {
  ref,
  set as setFirebaseData,
  get as getFirebaseData,
  DatabaseReference,
} from "firebase/database";
import { database } from "../../../../firebase";

export async function POST(request: Request) {
  try {
    const usersRef: DatabaseReference = ref(database, "users");
    const body = await request.json();

    const snapshot = await getFirebaseData(usersRef);

    if (snapshot.exists()) {
      try {
        const users = JSON.parse(snapshot.val());

        users.push(body.user);

        await setFirebaseData(usersRef, JSON.stringify(users));
      } catch (e) {
        throw e;
      }

      return NextResponse.json({
        data: {
          user: body.user,
        },
      });
    }
  } catch (error: any) {
    return NextResponse.error();
  }
}
