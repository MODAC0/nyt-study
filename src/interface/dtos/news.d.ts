export namespace WeeklyNews_T {
    /**
     * Media metadata for weekly news
     */
    export interface MediaMetadata {
        url: string;
        format: string;
        height: number;
        width: number;
    }

    /**
     * Media object for weekly news
     */
    export interface Media {
        type: string;
        subtype: string;
        caption: string;
        copyright: string;
        approved_for_syndication: number;
        "media-metadata": MediaMetadata[];
    }

    /**
     * Weekly news interface for most popular articles
     */
    export interface DTO {
        uri: string;
        url: string;
        id: number;
        asset_id: number;
        source: string;
        published_date: string;
        updated: string;
        section: string;
        subsection: string;
        nytdsection: string;
        adx_keywords: string;
        column: string | null;
        byline: string;
        type: string;
        title: string;
        abstract: string;
        des_facet: string[];
        org_facet: string[];
        per_facet: string[];
        geo_facet: string[];
        media: Media[];
        eta_id: number;
    }
}

export namespace ArticleSearch_T {
    /**
     * Byline person interface
     */
    export interface Person {
        firstname?: string;
        middlename?: string;
        lastname?: string;
        qualifier?: string;
        title?: string;
        role?: string;
        organization?: string;
        rank?: number;
    }

    /**
     * Byline interface for author and contributors
     */
    export interface Byline {
        original?: string;
        person?: Person[];
    }

    /**
     * Multimedia content interface
     */
    export interface Multimedia {
        url: string;
        format: string;
        height: number;
        width: number;
        type: string;
        subtype: string;
        caption?: string;
        copyright?: string;
    }

    /**
     * Article headline interface
     */
    export interface Headline {
        main: string;
        kicker?: string;
        content_kicker?: string;
        print_headline?: string;
        name?: string;
        seo?: string;
        sub?: string;
    }

    /**
     * Article interface for general news articles
     */
    export interface Article {
        _id: string;
        web_url: string;
        snippet: string;
        lead_paragraph: string;
        abstract: string;
        headline: Headline;
        pub_date: string;
        byline: Byline;
        multimedia: Multimedia[];
        section_name?: string;
        subsection_name?: string;
    }

    /**
     * Response structure for article search API
     */
    export interface DTO {
        response: {
            docs: Article[];
            meta: {
                hits: number;
                offset: number;
                time: number;
            };
        };
    }
}
