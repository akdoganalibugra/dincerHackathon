import { users } from "@/mock/db/user";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const requestData = await request.json();
  const { username, password } = requestData;

  // Kullanıcıyı users dizisinde arayın
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    // Kullanıcı bulunduğunda, kullanıcı türünü ve kullanıcı adını yanıt olarak döndürün
    return NextResponse.json(
      {
        type: user.type,
        username: user.username,
      },
      { status: 200 }
    );
  } else {
    // Kullanıcı bulunamazsa hata yanıtı döndürün
    return NextResponse.json(
      {
        error: "Account Not Found",
      },
      { status: 404 }
    );
  }
}
