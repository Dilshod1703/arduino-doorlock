import { NextResponse } from "next/server";
import {
  ref,
  get as getFirebaseData,
  DatabaseReference,
} from "firebase/database";
import { database } from "../../../../firebase";

export async function GET(request: Request) {
  try {
    const usersRef: DatabaseReference = ref(
      database,
      "unauthenticatedUserCard"
    );
    const snapshot = await getFirebaseData(usersRef);
    if (snapshot.exists()) {
      const cardNumber = snapshot.val();
      console.log({ cardNumber });
      return NextResponse.json({
        data: {
          cardNumber,
        },
      });
    }
  } catch (error: any) {
    return NextResponse.error();
  }
}
