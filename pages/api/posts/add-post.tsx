// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") return res.status(405).json({
        code: 405,
        message: "Method Not Allowed",
        data: {}
    })

    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({
        code: 401,
        message: "Please sign in to make a post",
        data: {}
    })

    const title: string = req.body.title

    const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email || "" }
    })

    // check tittle
    if (title.length > 300) return res.status(403).json({
        code: 403,
        message: "Please write a shorten post",
        data: {}
    })

    if (title.trim().length === 0) return res.status(403).json({
        code: 403,
        message: "Please do not leave this empty",
        data: {}
    })

    try {

        const result = await prisma.post.create({
            data: {
                title,
                userId: prismaUser?.id!
            }
        })

        return res.status(201).json({
            status: 201,
            message: "Post created successfully 🔥",
            data: result
        }) 

    } catch (error: any) {
        console.log(error.message)
        return res.status(500).json({
            status: 500,
            message: "Error has occured whilst makin a posts",
            data: {}
        })
    }

}
