export interface SiteVisionResponse {
  contentNodes: [
    {
      type: string;
      name: string;
      properties: { textContent: string };
    }
  ];
}
