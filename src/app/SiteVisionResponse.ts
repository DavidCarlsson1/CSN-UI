export interface SiteVisionResponse {
  /*properties: {
    shortId: number;
  },*/
  contentNodes: 
    {
      type: string;
      name: string;
      properties: { textContent: string };
    }[];
}