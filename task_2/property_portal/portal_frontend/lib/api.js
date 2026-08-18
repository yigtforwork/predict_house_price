const MARKET_API_URL =
  process.env.NEXT_PUBLIC_MARKET_API_URL ||
  "http://localhost:8080";

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const body = await response.text();

    let message = body;

    try {
      const json = JSON.parse(body);
      message = json.error || body;
    } catch {
      // Keep original response text.
    }

    throw new Error(
      message ||
        `Request failed with status ${response.status}`
    );
  }

  return response.json();
}

export async function predictHouses(houses) {
  return request("/api/predict", {
    method: "POST",
    body: JSON.stringify(houses)
  });
}

export async function getParameters() {
  return request("/api/parameters");
}

export async function getHistory() {
  return request("/api/estimator/history");
}

export async function getMarketProperties() {
  return request(
    `${MARKET_API_URL}/api/market/properties`
  );
}

export async function getMarketStatistics() {
  return request(
    `${MARKET_API_URL}/api/market/statistics`
  );
}

export async function predictMarketProperty(house) {
  return request(
    `${MARKET_API_URL}/api/market/predict`,
    {
      method: "POST",
      body: JSON.stringify(house)
    }
  );
}