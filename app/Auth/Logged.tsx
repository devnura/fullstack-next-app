'use client'

import Image from "next/image"

import { signOut } from "next-auth/react"
import Link from "next/link"

type User = {
    image: string
}
export default function Logged({ image }:User) {
    return (
        <li className="flex gap-8 items-center">
            <button onClick={() => signOut()} className="rounded-lg bg-gray-700 text-white text-sm px-6 py-2">Sign out</button>
            <Link href={"/dashboard"}>
                <Image width={64} height={64} src={image} alt={"image"} priority className="w-14 rounded-full" />
            </Link>
        </li>
    )
}