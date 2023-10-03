import { NextApiRequest } from "next"


type Params = {
    [key: string]: string | string[]
}

export default async function UserProfile({ params }: { params: Params }) {

    return (
        <div>
            <h1>Profile of user {params.id}</h1>
        </div>
    )



}