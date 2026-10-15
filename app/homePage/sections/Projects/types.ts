// These shapes mirror the Project collection from the old CMS so the tile
// components didn't need to change when content moved into config.ts.

export type Organization = {
    id: string
    name: string
}

export type Skill = {
    id: string
    name: string
    // Hex colors without the leading '#'
    tagColor: string
    tagFontColor: string
}

export type ProjectCategory = {
    id: string
    name: string
    tagColor: string
    tagFontColor: string
}

export type Project = {
    id: string
    title: string
    organization: Organization
    skills: Skill[]
    projectCategory: ProjectCategory
    // ISO dates (YYYY-MM-DD). Omit endDate for ongoing work.
    startDate: string
    endDate?: string
    // The first paragraph doubles as the collapsed preview
    description_html: string
    liveUrl?: string
    githubRepo?: string
}
