import { NextResponse } from "next/server";
import {
  ref,
  set as setFirebaseData,
  get as getFirebaseData,
  DatabaseReference,
} from "firebase/database";
import { database } from "../../../../firebase";
import { User } from "@/types/user.types";

export async function POST(request: Request) {
  try {
    const usersRef: DatabaseReference = ref(database, "users");
    const body = await request.json();

    const snapshot = await getFirebaseData(usersRef);

    if (snapshot.exists()) {
      try {
        let users = JSON.parse(snapshot.val());

        users = users.filter(
          (user: User) => user.cardNumber !== body.cardNumber
        );
        await setFirebaseData(usersRef, JSON.stringify(users));
      } catch (e) {
        throw e;
      }

      return NextResponse.json({
        data: {
          success: true,
        },
      });
    }
  } catch (error: any) {
    return NextResponse.error();
  }
}
