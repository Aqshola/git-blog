export default function parseContentFromGithub<T>(githubData: any): T | undefined {
    if (!Array.isArray(githubData)) {
      let parsedGivenData = githubData as any;
      //@ts-nocheck
      let parsedData = Buffer.from(
        parsedGivenData.content,
        "base64"
      ).toString() as unknown as T;
  
      return parsedData;
    }
  }