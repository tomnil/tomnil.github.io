

export type Tag = "audiovideo" | "mp4" | "bat" | "windows" | "copyprint" | "development" | "javascript" | "git" | "jira" |
    "postman" | "nodejs" | "sql" | "rest" | "vscode" | "typescript" | "devmisc" | "homeautomation" | "hass" | "homey"
    | "virtualization" | "qemu" | "proxmox" | "linux" | "QNAP" | "raspberrypi" | "vmware" | "owncloud" | "tools" | "turnkey"
    | "mail" | "docker" | "rpi" | "PaaS" | "grafana" | "jekyll" | "react"

export type Article = {
    Date: Date,
    Site?: undefined | "Medium",
    URL: string,
    Title: string,
    Excerpt?: string,
    Tags: Tag[],
    Verified?: boolean
}
