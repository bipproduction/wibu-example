import prisma from "@/lib/db/prisma"

export async function LoadDataRevalidate({ children }: { children: (data: any) => React.ReactNode }) {
    const data = await prisma.revalidateExample.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    return <>{children(data)}</>
}