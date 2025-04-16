interface RequestHeaders {
    Cookie: string;
  }

export async function createHeaders(authToken: string): Promise<RequestHeaders> {
    let requestHeaders: RequestHeaders;
  
      requestHeaders = {
        Cookie: `token=${authToken}`,
      };
  
    return requestHeaders;
  }