export namespace News {
    /** 
     * 주간 최신 인기 뉴스 20게
     * /api/weeklyNews
     * https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json
     */

    interface MediaMetadata {
        url: string;
        format: string;
        height: number;
        width: number;
    }

    interface Media {
        type: string;
        subtype: string;
        caption: string;
        copyright: string;
        approved_for_syndication: number;
        "media-metadata": MediaMetadata[];
    }

    interface weeklyNews {
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