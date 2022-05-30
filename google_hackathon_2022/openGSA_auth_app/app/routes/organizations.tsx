import { json } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react";

// Organizations found in the 
// Reference: https://remix.run/docs/en/v1/guides/data-loading#external-apis
export async function loader() {
    const res = await fetch(
        "https://api.gsa.gov/technology/digital-registry/v1/social_media.json?api_key=3uISFcYi0jNZ1VK6lpsgvnOiIU20b7DjQKu7d44k"
    )
    return json(await res.json());
}

export default function GistsRoute() {
    const gists = useLoaderData();
    console.log(gists.results)
    return (
        <div>
            <div className="md:container md:mx-auto" style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>

                <div className="box-border p-16">
                    <h1 className="font-bold font-bold">Organizations</h1>
                    <p className="font-light">
                        You can see the official social media account for these organizations by selecting one of the cards below.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {gists.results.map((gist: any) => (
                        <div className="bg-slate-100 p-2 hover:bg-blue-100 w-full aspect-auto rounded" key={gist.id}>
                            <a href={gist.service_url} className="text-black font-bold hover:text-sky 200">{gist.organization}</a>
                            <p className="font-light">{gist.short_description}</p>

                            <div>
                                <small className="text-blue-400 bottom-0">
                                    last updated: {(new Date(gist.updated_at)).toLocaleDateString()}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>  // return div
    );
}
