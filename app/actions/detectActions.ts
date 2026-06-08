"use server";

import { redirect } from "next/navigation";

export async function detectActions(formData: FormData) {
  const imageUrl = formData.get("imageUrl") as string;

  const body = new URLSearchParams();
  body.append("api_key", process.env.NEXT_PUBLIC_FACE_API_KEY!);
  body.append("api_secret", process.env.NEXT_PUBLIC_FACE_API_SECRET!);
  body.append("image_url", imageUrl);

  const response = await fetch(
    "https://api-us.faceplusplus.com/facepp/v3/detect",
    {
      method: "POST",
      body,
    }
  );

  const data = await response.json();

  if (data.error_message) {
    const error = encodeURIComponent(data.error_message);
    redirect(`/detect?error=${error}`);
  }

  const boxes =
    data.faces?.map((face: any) => ({
      left: face.face_rectangle.left,
      top: face.face_rectangle.top,
      width: face.face_rectangle.width,
      height: face.face_rectangle.height,
    })) || [];

  const result = encodeURIComponent(
    JSON.stringify({
      imageUrl,
      faceCount: boxes.length,
      boxes,
    })
  );

  redirect(`/detect?result=${result}`);
}