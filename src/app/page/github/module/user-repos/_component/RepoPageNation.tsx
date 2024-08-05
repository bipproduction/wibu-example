'use client'

import { Button, Flex } from "@mantine/core"
import _ from "lodash"
import { updateRepoPage } from "../_action/updateRepoPage"
import { useState } from "react"

export function RepoPagenation({ dataPage }: { dataPage: any }) {
    
   
    return <Flex gap={"md"}>
        {_.keys(dataPage).map((v, k) => <TombolPage key={k} title={v} page={dataPage[v]} />)}
    </Flex>
}

function TombolPage({ page, title }: {title: string, page: number }) {
    const [loading, setLoading] = useState(false)
    async function updatePage() {
        setLoading(true)
        await updateRepoPage(page)
        console.log("page", page)
        setLoading(false)
    }
    return <Button loading={loading} onClick={updatePage} variant="outline">{title}</Button>
}
