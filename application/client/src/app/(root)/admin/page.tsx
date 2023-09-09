"use client";
import { useAppSelector } from "@/redux/hooks";

export default function Admin() {
    const { form } = useAppSelector((state) => state.user)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                Admin Portal {form?.username}
            </div>
        </main>
    )
}