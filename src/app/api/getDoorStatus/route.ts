import { NextResponse } from "next/server";
import {
  ref,
  get as getFirebaseData,
  DatabaseReference,
} from "firebase/database";
import { database } from "../../../../firebase";
export async function GET() {
  try {
    const usersRef: DatabaseReference = ref(database, "isOpen");

    const snapshot = await getFirebaseData(usersRef);

    if (snapshot.exists()) {
      return NextResponse.json({
        data: {
          isOpen: !!snapshot.val(),
        },
      });
    }

    return NextResponse.json({
      data: {
        isOpen: false,
      },
    });
  } catch (error: any) {
    return NextResponse.error();
  }
}
