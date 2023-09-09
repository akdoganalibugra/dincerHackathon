import { users } from "@/mock/db/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestData = await request.json();
  const { username, password, type } = requestData;

  // Kullanıcı adı benzersiz olmalıdır, mevcut kullanıcılar arasında kontrol edin
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    // Kullanıcı adı zaten kullanılıyorsa hata döndürün
    return NextResponse.json(
      {
        error: "Kayıtlı Kullanıcı.",
      },
      { status: 400 } // 400 Bad Request
    );
  } else {
    // Yeni kullanıcıyı oluşturun
    const newUser = {
      user_id: users.length + 1,
      username,
      password,
      type,
      enabled: true,
    };

    // Yeni kullanıcıyı veritabanına ekleyin
    users.push(newUser);

    // Başarılı kayıt yanıtı döndürün
    return NextResponse.json(
      {
        message: "Kayıt başarılı.",
        data: users,
      },
      { status: 200 } // 200 OK
    );
  }
}
