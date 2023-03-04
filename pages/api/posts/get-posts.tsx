// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") return res.status(405).json({
        code: 405,
        message: "Method Not Allowed",
        data: {}
    })

    try {

        const data = await prisma.post.findMany({
            include: {
                user: true
            },
            orderBy:{
                createdAt: "desc"
            }
        })

        return res.status(200).json(data) 
        // return res.status(200).json({
        //     status: 200,
        //     message: "Success",
        //     data: data
        // }) 

    } catch (error: any) {
        console.log(error.message)
        return res.status(500).json({
            status: 500,
            message: "Error has occured whilst fetching a posts",
            data: {}
        })
    }

}
