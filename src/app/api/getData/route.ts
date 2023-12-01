import { NextResponse } from "next/server";
import {
  ref,
  get as getFirebaseData,
  DatabaseReference,
} from "firebase/database";
import { database } from "../../../../firebase";

export async function GET() {
  try {
    const usersRef: DatabaseReference = ref(database, "users");
    const snapshot = await getFirebaseData(usersRef);

    if (snapshot.exists()) {
      let users = [];
      try {
        users = JSON.parse(snapshot.val());
      } catch {}
      return NextResponse.json({
        data: {
          users,
        },
      });
    } else {
      return NextResponse.json({
        data: {
          users: [],
        },
      });
    }
  } catch (error: any) {
    return NextResponse.error();
  }
}
