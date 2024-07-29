import httpInstance from "@/utils/http";

export function getVideo() {
    return httpInstance({
        url: "/?m=vod-type-id-4.html"
        // url: "home/category/head"
    })
}